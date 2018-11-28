import { empty, el } from './helpers';

export default class Lecture {
  constructor() {
    this.URL = '../lectures.json';
    this.HREF = document.location.href;
    this.header = document.querySelector('.header');
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
    // empty(this.container);
    console.log(data);

    if (data.image) {
      const img = new Image();
      img.setAttribute('src', `../${data.image}`);
      this.header.appendChild(img);
    }
    
    data.content.forEach((item) => {
      switch (item.type) {
        case 'youtube': console.log(`yt: ${item.data}`); break;
        case 'text': console.log(`text: ${item.data}`); break;
        case 'quote': console.log(`quote: ${item.data}`); break;
        case 'code': console.log(`code: ${item.data}`); break;
        case 'image': console.log(`image: ${item.data}`); break;
        case 'list': console.log(`list: ${item.data}`); break;
        case 'heading': console.log(`heading: ${item.data}`); break;
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
