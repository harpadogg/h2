import List from './lib/list';
import Lecture from './lib/lecture';
import { empty } from './lib/helpers';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  const button = document.querySelector('.button');
  const card = document.querySelector('.card');

  if (isLecturePage) {
    const lecture = new Lecture();
    lecture.load();
  } else {
    console.error('sdfsdfsdf');

    const list = new List();
    list.load();
    button.addEventListener('submit', empty(card));
    card.addEventListener('click', lecture.load());
  }
});
