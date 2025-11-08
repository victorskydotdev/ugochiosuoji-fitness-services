import { Swiper } from 'swiper';

import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const carousel = new Swiper('.carousel', {
	// configure Swiper to use modules
	modules: [Navigation, Autoplay],

	direction: 'horizontal',
	loop: true,
	speed: 3000,
	slidesPerView: 1,
	centeredSlides: true,
	spaceBetween: 20,

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	autoplay: {
		delay: 1000,
		disableOnInteraction: false,
	},

	breakpoints: {
		'@0.90': {
			slidesPerView: 2,
			spaceBetween: 20,
		},

		'@1.50': {
			slidesPerView: 2,
			spaceBetween: 50,
		},
	},
});

export const triggerCarousel = () => {
	carousel.init();
};
