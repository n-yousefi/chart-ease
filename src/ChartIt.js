import Element from "./Element";
import { createSVG } from "./svg";
import DataSet from "./DataSet";
import CandleStick from "./CandleStick";

class ChartIt extends HTMLElement {
  constructor() {
    super();
    this.element = new Element(this);
  }

  connectedCallback() {
    this.draw();
  }
  disconnectedCallback() {}

  draw() {
    const svg = createSVG(this.element);
    Array.from(this.children).forEach((child) => svg.appendChild(child));
    this.parentElement.insertBefore(svg, this);
  }
}

customElements.get("chart-it") || customElements.define("chart-it", ChartIt);
customElements.get("data-set") || customElements.define("data-set", DataSet);
customElements.get("candle-stick") ||
  customElements.define("candle-stick", CandleStick);
