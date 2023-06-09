import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";
import { flip } from "./flip";

export default function drawLabels(axis) {
  const svg = axis.parentElement.svg;
  const g = createSVGElements("g");
  svg.appendChild(g);
  axis.ticks.forEach((tick) => {
    const text = cloneSVGElement(axis.label);
    text.innerHTML = tick.value;
    g.appendChild(text);
    const { width, height } = text.getBoundingClientRect();
    switch (axis.direction) {
      case "right":
        text.setAttribute("x", axis.position + 7);
        text.setAttribute("y", tick.position - height / 3);
        break;
      case "left":
        text.setAttribute("x", axis.position - width - 7);
        text.setAttribute("y", tick.position - height / 3);
        break;
      case "top":
        text.setAttribute("x", tick.position - width / 2);
        text.setAttribute("y", axis.position + 7);
        break;
      case "bottom":
        text.setAttribute("x", tick.position - width / 2);
        text.setAttribute("y", axis.position - height);
        break;
      default:
        return;
    }
    flip(svg, text);
  });
}
