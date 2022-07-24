import './index.html';
import './cart.html';
import './card.html';
import './index.scss';

// import Swiper JS
import Swiper, {Thumbs, Scrollbar} from 'swiper';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';

import {startPagination} from './modules/pagination';
import {getGoods, getGoodsCategoryItem, getGoodsItem, getGoodsList} from './modules/goodsService';
import {renderGoods} from './modules/renderGoods';
import {renderItem} from './modules/renderItem';
import { filter } from './modules/filter';
import { menuFooter } from './modules/menuFooter';
import { cartControl, renderCart } from './modules/cartControl';
import { serviceCounter } from './modules/counterControl';
import {renderRecommended} from './modules/renderRecommended';

try {
  const goodsList = document.querySelector('.goods__list');
  if (goodsList) {    

    menuFooter();

    const paginationWrapper = document.querySelector('.pagination');
    
    filter(goodsList, paginationWrapper);
    
    goodsList.innerHTML = `
      <div class="goods__preload">
        <svg width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M191.292 58.7083L176.563 73.4375C164.635 61.5083 148.939 54.084 132.151 52.4296C115.363 50.7751 98.5202 54.993 84.4931 64.3644C70.466 73.7359 60.1223 87.6811 55.2244 103.824C50.3264 119.967 51.1773 137.309 57.6321 152.895C64.0868 168.48 75.7461 181.346 90.6232 189.299C105.5 197.252 122.675 199.801 139.221 196.511C155.766 193.221 170.659 184.296 181.362 171.256C192.065 158.217 197.915 141.87 197.917 125H218.75C218.75 146.69 211.229 167.708 197.469 184.474C183.709 201.24 164.562 212.717 143.289 216.948C122.016 221.179 99.9343 217.903 80.8059 207.679C61.6775 197.454 46.6861 180.914 38.3861 160.875C30.086 140.837 28.9908 118.54 35.2871 97.7843C41.5833 77.0288 54.8816 59.0985 72.9158 47.0485C90.9501 34.9986 112.605 29.5746 134.19 31.7007C155.775 33.8267 175.955 43.3714 191.292 58.7083V58.7083Z" fill="black"/>
        </svg>
      </div>
    `;
    getGoods().then(({ goods, pages, page }) => {       
      renderGoods(goodsList, goods);
      startPagination(paginationWrapper, pages, page);
      cartControl({
        wrapper: goodsList,
        classAdd: 'goods-item__to-cart',
        classDelete: 'goods-item__to-cart_remove',
      })
    });
  }
} catch (e) {
  console.warn(e);
}

try {
  const card = document.querySelector('.card');

  if (card) {
    const recommended = document.querySelector('.recommended');
    const pageURL = new URL(location);
    const id = +pageURL.searchParams.get('id');

    const preload = document.createElement('div');
    preload.className = 'preload';
    preload.innerHTML = `
      <svg width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M191.292 58.7083L176.563 73.4375C164.635 61.5083 148.939 54.084 132.151 52.4296C115.363 50.7751 98.5202 54.993 84.4931 64.3644C70.466 73.7359 60.1223 87.6811 55.2244 103.824C50.3264 119.967 51.1773 137.309 57.6321 152.895C64.0868 168.48 75.7461 181.346 90.6232 189.299C105.5 197.252 122.675 199.801 139.221 196.511C155.766 193.221 170.659 184.296 181.362 171.256C192.065 158.217 197.915 141.87 197.917 125H218.75C218.75 146.69 211.229 167.708 197.469 184.474C183.709 201.24 164.562 212.717 143.289 216.948C122.016 221.179 99.9343 217.903 80.8059 207.679C61.6775 197.454 46.6861 180.914 38.3861 160.875C30.086 140.837 28.9908 118.54 35.2871 97.7843C41.5833 77.0288 54.8816 59.0985 72.9158 47.0485C90.9501 34.9986 112.605 29.5746 134.19 31.7007C155.775 33.8267 175.955 43.3714 191.292 58.7083V58.7083Z" fill="black"/>
      </svg>
    `;

    card.append(preload);

    serviceCounter({
      wrapper: '.card__count',
      number: '.card__number',
      selectorDec: '.card__btn_dec',
      selectorInc: '.card__btn_inc',
    });

    getGoodsItem(id).then((item) => {
      renderItem(item);
      cartControl({
        classAdd: 'card__add-cart',
        classCount: 'card__number',
      })
      preload.remove();
      return item.category;
    }).then(category => {
      return getGoodsCategoryItem(category);
    }).then(data => {
        renderRecommended(recommended, data, id);
        // console.log(data);
      })
    
  }
} catch (e) {
  console.warn(e);
}

try {
  const cart = document.querySelector('.cart');

  if (cart) {
    const cartGoods = localStorage.getItem('cart-ts') ?
      JSON.parse(localStorage.getItem('cart-ts')) :
      {};
    
    const list = Object.keys(cartGoods);

    if (list.length) {
      const preload = document.createElement('div');
        preload.className = 'preload';
        preload.innerHTML = `
          <svg width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M191.292 58.7083L176.563 73.4375C164.635 61.5083 148.939 54.084 132.151 52.4296C115.363 50.7751 98.5202 54.993 84.4931 64.3644C70.466 73.7359 60.1223 87.6811 55.2244 103.824C50.3264 119.967 51.1773 137.309 57.6321 152.895C64.0868 168.48 75.7461 181.346 90.6232 189.299C105.5 197.252 122.675 199.801 139.221 196.511C155.766 193.221 170.659 184.296 181.362 171.256C192.065 158.217 197.915 141.87 197.917 125H218.75C218.75 146.69 211.229 167.708 197.469 184.474C183.709 201.24 164.562 212.717 143.289 216.948C122.016 221.179 99.9343 217.903 80.8059 207.679C61.6775 197.454 46.6861 180.914 38.3861 160.875C30.086 140.837 28.9908 118.54 35.2871 97.7843C41.5833 77.0288 54.8816 59.0985 72.9158 47.0485C90.9501 34.9986 112.605 29.5746 134.19 31.7007C155.775 33.8267 175.955 43.3714 191.292 58.7083V58.7083Z" fill="black"/>
          </svg>
        `;

      cart.append(preload);

      getGoodsList(list).then(goods => {
        renderCart(goods, cartGoods);
        cartControl();
        preload.remove();
      })
    }
  }
} catch (e) {
  console.warn(e);
};


