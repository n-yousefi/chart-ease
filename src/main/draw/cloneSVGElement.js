import copyAttrs from "./copyAttrs";
import copyStyles from "./copyStyles";

export default function cloneSVGElement(element) {
  const newElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    element.tagName.toLowerCase()
  );
  copyAttrs(element, newElement);
  copyStyles(element, newElement);
  const children = Array.from(element.children);
  children.forEach((child) => {
    newElement.appendChild(cloneSVGElement(child));
  });
  return newElement;
}
