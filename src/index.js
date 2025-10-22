import './scss/global/main.scss';

// importing dynamic templates for navbar and footer
import { renderNav } from './app/navbar';
import { renderFooter } from './app/footer';
import { accordionFunc } from './app/accordion';
import { pageTransition } from './app/page-transition';
import { triggerSwiper } from './app/swiper';
import { redirectToServicesPage } from './app/app';
import { showAboutInfo } from './app/about-modal';
import { renderBlogArticles } from './app/blog';

renderNav();
renderFooter();
accordionFunc();
pageTransition();
triggerSwiper();
redirectToServicesPage();
showAboutInfo();
renderBlogArticles();
