import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";
import { flip } from "./flip";

export default function drawLabels(axis, group) {
  const g = createSVGElements("g");
  group.appendChild(g);
  axis.ticks.forEach((tick) => {
    if (!axis.label) return;
    const text = cloneSVGElement(axis.label);
    text.innerHTML = tick.value;
    g.appendChild(text);
    const { width, height } = text.getBoundingClientRect();
    const xOffset = Number(text.getAttribute("x-offset") || 0);
    const yOffset = Number(text.getAttribute("y-offset") || 0);
    switch (axis.direction) {
      case "left":
        text.setAttribute("x", axis.position - width - xOffset);
        text.setAttribute("y", tick.position - height / 3);
        break;
      case "right":
        text.setAttribute("x", axis.position);
        text.setAttribute("y", tick.position - height / 3);
        break;
      case "bottom":
        text.setAttribute("x", tick.position - width / 2);
        text.setAttribute("y", axis.position - height);
        break;
      case "top":
        text.setAttribute("x", tick.position - width / 2);
        text.setAttribute("y", axis.position);
        break;
      default:
        return;
    }
    flip(group, text);
  });
}
