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

  draw(data, originalData, axesLines, ticks) {
    const svg = this.parentElement.querySelector("svg");
    drawPath(svg, this.pathType, data);
    drawPoints(svg, this.pointTypes, data, originalData, this["ondraw"]);
    drawAxes(svg, this.axes, axesLines);
    drawTicks(svg, this.axes, axesLines, ticks);
    drawGridLines(svg, this.axes, this.parentElement.gridLines, ticks);
    drawLabels(svg, this.axes, axesLines, ticks, this.parentElement.axesLabels);
  }

  set data(originalData) {
    const axesLines = this.parentElement.axesLines;
    this.axesInit(axesLines);
    const { data, ticks } = normalize(originalData, this.axes);
    this.draw(data, originalData, axesLines, ticks);
    this.parentElement.removeChild(this);
  }

  axesInit(axesLines) {
    this.axes = [
      {
        cols: this.getAttribute("hAxis") ? this.getAttribute("hAxis").split(",") : ["x"],
        length: this.parentElement.width,
        ticks: parseInt(axesLines.left?.getAttribute("ticks") ?? 0),
      },
      {
        cols: this.getAttribute("vAxis") ? this.getAttribute("vAxis").split(",") : ["y"],
        length: this.parentElement.height,
        ticks: parseInt(axesLines.bottom?.getAttribute("ticks") ?? 0),
      },
    ];
    let axesArr = this["axes"] ? this["axes"] : [];
    const margin = this.parentElement.margin;
    const padding = this.parentElement.padding;
    // X axis bounds
    this.axes[0].plotStart = margin.left + padding.left;
    this.axes[0].plotStop = this.parentElement.width - margin.right - padding.right;
    this.axes[0].axis = {
      start: margin.left,
      stop: this.parentElement.width - margin.right,
    };
    // Y axis bounds
    this.axes[1].plotStart = margin.bottom + padding.bottom;
    this.axes[1].plotStop = this.parentElement.height - margin.top - padding.top;
    this.axes[1].axis = {
      start: margin.bottom,
      stop: this.parentElement.height - margin.top,
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
