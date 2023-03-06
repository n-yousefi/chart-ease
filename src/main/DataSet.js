import normalize from "./normalize";
import drawPoints from "./draw/drawPoints";
import drawPath from "./draw/drawPath";
import { HEIGHT, WIDTH, MARGIN, PADING } from "./defaults";
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
    drawAxes(svg, this.axesTypes, this.axes);
  }

  set data(originalData) {
    this.axesInit();
    const data = normalize(originalData, this.axes);
    this.draw(data, originalData);
    this.parentElement.removeChild(this);
  }

  axesInit() {
    let axesArr = this["axes"] ? this["axes"] : [];
    const hAxis = this["hAxis"] ? this["hAxis"] : null;
    const vAxis = this["vAxis"] ? this["vAxis"] : null;
    if (hAxis) axesArr.push(hAxis);
    if (vAxis) {
      vAxis.flip = true;
      axesArr.push(vAxis);
    }
    this.axes =
      axesArr.length > 0
        ? axesArr.map((axis) => {
            const margin = axis.margin || MARGIN;
            const padding = axis.padding || PADING;
            const marginStart = axis.marginStart || margin;
            const marginEnd = axis.marginEnd || margin;
            const paddingStart = axis.paddingStart || padding;
            const paddingEnd = axis.paddingEnd || padding;
            return {
              cols: axis.cols,
              lowerBound: marginStart + paddingStart,
              upperBound: axis.length - marginEnd - paddingEnd,
              lowerAxis: marginStart,
              upperAxis: axis.length - marginEnd,
              flip: axis.flip,
              length: axis.length,
            };
          })
        : this.getDefaultAxesObj();
  }

  getDefaultAxesObj() {
    const width = Number(this.parentElement.getAttribute("width") || WIDTH);
    const height = Number(this.parentElement.getAttribute("height") || HEIGHT);
    const margin = Number(this.parentElement.getAttribute("margin") || MARGIN);
    const padding = Number(
      this.parentElement.getAttribute("padding") || PADING
    );
    return [
      {
        cols: ["x"],
        lowerBound: margin + padding,
        upperBound: width - margin - padding,
        lowerAxis: margin,
        upperAxis: width - margin,
        length: width,
      },
      {
        cols: ["y"],
        lowerBound: margin + padding,
        upperBound: height - margin - padding,
        lowerAxis: margin,
        upperAxis: height - margin,
        length: height,
        flip: true,
      },
    ];
  }

  get pathType() {
    return this.querySelector(`path[is="path-type"]`);
  }

  get pointTypes() {
    return Array.from(this.children).filter((item) => !item.getAttribute("is"));
  }

  get axesTypes() {
    return {
      left: Array.from(this.children).find(
        (item) => item.getAttribute("is") == "left-axis"
      ),
      right: Array.from(this.children).find(
        (item) => item.getAttribute("is") == "right-axis"
      ),
      top: Array.from(this.children).find(
        (item) => item.getAttribute("is") == "top-axis"
      ),
      bottom: Array.from(this.children).find(
        (item) => item.getAttribute("is") == "bottom-axis"
      ),
    };
  }
}

export default DataSet;
