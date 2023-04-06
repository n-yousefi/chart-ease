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
    const h = {
      cols: this.getAttribute("hAxis") ? this.getAttribute("hAxis").split(",") : ["x"],
    };
    if (this.parentElement.axes.h) {
      h.start = this.parentElement.axes.h.x1;
      h.stop = this.parentElement.axes.h.x2;
      h.min = this.parentElement.axes.h.min;
      h.max = this.parentElement.axes.h.max;
    }
    const v = {
      cols: this.getAttribute("vAxis") ? this.getAttribute("vAxis").split(",") : ["y"],
    };
    if (this.parentElement.axes.v) {
      v.start = this.parentElement.axes.v.y1;
      v.stop = this.parentElement.axes.v.y2;
      v.min = this.parentElement.axes.v.min;
      v.max = this.parentElement.axes.v.max;
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
