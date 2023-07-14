import ChartAxis from "./ChartAxis";

class BottomAxis extends ChartAxis {
  constructor() {
    super();
  }

  get start() {
    return this.margin.left;
  }

  get stop() {
    return this.width - this.margin.right;
  }

  get position() {
    return this.margin.bottom;
  }

  get gridStart() {
    return this.margin.bottom;
  }

  get gridStop() {
    return this.height - this.margin.top;
  }

  get isVertical() {
    return false;
  }

  get direction() {
    return "bottom";
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default BottomAxis;
