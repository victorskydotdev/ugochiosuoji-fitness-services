const accordionTextBtn = document.querySelectorAll('.accordion-heading');
const faqAccordion = document.querySelectorAll('.faq-accordion-wrap');
const accordionText = document.querySelectorAll('.text-accordion');
const angleIcon = document.querySelectorAll('.angle-icon');

export const accordionFunc = () => {
	accordionTextBtn.forEach((btn, index) => {
		if (index === 0) {
			faqAccordion[index].classList.add('expand-accordion');

			angleIcon[index].classList.toggle('rotate-icon');
		}

		btn.addEventListener('click', () => {
			// Collapse all accordions and reset icons
			faqAccordion.forEach((item, i) => {
				item.classList.remove('expand-accordion');
				angleIcon[i].classList.remove('rotate-icon');
			});

			faqAccordion[index].classList.toggle('expand-accordion');

			angleIcon[index].classList.toggle('rotate-icon');

			// console.log(faqAccordion, index);
		});
	});
};
