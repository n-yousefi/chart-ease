import DataSet from "./main/DataSet";
import CandleStick from "./main/CandleStick";
import { Height, Width } from "./main/defaults";
import createSVG from "./main/draw/createSVG";

export default class ChartIt extends HTMLElement {
  constructor() {
    super();
    this.svg = createSVG(this.width, this.height);
    this.appendChild(this.svg);
  }

  connectedCallback() {}
  disconnectedCallback() {}

  set axes(axes) {
    this.firstElementChild.axes = axes;
  }
  set ondraw(ondraw) {
    this.firstElementChild.ondraw = ondraw;
  }
  set data(data) {
    this.firstElementChild.data = data;
  }

  get width() {
    return this.getAttribute("width") || Width;
  }
  get height() {
    return this.getAttribute("height") || Height;
  }
}

customElements.get("data-set") || customElements.define("data-set", DataSet);
customElements.get("chart-it") || customElements.define("chart-it", ChartIt);
customElements.get("candle-stick") ||
  customElements.define("candle-stick", CandleStick);
