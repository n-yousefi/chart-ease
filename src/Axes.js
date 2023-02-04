export default class Axes {
  constructor(chartIt) {
    this.chartIt = chartIt;
  }
  get Axes() {
    return [
      {
        cols: this.chartIt.hAxis,
        lowerBound: this.chartIt.margins.left,
        upperBound: this.chartIt.width - this.chartIt.margins.right,
        length: this.chartIt.width,
      },
      {
        cols: this.chartIt.vAxis,
        lowerBound: this.chartIt.margins.top,
        upperBound: this.chartIt.height - this.chartIt.margins.bottom,
        length: this.chartIt.height,
      },
    ];
  }

  get height() {
    return this.chartIt.getAttribute("height") || 200;
  }

  get width() {
    return this.chartIt.getAttribute("width") || 200;
  }

  get hAxis() {
    return this.chartIt.getAttribute("horizontalAxis") || ["x"];
  }

  get vAxis() {
    return this.chartIt.getAttribute("verticalAxis") || ["y"];
  }

  get margins() {
    const margin = this.chartIt.getAttribute("margin") || 10;
    const marginLeft = this.chartIt.getAttribute("marginLeft") || margin;
    const marginRight = this.chartIt.getAttribute("marginRight") || margin;
    const marginTop = this.chartIt.getAttribute("marginTop") || margin;
    const marginBottom = this.chartIt.getAttribute("marginBottom") || margin;
    return {
      left: marginLeft,
      right: marginRight,
      top: marginTop,
      bottom: marginBottom,
    };
  }
}
