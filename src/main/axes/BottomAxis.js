import ChartAxis from "./ChartAxis";

class BottomAxis extends ChartAxis {
  constructor() {
    super();
    this.start = this.margin.left;
    this.stop = this.width - this.margin.right;
    this.position = this.margin.bottom;
    this.gridStart = this.margin.bottom;
    this.gridStop = this.height - this.margin.top;
    this.isVertical = false;
    this.direction = "bottom";
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default BottomAxis;
