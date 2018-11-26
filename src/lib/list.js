import { empty } from './helpers';

export default class List {
  constructor() {
    this.button = document.querySelector('.button');
    this.card = document.querySelector('.card');
    this.container = document.querySelector('.list');
    this.URL = '../lectures.json';

    this.button.addEventListener('click', empty(this.container));
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

    const [{
      title, category, thumbnail,
    }] = data;

    // const divList = document.createElement('div');
    // divList.className = 'list';
    const divRow = document.createElement('div');
    divRow.className = 'grid__row';
    const divCol = document.createElement('div');
    divCol.className = 'grid__col';
    const divCard = document.createElement('div');
    divCard.className = 'card';
    const divImage = document.createElement('div');
    divImage.className = 'card__image';
    const img = document.createElement('img');
    img.className = 'card__img';
    img.setAttribute('src', thumbnail);
    const divText = document.createElement('div');
    divText.className = 'card__text';
    const subtitle = document.createElement('h3');
    subtitle.className = 'card__subtitle';
    subtitle.appendChild(document.createTextNode(category));
    const cardTitle = document.createElement('h2');
    cardTitle.className = 'card__title';
    cardTitle.appendChild(document.createTextNode(title));

    divText.appendChild(subtitle);
    divText.appendChild(cardTitle);
    divImage.appendChild(img);
    divCard.appendChild(divImage);
    divCard.appendChild(divText);
    divCol.appendChild(divCard);
    divRow.appendChild(divCol);
    this.container.appendChild(divRow);
  }

  load() {
    this.loadLectures()
      .then((data) => {
        console.log(data);
        this.showLectures(data.lectures);
      })
      .catch(() => {
        console.error('Villa');
      });

    const savedData = window.localStorage.getItem(this.keyName);

    if (savedData) {
      const parsed = JSON.parse(savedData);
      const date = new Date(parsed.date);

      this.create(parsed.title, date);
    }
  }
}
