import ChartAxis from "./ChartAxis";

class RightAxis extends ChartAxis {
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
    return this.width - this.margin.right;
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
    return "right";
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default RightAxis;
