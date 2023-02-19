import { Height, Width } from "./defaults";
import createSVG from "./draw/createSVG";

export default class MultiChart extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.dataSet = this.querySelector("data-set");
    this.svg = createSVG(this.width, this.height);

    Array.from(this.children).forEach((child) => this.svg.appendChild(child));
    this.parentElement.insertBefore(this.svg, this);
  }
  disconnectedCallback() {}

  set axes(axes) {
    this.dataSet.axes = axes;
  }
  set ondraw(ondraw) {
    this.dataSet.ondraw = ondraw;
  }
  set data(data) {
    this.dataSet.data = data;
    this.finalize();
  }

  finalize() {
    if (this.id) this.svg.setAttribute("id", this.id);
    if (this.className) this.svg.setAttribute("class", this.className);
    this.parentElement.removeChild(this);
  }

  get id() {
    return this.getAttribute("id");
  }
  get className() {
    return this.getAttribute("class");
  }
  get width() {
    return this.getAttribute("width") || Width;
  }
  get height() {
    return this.getAttribute("height") || Height;
  }
}
