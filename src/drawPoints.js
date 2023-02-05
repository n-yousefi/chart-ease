import dispatchOnDrawEvent from "./events";
import { cloneElement } from "./svg";

export default function drawPoints(svg, pointTypes, data) {
  data.forEach((point, index) => {
    pointTypes.forEach((pointType) => {
      //const tag = pointType.cloneNode(true);
      const tag = cloneElement(pointType);
      if (!tag.hasAttribute("ondraw"))
        setDefaultPosition(tag, point.x, point.y);
      svg.appendChild(tag);
      dispatchOnDrawEvent(tag, point, null, index);
    });
  });
}

function setDefaultPosition(tag, x, y) {
  switch (tag.tagName.toLowerCase()) {
    case "rect":
      tag.setAttribute("x", x - Number(tag.getAttribute("width")) / 2);
      tag.setAttribute("y", y - Number(tag.getAttribute("height")) / 2);
      break;
    case "circle":
    case "ellipse":
    default:
      tag.setAttribute("cx", x);
      tag.setAttribute("cy", y);
      break;
  }
}
