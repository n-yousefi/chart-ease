(function () {
  'use strict';

  function normalize(arr, normalizeKeys) {
    const normalizedArr = arr.map((item) => {
      return { ...item };
    });
    const nGroups = [];
    normalizeKeys.forEach((nGroup) => {
      nGroups.push({
        ...nGroup,
        min: getKeysMin(arr, nGroup.cols),
        max: getKeysMax(arr, nGroup.cols),
      });
    });

    const axesTicks = [];
    nGroups.forEach((group) => {
      const axisTicks = [];
      const ticks = getTicks(group.min, group.max, group.ticks);
      ticks.forEach((value) => {
        axisTicks.push({ value, position: normalizeNumber(value, group) });
      });
      axesTicks.push(axisTicks);
    });

    const arrKeys = Object.keys(arr[0]);
    normalizedArr.forEach((item) => {
      nGroups.forEach((group) => {
        arrKeys.forEach((key) => {
          if (group.cols.includes(key)) {
            item[key] = normalizeNumber(item[key], group);
            item[key] = Math.round(item[key]);
          }
        });
      });
    });

    nGroups
      .filter((group) => group.flip)
      .forEach((group) => {
        flip(normalizedArr, group);
      });

    return { data: normalizedArr, ticks: axesTicks };
  }

  function getTicks(min, max, count) {
    const size = (max - min) / (count - 1);
    const result = [];
    for (let i = 0; i <= count; i++) {
      result.push([min + i * size]);
    }
    return result;
  }

  function normalizeNumber(num, group) {
    return ((num - group.min) / (group.max - group.min)) * (group.upperBound - group.lowerBound) + group.lowerBound;
  }

  function getKeysMin(arr, keys) {
    let min = Number.MAX_VALUE;
    for (let i = 1; i < arr.length; i++) {
      for (let j = 0; j < keys.length; j++) {
        const keyMin = getKeyMin(arr, keys[j]);
        if (min > keyMin) min = keyMin;
      }
    }
    return min;
  }

  function getKeysMax(arr, keys) {
    let max = Number.MIN_VALUE;
    for (let i = 1; i < arr.length; i++) {
      for (let j = 0; j < keys.length; j++) {
        const keyMax = getKeyMax(arr, keys[j]);
        if (keyMax > max) max = keyMax;
      }
    }
    return max;
  }

  function getKeyMin(arr, key) {
    let min = arr[0][key];
    for (let i = 1; i < arr.length; i++) {
      min = Math.min(min, arr[i][key]);
    }
    return min;
  }

  function getKeyMax(arr, key) {
    let max = arr[0][key];
    for (let i = 1; i < arr.length; i++) {
      max = Math.max(max, arr[i][key]);
    }
    return max;
  }

  function flip(arr, nGroup) {
    const keys = nGroup.cols;
    let max = getKeysMax(arr, keys);
    arr.forEach((item) => {
      keys.forEach((key) => {
        item[key] = max - item[key] + nGroup.lowerBound;
      });
    });
  }

  function copyAttrs(from, to) {
    Array.from(from.attributes).forEach((attr) => {
      if (attr.value) to.setAttribute(attr.name, attr.value);
    });
  }

  function copyStyles(from, to) {
    if (from.style.cssText) to.style.cssText = from.style.cssText;
  }

  function cloneSVGElement(element) {
    const newElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      element.tagName.toLowerCase()
    );
    copyAttrs(element, newElement);
    copyStyles(element, newElement);
    const children = Array.from(element.children);
    children.forEach((child) => {
      newElement.appendChild(cloneSVGElement(child));
    });
    return newElement;
  }

  function createSVGElements(tagName) {
    return document.createElementNS("http://www.w3.org/2000/svg", tagName);
  }

  function drawPoints(svg, pointTypes, data, originalData, ondraw) {
    const g = createSVGElements("g");
    data.forEach((row, index) => {
      pointTypes.forEach((pointType) => {
        const shape = cloneSVGElement(pointType);
        if (!ondraw) setDefaultPosition(shape, row.x, row.y);
        else
          ondraw({
            shape,
            row,
            originalRow: originalData[index],
            index,
          });
        g.appendChild(shape);
        flipTexts(svg, shape);
      });
    });
    svg.appendChild(g);
  }

  function flipTexts(svg, shape) {
    const { height } = svg.getBoundingClientRect();
    if (shape.tagName.toLowerCase() == "text") {
      shape.setAttribute("transform", `scale(1,-1) translate(0, -${height})`);
      shape.setAttribute("y", height - parseFloat(shape.getAttribute("y")));
    }
  }

  function setDefaultPosition(shape, x, y) {
    switch (shape.nodeName) {
      case "rect":
        if (x > 0) {
          const width = Number(shape.getAttribute("width"));
          const adjustWidth = width > 0 ? x - width / 2 : x;
          shape.setAttribute("x", adjustWidth);
        }
        if (y > 0) {
          const height = Number(shape.getAttribute("height"));
          const adjustHeight = height > 0 ? y - height / 2 : x;
          shape.setAttribute("y", adjustHeight);
        }
        break;
      case "circle":
      case "ellipse":
        if (x > 0) shape.setAttribute("cx", x);
        if (y > 0) shape.setAttribute("cy", y);
      default:
        if (x > 0) shape.setAttribute("x", x);
        if (y > 0) shape.setAttribute("y", y);
        break;
    }
  }

  function drawPath(parent, pathType, data) {
    if (!pathType) return;
    const path = cloneSVGElement(pathType);
    loadPathData(path, data);
    parent.appendChild(path);
  }

  function loadPathData(path, data) {
    path.setAttribute(
      "d",
      data
        .map((point, index) => (index === 0 ? `M ${point.x} ${point.y}` : ` L ${point.x} ${point.y}`))
        .join(" ")
    );
    path.removeAttribute("is");
  }

  function drawAxes(svg, axesLines) {
    const g = createSVGElements("g");
    const left = svg.parentElement.margin.left;
    const right = svg.parentElement.width - svg.parentElement.margin.right;
    const bottom = svg.parentElement.margin.bottom;
    const top = svg.parentElement.height - svg.parentElement.margin.top;
    if (axesLines.left) {
      const axis = createAxis(g, axesLines.left);
      axis.setAttribute("x1", left);
      axis.setAttribute("x2", left);
      axis.setAttribute("y1", bottom);
      axis.setAttribute("y2", top);
    }
    if (axesLines.top) {
      const axis = createAxis(g, axesLines.top);
      axis.setAttribute("x1", left);
      axis.setAttribute("x2", right);
      axis.setAttribute("y1", top);
      axis.setAttribute("y2", top);
    }
    if (axesLines.bottom) {
      const axis = createAxis(g, axesLines.bottom);
      axis.setAttribute("x1", left);
      axis.setAttribute("x2", right);
      axis.setAttribute("y1", bottom);
      axis.setAttribute("y2", bottom);
    }
    if (axesLines.right) {
      const axis = createAxis(g, axesLines.right);
      axis.setAttribute("x1", right);
      axis.setAttribute("x2", right);
      axis.setAttribute("y1", bottom);
      axis.setAttribute("y2", top);
    }
    svg.appendChild(g);
  }

  function createAxis(svg, axisType) {
    const axis = cloneSVGElement(axisType);
    svg.appendChild(axis);
    return axis;
  }

  function drawTicks(svg, axesLines, ticks) {
    const g = createSVGElements("g");
    const left = svg.parentElement.margin.left;
    const right = svg.parentElement.width - svg.parentElement.margin.right;
    const bottom = svg.parentElement.margin.bottom;
    const top = svg.parentElement.height - svg.parentElement.margin.top;
    if (axesLines.left && ticks.length > 0) {
      ticks[0].forEach((tick) => {
        const tl = cloneSVGElement(axesLines.left);
        tl.setAttribute("x1", left - 5);
        tl.setAttribute("x2", left + 5);
        tl.setAttribute("y1", tick.position);
        tl.setAttribute("y2", tick.position);
        g.appendChild(tl);
      });
    }
    if (axesLines.top && ticks.length > 1) {
      ticks[1].forEach((tick) => {
        const tl = cloneSVGElement(axesLines.top);
        tl.setAttribute("x1", tick.position);
        tl.setAttribute("x2", tick.position);
        tl.setAttribute("y1", top - 5);
        tl.setAttribute("y2", top + 5);
        g.appendChild(tl);
      });
    }
    if (axesLines.bottom && ticks.length > 1) {
      ticks[1].forEach((tick) => {
        const tl = cloneSVGElement(axesLines.bottom);
        tl.setAttribute("x1", tick.position);
        tl.setAttribute("x2", tick.position);
        tl.setAttribute("y1", bottom - 5);
        tl.setAttribute("y2", bottom + 5);
        g.appendChild(tl);
      });
    }
    if (axesLines.right && ticks.length > 0) {
      ticks[0].forEach((tick) => {
        const tl = cloneSVGElement(axesLines.right);
        tl.setAttribute("x1", right - 5);
        tl.setAttribute("x2", right + 5);
        tl.setAttribute("y1", tick.position);
        tl.setAttribute("y2", tick.position);
        g.appendChild(tl);
      });
    }
    svg.appendChild(g);
  }

  function drawGridLines(svg, gridLines, ticks) {
    const g = createSVGElements("g");
    const left = svg.parentElement.margin.left;
    const right = svg.parentElement.width - svg.parentElement.margin.right;
    const bottom = svg.parentElement.margin.bottom;
    const top = svg.parentElement.height - svg.parentElement.margin.top;
    if (gridLines.h && ticks.length > 0) {
      ticks[0].forEach((tick) => {
        const tl = cloneSVGElement(gridLines.h);
        tl.setAttribute("x1", left);
        tl.setAttribute("x2", right);
        tl.setAttribute("y1", tick.position);
        tl.setAttribute("y2", tick.position);
        g.appendChild(tl);
      });
    }
    if (gridLines.v && ticks.length > 1) {
      ticks[1].forEach((tick) => {
        const tl = cloneSVGElement(gridLines.v);
        tl.setAttribute("x1", tick.position);
        tl.setAttribute("x2", tick.position);
        tl.setAttribute("y1", top);
        tl.setAttribute("y2", bottom);
        g.appendChild(tl);
      });
    }
    svg.appendChild(g);
  }

  class DataSet extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {}
    disconnectedCallback() {}

    draw(data, originalData, ticks) {
      const svg = this.parentElement.querySelector("svg");
      drawPath(svg, this.pathType, data);
      drawPoints(svg, this.pointTypes, data, originalData, this["ondraw"]);
      drawAxes(svg, this.parentElement.axesLines);
      drawTicks(svg, this.parentElement.axesLines, ticks);
      drawGridLines(svg, this.parentElement.gridLines, ticks);
    }

    set data(originalData) {
      this.axesInit();
      const { data, ticks } = normalize(originalData, this.axes);
      this.draw(data, originalData, ticks);
      this.parentElement.removeChild(this);
    }

    axesInit() {
      this.axes = [
        {
          cols: this.getAttribute("hAxis") ? this.getAttribute("hAxis").split(",") : ["x"],
          length: this.parentElement.width,
          ticks: parseInt(this.parentElement.axesLines.left?.getAttribute("ticks") ?? 0),
        },
        {
          cols: this.getAttribute("vAxis") ? this.getAttribute("vAxis").split(",") : ["y"],
          length: this.parentElement.height,
          ticks: parseInt(this.parentElement.axesLines.bottom?.getAttribute("ticks") ?? 0),
        },
      ];
      this["axes"] ? this["axes"] : [];
      const margin = this.parentElement.margin;
      const padding = this.parentElement.padding;
      // X axis bounds
      this.axes[0].lowerBound = margin.left + padding.left;
      this.axes[0].upperBound = this.parentElement.width - margin.right - padding.right;
      // Y axis bounds
      this.axes[1].lowerBound = margin.bottom + padding.bottom;
      this.axes[1].upperBound = this.parentElement.height - margin.top - padding.top;
    }

    get pathType() {
      return this.querySelector(`path[is="path-type"]`);
    }

    get pointTypes() {
      return Array.from(this.children).filter((item) => !item.getAttribute("is"));
    }
  }

  class CandleStick extends DataSet {
    constructor() {
      super();
      this.adjust();
    }

    connectedCallback() {}
    disconnectedCallback() {}

    adjust() {
      this.appendChild(createSVGElements("line"));
      this.appendChild(createSVGElements("rect"));
      this.ondraw = ({ shape, row }) => {
        switch (shape.tagName) {
          case "line":
            shape.setAttribute("x1", row.x + 5);
            shape.setAttribute("x2", row.x + 5);
            shape.setAttribute("y1", row.low);
            shape.setAttribute("y2", row.high);
            shape.setAttribute(
              "stroke",
              row.open > row.close ? "#28A69A" : "#EE5355"
            );
            break;
          case "rect":
            shape.setAttribute("width", 10);
            shape.setAttribute("height", Math.abs(row.open - row.close));
            shape.setAttribute("x", row.x);
            shape.setAttribute("y", row.open);
            shape.setAttribute(
              "fill",
              row.open > row.close ? "#28A69A" : "#EE5355"
            );
            break;
        }
      };
      this.axes = [
        { cols: ["x"], length: 200, margin: 10 },
        {
          cols: ["low", "open", "close", "high"],
          length: 200,
          margin: 10,
        },
      ];
    }
  }

  const WIDTH = 200;
  const HEIGHT = 200;
  const MARGIN = 0;
  const PADDING = 0;

  function createSVG(width, height) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("transform", "scale(1,-1)");
    return svg;
  }

  class ChartEase extends HTMLElement {
    constructor() {
      super();
      this.setStyles();
    }

    connectedCallback() {
      this.svg = createSVG(this.width, this.height);
      this.appendChild(this.svg);
    }
    disconnectedCallback() {}

    set axes(axes) {
      this.firstElementChild.axes = axes;
    }
    set ondraw(ondraw) {
      this.firstElementChild.ondraw = ondraw;
    }
    set data(data) {
      this.firstElementChild.data = data;
    }

    get width() {
      return parseFloat(this.getAttribute("width") ?? WIDTH);
    }
    get height() {
      return parseFloat(this.getAttribute("height") ?? HEIGHT);
    }
    get margin() {
      return {
        top: parseFloat(this.getAttribute("margin-top") ?? this.getAttribute("margin") ?? MARGIN),
        bottom: parseFloat(this.getAttribute("margin-bottom") ?? this.getAttribute("margin") ?? MARGIN),
        left: parseFloat(this.getAttribute("margin-left") ?? this.getAttribute("margin") ?? MARGIN),
        right: parseFloat(this.getAttribute("margin-right") ?? this.getAttribute("margin") ?? MARGIN),
      };
    }

    get padding() {
      return {
        top: parseFloat(this.getAttribute("padding-top") ?? this.getAttribute("padding") ?? PADDING),
        bottom: parseFloat(this.getAttribute("padding-bottom") ?? this.getAttribute("padding") ?? PADDING),
        left: parseFloat(this.getAttribute("padding-left") ?? this.getAttribute("padding") ?? PADDING),
        right: parseFloat(this.getAttribute("padding-right") ?? this.getAttribute("padding") ?? PADDING),
      };
    }

    get axesLines() {
      return {
        left: Array.from(this.children).find((item) => item.getAttribute("is") == "left-axis"),
        right: Array.from(this.children).find((item) => item.getAttribute("is") == "right-axis"),
        top: Array.from(this.children).find((item) => item.getAttribute("is") == "top-axis"),
        bottom: Array.from(this.children).find((item) => item.getAttribute("is") == "bottom-axis"),
      };
    }

    get gridLines() {
      return {
        v: Array.from(this.children).find((item) => item.getAttribute("is") == "v-grid-lines"),
        h: Array.from(this.children).find((item) => item.getAttribute("is") == "h-grid-lines"),
      };
    }

    setStyles() {
      this.style.lineHeight = 0;
    }
  }

  customElements.get("data-set") ?? customElements.define("data-set", DataSet);
  customElements.get("chart-ease") ?? customElements.define("chart-ease", ChartEase);
  customElements.get("candle-stick") ?? customElements.define("candle-stick", CandleStick);

  return ChartEase;

})();
//# sourceMappingURL=chart-ease.js.map
