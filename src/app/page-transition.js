export const pageTransition = () => {
	const elements = document.querySelectorAll('.transition-element');

	const options = {
		root: null,
		rootMargin: '0px',
		threshold: 0.1,
	};

	const observer = new IntersectionObserver((entries) => {
		// console.log(entries);
		entries.forEach((entry, index) => {
			if (entry.isIntersecting) {
				setTimeout(() => {
					entry.target.classList.add('in-view');
				}, 800 * index);
			}
		});
	});

	if (elements) {
		elements.forEach((el) => {
			observer.observe(el);
		});
	}
};
