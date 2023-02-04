import normalize from "./normalize";
import Axes from "./Axes";
import loadPathData from "./loadPathData";

class ChartIt extends HTMLElement {
  constructor() {
    super();
    this.axes = new Axes(this).Axes;
  }

  connectedCallback() {}
  disconnectedCallback() {}

  draw(data) {
    const svg = this.createSVG(this.axes[0].length, this.axes[1].length);
    const path = this.querySelector(`path[is="path-type"]`);
    loadPathData(path, data);
    svg.appendChild(path);
    this.outerHTML = svg.outerHTML;
  }

  set data(data) {
    this.draw(normalize(data, this.axes));
  }

  createSVG(width, height) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    return svg;
  }
}

customElements.get("chart-it") || customElements.define("chart-it", ChartIt);
