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
    this.multiChart = document.createElement("multi-chart");
    copyAttrs(this, this.multiChart);
    copyStyles(this, this.multiChart);
    this.appendDataSet(this.multiChart);
    this.parentElement.insertBefore(this.multiChart, this);
  }
  disconnectedCallback() {}

  appendDataSet(multiChart) {
    let dataSets = this.querySelectorAll("data-set");
    if (dataSets.length == 0) {
      const dataSet = document.createElement("data-set");
      Array.from(this.children).forEach((child) => dataSet.appendChild(child));
      multiChart.appendChild(dataSet);
    } else if (dataSets.length == 1) multiChart.appendChild(dataSets[0]);
    else {
      Array.from(this.children).forEach((child) =>
        multiChart.appendChild(child)
      );
    }
  }

  set axes(axes) {
    this.multiChart.axes = axes;
  }
  set ondraw(ondraw) {
    this.multiChart.ondraw = ondraw;
  }
  set data(data) {
    this.multiChart.data = data;
    this.finalize();
  }

  finalize() {
    this.parentElement.removeChild(this);
  }
}

customElements.get("multi-chart") ||
  customElements.define("multi-chart", MultiChart);
customElements.get("data-set") || customElements.define("data-set", DataSet);
customElements.get("chart-it") || customElements.define("chart-it", ChartIt);
customElements.get("candle-stick") ||
  customElements.define("candle-stick", CandleStick);
