import createSVGElements from "./createSVGElements";

export default function createSVG(chart) {
  chart.svg = appendSVG(chart.width, chart.height);
  chart.appendChild(chart.svg);
  appendG(chart.svg, "grid");
  appendG(chart.svg, "dataset");
  appendG(chart.svg, "axes");

  chart.dispatchEvent(new Event("created"));
}

function appendSVG(width, height) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.setAttribute("transform", "scale(1,-1)");
  return svg;
}

function appendG(svg, name) {
  const g = createSVGElements("g");
  g.setAttribute("name", name);
  svg.appendChild(g);
}
