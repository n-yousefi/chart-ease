import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";
import { flip } from "./flip";

export default function drawLabels(svg, axes, axesLines) {
  const g = createSVGElements("g");
  svg.appendChild(g);
  if (axes.v && axes.v.ticks.length > 0) {
    axes.v.ticks.forEach((tick) => {
      const text = cloneSVGElement(axes.v.label);
      text.innerHTML = tick.value;
      g.appendChild(text);
      const { width, height } = text.getBoundingClientRect();
      if (axes.v.position == "right") {
        text.setAttribute("x", axes.v.x + 7);
        text.setAttribute("y", tick.position - height / 3);
      } else {
        text.setAttribute("x", axes.v.x - width - 7);
        text.setAttribute("y", tick.position - height / 3);
      }
      flip(svg, text);
    });
  }
  if (axes.h && axes.h.ticks.length > 0) {
    axes.h.ticks.forEach((tick) => {
      const text = cloneSVGElement(axes.h.label);
      text.innerHTML = tick.value;
      g.appendChild(text);
      const { width, height } = text.getBoundingClientRect();
      if (axes.h.position == "top") {
        text.setAttribute("x", tick.position - width / 2);
        text.setAttribute("y", axes.h.y + 7);
      } else {
        text.setAttribute("x", tick.position - width / 2);
        text.setAttribute("y", axes.h.y - height);
      }
      flip(svg, text);
    });
  }
}
