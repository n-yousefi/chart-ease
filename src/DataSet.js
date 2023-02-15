import normalize from "./normalize";
import Element from "./Element";
import drawPoints from "./drawPoints";
import drawPath from "./drawPath";
import { createSVG } from "./svg";

class DataSet extends HTMLElement {
  constructor() {
    super();
    this.element = new Element(this);
  }

  connectedCallback() {}
  disconnectedCallback() {}

  draw(data, originalData) {
    drawPath(this.parentElement, this.element.pathType, data);
    drawPoints(
      this.parentElement,
      this.element.pointTypes,
      data,
      originalData,
      this["ondraw"]
    );
    this.parentElement.removeChild(this);
  }

  set data(originalData) {
    const data = normalize(originalData, this.element.axes);
    this.draw(data, originalData);
  }
}

customElements.get("data-set") || customElements.define("data-set", DataSet);
