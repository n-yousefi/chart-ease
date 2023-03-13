import DataSet from "./main/DataSet";
import CandleStick from "./main/CandleStick";
import { HEIGHT, MARGIN, PADDING, WIDTH } from "./main/defaults";
import createSVG from "./main/draw/createSVG";

export default class ChartEase extends HTMLElement {
  constructor() {
    super();
    this.setStyles();
  }

  connectedCallback() {
    this.svg = createSVG(this.width, this.height);
    this.appendChild(this.svg);
  }
  disconnectedCallback() {}

  set axes(axes) {
    this.firstElementChild.axes = axes;
  }
  set ondraw(ondraw) {
    this.firstElementChild.ondraw = ondraw;
  }
  set data(data) {
    this.firstElementChild.data = data;
  }

  get width() {
    return parseFloat(this.getAttribute("width") ?? WIDTH);
  }
  get height() {
    return parseFloat(this.getAttribute("height") ?? HEIGHT);
  }
  get margin() {
    return {
      top: parseFloat(this.getAttribute("margin-top") ?? this.getAttribute("margin") ?? MARGIN),
      bottom: parseFloat(this.getAttribute("margin-bottom") ?? this.getAttribute("margin") ?? MARGIN),
      left: parseFloat(this.getAttribute("margin-left") ?? this.getAttribute("margin") ?? MARGIN),
      right: parseFloat(this.getAttribute("margin-right") ?? this.getAttribute("margin") ?? MARGIN),
    };
  }

  get padding() {
    return {
      top: parseFloat(this.getAttribute("padding-top") ?? this.getAttribute("padding") ?? PADDING),
      bottom: parseFloat(this.getAttribute("padding-bottom") ?? this.getAttribute("padding") ?? PADDING),
      left: parseFloat(this.getAttribute("padding-left") ?? this.getAttribute("padding") ?? PADDING),
      right: parseFloat(this.getAttribute("padding-right") ?? this.getAttribute("padding") ?? PADDING),
    };
  }

  get axesLines() {
    return {
      left: Array.from(this.children).find((item) => item.getAttribute("is") == "left-axis"),
      right: Array.from(this.children).find((item) => item.getAttribute("is") == "right-axis"),
      top: Array.from(this.children).find((item) => item.getAttribute("is") == "top-axis"),
      bottom: Array.from(this.children).find((item) => item.getAttribute("is") == "bottom-axis"),
    };
  }

  get gridLines() {
    return {
      v: Array.from(this.children).find((item) => item.getAttribute("is") == "v-grid-lines"),
      h: Array.from(this.children).find((item) => item.getAttribute("is") == "h-grid-lines"),
    };
  }

  setStyles() {
    this.style.lineHeight = 0;
  }
}

customElements.get("data-set") ?? customElements.define("data-set", DataSet);
customElements.get("chart-ease") ?? customElements.define("chart-ease", ChartEase);
customElements.get("candle-stick") ?? customElements.define("candle-stick", CandleStick);
