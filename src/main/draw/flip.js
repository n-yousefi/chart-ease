export function flip(svg, shape) {
  const { height } = svg.getBoundingClientRect();
  if (shape.tagName.toLowerCase() == "text") {
    shape.setAttribute("transform", `scale(1,-1) translate(0, -${height})`);
    shape.setAttribute("y", height - parseFloat(shape.getAttribute("y")));
  }
}
