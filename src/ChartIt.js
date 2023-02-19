import DataSet from "./main/DataSet";
import CandleStick from "./main/CandleStick";
import { Height, Width } from "./main/defaults";
import createSVG from "./main/draw/createSVG";

export default class ChartIt extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = this.querySelector("template");
    this.dataSet = this.querySelector("data-set");
    this.svg = createSVG(this.width, this.height);
    this.shadowRoot.appendChild(this.svg);
    if (template) this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  disconnectedCallback() {}

  set axes(axes) {
    this.dataSet.axes = axes;
  }
  set ondraw(ondraw) {
    this.dataSet.ondraw = ondraw;
  }
  set data(data) {
    this.dataSet.data = data;
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
