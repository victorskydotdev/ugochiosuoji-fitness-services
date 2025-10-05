import logo from '../media/ugochi-logo.png';

export const renderNav = () => {
	const header = document.querySelector('.header');

	const navTemplate = (cb) => {
		return `
      <div class="top-nav">
				<div class="container">
					<div class="wrap">
						<div class="icon"></div>
						<p class="phone">+2348100784622</p>
					</div>

					<div class="wrap">
						<div class="icon"></div>
						<div class="icon"></div>
						<div class="icon"></div>
					</div>
				</div>
			</div>

			<nav class="nav-container">
				<div class="brand-wrap">
					<img src="${logo}" alt="" class="logo-img" />
				</div>

				<ul class="nav-links">
					<li class="list">
						<a href="/" class="link">Home</a>
					</li>
					<li class="list">
						<a href="/about" class="link">About</a>
					</li>
					<li class="list">
						<a href="/services" class="link">Services</a>
					</li>
					<li class="list">
						<a href="/blog" class="link">Blog & Articles</a>
					</li>

					<li class="list">
						<a href="/contact" class="link">Contact</a>
					</li>
				</ul>
			</nav>
    `;
	};

	if (header) {
		header.innerHTML = navTemplate();
	}
};
