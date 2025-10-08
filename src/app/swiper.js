const images = document.querySelectorAll('.hero-img1');

export const triggerSwiper = () => {
	if (images.length > 0) {
		let current = 0;
		// Initially remove the class from all images
		images.forEach((img) => img.classList.remove('animate-img'));

		setInterval(() => {
			// Remove class from all
			images.forEach((img) => img.classList.remove('animate-img'));
			// Add class to current image
			images[current].classList.add('animate-img');
			// Move to next image
			current = (current + 1) % images.length;
		}, 3000);
	}
};
