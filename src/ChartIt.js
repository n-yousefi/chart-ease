import { Height, Width } from "./main/defaults";
import createSVG from "./main/draw/createSVG";
import DataSet from "./main/DataSet";
import CandleStick from "./main/CandleStick";

class ChartIt extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.draw();
  }
  disconnectedCallback() {}

  draw() {
    const svg = createSVG(this.id, this.className, this.width, this.height);
    Array.from(this.children).forEach((child) => svg.appendChild(child));
    this.parentElement.insertBefore(svg, this);
  }

  get id() {
    return this.getAttribute("id");
  }
  get className() {
    return this.getAttribute("class");
  }
  get width() {
    return this.getAttribute("width") || Width;
  }
  get height() {
    return this.getAttribute("height") || Height;
  }
}

customElements.get("chart-it") || customElements.define("chart-it", ChartIt);
customElements.get("data-set") || customElements.define("data-set", DataSet);
customElements.get("candle-stick") ||
  customElements.define("candle-stick", CandleStick);
