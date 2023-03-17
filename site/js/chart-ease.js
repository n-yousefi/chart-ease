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

    const axesTicks = [];
    nGroups.forEach((group) => {
      if (group.ticks > 0) {
        axesTicks.push(getAxisTicks(group));
      }
    });

    return { data: normalizedArr, ticks: axesTicks };
  }

  function getAxisTicks(group) {
    const axisTicks = [];
    const tickSize = getTickSize(group.min, group.max, group.ticks);
    let value = group.min;
    let position = group.plotStart;
    while (true) {
      position = normalizeNumber(value, group);
      if (position > group.axis.stop) break;
      axisTicks.push({ value, position });
      value += tickSize;
    }
    return axisTicks;
  }

  function getTickSize(min, max, count) {
    return Math.round((max - min) / (count - 1));
  }

  function normalizeNumber(num, group) {
    return ((num - group.min) / (group.max - group.min)) * (group.plotStop - group.plotStart) + group.plotStart;
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

  function flip(svg, shape) {
    const { height } = svg.getBoundingClientRect();
    if (shape.tagName.toLowerCase() == "text") {
      shape.setAttribute("transform", `scale(1,-1) translate(0, -${height})`);
      shape.setAttribute("y", height - parseFloat(shape.getAttribute("y")));
    }
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
        flip(svg, shape);
      });
    });
    svg.appendChild(g);
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

  function drawAxes(svg, axes, axesLines) {
    const g = createSVGElements("g");
    const hStart = axes[0].axis.start;
    const vStart = axes[1].axis.start;
    const hStop = axes[0].axis.stop;
    const vStop = axes[1].axis.stop;
    if (axesLines.left) {
      const axis = createAxis(g, axesLines.left);
      axis.setAttribute("x1", hStart);
      axis.setAttribute("x2", hStart);
      axis.setAttribute("y1", vStart);
      axis.setAttribute("y2", vStop);
    }
    if (axesLines.right) {
      const axis = createAxis(g, axesLines.right);
      axis.setAttribute("x1", hStop);
      axis.setAttribute("x2", hStop);
      axis.setAttribute("y1", vStart);
      axis.setAttribute("y2", vStop);
    }
    if (axesLines.top) {
      const axis = createAxis(g, axesLines.top);
      axis.setAttribute("x1", hStart);
      axis.setAttribute("x2", hStop);
      axis.setAttribute("y1", vStop);
      axis.setAttribute("y2", vStop);
    }
    if (axesLines.bottom) {
      const axis = createAxis(g, axesLines.bottom);
      axis.setAttribute("x1", hStart);
      axis.setAttribute("x2", hStop);
      axis.setAttribute("y1", vStart);
      axis.setAttribute("y2", vStart);
    }
    svg.appendChild(g);
  }

  function createAxis(svg, axisType) {
    const axis = cloneSVGElement(axisType);
    svg.appendChild(axis);
    return axis;
  }

  function drawTicks(svg, axes, axesLines, ticks) {
    const g = createSVGElements("g");
    const hAxisTicks = ticks[0];
    const vAxisTicks = ticks[1];
    if (axesLines.left && ticks.length > 0) {
      vAxisTicks.forEach((tick) => {
        const tl = cloneSVGElement(axesLines.left);
        tl.setAttribute("x1", axes[0].axis.start - 5);
        tl.setAttribute("x2", axes[0].axis.start + 5);
        tl.setAttribute("y1", tick.position);
        tl.setAttribute("y2", tick.position);
        g.appendChild(tl);
      });
    }
    if (axesLines.top && ticks.length > 1) {
      hAxisTicks.forEach((tick) => {
        const tl = cloneSVGElement(axesLines.top);
        tl.setAttribute("x1", tick.position);
        tl.setAttribute("x2", tick.position);
        tl.setAttribute("y1", axes[1].axis.stop - 5);
        tl.setAttribute("y2", axes[1].axis.stop + 5);
        g.appendChild(tl);
      });
    }
    if (axesLines.bottom && ticks.length > 1) {
      hAxisTicks.forEach((tick) => {
        const tl = cloneSVGElement(axesLines.bottom);
        tl.setAttribute("x1", tick.position);
        tl.setAttribute("x2", tick.position);
        tl.setAttribute("y1", axes[1].axis.start - 5);
        tl.setAttribute("y2", axes[1].axis.start + 5);
        g.appendChild(tl);
      });
    }
    if (axesLines.right && ticks.length > 0) {
      vAxisTicks.forEach((tick) => {
        const tl = cloneSVGElement(axesLines.right);
        tl.setAttribute("x1", axes[0].axis.stop - 5);
        tl.setAttribute("x2", axes[0].axis.stop + 5);
        tl.setAttribute("y1", tick.position);
        tl.setAttribute("y2", tick.position);
        g.appendChild(tl);
      });
    }
    svg.appendChild(g);
  }

  function drawGridLines(svg, axes, gridLines, ticks) {
    const g = createSVGElements("g");
    const hAxisTicks = ticks[0];
    const vAxisTicks = ticks[1];
    if (gridLines.h && ticks.length > 0) {
      vAxisTicks.forEach((tick) => {
        const tl = cloneSVGElement(gridLines.h);
        tl.setAttribute("x1", axes[0].axis.start);
        tl.setAttribute("x2", axes[0].axis.stop);
        tl.setAttribute("y1", tick.position);
        tl.setAttribute("y2", tick.position);
        g.appendChild(tl);
      });
    }
    if (gridLines.v && ticks.length > 1) {
      hAxisTicks.forEach((tick) => {
        const tl = cloneSVGElement(gridLines.v);
        tl.setAttribute("x1", tick.position);
        tl.setAttribute("x2", tick.position);
        tl.setAttribute("y1", axes[1].axis.stop);
        tl.setAttribute("y2", axes[1].axis.start);
        g.appendChild(tl);
      });
    }
    svg.appendChild(g);
  }

  function drawLabels(svg, axes, axesLines, ticks, axesLabels) {
    const hAxisTicks = ticks[0];
    const vAxisTicks = ticks[1];
    const g = createSVGElements("g");
    svg.appendChild(g);
    if (axesLines.left && ticks.length > 0) {
      vAxisTicks.forEach((tick) => {
        const text = cloneSVGElement(axesLabels.left);
        text.innerHTML = tick.value;
        g.appendChild(text);
        const { width, height } = text.getBoundingClientRect();
        text.setAttribute("x", axes[0].axis.start - width - 5);
        text.setAttribute("y", tick.position - height / 3);
        flip(svg, text);
      });
    }
    if (axesLines.top && ticks.length > 1) {
      hAxisTicks.forEach((tick) => {
        const text = cloneSVGElement(axesLabels.top);
        text.innerHTML = tick.value;
        g.appendChild(text);
        const { width, height } = text.getBoundingClientRect();
        text.setAttribute("x", tick.position - width / 2);
        text.setAttribute("y", axes[1].axis.stop + height / 2);
        flip(svg, text);
      });
    }
    if (axesLines.bottom && ticks.length > 1) {
      hAxisTicks.forEach((tick) => {
        const text = cloneSVGElement(axesLabels.bottom);
        text.innerHTML = tick.value;
        g.appendChild(text);
        const { width, height } = text.getBoundingClientRect();
        text.setAttribute("x", tick.position - width / 2);
        text.setAttribute("y", axes[1].axis.start - height);
        flip(svg, text);
      });
    }
    if (axesLines.right && ticks.length > 0) {
      vAxisTicks.forEach((tick) => {
        const text = cloneSVGElement(axesLabels.right);
        text.innerHTML = tick.value;
        g.appendChild(text);
        const { width, height } = text.getBoundingClientRect();
        text.setAttribute("x", axes[0].axis.stop + width);
        text.setAttribute("y", tick.position - height / 3);
        flip(svg, text);
      });
    }
  }

  class DataSet extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {}
    disconnectedCallback() {}

    draw(data, originalData, axesLines, ticks) {
      const svg = this.parentElement.querySelector("svg");
      drawPath(svg, this.pathType, data);
      drawPoints(svg, this.pointTypes, data, originalData, this["ondraw"]);
      drawAxes(svg, this.axes, axesLines);
      drawTicks(svg, this.axes, axesLines, ticks);
      drawGridLines(svg, this.axes, this.parentElement.gridLines, ticks);
      drawLabels(svg, this.axes, axesLines, ticks, this.parentElement.axesLabels);
    }

    set data(originalData) {
      const axesLines = this.parentElement.axesLines;
      this.axesInit(axesLines);
      const { data, ticks } = normalize(originalData, this.axes);
      this.draw(data, originalData, axesLines, ticks);
      this.parentElement.removeChild(this);
    }

    axesInit(axesLines) {
      this.axes = [
        {
          cols: this.getAttribute("hAxis") ? this.getAttribute("hAxis").split(",") : ["x"],
          length: this.parentElement.width,
          ticks: parseInt(axesLines.left?.getAttribute("ticks") ?? 0),
        },
        {
          cols: this.getAttribute("vAxis") ? this.getAttribute("vAxis").split(",") : ["y"],
          length: this.parentElement.height,
          ticks: parseInt(axesLines.bottom?.getAttribute("ticks") ?? 0),
        },
      ];
      this["axes"] ? this["axes"] : [];
      const margin = this.parentElement.margin;
      const padding = this.parentElement.padding;
      // X axis bounds
      this.axes[0].plotStart = margin.left + padding.left;
      this.axes[0].plotStop = this.parentElement.width - margin.right - padding.right;
      this.axes[0].axis = {
        start: margin.left,
        stop: this.parentElement.width - margin.right,
      };
      // Y axis bounds
      this.axes[1].plotStart = margin.bottom + padding.bottom;
      this.axes[1].plotStop = this.parentElement.height - margin.top - padding.top;
      this.axes[1].axis = {
        start: margin.bottom,
        stop: this.parentElement.height - margin.top,
      };
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

    get axesLabels() {
      return {
        left: Array.from(this.children).find((item) => item.getAttribute("is") == "left-labels"),
        right: Array.from(this.children).find((item) => item.getAttribute("is") == "right-labels"),
        top: Array.from(this.children).find((item) => item.getAttribute("is") == "top-labels"),
        bottom: Array.from(this.children).find((item) => item.getAttribute("is") == "bottom-labels"),
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
