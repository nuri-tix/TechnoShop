import { API_URI } from './var';

export const renderGoods = (wrapper, goods) => {
  wrapper.textContent = '';

  if (!goods.length) {
    wrapper.innerHTML = '<h2 class="no-products">Нет товаров по вашему запросу</h2>'
  }

  const cards = goods.map((item) => {
    const li = document.createElement('li');
    li.className = 'goods__item';

    li.innerHTML = `
      <article class="goods-item">
        <a href="card.html?id=${item.id}" class="goods-item__link">
          <img src="${API_URI}${item.images.present}" alt="${item.title}" class="goods-item__img" width="340" height="340">
          <h3 class="goods-item__title">${item.title}</h3>
        </a>
        <div class="goods-item__buy">
          <p class="goods-item__price">${item.price} ₽</p>
          <button class="goods-item__to-cart" data-id-goods="${item.id}">В корзину</button>
        </div>
      </article>
    `;

    return li;
  });

  wrapper.append(...cards);
};
