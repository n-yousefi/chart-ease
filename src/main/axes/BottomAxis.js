import ChartAxis from "./ChartAxis";

class BottomAxis extends ChartAxis {
  constructor() {
    super();
    this.start = this.margin.left;
    this.stop = this.width - this.margin.right;
    this.position = this.margin.bottom;
    this.isVertical = false;
    this.direction = "bottom";
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default BottomAxis;
