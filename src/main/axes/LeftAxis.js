import ChartAxis from "./ChartAxis";

class LeftAxis extends ChartAxis {
  constructor() {
    super();
  }

  get start() {
    return this.margin.bottom;
  }

  get stop() {
    return this.height - this.margin.top;
  }

  get position() {
    return this.margin.left;
  }

  get gridStart() {
    return this.margin.left;
  }

  get gridStop() {
    return this.width - this.margin.right;
  }

  get isVertical() {
    return true;
  }

  get direction() {
    return "left";
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default LeftAxis;
