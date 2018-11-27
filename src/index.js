import List from './lib/list';
import Lecture from './lib/lecture';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  const button = document.querySelectorAll('.button');
  // const isHTMLbtn = button.classList.contains('html');

  button.forEach(curr => curr.addEventListener('click', buttonClick));

  if (isLecturePage) {
    const lecture = new Lecture();
    lecture.load();
  } else {
    const list = new List();
    list.load();
  }
  function buttonClick(e) {
    e.preventDefault();

    if ('.button html') {
      console.log('takki');
      const list = new List();
      list.loadHTML();
    }
  }
});
