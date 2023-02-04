import normalize from "./normalize";
import Element from "./Element";
import loadPathData from "./loadPathData";

class ChartIt extends HTMLElement {
  constructor() {
    super();
    this.element = new Element(this);
  }

  connectedCallback() {}
  disconnectedCallback() {}

  draw(data) {
    const svg = this.createSVG(this.element.width, this.element.height);
    this.drawPath(svg, data);
    this.drawPoints(svg, data);
    this.outerHTML = svg.outerHTML;
  }

  drawPoints(svg, data) {
    data.forEach((point) => {
      this.drawPoint(svg, point);
    });
  }

  drawPoint(svg, point) {
    this.element.pointTypes.forEach((pointType) => {
      const tag = pointType.cloneNode(true);
      this.setDefaultPosition(tag, point.x, point.y);
      svg.appendChild(tag);
    });
  }

  setDefaultPosition(tag, x, y) {
    switch (tag.tagName) {
      case "RECT":
        tag.setAttribute("x", x - Number(tag.getAttribute("width")) / 2);
        tag.setAttribute("y", y - Number(tag.getAttribute("height")) / 2);
        break;
      case "CIRCLE":
      case "ELLIPSE":
      default:
        tag.setAttribute("cx", x);
        tag.setAttribute("cy", y);
        break;
    }
  }

  drawPath(svg, data) {
    const path = this.element.pathType.cloneNode(true);
    loadPathData(path, data);
    svg.appendChild(path);
  }

  set data(data) {
    this.draw(normalize(data, this.element.axes));
  }

  createSVG(width, height) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    return svg;
  }
}

customElements.get("chart-it") || customElements.define("chart-it", ChartIt);
