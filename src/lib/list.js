import { empty, el } from './helpers';

export default class List {
  constructor() {
    this.button = document.querySelector('.button');
    this.card = document.querySelector('.card');
    this.container = document.querySelector('.list');
    this.URL = '../lectures.json';
  }

  loadHTML() {
    const isHTMLbtn = this.button.classList.contains('html');
    if (isHTMLbtn) {
      empty(this.container);
    }
  }

  loadLectures() {
    return fetch(this.URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Gat ekki sótt fyrirlestra');
        }
        return res.json();
      });
  }

  showLectures(data) {
    empty(this.container);
    const divRow = el('div', 'grid__row');

    data.forEach((item) => {
      const divCol = el('div', 'grid__col');
      const divCard = el('a', 'card');
      divCard.setAttribute('href', `/fyrirlestur.html?slug=${item.slug}`);
      const divImage = el('div', 'card__image');
      const img = el('img', 'card__img');
      if (item.thumbnail) {
        img.setAttribute('src', item.thumbnail);
      }
      const divBottom = el('div', 'card__bottom');
      const divText = el('div', 'card__text');
      const subtitle = el('h3', 'card__subtitle', item.category);
      const cardTitle = el('h2', 'card__title', item.title);
      const divEmpty = el('div');
      const divFinished = el('div', 'card__finished', '✓');

      divEmpty.appendChild(divFinished);
      divText.appendChild(subtitle);
      divText.appendChild(cardTitle);
      divBottom.appendChild(divText);
      divBottom.appendChild(divEmpty);
      divImage.appendChild(img);
      divCard.appendChild(divImage);
      divCard.appendChild(divBottom);
      divCol.appendChild(divCard);
      divRow.appendChild(divCol);
    });
    this.container.appendChild(divRow);
  }

  load() {
    this.loadLectures()
      .then((data) => {
        this.showLectures(data.lectures);
      })
      .catch(() => {
        console.error('Villa við sækja fyrirlestra');
      });

    const savedData = window.localStorage.getItem(this.keyName);

    if (savedData) {
      const parsed = JSON.parse(savedData);
      const date = new Date(parsed.date);

      this.create(parsed.title, date);
    }
  }
}
