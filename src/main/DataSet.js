import normalize from "./normalize";
import drawPoints from "./draw/drawPoints";
import drawPath from "./draw/drawPath";
import { Height, Width, Margin } from "./defaults";

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
  }

  set data(originalData) {
    let axesArr = this["axes"] ? this["axes"] : [];
    const hAxis = this.getHAxis();
    const vAxis = this.getVAxis();
    if (hAxis) axesArr.push(hAxis);
    if (vAxis) axesArr.push(vAxis);
    let axes =
      axesArr.length > 0
        ? axesArr.map(this.getAxesObj)
        : this.getDefaultAxesObj();
    const data = normalize(originalData, axes);
    this.draw(data, originalData);
    this.parentElement.removeChild(this);
  }

  getHAxis = () => (this["hAxis"] ? this["hAxis"] : null);
  getVAxis = () => (this["vAxis"] ? this["vAxis"] : null);

  getAxesObj(axis) {
    const margin = axis.margin || Margin;
    return {
      cols: axis.cols,
      lowerBound: axis.marginStart || margin,
      upperBound: axis.length - (axis.marginEnd || margin),
      flip: axis.flip,
      length: axis.length,
    };
  }
  getDefaultAxesObj() {
    const width = Number(this.parentElement.getAttribute("width") || Width);
    const height = Number(this.parentElement.getAttribute("height") || Height);
    const margin = Number(this.parentElement.getAttribute("margin") || Margin);
    return [
      {
        cols: ["x"],
        lowerBound: margin,
        upperBound: width - margin,
        length: width,
      },
      {
        cols: ["y"],
        lowerBound: margin,
        upperBound: height - margin,
        length: height,
        flip: true,
      },
    ];
  }

  get pathType() {
    return this.querySelector(`path[is="path-type"]`);
  }

  get pointTypes() {
    return Array.from(this.children).filter(
      (item) => item.getAttribute("is") != "path-type"
    );
  }
}

export default DataSet;
