export default class Element {
  constructor(chartIt) {
    this.chartIt = chartIt;
  }

  get pathType() {
    return this.chartIt.querySelector(`path[is="path-type"]`);
  }

  get pointTypes() {
    return this.chartIt.querySelectorAll(`:not(path[is="path-type"])`);
  }

  get axes() {
    return [
      {
        cols: this.hAxis,
        lowerBound: this.margins.left,
        upperBound: this.width - this.margins.right,
      },
      {
        cols: this.vAxis,
        lowerBound: this.margins.top,
        upperBound: this.height - this.margins.bottom,
      },
    ];
  }

  get height() {
    return Number(this.chartIt.getAttribute("height") || 200);
  }

  get width() {
    return Number(this.chartIt.getAttribute("width") || 200);
  }

  get hAxis() {
    const axis = this.chartIt.getAttribute("horizontalAxis") || "x";
    return axis.split(",").filter((q) => q);
  }

  get vAxis() {
    const axis = this.chartIt.getAttribute("verticalAxis") || "y";
    return axis.split(",").filter((q) => q);
  }

  get margins() {
    const margin = Number(this.chartIt.getAttribute("margin") || 10);
    const marginLeft = Number(
      this.chartIt.getAttribute("marginLeft") || margin
    );
    const marginRight = Number(
      this.chartIt.getAttribute("marginRight") || margin
    );
    const marginTop = Number(this.chartIt.getAttribute("marginTop") || margin);
    const marginBottom = Number(
      this.chartIt.getAttribute("marginBottom") || margin
    );
    return {
      left: marginLeft,
      right: marginRight,
      top: marginTop,
      bottom: marginBottom,
    };
  }

  get id() {
    return this.chartIt.getAttribute("id");
  }

  get class() {
    return this.chartIt.getAttribute("clas");
  }

  createSVG() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    if (this.id) svg.setAttribute("id", this.id);
    if (this.class) svg.setAttribute("class", this.class);
    svg.setAttribute("width", this.width);
    svg.setAttribute("height", this.height);
    return svg;
  }
}
