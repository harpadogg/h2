import List from './lib/list';
import Lecture from './lib/lecture';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  // const cardText = document.querySelector('.card');
  const button = document.querySelectorAll('.button');
  // const isHTMLbtn = button.classList.contains('html');

  button.forEach(curr => curr.addEventListener('click', buttonClick));

  // eslint-disable-next-line no-restricted-syntax
  /* for (let item of page.querySelectorAll('.list')) {
    const card = item.querySelector('.card');
    card.addEventListener('click', cardClick);
  } */

  function cardClick(e) {
    e.preventDefault();
    console.log('card');
  }

  if (isLecturePage) {
    const lecture = new Lecture();
    lecture.load();
  } else {
    const list = new List();
    list.load();
<<<<<<< HEAD
    cardText.addEventListener('click', list.cardClick);
=======
  }
  function buttonClick(e) {
    e.preventDefault();

    if ('.button html') {
      console.log('takki');
      const list = new List();
      list.loadHTML();
    }
>>>>>>> 8335d995c759ab224faf70d1a62eb0ee06432ce7
  }
});
