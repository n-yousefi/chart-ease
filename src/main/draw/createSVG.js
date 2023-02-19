export default function createSVG(width, height, id, className) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  if (id) svg.setAttribute("id", id);
  if (className) svg.setAttribute("class", className);
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  return svg;
}
