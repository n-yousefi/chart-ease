export default class Element {
  constructor(chartIt) {
    this.chartIt = chartIt;
    this.defaultWidth = 200;
    this.defaultHeight = 200;
    this.defaultMargin = 10;
  }

  get axes() {
    const axesArr = this.chartIt["axes"] ? this.chartIt["axes"] : [];
    if (axesArr.length > 0) {
      return axesArr.map((axis) => {
        const margin = axis.margin || this.defaultMargin;
        return {
          cols: axis.cols,
          lowerBound: axis.marginStart || margin,
          upperBound: axis.length - (axis.marginEnd || margin),
          flip: axis.flip,
          length: axis.length,
        };
      });
    }
    return [
      {
        cols: ["x"],
        lowerBound: this.defaultMargin,
        upperBound: this.defaultWidth - this.defaultMargin,
        length: this.defaultWidth,
      },
      {
        cols: ["y"],
        lowerBound: this.defaultMargin,
        upperBound: this.defaultHeight - this.defaultMargin,
        length: this.defaultHeight,
        flip: true,
      },
    ];
  }

  get width() {
    return this.axes[1].length || this.defaultWidth;
  }

  get height() {
    return this.axes[0].length || this.defaultHeight;
  }

  get id() {
    return this.chartIt.getAttribute("id");
  }

  get class() {
    return this.chartIt.getAttribute("class");
  }

  get pathType() {
    return this.chartIt.querySelector(`path[is="path-type"]`);
  }

  get pointTypes() {
    return this.chartIt.querySelectorAll(`:not(path[is="path-type"])`);
  }
}
