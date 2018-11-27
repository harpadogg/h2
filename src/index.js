import List from './lib/list';
import Lecture from './lib/lecture';
import { empty } from './lib/helpers';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  const cardText = document.querySelector('.card');

  // eslint-disable-next-line no-restricted-syntax
  /* for (let item of page.querySelectorAll('.list')) {
    const card = item.querySelector('.card');
    card.addEventListener('click', cardClick);
  } */

  // eslint-disable-next-line no-restricted-syntax
  for (let buttons of document.querySelectorAll('.buttons')) {
    const button = buttons.querySelector('.button');
    button.addEventListener('click', buttonClick);
  }

  function cardClick(e) {
    e.preventDefault();
    console.log('card');
  }

  function buttonClick(e) {
    e.preventDefault();
    console.log('takki');
  }

  if (isLecturePage) {
    const lecture = new Lecture();
    lecture.load();
  } else {
    const list = new List();
    list.load();
    cardText.addEventListener('click', cardClick);
  }
});
