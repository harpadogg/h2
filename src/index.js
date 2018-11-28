import List from './lib/list';
import Lecture from './lib/lecture';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  const button = document.querySelectorAll('.button');

  button.forEach(curr => curr.addEventListener('click', buttonClick));

  const list = new List();

  if (isLecturePage) {
    const lecture = new Lecture();
    lecture.load();
  } else {
    list.load([]);
  }

  function buttonClick(e) {
    e.preventDefault();
    console.log('takki');

    const btn = e.target;
    if (btn.classList[0] === 'button') {
      btn.classList.replace('button', 'button--clicked');
    } else {
      btn.classList.replace('button--clicked', 'button');
    }

    const selectedButtons = document.querySelectorAll('.button--clicked');
    const categories = [];
    selectedButtons.forEach((selectedButton) => {
      categories.push(selectedButton.innerHTML.toLowerCase());
    });

    list.load(categories);
  }
});
