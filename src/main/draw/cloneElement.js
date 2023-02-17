export default function cloneElement(element) {
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
