import drawAxisLine from "../draw/drawAxisLine";
import drawTicks from "../draw/drawTicks";
import drawGridLines from "../draw/drawGridLines";
import drawLabels from "../draw/drawLabels";
import { HEIGHT, MARGIN, WIDTH } from "../defaults";

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
    this.setTickPositions();
    drawAxisLine(this);
    if (this.ticks.length > 0) {
      drawTicks(this);
      drawLabels(this);
      drawGridLines(this);
    }
  }

  get margin() {
    const pE = this.parentElement;
    return {
      top: parseFloat(pE.getAttribute("margin-top") ?? pE.getAttribute("margin") ?? MARGIN),
      bottom: parseFloat(pE.getAttribute("margin-bottom") ?? pE.getAttribute("margin") ?? MARGIN),
      left: parseFloat(pE.getAttribute("margin-left") ?? pE.getAttribute("margin") ?? MARGIN),
      right: parseFloat(pE.getAttribute("margin-right") ?? pE.getAttribute("margin") ?? MARGIN),
    };
  }

  get height() {
    return parseFloat(this.parentElement.getAttribute("height") ?? HEIGHT);
  }

  get width() {
    return parseFloat(this.parentElement.getAttribute("width") ?? WIDTH);
  }

  get min() {
    return parseInt(this.getAttribute("min") ?? 0);
  }

  get max() {
    return parseInt(this.getAttribute("max") ?? 0);
  }

  get type() {
    return this.querySelector("line[axis-line]");
  }

  get label() {
    return this.querySelector("text");
  }

  get grid() {
    return this.querySelector(`line[grid-line]`);
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
      if (position > this.stop) break;
      this.ticks.push({ value, position });
      value += tickSize;
    }
  }
}

export default ChartAxis;
