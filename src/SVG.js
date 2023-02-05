export function cloneElement(element) {
  const tag = document.createElementNS(
    "http://www.w3.org/2000/svg",
    element.tagName.toLowerCase()
  );
  Array.from(element.attributes).forEach((attr) =>
    tag.setAttribute(attr.name, attr.value)
  );
  tag.style.cssText = element.style.cssText;
  return tag;
}
