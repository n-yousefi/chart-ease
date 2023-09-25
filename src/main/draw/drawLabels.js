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
    let { width, height } = text.getBoundingClientRect();
    const tickWidth = axis.tick?.getAttribute("width") || 0;
    const tickHeight = axis.tick?.getAttribute("height") || 0;
    switch (axis.direction) {
      case "left":
        width += width / tick.value.toString().length;
        text.setAttribute("x", axis.position - width - tickWidth / 2);
        text.setAttribute("y", tick.position - height / 3);
        break;
      case "right":
        text.setAttribute("x", axis.position + tickWidth / 2 + 5);
        text.setAttribute("y", tick.position - height / 3);
        break;
      case "bottom":
        text.setAttribute("x", tick.position - width / 2);
        text.setAttribute("y", axis.position - height - tickHeight / 2);
        break;
      case "top":
        text.setAttribute("x", tick.position - width / 2);
        text.setAttribute("y", axis.position + tickHeight + 5);
        break;
      default:
        return;
    }
    flip(group, text);
  });
}
