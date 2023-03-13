import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";
import { flip } from "./flip";

export default function drawLabels(svg, positions, axesLines, ticks, axesLabels) {
  const g = createSVGElements("g");
  svg.appendChild(g);
  if (axesLines.left && ticks.length > 0) {
    ticks[0].forEach((tick) => {
      const text = cloneSVGElement(axesLabels.left);
      text.innerHTML = tick.value;
      g.appendChild(text);
      const { width, height } = text.getBoundingClientRect();
      text.setAttribute("x", positions.left - width - 5);
      text.setAttribute("y", tick.position - height / 3);
      flip(svg, text);
    });
  }
  if (axesLines.top && ticks.length > 1) {
    ticks[1].forEach((tick) => {
      const text = cloneSVGElement(axesLabels.top);
      text.innerHTML = tick.value;
      g.appendChild(text);
      const { width, height } = text.getBoundingClientRect();
      text.setAttribute("x", tick.position - width / 2);
      text.setAttribute("y", positions.top + height / 2);
      flip(svg, text);
    });
  }
  if (axesLines.bottom && ticks.length > 1) {
    ticks[1].forEach((tick) => {
      const text = cloneSVGElement(axesLabels.bottom);
      text.innerHTML = tick.value;
      g.appendChild(text);
      const { width, height } = text.getBoundingClientRect();
      text.setAttribute("x", tick.position - width / 2);
      text.setAttribute("y", positions.bottom - height);
      flip(svg, text);
    });
  }
  if (axesLines.right && ticks.length > 0) {
    ticks[0].forEach((tick) => {
      const text = cloneSVGElement(axesLabels.right);
      text.innerHTML = tick.value;
      g.appendChild(text);
      const { width, height } = text.getBoundingClientRect();
      text.setAttribute("x", positions.right + width);
      text.setAttribute("y", tick.position - height / 3);
      flip(svg, text);
    });
  }
}
