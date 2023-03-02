import DataSet from "./DataSet";
import createSVGElements from "./draw/createSVGElements";

class CandleStick extends DataSet {
  constructor() {
    super();
    this.adjust();
  }

  connectedCallback() {}
  disconnectedCallback() {}

  adjust() {
    this.appendChild(createSVGElements("line"));
    this.appendChild(createSVGElements("rect"));
    this.ondraw = ({ shape, row }) => {
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
    this.axes = [
      { cols: ["x"], length: 200, margin: 10 },
      {
        cols: ["low", "open", "close", "high"],
        length: 200,
        margin: 10,
      },
    ];
  }
}
export default CandleStick;
