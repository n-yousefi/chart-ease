import { createSvgTag } from "./svg";

class CandleStick extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {}
  disconnectedCallback() {}

  draw() {
    const chart = document.createElement("chart-it");
    chart.appendChild(createSvgTag("line"));
    chart.appendChild(createSvgTag("rect"));
    this.parentElement.insertBefore(chart, this);
    this.parentElement.removeChild(this);
  }
  adjust(chart) {
    chart.ondraw = ({ shape, row }) => {
      switch (shape.tagName) {
        case "line":
          shape.setAttribute("x1", row.x + 5);
          shape.setAttribute("x2", row.x + 5);
          shape.setAttribute("y1", row.low);
          shape.setAttribute("y2", row.high);
          shape.setAttribute(
            "stroke",
            row.open > row.close ? "#28A69A" : "#EE5355"
          );
          break;
        case "rect":
          shape.setAttribute("width", 10);
          shape.setAttribute("height", Math.abs(row.open - row.close));
          shape.setAttribute("x", row.x);
          shape.setAttribute("y", row.open);
          shape.setAttribute(
            "fill",
            row.open > row.close ? "#28A69A" : "#EE5355"
          );
          break;
      }
    };
    chart.axes = [
      { cols: ["x"], length: 200, margin: 10 },
      {
        cols: ["low", "open", "close", "high"],
        length: 200,
        margin: 10,
        flip: true,
      },
    ];
    chart.data = [
      { x: 1, low: 2, open: 5, close: 3, high: 5 },
      { x: 2, low: 5, open: 6, close: 7, high: 16 },
      { x: 3, low: 9, open: 9, close: 10, high: 10 },
      { x: 4, low: 15, open: 15, close: 5, high: 5 },
      { x: 5, low: 9, open: 10, close: 12, high: 20 },
      { x: 6, low: 9, open: 11, close: 13, high: 25 },
      { x: 7, low: 9, open: 12, close: 14, high: 15 },
      { x: 8, low: 1, open: 13, close: 10, high: 15 },
    ];
  }
}

customElements.get("candle-stick") ||
  customElements.define("candle-stick", CandleStick);
