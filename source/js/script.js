let pageHeader = document.querySelector('.page-header');
let headerToggle = document.querySelector('.page-header__toggle');

      // pageHeader.classList.remove('page-header--nojs')

headerToggle.addEventListener('click', function() {
  if (pageHeader.classList.contains('page-header--closed')) {
    pageHeader.classList.remove('page-header--closed');
    pageHeader.classList.add('page-header--opened');
  } else {
      pageHeader.classList.add('page-header--closed');
      pageHeader.classList.remove('page-header--opened');
    }
});

const orderButton = document.querySelector('.product-of-the-week__button');
const orderForm = document.querySelector('.modal');

  orderButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    orderForm.classList.toggle('modal__show');
  });
