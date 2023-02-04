export default class Axes {
  constructor(chartIt) {
    this.chartIt = chartIt;
  }
  get Axes() {
    return [
      {
        cols: this.hAxis,
        lowerBound: this.margins.left,
        upperBound: this.width - this.margins.right,
        length: this.width,
      },
      {
        cols: this.vAxis,
        lowerBound: this.margins.top,
        upperBound: this.height - this.margins.bottom,
        length: this.height,
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
    return this.chartIt.getAttribute("horizontalAxis") || ["x"];
  }

  get vAxis() {
    return this.chartIt.getAttribute("verticalAxis") || ["y"];
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
}
