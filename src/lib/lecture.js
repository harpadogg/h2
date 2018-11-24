import { empty } from './helpers';

export default class Lecture {
  constructor() {
    this.container = document.querySelector('.list');
    this.URL = '../lectures/json';
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

  load() {
    this.loadLectures()
      .then(data => console.log(data));
  }
}
