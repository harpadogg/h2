import { empty, el } from './helpers';
import { load, save } from './storage';

export default class Lecture {
  constructor() {
    this.URL = '../lectures.json';
    this.HREF = document.location.href;
    this.header = document.querySelector('.header');
    this.main = document.querySelector('main');
    this.subtitle = document.querySelector('.header__subtitle');
    this.headerTitle = document.querySelector('.header__title');
    this.footer = document.querySelector('.lecture__footer');
  }

  onClick(e) {
    e.preventDefault();
    const sluggo = document.location.href.split('slug=')[1];
    this.finBut = document.querySelector('.lecture__button');
    save(sluggo);
    if (this.finBut.classList.contains('finished')) {
      this.finBut.classList.remove('finished');
      this.finBut.textContent = 'Klára fyrirlestur';
    } else {
      this.finBut.classList.add('finished');
      this.finBut.textContent = 'Fyrirlestur kláraður';
    }
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

    if (data.image) {
      const img = new Image();
      img.setAttribute('src', `../${data.image}`);
      img.className = 'header__img';
      this.header.appendChild(img);
    }

    this.subtitle.appendChild(document.createTextNode(data.category));
    this.headerTitle.appendChild(document.createTextNode(data.title));

    data.content.forEach((item) => {
      let wrapper;
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
        case 'youtube': wrapper = el('div', 'video__wrapper');
          youtube = el('iframe', 'lecture__video');
          youtube.setAttribute('src', item.data);
          wrapper.appendChild(youtube);
          this.main.appendChild(wrapper); break;

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
          pre = el('pre', 'lecture__pre');
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
            const listItem = el('li', 'lecture__litem', litem);
            list.appendChild(listItem);
          });
          this.main.appendChild(list); break;

        case 'heading': heading = el('h2', 'lecture__heading', item.data);
          this.main.appendChild(heading); break;

        default: console.error('vantar case');
      }
    });
    const sluggo = document.location.href.split('slug=')[1];
    let lecFinish = el('button', 'lecture__button', 'Klára fyrirlestur');
    const finished = load();
    finished.forEach((finish) => {
      if (sluggo === finish) {
        lecFinish = el('button', 'lecture__button', 'Fyrirlestur kláraður');
        lecFinish.classList.add('finished');
      }
    });
    this.footer.appendChild(lecFinish);
    const index = el('a', 'lecture__link', 'Til baka');
    index.setAttribute('href', 'index.html');
    this.footer.appendChild(index);
    lecFinish.addEventListener('click', this.onClick);
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
  }
}
