import { marked } from 'marked';

marked.setOptions = {
	breaks: true,
	gfm: true,
};

const blogArticleWrap = document.querySelector('.blog-article');

export const renderAndReadBlog = () => {
	if (!blogArticleWrap) return;

	const storedPost = JSON.parse(sessionStorage.getItem('clickedPost'));

	window.addEventListener('DOMContentLoaded', () => {
		const parsedContent = marked.parse(storedPost.article); // Convert Markdown → HTML

		const articleTemplate = (cb) => {
			return `
				<div class="container">
					<div class="blog-masthead">
						<p class="data">Published</p>
						<h3 class="heading-title">${cb.blogTitle}</h3>
						<p class="sub-title"></p>
					</div>

					<div class="blog-img-wrap">
						<img src="${cb.image}" alt="" class="img" />
					</div>

					<div class="article-content">
						${parsedContent} <!-- Render HTML directly -->
					</div>

					<div class="author-wrap">
						<p class="text">Published by:</p>
						<h4 class="author">${cb.author}</h4>
					</div>
				</div>
			`;
		};

		blogArticleWrap.innerHTML = articleTemplate(storedPost);
	});
};
