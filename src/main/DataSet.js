import normalize from "./calcs/normalize";
import drawPoints from "./draw/drawPoints";
import drawPath from "./draw/drawPath";
import setGroupsMinMax from "./calcs/setGroupsMinMax";

class DataSet extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {}
  disconnectedCallback() {}

  set data(originalData) {
    const normalizeGroups = this.getNormalizeGroups();
    setGroupsMinMax(originalData, normalizeGroups);
    if (this["ondataSet"]) this["ondataSet"]();
    const data = normalize(originalData, normalizeGroups);
    const svg = this.parentElement.querySelector("svg");
    drawPath(svg, this.pathType, data);
    drawPoints(svg, this.pointTypes, data, originalData, this["ondraw"]);
    this.parentElement.removeChild(this);
  }

  getNormalizeGroups() {
    const margin = this.parentElement.margin;
    let h = {
      cols: this.getAttribute("hAxis") ? this.getAttribute("hAxis").split(",") : ["x"],
      start: margin.left,
      stop: this.parentElement.width - margin.right,
    };
    let hAxis = this.parentElement.querySelector("bottom-axis") ?? this.parentElement.querySelector("top-axis");
    if (hAxis) {
      h = {
        ...h,
        min: hAxis.min,
        max: hAxis.max,
      };
    }
    let v = {
      cols: this.getAttribute("vAxis") ? this.getAttribute("vAxis").split(",") : ["y"],
      start: margin.bottom,
      stop: this.parentElement.height - margin.top,
    };
    let vAxis = this.parentElement.querySelector("left-axis") ?? this.parentElement.querySelector("right-axis");
    if (vAxis) {
      v = {
        ...v,
        min: vAxis.min,
        max: vAxis.max,
      };
    }
    return [h, v];
  }

  get pathType() {
    return this.querySelector(`path[is="path-type"]`);
  }

  get pointTypes() {
    return Array.from(this.children).filter((item) => !item.getAttribute("is"));
  }
}

export default DataSet;
