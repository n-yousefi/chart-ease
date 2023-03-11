import normalize from "./normalize";
import drawPoints from "./draw/drawPoints";
import drawPath from "./draw/drawPath";
import drawAxes from "./draw/drawAxes";

class DataSet extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {}
  disconnectedCallback() {}

  draw(data, originalData) {
    const svg = this.parentElement.querySelector("svg");
    drawPath(svg, this.pathType, data);
    drawPoints(svg, this.pointTypes, data, originalData, this["ondraw"]);
    drawAxes(svg, this.parentElement.axesLines);
  }

  set data(originalData) {
    this.axesInit();
    const data = normalize(originalData, this.axes);
    this.draw(data, originalData);
    this.parentElement.removeChild(this);
  }

  axesInit() {
    this.axes = [
      {
        cols: this.getAttribute("hAxis") ? this.getAttribute("hAxis").split(",") : ["x"],
        length: this.parentElement.width,
      },
      {
        cols: this.getAttribute("vAxis") ? this.getAttribute("vAxis").split(",") : ["y"],
        length: this.parentElement.height,
      },
    ];
    let axesArr = this["axes"] ? this["axes"] : [];
    const margin = this.parentElement.margin;
    const padding = this.parentElement.padding;
    // X axis
    this.axes[0].lowerBound = margin.left + padding.left;
    this.axes[0].upperBound = this.parentElement.width - margin.right - padding.right;
    // Y axis
    this.axes[1].lowerBound = margin.bottom + padding.bottom;
    this.axes[1].upperBound = this.parentElement.height - margin.top - padding.top;
  }

  get pathType() {
    return this.querySelector(`path[is="path-type"]`);
  }

  get pointTypes() {
    return Array.from(this.children).filter((item) => !item.getAttribute("is"));
  }
}

export default DataSet;
