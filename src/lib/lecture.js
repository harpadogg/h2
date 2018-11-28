import { empty, el } from './helpers';

export default class Lecture {
  constructor() {
    this.URL = '../lectures.json';
    this.HREF = document.location.href;
    this.header = document.querySelector('.header');
    this.main = document.querySelector('main');
    this.subtitle = document.querySelector('.header__subtitle');
    this.headerTitle = document.querySelector('.header__title');
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
    // eslint-disable-next-line no-console
    console.log(data);

    if (data.image) {
      const img = new Image();
      img.setAttribute('src', `../${data.image}`);
      img.className = 'header__img';
      this.header.appendChild(img);
    }
    this.subtitle.appendChild(document.createTextNode(data.category));
    this.headerTitle.appendChild(document.createTextNode(data.title));

    data.content.forEach((item) => {
      let youtube;
      let text;
      let textArr;
      let quote;
      let code;
      let image;
      let list;
      let heading;
      let attribute;
      let figImg;
      let figCaption;
      let pre;

      switch (item.type) {
        case 'youtube': youtube = el('iframe', 'lecure__video');
          youtube.setAttribute('src', item.data);
          this.main.appendChild(youtube); break;

        case 'text': textArr = item.data.split('\n');
          textArr.forEach((par) => {
            text = el('p', 'lecture__text', par);
            this.main.appendChild(text);
          }); break;

        case 'quote': quote = el('blockquote', 'lecture__quote', item.data);
          attribute = el('cite', 'quote__cite', item.attribute);
          quote.appendChild(attribute);
          this.main.appendChild(quote); break;

        case 'code': code = el('code', 'lecture__code', item.data);
          pre = el('pre');
          pre.appendChild(code);
          this.main.appendChild(pre); break;

        case 'image': figImg = el('figure', 'figure');
          image = el('img', 'lecture__image');
          image.setAttribute('src', item.data);
          figCaption = el('figcaption', 'image__caption', item.caption);
          figImg.appendChild(image);
          figImg.appendChild(figCaption);
          this.main.appendChild(figImg); break;

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
    const footer = el('footer', 'lecture__footer')
    const finish = el('button', 'lecture__button', 'Klára fyrirlestur');
    footer.appendChild(finish);
    const index = el('a', 'lecture__link', 'Til baka');
    index.setAttribute('href', 'index.html');
    footer.appendChild(index);
    this.main.appendChild(footer);
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
