import DataSet from "./main/DataSet";
import CandleStick from "./main/CandleStick";
import { HEIGHT, MARGIN, WIDTH } from "./main/defaults";
import createSVG from "./main/draw/createSVG";
import LeftAxis from "./main/axes/LeftAxis";
import RightAxis from "./main/axes/RightAxis";
import TopAxis from "./main/axes/TopAxis";
import BottomAxis from "./main/axes/BottomAxis";

export default class ChartEase extends HTMLElement {
  constructor() {
    super();
    this.setStyles();
    createSVG(this);
  }

  disconnectedCallback() {}

  get height() {
    return parseFloat(this.getAttribute("height") ?? HEIGHT);
  }
  get width() {
    return parseFloat(this.getAttribute("width") ?? WIDTH);
  }
  get margin() {
    const getAxisWidth = (name) => parseFloat(this.querySelector(name)?.getAttribute("width")) || 0;
    const getAxisHeight = (name) => parseFloat(this.querySelector(name)?.getAttribute("height")) || 0;
    const getMargin = (name) => parseFloat(this.getAttribute(name) ?? this.getAttribute("margin") ?? MARGIN);
    const margin = {
      top: getAxisHeight("top-axis") + getMargin("margin-top"),
      bottom: getAxisHeight("bottom-axis") + getMargin("margin-bottom"),
      left: getAxisWidth("left-axis") + getMargin("margin-left"),
      right: getAxisWidth("right-axis") + getMargin("margin-right"),
    };
    return margin;
  }

  set ondraw(ondraw) {
    this.querySelector("data-set").ondraw = ondraw;
  }
  set data(data) {
    this.querySelector("data-set").data = data;
  }

  setStyles() {
    this.style.lineHeight = 0;
  }
}

customElements.get("left-axis") ?? customElements.define("left-axis", LeftAxis);
customElements.get("right-axis") ?? customElements.define("right-axis", RightAxis);
customElements.get("top-axis") ?? customElements.define("top-axis", TopAxis);
customElements.get("bottom-axis") ?? customElements.define("bottom-axis", BottomAxis);

customElements.get("data-set") ?? customElements.define("data-set", DataSet);
customElements.get("chart-ease") ?? customElements.define("chart-ease", ChartEase);
customElements.get("candle-stick") ?? customElements.define("candle-stick", CandleStick);
