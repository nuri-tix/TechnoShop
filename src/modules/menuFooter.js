import { getCategory } from "./goodsService"

export const menuFooter = () => {
  const categoryFooter = document.querySelector('#category-footer')
  getCategory().then(categoryList => {
    for (const categoryListKey in categoryList) {
      const point = document.createElement('li');
      point.value = categoryListKey;
      point.textContent = categoryList[categoryListKey];
      categoryFooter.append(point);
    }
  })
}