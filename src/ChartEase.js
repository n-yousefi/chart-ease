import DataSet from "./main/DataSet";
import CandleStick from "./main/CandleStick";
import { HEIGHT, MARGIN, WIDTH } from "./main/defaults";
import createSVG from "./main/draw/createSVG";
import drawAxes from "./main/draw/drawAxes";
import drawTicks from "./main/draw/drawTicks";
import drawGridLines from "./main/draw/drawGridLines";
import drawLabels from "./main/draw/drawLabels";
import { getAxisTicks } from "./main/draw/getAxisTicks";

export default class ChartEase extends HTMLElement {
  constructor() {
    super();
    this.setStyles();
    this.init();
  }

  connectedCallback() {
    this.axesInit();
    this.svg = createSVG(this.width, this.height);
    this.appendChild(this.svg);
    drawAxes(this.svg, this.axes);
    drawTicks(this.svg, this.axes);
    drawLabels(this.svg, this.axes);
    drawGridLines(this.svg, this.axes);
  }
  disconnectedCallback() {}

  set ondraw(ondraw) {
    this.querySelector("data-set").ondraw = ondraw;
  }
  set data(data) {
    this.querySelector("data-set").data = data;
  }

  init() {
    this.height = parseFloat(this.getAttribute("height") ?? HEIGHT);
    this.width = parseFloat(this.getAttribute("width") ?? WIDTH);
    this.margin = {
      top: parseFloat(this.getAttribute("margin-top") ?? this.getAttribute("margin") ?? MARGIN),
      bottom: parseFloat(this.getAttribute("margin-bottom") ?? this.getAttribute("margin") ?? MARGIN),
      left: parseFloat(this.getAttribute("margin-left") ?? this.getAttribute("margin") ?? MARGIN),
      right: parseFloat(this.getAttribute("margin-right") ?? this.getAttribute("margin") ?? MARGIN),
    };
    this.querySelectorAll("data-set").forEach((ds) => {});
  }

  axesInit() {
    const getIntAttr = (elem, attr) => parseInt(elem.getAttribute(attr) ?? 0);
    const vAxis = this.querySelector(`g[is="v-axis"]`);
    const hAxis = this.querySelector(`g[is="h-axis"]`);

    const vStart = this.margin.bottom;
    const vStop = this.height - this.margin.top;
    const hStart = this.margin.left;
    const hStop = this.width - this.margin.right;

    this.axes = {};
    if (vAxis) {
      const position = vAxis.getAttribute("position");
      const min = getIntAttr(vAxis, "min");
      const max = getIntAttr(vAxis, "max");
      this.axes.v = {
        x: position == "right" ? hStop : hStart,
        y1: vStart,
        y2: vStop,
        min,
        max,
        position,
        type: vAxis.querySelector("line"),
        label: vAxis.querySelector("text"),
        grid: vAxis.querySelector(`line[is="grid"]`),
        ticks: getAxisTicks(min, max, getIntAttr(vAxis, "ticks"), vStart, vStop),
      };
    }
    if (hAxis) {
      const position = hAxis.getAttribute("position");
      const min = getIntAttr(hAxis, "min");
      const max = getIntAttr(hAxis, "max");
      this.axes.h = {
        y: position == "top" ? vStop : vStart,
        x1: hStart,
        x2: hStop,
        min,
        max,
        position,
        type: hAxis.querySelector("line"),
        label: hAxis.querySelector("text"),
        grid: vAxis.querySelector(`line[is="grid"]`),
        ticks: getAxisTicks(min, max, getIntAttr(hAxis, "ticks"), hStart, hStop),
      };
    }
  }

  setStyles() {
    this.style.lineHeight = 0;
  }
}

customElements.get("data-set") ?? customElements.define("data-set", DataSet);
customElements.get("chart-ease") ?? customElements.define("chart-ease", ChartEase);
customElements.get("candle-stick") ?? customElements.define("candle-stick", CandleStick);
