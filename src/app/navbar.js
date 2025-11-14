import logo from '../media/ugochi-logo.png';

const renderNav = () => {
	const header = document.querySelector('.header');

	const navTemplate = (cb) => {
		return `
      <div class="top-nav">
				<div class="container">
					<div class="wrap">
						<div class="icon">
							<i class="fa-solid fa-phone-volume"></i>
						</div>
						<p class="phone">+234 909 472 9411</p>
					</div>

					<div class="wrap">
						<div class="icon">
							<a href="mailto:info@ugochiosuoji.com">
								<i class="fa-solid fa-envelope"></i>
							</a>
						</div>
						<div class="icon">
							<a href="https://web.facebook.com/ugochi.osuoji" target="_blank">
								<i class="fa-brands fa-facebook-f"></i>
							</a>
						</div>
						<div class="icon">
							<a href="https://www.instagram.com/ugochi_osuoji/" target="_blank">
								<i class="fa-brands fa-instagram"></i>
							</a>
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
							<a href="/programs" class="link">Programs</a>
						</li>
						<li class="list">
							<a href="/blog" class="link">Blog & Articles</a>
						</li>

						<li class="list">
							<a href="/contact" class="link">Contact</a>
						</li>
					</div>
				</ul>

				<div class="nav-btns-wrap">
					<div class="book-now-wrap">
						<button class="book-now-btn">Book Ugochi</button>
					</div>

					<div class="hamburger">
						<button class="burger">
							<i class="fa-solid fa-bars"></i>
						</button>
					</div>
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

// writing the book now button logic and form handling functionality
const bookNowFormTemplate = (e) => {
	return `
			

			<div class="container">
				<button class="modal-close-btn">
					<i class="fa-solid fa-xmark"></i>
				</button>
				
				<div class="wrap">
					<div class="form-masthead">
						<h3 class="heading">Book a fitness consultation</h3>
					</div>

					<form name="fitness-booking-form" class="book-now-form">
						<div class="input-group">
							<label for="name" class="label">Name</label>
							<input
								type="text"
								name="name"
								id="name"
								class="input-field"
								placeholder="Enter your name"
								required />
						</div>

						<div class="input-group">
							<label for="email" class="label">Email</label>
							<input
								type="email"
								name="email"
								id="email"
								class="input-field"
								placeholder="Enter your email"
								required />
						</div>

						<div class="input-group">
							<label for="app" class="label">Reason</label>

							<select name="ReasonForAppointment" id="fruit-select">
								<option value="">--Please choose an option--</option>
								<option value="apple">In Person coaching experience</option>
								<option value="banana">Speaking engagement / workout breakout sessions</option>
								<option value="cherry">Corporate & Community Wellness Programs</option>
							</select>
						</div>

						<div class="input-group">
							<label for="message" class="label">Additional message</label>
							<textarea
								name="additionMessage"
								id="message"
								class="input-field textarea-field"
								placeholder="Write your message here..."
								rows="5"
								required></textarea>
						</div>

						<div class="btn-wrap payment-btn-wrap">
							<button type="submit" class="btn payment-submit-btn submit-btn">
								Book now
							</button>
						</div>
					</form>
				</div>
			</div>
	
	`;
};

const bookNowModal = document.querySelector('.book-now-modal');

const bookNow = () => {
	document.addEventListener('click', (e) => {
		const bookNowBtn = e.target.closest('.book-now-btn');

		if (bookNowBtn) {
			bookNowModal.classList.add('show-booknow-form');

			setTimeout(() => {
				bookNowModal.innerHTML = bookNowFormTemplate();

				const bookNowForm = document.querySelector('.book-now-form');

				if (!bookNowForm) return;

				bookNowForm.addEventListener('submit', async (e) => {
					e.preventDefault();

					const formData = new FormData(e.target);

					const jsonData = {};

					for (const [key, value] of formData.entries()) {
						jsonData[key] = value;
					}

					const endPoint = '/.netlify/functions/send-appointment-data';

					try {
						const res = await fetch(endPoint, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(jsonData),
						});

						if (!res.ok) return;

						const fetchedData = await res.json();

						console.log(fetchedData);

						alert(
							'Thank you for reaching out! Your form has been submitted successfully!'
						);

						location.reload();
					} catch (error) {
						console.error('Error:', error);
					}
				});

				document.addEventListener('click', (e) => {
					const closeButton = e.target.closest('.modal-close-btn');

					if (closeButton) {
						bookNowModal.innerHTML = '';

						setTimeout(() => {
							bookNowModal.classList.remove('show-booknow-form');
						}, 1000);
					}
				});
			}, 500);
		}
	});
};

export const triggerNavbarLogic = () => {
	renderNav();

	bookNow();
};
