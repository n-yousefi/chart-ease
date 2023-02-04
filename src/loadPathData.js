export default function loadPathData(path, data) {
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
