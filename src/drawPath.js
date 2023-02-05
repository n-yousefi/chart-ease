import { cloneElement } from "./svg";

export default function drawPath(svg, pathType, data) {
  if (!pathType) return;
  const path = cloneElement(pathType);
  loadPathData(path, data);
  svg.appendChild(path);
}

function loadPathData(path, data) {
  path.setAttribute(
    "d",
    data
      .map((point, index) =>
        index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`
      )
      .join(" ")
  );
  path.removeAttribute("is");
}
