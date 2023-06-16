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
    this.height = parseFloat(this.getAttribute("height") ?? HEIGHT);
    this.width = parseFloat(this.getAttribute("width") ?? WIDTH);
    this.margin = {
      top: parseFloat(this.getAttribute("margin-top") ?? this.getAttribute("margin") ?? MARGIN),
      bottom: parseFloat(this.getAttribute("margin-bottom") ?? this.getAttribute("margin") ?? MARGIN),
      left: parseFloat(this.getAttribute("margin-left") ?? this.getAttribute("margin") ?? MARGIN),
      right: parseFloat(this.getAttribute("margin-right") ?? this.getAttribute("margin") ?? MARGIN),
    };
    this.svg = createSVG(this.width, this.height);
    this.appendChild(this.svg);
    this.dispatchEvent(new Event("created"));
  }

  //get height() {
  //  return parseFloat(this.getAttribute("height") ?? HEIGHT);
  //}
  //
  //get width() {
  //  return parseFloat(this.getAttribute("width") ?? WIDTH);
  //}
  //
  //get margin() {
  //  return {
  //    top: parseFloat(this.getAttribute("margin-top") ?? this.getAttribute("margin") ?? MARGIN),
  //    bottom: parseFloat(this.getAttribute("margin-bottom") ?? this.getAttribute("margin") ?? MARGIN),
  //    left: parseFloat(this.getAttribute("margin-left") ?? this.getAttribute("margin") ?? MARGIN),
  //    right: parseFloat(this.getAttribute("margin-right") ?? this.getAttribute("margin") ?? MARGIN),
  //  };
  //}

  //connectedCallback() {
  //  this.svg = createSVG(this.width, this.height);
  //  this.appendChild(this.svg);
  //}
  disconnectedCallback() {}

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
