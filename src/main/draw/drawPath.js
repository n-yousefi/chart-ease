import cloneSVGElement from "./cloneSVGElement";

/// path ///
const lineCommand = (point) => `L ${point.x} ${point.y}`;
const loadPathD = (path, points, command) => {
  // build the d attributes by looping over the points
  const d = points.reduce(
    (acc, point, i, a) =>
      i === 0
        ? // if first point
          `M ${point.x},${point.y}`
        : // else
          `${acc} ${command(point, i, a, path)}`,
    ""
  );
  path.setAttribute("d", d);
};

/// polyline ///
function loadPolylinePoints(node, points) {
  node.setAttribute("points", points.map((point) => `${point.x},${point.y}`).join(" "));
}

/// cubic-bezier ///
const line = (pointA, pointB) => {
  const lengthX = pointB.x - pointA.x;
  const lengthY = pointB.y - pointA.y;
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  };
};

const controlPoint = (current, previous, next, reverse, smoothing) => {
  // When 'current' is the first or last point of the array
  // 'previous' or 'next' don't exist.
  // Replace with 'current'
  const p = previous || current;
  const n = next || current;
  // Properties of the opposed-line
  const o = line(p, n);
  // If is end-control-point, add PI to the angle to go backward
  const angle = o.angle + (reverse ? Math.PI : 0);
  const length = o.length * smoothing;
  // The control point position is relative to the current point
  const x = current.x + Math.cos(angle) * length;
  const y = current.y + Math.sin(angle) * length;
  return [x, y];
};

const bezierCommand = (point, i, a, path) => {
  const smoothing = path.hasAttribute("data-smoothing")
    ? parseFloat(path.getAttribute("data-smoothing"))
    : 0.01;
  // start control point
  const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point, false, smoothing);
  // end control point
  const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true, smoothing);
  return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point.x},${point.y}`;
};

/// drawPath ///

export default function drawPath(pathType, dataset) {
  if (!pathType) return;
  const path = cloneSVGElement(pathType);
  if (path.nodeName === "path") {
    if (path.hasAttribute("data-smoothing")) loadPathD(path, dataset.normalizedData, bezierCommand);
    else loadPathD(path, dataset.normalizedData, lineCommand);
  } else if (path.nodeName === "polyline") loadPolylinePoints(path, dataset.normalizedData);
  dataset.g.appendChild(path);
}
