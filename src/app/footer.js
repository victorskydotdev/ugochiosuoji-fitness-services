import footerLogo from '../media/ugochi-logo.png';

export const renderFooter = () => {
	const footer = document.querySelector('.footer');

	const footerTemplate = (cb) => {
		return `
      <div class="container">
				<div class="brand-wrap">
					<img src="${footerLogo}" alt="" class="logo-img" />
				</div>

				

				<ul class="nav-links">
					<li class="list">
						<a href="/about" class="link">About</a>
					</li>
					<li class="list">
						<a href="/programs" class="link">Programs</a>
					</li>
					<li class="list">
						<a href="/blog" class="link">Blog & Articles</a>
					</li>

					<li class="list">
						<a href="/contact" class="link">Contact</a>
					</li>
				</ul>

				<div class="comms-wrap">
					<p>
						<a href="mailto:info@ugochiosuoji.com">
							Email
						</a>
					</p>

					<p>
						<a href="https://web.facebook.com/ugochi.osuoji" target="_blank">
							Facebook
						</a>
					</p>

					<p>
						<a href="https://www.instagram.com/ugochi_osuoji/" target="_blank">
							Instagram
						</a>
					</p>
				</div>
			</div>

			<div class="rights-section">
				<p class="copyright">
					&copy; 2025 Ugochi Fitness Services. All rights reserved.
				</p>
			</div>
    `;
	};

	if (footer) {
		footer.innerHTML = footerTemplate();
	}
};
