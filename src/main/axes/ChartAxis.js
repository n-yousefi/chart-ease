import drawAxisLine from "../draw/drawAxisLine";
import drawTicks from "../draw/drawTicks";
import drawGridLines from "../draw/drawGridLines";
import drawLabels from "../draw/drawLabels";

class ChartAxis extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setTickPositions();
    drawAxisLine(this);
    if (this.ticks.length > 0) {
      drawTicks(this);
      drawLabels(this);
      drawGridLines(this);
    }
  }
  disconnectedCallback() {}

  get margin() {
    return this.parentElement.margin;
  }

  get height() {
    return this.parentElement.height;
  }

  get width() {
    return this.parentElement.width;
  }

  get min() {
    return parseInt(this.getAttribute("min") ?? 0);
  }

  get max() {
    return parseInt(this.getAttribute("max") ?? 0);
  }

  get type() {
    return this.querySelector("line");
  }

  get label() {
    return this.querySelector("text");
  }

  get grid() {
    return this.querySelector(`line[is="grid"]`);
  }

  get setTickPositions() {
    this.ticks = [];
    const ticks = parseInt(this.getAttribute("ticks") ?? 0);
    if (ticks <= 0) return;
    const tickSize = Math.round((this.max - this.min) / (ticks - 1));
    let value = this.min;
    let position = this.start;
    while (true) {
      position = ((value - this.min) / (this.max - this.min)) * (this.stop - this.start) + this.start;
      if (position > this.stop) break;
      this.ticks.push({ value, position });
      value += tickSize;
    }
  }
}

export default ChartAxis;
