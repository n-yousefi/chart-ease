import ChartAxis from "./ChartAxis";

class LeftAxis extends ChartAxis {
  constructor() {
    super();
    this.start = this.margin.bottom;
    this.stop = this.height - this.margin.top;
    this.position = this.margin.left;
    this.isVertical = true;
    this.direction = "left";
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default LeftAxis;
