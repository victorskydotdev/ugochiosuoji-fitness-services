const contactForm = document.querySelector('.contact-form');

const submitForm = () => {
	if (!contactForm) return;

	contactForm.addEventListener('submit', async (e) => {
		e.preventDefault();

		// alert('Form clicked');

		const formData = new FormData(e.target);

		const jsonData = {};

		for (const [key, value] of formData.entries()) {
			jsonData[key] = value;
		}

		// console.log(jsonData);

		try {
			const endPoint = `/.netlify/functions/send-email-notification`;

			const response = await fetch(endPoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},

				body: JSON.stringify(jsonData),
			});

			if (!response.ok) {
				alert('Something went wrong. Please refresh the page and try again.');
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
