
import { getCategory, getGoods } from "./goodsService";
import { hideOverlay, showOverlay } from "./overlay";
import { startPagination } from "./pagination";
import { renderGoods } from "./renderGoods";

const toggleFilter = (filter, catalogFilterBtn, filterTitle) => {
  catalogFilterBtn.addEventListener('click', () => {
    filter.classList.add('filter_show');
    showOverlay();
  });

  filterTitle.addEventListener('click', () => {
    filter.classList.remove('filter_show');
    hideOverlay();
  }); 
}



export const filter = (goodsList, paginationWrapper) => {
  const filter = document.querySelector('.filter');
  const catalogFilterBtn = document.querySelector('.catalog__filter-btn')
  const category = document.querySelector('#category');
  const filterTitle = document.querySelector('.filter__title');

  toggleFilter(filter, catalogFilterBtn, filterTitle);

  getCategory().then(categoryList => {
    for (const categoryListKey in categoryList) {
      const option = document.createElement('option');
      option.value = categoryListKey;
      option.textContent = categoryList[categoryListKey];
      category.append(option);
    }
  });

  const filterForm = document.querySelector('.filter__form');
  filterForm.addEventListener('submit', (e) => {
    e.preventDefault();
 
    // конструкция, которая собирает все чекбоксы
    const checkboxes = new Set();
    [...filterForm.elements].forEach(elem => {
      if (elem.type === 'checkbox') {
        checkboxes.add(elem.name);
      }
    });

    const data = {};

    const formData = new FormData(filterForm);

    for (const [name, value] of formData) {
      if (!value) continue;
      if (checkboxes.has(name)) {
        if (Array.isArray(data[name])) {
          data[name].push(value);
        } else {
          data[name] = [value]
        }
      } else {
        data[name] = value;
      }
    }


    goodsList.innerHTML = `
      <div class="goods__preload">
        <svg width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M191.292 58.7083L176.563 73.4375C164.635 61.5083 148.939 54.084 132.151 52.4296C115.363 50.7751 98.5202 54.993 84.4931 64.3644C70.466 73.7359 60.1223 87.6811 55.2244 103.824C50.3264 119.967 51.1773 137.309 57.6321 152.895C64.0868 168.48 75.7461 181.346 90.6232 189.299C105.5 197.252 122.675 199.801 139.221 196.511C155.766 193.221 170.659 184.296 181.362 171.256C192.065 158.217 197.915 141.87 197.917 125H218.75C218.75 146.69 211.229 167.708 197.469 184.474C183.709 201.24 164.562 212.717 143.289 216.948C122.016 221.179 99.9343 217.903 80.8059 207.679C61.6775 197.454 46.6861 180.914 38.3861 160.875C30.086 140.837 28.9908 118.54 35.2871 97.7843C41.5833 77.0288 54.8816 59.0985 72.9158 47.0485C90.9501 34.9986 112.605 29.5746 134.19 31.7007C155.775 33.8267 175.955 43.3714 191.292 58.7083V58.7083Z" fill="black"/>
        </svg>
      </div>
    `;
    
    const url = new URL(location);
    
    const search = url.searchParams.get('search');

    url.search = '';
    // url.searchParams.set('search', search);

    for (const key in data) {
      url.searchParams.set(key, data[key]);
    }

    history.pushState(null, null, url);
   
    getGoods().then(({ goods, pages, page }) => { 
      filter.classList.remove('filter_show');
      hideOverlay();
      renderGoods(goodsList, goods);
      startPagination(paginationWrapper, pages, page);
    });

  });
}

