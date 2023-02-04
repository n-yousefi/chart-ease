import normalize from "./normalize";
import Axes from "./Axes";

class ChartIt extends HTMLElement {
  constructor() {
    super();

    this.axes = new Axes(this);
  }

  connectedCallback() {}
  disconnectedCallback() {}

  set data(data) {
    this.data = data;
    this.normalData = normalize(data, this.axes);
  }
}

customElements.get("chart-it") || customElements.define("chart-it", ChartIt);
