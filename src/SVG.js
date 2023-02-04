export default class {
  constructor(chartIt, width, height) {
    const svg = this.createSVG(width, height);
    chartIt.innerHtml = "";
    chartIt.appendChild(svg);
    this.svg = svg;
  }
  createSVG(width, height) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    return svg;
  }
}
