import { Height, Width } from "./defaults";
import createSVG from "./draw/createSVG";

export default class MultiChart extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const svg = createSVG(null, null, this.width, this.height);
    if (this.id) this.querySelector("data-set").setAttribute("id", this.id);
    if (this.className)
      this.querySelector("data-set").setAttribute("class", this.className);
    Array.from(this.children).forEach((child) => svg.appendChild(child));
    this.parentElement.insertBefore(svg, this);
    this.parentElement.removeChild(this);
  }
  disconnectedCallback() {}

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
