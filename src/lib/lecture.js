import { empty, el } from './helpers';

export default class Lecture {
  constructor() {
    this.container = document.querySelector('.list');
    this.URL = '../lectures.json';
  }

  loadLecture() {
    return fetch(this.URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Gat ekki sótt fyrirlestra');
        }
        return res.json();
      });
  }

  showLecture(data) {
    empty(this.container);
    const divRow = el('div', 'grid__row');

    data.forEach((item) => {
      const divCol = el('div', 'grid__col');
      const divCard = el('div', 'card');
      const divImage = el('div', 'card__image');
      const img = el('img', 'card__img');
      if (item.thumbnail) {
        img.setAttribute('src', item.thumbnail);
      }
      const divText = el('div', 'card__text');
      const subtitle = el('h3', 'card__subtitle', item.category);
      const cardTitle = el('h2', 'card__title', item.title);

      divText.appendChild(subtitle);
      divText.appendChild(cardTitle);
      divImage.appendChild(img);
      divCard.appendChild(divImage);
      divCard.appendChild(divText);
      divCol.appendChild(divCard);
      divRow.appendChild(divCol);
    });
    this.container.appendChild(divRow);
  }

  load() {
    this.loadLecture()
      .then((data) => {
        this.showLecture(data.lectures);
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
