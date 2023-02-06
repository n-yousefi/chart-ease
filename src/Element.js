export default class Element {
  constructor(chartIt) {
    this.chartIt = chartIt;
  }

  get axes() {
    if (this.chartIt["axes"]) {
      return this.chartIt["axes"].map((axis) => {
        const margin = axis.margin || 10;
        return {
          cols: axis.cols,
          lowerBound: axis.marginStart || margin,
          upperBound: axis.length - (axis.marginEnd || margin),
          flip: axis.flip,
        };
      });
    }
    return [
      {
        cols: ["x"],
        lowerBound: 10,
        upperBound: 190,
      },
      {
        cols: ["y"],
        lowerBound: 10,
        upperBound: 190,
        flip: true,
      },
    ];
  }

  get height() {
    return Number(this.chartIt.getAttribute("height") ?? 200);
  }

  get width() {
    return Number(this.chartIt.getAttribute("width") ?? 200);
  }

  get id() {
    return this.chartIt.getAttribute("id");
  }

  get class() {
    return this.chartIt.getAttribute("clas");
  }

  get pathType() {
    return this.chartIt.querySelector(`path[is="path-type"]`);
  }

  get pointTypes() {
    return this.chartIt.querySelectorAll(`:not(path[is="path-type"])`);
  }
}
