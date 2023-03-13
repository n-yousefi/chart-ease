import normalize from "./normalize";
import drawPoints from "./draw/drawPoints";
import drawPath from "./draw/drawPath";
import drawAxes from "./draw/drawAxes";
import drawTicks from "./draw/drawTicks";
import drawGridLines from "./draw/drawGridLines";
import drawLabels from "./draw/drawLabels";

class DataSet extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {}
  disconnectedCallback() {}

  draw(data, originalData, ticks) {
    const svg = this.parentElement.querySelector("svg");
    drawPath(svg, this.pathType, data);
    drawPoints(svg, this.pointTypes, data, originalData, this["ondraw"]);
    const axesLinePositions = this.getAxesLinePositions();
    drawAxes(svg, axesLinePositions, this.parentElement.axesLines);
    drawTicks(svg, axesLinePositions, this.parentElement.axesLines, ticks);
    drawGridLines(svg, axesLinePositions, this.parentElement.gridLines, ticks);
    drawLabels(svg, axesLinePositions, this.parentElement.axesLines, ticks, this.parentElement.axesLabels);
  }

  set data(originalData) {
    this.axesInit();
    const { data, ticks } = normalize(originalData, this.axes);
    this.draw(data, originalData, ticks);
    this.parentElement.removeChild(this);
  }

  axesInit() {
    this.axes = [
      {
        cols: this.getAttribute("hAxis") ? this.getAttribute("hAxis").split(",") : ["x"],
        length: this.parentElement.width,
        ticks: parseInt(this.parentElement.axesLines.left?.getAttribute("ticks") ?? 0),
      },
      {
        cols: this.getAttribute("vAxis") ? this.getAttribute("vAxis").split(",") : ["y"],
        length: this.parentElement.height,
        ticks: parseInt(this.parentElement.axesLines.bottom?.getAttribute("ticks") ?? 0),
      },
    ];
    let axesArr = this["axes"] ? this["axes"] : [];
    const margin = this.parentElement.margin;
    const padding = this.parentElement.padding;
    // X axis bounds
    this.axes[0].lowerBound = margin.left + padding.left;
    this.axes[0].upperBound = this.parentElement.width - margin.right - padding.right;
    // Y axis bounds
    this.axes[1].lowerBound = margin.bottom + padding.bottom;
    this.axes[1].upperBound = this.parentElement.height - margin.top - padding.top;
  }

  getAxesLinePositions() {
    return {
      left: this.parentElement.margin.left,
      right: this.parentElement.width - this.parentElement.margin.right,
      bottom: this.parentElement.margin.bottom,
      top: this.parentElement.height - this.parentElement.margin.top,
    };
  }

  get pathType() {
    return this.querySelector(`path[is="path-type"]`);
  }

  get pointTypes() {
    return Array.from(this.children).filter((item) => !item.getAttribute("is"));
  }
}

export default DataSet;
