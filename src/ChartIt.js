import normalize from "./normalize";
import Element from "./Element";
import drawPoints from "./drawPoints";
import drawPath from "./drawPath";
import { createSVG } from "./svg";

class ChartIt extends HTMLElement {
  constructor() {
    super();
    this.element = new Element(this);
  }

  connectedCallback() {}
  disconnectedCallback() {}

  draw(data, originalData) {
    const svg = createSVG(this.element);
    const pathType = this.element.pathType;
    const pointTypes = this.element.pointTypes;
    this.parentElement.insertBefore(svg, this);
    drawPath(svg, pathType, data);
    drawPoints(svg, pointTypes, data, originalData, this["ondraw"]);
    this.parentElement.removeChild(this);
  }

  set data(originalData) {
    const data = normalize(originalData, this.element.axes);
    this.draw(data, originalData);
  }
}

customElements.get("chart-it") || customElements.define("chart-it", ChartIt);
