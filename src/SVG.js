export function createSVG(element) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  if (element.id) svg.setAttribute("id", element.id);
  if (element.class) svg.setAttribute("class", element.class);
  svg.setAttribute("width", element.width);
  svg.setAttribute("height", element.height);
  return svg;
}

export function cloneElement(element) {
  const tag = document.createElementNS(
    "http://www.w3.org/2000/svg",
    element.tagName.toLowerCase()
  );
  Array.from(element.attributes).forEach((attr) => {
    if (attr.value) tag.setAttribute(attr.name, attr.value);
  });
  if (tag.style.cssText) tag.style.cssText = element.style.cssText;
  return tag;
}

export function createSvgTag(tagName) {
  return document.createElementNS("http://www.w3.org/2000/svg", tagName);
}
