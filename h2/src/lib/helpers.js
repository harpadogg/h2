export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function el(name, className, textNode) {
  const element = document.createElement(name);
  element.classList.add(className);

  if (textNode) {
    element.appendChild(document.createTextNode(textNode));
  }

  return element;
}
