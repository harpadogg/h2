/**
 * Sækir og vistar í localStorage
 */

// Fast sem skilgreinir heiti á lykli sem vistað er undir í localStorage
const LOCALSTORAGE_KEY = 'lecture_done';

/**
 * Sækir gögn úr localStorage.
 *
 * @returns {array} Raðað fylki af svörum eða tóma fylkið ef ekkert vistað.
 */
export function load() {
  const doneJson = localStorage.getItem(LOCALSTORAGE_KEY);
  const finished = JSON.parse(doneJson) || [];

  return finished;
}

/**
 * Vista fyrirlestur
 *
 * @param {string} slug Slug þess fyrirlesturs sem á að vista

 */
export function save(slug) {
  const finished = load();
  finished.push(slug);

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(finished));
}

/**
 * Hreinsa alla fyrirlestra úr localStorage
 */
export function clear(slug) {
  const finished = load();

  finished.splice(finished.indexOf(slug), 1);
  localStorage.removeItem(LOCALSTORAGE_KEY);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(finished));
}
