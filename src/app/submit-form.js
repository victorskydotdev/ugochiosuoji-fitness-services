import 'ldrs/ring';

import { waveform } from 'ldrs';
waveform.register();

const contactForm = document.querySelector('.contact-form');
const btnWrap = document.getElementById('contact-form-btn-wrap');

const submitForm = () => {
	if (!contactForm) return;

	contactForm.addEventListener('submit', async (e) => {
		e.preventDefault();

		const loaderTemplate = () => {
			return `
				<div class="container"> 
					<div class="bar"></div> 
					<div class="bar"></div> 
					<div class="bar"></div> 
					<div class="bar"></div> 
				</div> 
			`;
		};

		// alert('Form clicked');

		const formData = new FormData(e.target);

		const jsonData = {};

		for (const [key, value] of formData.entries()) {
			jsonData[key] = value;
		}

		btnWrap.innerHTML = loaderTemplate();
		btnWrap.style.padding = '1em 1em';

		// console.log(jsonData);
		const endPoint = `/.netlify/functions/send-email-notification`;

		try {
			const response = await fetch(endPoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},

				body: JSON.stringify(jsonData),
			});

			if (!response.ok) {
				alert('⚠️Something went wrong. Click OK to refresh the page.');

				location.reload();
			} else {
				alert('Your form has been submitted successfully!');

				window.location.href = '/';
			}
		} catch (error) {
			console.log('error:', error);
		}
	});
};

export const triggerForm = () => {
	submitForm();
};
