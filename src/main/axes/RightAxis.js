import ChartAxis from "./ChartAxis";

class RightAxis extends ChartAxis {
  constructor() {
    super();
    this.start = this.margin.bottom;
    this.stop = this.height - this.margin.top;
    this.position = this.width - this.margin.right;
    this.isVertical = true;
    this.direction = "right";
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default RightAxis;
