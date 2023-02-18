import MultiChart from "./main/MultiChart";
import DataSet from "./main/DataSet";
import CandleStick from "./main/CandleStick";
import copyAttrs from "./main/draw/copyAttrs";
import copyStyles from "./main/draw/copyStyles";

class ChartIt extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const multiChart = document.createElement("multi-chart");
    copyAttrs(this, multiChart);
    copyStyles(this, multiChart);
    this.appendDataSet(multiChart);
    this.parentElement.insertBefore(multiChart, this);
  }
  disconnectedCallback() {}

  appendDataSet(multiChart) {
    const dataSets = this.querySelectorAll("data-set");
    if (dataSets.length == 0) {
      this.createDataSet();
      multiChart.appendChild(this.dataSet);
    } else if (dataSets.length == 1) {
      this.dataSet = dataSets[0];
      multiChart.appendChild(this.dataSet);
    } else
      Array.from(this.children).forEach((child) =>
        multiChart.appendChild(child)
      );
  }
  createDataSet() {
    this.dataSet = document.createElement("data-set");
    Array.from(this.children).forEach((child) =>
      this.dataSet.appendChild(child)
    );
  }
  set axes(axes) {
    this.dataSet.axes = axes;
  }
  set ondraw(ondraw) {
    this.dataSet.ondraw = ondraw;
  }
  set data(data) {
    this.dataSet.data = data;
    this.parentElement.removeChild(this);
  }
}

customElements.get("multi-chart") ||
  customElements.define("multi-chart", MultiChart);
customElements.get("data-set") || customElements.define("data-set", DataSet);
customElements.get("chart-it") || customElements.define("chart-it", ChartIt);
customElements.get("candle-stick") ||
  customElements.define("candle-stick", CandleStick);
