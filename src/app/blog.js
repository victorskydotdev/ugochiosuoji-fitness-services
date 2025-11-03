const articlesWrap = document.querySelector('.articles-container');

export const renderBlogArticles = async () => {
	if (!articlesWrap) return;

	const endPoint = `/.netlify/functions/fetch-blog-data`;

	try {
		const blogRes = await fetch(endPoint);
		const blogData = await blogRes.json();

		console.log(blogData);

		// syntax to fetch images from Contentful
		const assetMap = new Map();

		blogData.data?.includes?.Asset?.forEach((asset) => {
			assetMap.set(asset.sys.id, asset.fields.file.url);
		});

		const blogPost = blogData.data?.items.map((post) => {
			const fields = post.fields;
			const imageId = fields.blogImage?.sys?.id;
			const imageUrl = assetMap.get(imageId);

			console.log('fields object:', fields);

			return {
				blogId: post.sys.id,
				blogTitle: fields.blogTitle,
				article: fields.blogArticle,
				author: fields.author,
				dataTime: post.dataAndTime,
				image: imageUrl ? `https:${imageUrl}` : null,
			};
		});

		// console.log(assetMap);
		// sessionStorage.setItem('blogPosts', JSON.stringify(blogPost));

		const blogTemplate = () => {
			return blogPost
				.map(
					(post, index) => `
          <div class="blog-card">
					<div class="img-wrap">
						<img src="${post.image}" alt="" class="img" />
					</div>

					<div class="text-wrap">
						<h3 class="title">${post.blogTitle}</h3>
						<!-- <p class="text">
							${post.article.substring(0, 30)}
							minima.
						</p> -->

						<div class="btn-wrap">
							<button class="read-blog-btn" data-id="${post.blogId}" data-index=${index}>
								Read more <i class="fa-solid fa-arrow-right"></i>
							</button>
						</div>
					</div>
				</div>
        `
				)
				.join('');
		};

		articlesWrap.innerHTML = blogTemplate();

		const readBlogBtn = document.querySelectorAll('.read-blog-btn');

		if (!readBlogBtn) return;

		readBlogBtn.forEach((btn) => {
			btn.addEventListener('click', () => {
				const blogBtnId = btn.dataset.id;
				const blogIndex = btn.dataset.index;

				const clickedPost = blogPost.find((post) => post.blogId === blogBtnId);

				sessionStorage.setItem('clickedPost', JSON.stringify(clickedPost));

				console.log(clickedPost);

				window.location.href = '/blog/'; // just tried to update this line
			});
		});

		// console.log(blogBtnId);
	} catch (error) {
		console.log('error:', error);
	}
};
