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
  /* if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    });
  } */

  return element;
}
