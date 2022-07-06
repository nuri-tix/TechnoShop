import './index.html';
import './cart.html';
import './card.html';
import './index.scss';

// import Swiper JS
import Swiper, {
  Thumbs,
  Scrollbar
} from 'swiper';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';

const thumbSwiper = new Swiper('.card__slider-thumb', {
  spaceBetween: 44,
  sliderPerView: 3,
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
  modules: [Scrollbar]
});

new Swiper('.card__image', {
  spaceBetween: 10,
  sliderPerView: 1,
  thumbs: {
    swiper: thumbSwiper,
    slideThumbActiveClass: '.card__thumb-btn_active',
  },
  modules: [Thumbs]
});



new Swiper('.recommended__carousel', {
  spaceBetween: 30,
  sliderPerView: 5,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
});