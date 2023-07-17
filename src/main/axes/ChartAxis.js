import drawAxisLine from "../draw/drawAxisLine";
import drawTicks from "../draw/drawTicks";
import drawGridLines from "../draw/drawGridLines";
import drawLabels from "../draw/drawLabels";

class ChartAxis extends HTMLElement {
  constructor() {
    super();
    this.parentElement.addEventListener("created", (e) => {
      this.render();
    });
  }

  connectedCallback() {}
  disconnectedCallback() {}

  render() {
    const group = this.parentElement.querySelector('g[name="axes"]');
    const grid = this.parentElement.querySelector('g[name="grid"]');
    this.setTickPositions();
    drawAxisLine(this, group);
    if (this.ticks.length > 0) {
      drawTicks(this, group);
      drawLabels(this, group);
      drawGridLines(this, grid);
    }
  }

  setTickPositions() {
    this.ticks = [];
    const ticks = parseInt(this.getAttribute("ticks") ?? 0);
    if (ticks <= 0) return;
    const tickSize = Math.round((this.max - this.min) / (ticks - 1));
    let value = this.min;
    let position = this.start;
    while (true) {
      position = ((value - this.min) / (this.max - this.min)) * (this.stop - this.start) + this.start;
      if (position > this.stop || isNaN(position)) break;
      this.ticks.push({ value, position });
      value += tickSize;
    }
  }

  get min() {
    return parseInt(this.getAttribute("min") ?? 0);
  }
  get max() {
    return parseInt(this.getAttribute("max") ?? 0);
  }
  get label() {
    return this.querySelector("text");
  }
  get grid() {
    return this.querySelector(`line[grid-line]`);
  }
  get line() {
    return this.querySelector("line[axis-line]");
  }
  get tick() {
    return this.querySelector("rect[axis-tick]");
  }
  get margin() {
    return this.parentElement.margin;
  }
  get height() {
    return this.parentElement.height;
  }
  get width() {
    return this.parentElement.width;
  }
}

export default ChartAxis;
