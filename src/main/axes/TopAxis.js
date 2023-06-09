import ChartAxis from "./ChartAxis";

class TopAxis extends ChartAxis {
  constructor() {
    super();
    this.start = this.margin.left;
    this.stop = this.width - this.margin.right;
    this.position = this.height - this.margin.top;
    this.isVertical = false;
    this.direction = "top";
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default TopAxis;
