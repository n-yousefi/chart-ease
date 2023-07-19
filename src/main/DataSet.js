import normalize from "./calcs/normalize";
import drawDataSet from "./draw/drawDataSet";
import setGroupsMinMax from "./calcs/setGroupsMinMax";
import createSVGElements from "./draw/createSVGElements";

class DataSet extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {}
  disconnectedCallback() {}

  set data(originalData) {
    this.originalData = originalData;
    const h = this.getDirection("h");
    const v = this.getDirection("v");
    const directionGroups = [h, v];
    setGroupsMinMax(originalData, directionGroups);
    this.normalizedData = normalize(originalData, directionGroups);
    this.render();
  }

  render() {
    this.init();
    this.g.innerHTML = "";
    drawDataSet(this);
  }

  init() {
    const dataSet = this.parentElement.querySelector('g[name="dataset"]');
    if (!this.g) {
      this.g = createSVGElements("g");
      dataSet.append(this.g);
    }
  }

  getDirection(dir) {
    let group = {
      cols: this.getCols(dir),
      start: this.getStart(dir),
      stop: this.getStop(dir),
    };
    let axis = this.getAxis(dir);
    if (axis) {
      group = {
        ...group,
        min: axis.min,
        max: axis.max,
      };
    }
    return group;
  }

  getAxis(dir) {
    if (dir === "h")
      return this.parentElement.querySelector("bottom-axis") ?? this.parentElement.querySelector("top-axis");
    return this.parentElement.querySelector("left-axis") ?? this.parentElement.querySelector("right-axis");
  }
  getStart(dir) {
    if (dir === "h") return this.parentElement.margin.left;
    return this.parentElement.margin.bottom;
  }
  getStop(dir) {
    if (dir === "h") return this.parentElement.width - this.parentElement.margin.right;
    return this.parentElement.height - this.parentElement.margin.top;
  }
  getCols(dir) {
    if (dir === "h") return this.getAttribute("hAxis") ? this.getAttribute("hAxis").split(",") : ["x"];
    return this.getAttribute("vAxis") ? this.getAttribute("vAxis").split(",") : ["y"];
  }
}

export default DataSet;
