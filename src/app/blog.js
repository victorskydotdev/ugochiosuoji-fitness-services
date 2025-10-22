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
				id: post.sys.id,
				blogTitle: fields.blogTitle,
				article: fields.blogArticle,
				author: fields.author,
				dataTime: post.dataAndTime,
				image: imageUrl ? `https:${imageUrl}` : null,
			};
		});

		// console.log(assetMap);

		const blogTemplate = () => {
			return blogPost
				.map(
					(post) => `
          <div class="blog-card">
					<div class="img-wrap">
						<img src="${post.image}" alt="" class="img" />
					</div>

					<div class="text-wrap">
						<h3 class="title">${post.blogTitle}</h3>
						<p class="text">
							${post.article}
							minima.
						</p>

						<div class="btn-wrap">
							<button class="read-blog-btn">
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

		console.log(blogPost);
	} catch (error) {
		console.log('error:', error);
	}
};
