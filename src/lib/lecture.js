import { empty, el } from './helpers';

export default class Lecture {
  constructor() {
    this.URL = '../lectures.json';
    this.HREF = document.location.href;
    this.header = document.querySelector('.header');
    this.main = document.querySelector('main');
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
    empty(this.main);
    console.log(data);

    if (data.image) {
      const img = new Image();
      img.setAttribute('src', `../${data.image}`);
      img.className = 'header__img';
      this.header.appendChild(img);
    }
    
    data.content.forEach((item) => {
      let youtube;
      let text;
      let quote;
      let code;
      let image;
      let list;
      let heading;

      switch (item.type) {
        case 'youtube': youtube = el('iframe', 'lecure__video');
          youtube.setAttribute('src', item.data);
          this.main.appendChild(youtube); break;
        case 'text': text = el('p', 'lecture__text', item.data);
          this.main.appendChild(text); break;
        case 'quote': quote = el('blockquote', 'lecture__quote', item.data);
          this.main.appendChild(quote); break;
        case 'code': code = el('code', 'lecture__code', item.data);
          this.main.appendChild(code); break;
        case 'image': image = el('img', 'lecture__image'); image.setAttribute('src', item.data);
          this.main.appendChild(image); break;
        case 'list': list = el('ul', 'lecture__list');
          item.data.forEach((litem) => {
            const listItem = el('li', '.lecture__litem', litem);
            list.appendChild(listItem);
          });
          this.main.appendChild(list); break;
        case 'heading': heading = el('h2', 'lecture__heading', item.data);
          this.main.appendChild(heading); break;
        default: console.error('vantar case');
      }
    });
  }

  load() {
    this.loadLecture()
      .then((data) => {
        const sluggo = this.HREF.split('slug=')[1];
        data.lectures.forEach((item) => {
          if (item.slug === sluggo) {
            this.showLecture(item);
          }
        });
      })
      .catch((e) => {
        console.error(`Villa við sækja fyrirlestra ${e}`);
      });

    const savedData = window.localStorage.getItem(this.keyName);

    if (savedData) {
      const parsed = JSON.parse(savedData);
      const date = new Date(parsed.date);

      this.create(parsed.title, date);
    }
  }
}
