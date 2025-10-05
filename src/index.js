import './scss/global/main.scss';

// importing dynamic templates for navbar and footer
import { renderNav } from './app/navbar';
import { renderFooter } from './app/footer';
import { accordionFunc } from './app/accordion';
import { pageTransition } from './app/page-transition';

renderNav();
renderFooter();
accordionFunc();
pageTransition();
