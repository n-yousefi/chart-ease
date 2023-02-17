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
    drawPath(this.parentElement, this.pathType, data);
    drawPoints(
      this.parentElement,
      this.pointTypes,
      data,
      originalData,
      this["ondraw"]
    );
    this.parentElement.removeChild(this);
  }

  set data(originalData) {
    const axesArr = this["axes"] ? this["axes"] : [];
    let axes =
      axesArr.length > 0
        ? axesArr.map(this.getAxesObj)
        : this.getDefaultAxesObj();
    const data = normalize(originalData, axes);
    this.draw(data, originalData);
  }

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
    return [
      {
        cols: ["x"],
        lowerBound: Margin,
        upperBound: Width - Margin,
        length: Width,
      },
      {
        cols: ["y"],
        lowerBound: Margin,
        upperBound: Height - Margin,
        length: Height,
        flip: true,
      },
    ];
  }

  get pathType() {
    return this.querySelector(`path[is="path-type"]`);
  }

  get pointTypes() {
    return this.querySelectorAll(`:not(path[is="path-type"])`);
  }
}

export default DataSet;
