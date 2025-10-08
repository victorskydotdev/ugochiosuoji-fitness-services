import logo from '../media/ugochi-logo.png';

export const renderNav = () => {
	const header = document.querySelector('.header');

	const navTemplate = (cb) => {
		return `
      <div class="top-nav">
				<div class="container">
					<div class="wrap">
						<div class="icon">
							<i class="fa-solid fa-phone-volume"></i>
						</div>
						<p class="phone">+2348100784622</p>
					</div>

					<div class="wrap">
						<div class="icon">
							<i class="fa-solid fa-envelope"></i>
						</div>
						<div class="icon">
							<i class="fa-brands fa-facebook-f"></i>
						</div>
						<div class="icon">
							<i class="fa-brands fa-instagram"></i>
						</div>
					</div>
				</div>
			</div>

			<nav class="nav-container">
				<div class="brand-wrap">
					<a href="/">
						<img src="${logo}" alt="" class="logo-img" />
					</a>
				</div>

				<ul class="nav-links mobile-nav">
					<div class="mobile-nav-logo">
						<img class='nav-logo' src="${logo}" alt="logo" />

						<button class="nav-close-btn">
							<i class="fa-solid fa-xmark"></i>
						</button>
					</div>

					<div class="wrap">
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
					</div>
				</ul>

				<div class="hamburger">
					<button class="burger">
						<i class="fa-solid fa-bars"></i>
					</button>
				</div>
			</nav>

			
    `;
	};

	if (header) {
		header.innerHTML = navTemplate();

		const mobileNav = document.querySelector('.mobile-nav');
		const burger = document.querySelector('.burger');
		const navCloseBtn = document.querySelector('.nav-close-btn');
		const navContainer = document.querySelector('.nav-container');

		if (burger) {
			burger.addEventListener('click', () => {
				mobileNav.classList.add('show-nav');
			});
		}

		if (navCloseBtn) {
			navCloseBtn.addEventListener('click', () => {
				mobileNav.classList.remove('show-nav');
			});
		}

		window.addEventListener('scroll', () => {
			if (window.scrollY >= 100) {
				header.classList.add('off-screen-nav');

				setTimeout(() => {
					if (window.scrollY >= 300) {
						header.classList.add('active');
					}
				}, 500);
			} else {
				header.classList.remove('off-screen-nav');

				setTimeout(() => {
					if (window.scrollY <= 300) {
						header.classList.remove('active');
					}
				}, 500);
			}
		});

		// window.addEventListener('scroll', () => {
		// 	if (window.scrollY >= 500) {
		// 		header.classList.add('static-nav');

		// 		// setTimeout(() => {
		// 		// 	navContainer.classList.add('move-nav-up');
		// 		// }, 300);
		// 	}
		// });
	}
};
