import drawAxisLine from "../draw/drawAxisLine";
import drawTicks from "../draw/drawTicks";
import drawGridLines from "../draw/drawGridLines";
import drawLabels from "../draw/drawLabels";
import { HEIGHT, MARGIN, WIDTH } from "../defaults";

class ChartAxis extends HTMLElement {
  constructor() {
    super();
    this.init();
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

  init() {
    const pE = this.parentElement;
    this.height = parseFloat(pE.getAttribute("height") ?? HEIGHT);
    this.width = parseFloat(pE.getAttribute("width") ?? WIDTH);
    this.margin = {
      top: parseFloat(pE.getAttribute("margin-top") ?? pE.getAttribute("margin") ?? MARGIN),
      bottom: parseFloat(pE.getAttribute("margin-bottom") ?? pE.getAttribute("margin") ?? MARGIN),
      left: parseFloat(pE.getAttribute("margin-left") ?? pE.getAttribute("margin") ?? MARGIN),
      right: parseFloat(pE.getAttribute("margin-right") ?? pE.getAttribute("margin") ?? MARGIN),
    };
    this.min = parseInt(this.getAttribute("min") ?? 0);
    this.max = parseInt(this.getAttribute("max") ?? 0);
    this.label = this.querySelector("text");
    this.grid = this.querySelector(`line[grid-line]`);
    this.line = this.querySelector("line[axis-line]");
    this.tick = this.querySelector("rect[axis-tick]");
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
