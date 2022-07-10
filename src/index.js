import './index.html';
import './cart.html';
import './card.html';
import './index.scss';
import {
  pagination
} from "./modules/pagination";

const paginationWrapper = document.querySelector('.pagination');
const pageURL = new URL(location);

const page = +pageURL.searchParams.get('page') || 1;

try {
  pagination(paginationWrapper, 10, page, 5);
} catch (e) {
  console.warn(e)
  console.warn('Это не главная страница')
}

// import Swiper JS
import Swiper, {
  Thumbs,
  Scrollbar
} from 'swiper';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';

const thumbSwiper = new Swiper('.card__slider-thumb', {
  spaceBetween: 4,
  slidesPerView: 3,
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
  modules: [Scrollbar]
});

new Swiper('.card__image', {
  spaceBetween: 10,
  slidesPerView: 1,
  thumbs: {
    swiper: thumbSwiper,
    slideThumbActiveClass: 'card__thumb-btn_active',
  },
  modules: [Thumbs]
});



new Swiper('.recommended__carousel', {
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
});