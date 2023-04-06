(function () {
  'use strict';

  function normalize(arr, normalizeGroups) {
    const normalizedArr = arr.map((item) => {
      return { ...item };
    });

    const arrKeys = Object.keys(arr[0]);
    normalizedArr.forEach((item) => {
      normalizeGroups.forEach((group) => {
        arrKeys.forEach((key) => {
          if (group.cols.includes(key)) {
            item[key] = Math.round(normalizeNumber(item[key], group));
          }
        });
      });
    });

    return normalizedArr;
  }

  function normalizeNumber(num, group) {
    return ((num - group.min) / (group.max - group.min)) * (group.stop - group.start) + group.start;
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

  function setGroupsMinMax(data, groups) {
    groups.forEach((group) => {
      if (group.min == undefined) group.min = getKeysMin(data, group.cols);
      if (group.max == undefined) group.max = getKeysMax(data, group.cols);
    });
  }

  function getKeysMin(data, keys) {
    let min = Number.MAX_VALUE;
    for (let i = 1; i < data.length; i++) {
      for (let j = 0; j < keys.length; j++) {
        const keyMin = getKeyMin(data, keys[j]);
        if (min > keyMin) min = keyMin;
      }
    }
    return min;
  }

  function getKeysMax(data, keys) {
    let max = Number.MIN_VALUE;
    for (let i = 1; i < data.length; i++) {
      for (let j = 0; j < keys.length; j++) {
        const keyMax = getKeyMax(data, keys[j]);
        if (keyMax > max) max = keyMax;
      }
    }
    return max;
  }

  function getKeyMin(data, key) {
    let min = data[0][key];
    for (let i = 1; i < data.length; i++) {
      min = Math.min(min, data[i][key]);
    }
    return min;
  }

  function getKeyMax(data, key) {
    let max = data[0][key];
    for (let i = 1; i < data.length; i++) {
      max = Math.max(max, data[i][key]);
    }
    return max;
  }

  class DataSet extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {}
    disconnectedCallback() {}

    set data(originalData) {
      const normalizeGroups = this.getNormalizeGroups();
      setGroupsMinMax(originalData, normalizeGroups);
      if (this["ondataSet"]) this["ondataSet"]();
      const data = normalize(originalData, normalizeGroups);
      const svg = this.parentElement.querySelector("svg");
      drawPath(svg, this.pathType, data);
      drawPoints(svg, this.pointTypes, data, originalData, this["ondraw"]);
      this.parentElement.removeChild(this);
    }

    getNormalizeGroups() {
      const h = {
        cols: this.getAttribute("hAxis") ? this.getAttribute("hAxis").split(",") : ["x"],
      };
      if (this.parentElement.axes.h) {
        h.start = this.parentElement.axes.h.x1;
        h.stop = this.parentElement.axes.h.x2;
        h.min = this.parentElement.axes.h.min;
        h.max = this.parentElement.axes.h.max;
      }
      const v = {
        cols: this.getAttribute("vAxis") ? this.getAttribute("vAxis").split(",") : ["y"],
      };
      if (this.parentElement.axes.v) {
        v.start = this.parentElement.axes.v.y1;
        v.stop = this.parentElement.axes.v.y2;
        v.min = this.parentElement.axes.v.min;
        v.max = this.parentElement.axes.v.max;
      }
      return [h, v];
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

  function createSVG(width, height) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("transform", "scale(1,-1)");
    return svg;
  }

  function drawAxes(svg, axes) {
    const g = createSVGElements("g");
    if (axes.v && axes.v.type) {
      const axis = cloneSVGElement(axes.v.type);
      axis.setAttribute("x1", axes.v.x);
      axis.setAttribute("x2", axes.v.x);
      axis.setAttribute("y1", axes.v.y1);
      axis.setAttribute("y2", axes.v.y2);
      g.appendChild(axis);
    }

    if (axes.h && axes.h.type) {
      const axis = cloneSVGElement(axes.h.type);
      axis.setAttribute("x1", axes.h.x1);
      axis.setAttribute("x2", axes.h.x2);
      axis.setAttribute("y1", axes.h.y);
      axis.setAttribute("y2", axes.h.y);
      g.appendChild(axis);
    }
    svg.appendChild(g);
  }

  function drawTicks(svg, axes, plot) {
    const g = createSVGElements("g");
    if (axes.h && axes.h.ticks.length > 1) {
      axes.h.ticks.forEach((tick) => {
        const tl = cloneSVGElement(axes.h.type);
        tl.setAttribute("x1", tick.position);
        tl.setAttribute("x2", tick.position);
        tl.setAttribute("y1", axes.h.y - 5);
        tl.setAttribute("y2", axes.h.y + 5);
        g.appendChild(tl);
      });
    }
    if (axes.v && axes.v.ticks.length > 1) {
      axes.v.ticks.forEach((tick) => {
        const tl = cloneSVGElement(axes.v.type);
        tl.setAttribute("x1", axes.v.x - 5);
        tl.setAttribute("x2", axes.v.x + 5);
        tl.setAttribute("y1", tick.position);
        tl.setAttribute("y2", tick.position);
        g.appendChild(tl);
      });
    }
    svg.appendChild(g);
  }

  function drawGridLines(svg, axes) {
    const g = createSVGElements("g");
    if (axes.h && axes.h.ticks.length > 1 && axes.h.grid) {
      axes.v.ticks.forEach((tick) => {
        const tl = cloneSVGElement(axes.h.grid);
        tl.setAttribute("x1", axes.h.x1);
        tl.setAttribute("x2", axes.h.x2);
        tl.setAttribute("y1", tick.position);
        tl.setAttribute("y2", tick.position);
        g.appendChild(tl);
      });
    }
    if (axes.v && axes.v.ticks.length > 1 && axes.v.grid) {
      axes.h.ticks.forEach((tick) => {
        const tl = cloneSVGElement(axes.v.grid);
        tl.setAttribute("x1", tick.position);
        tl.setAttribute("x2", tick.position);
        tl.setAttribute("y1", axes.v.y1);
        tl.setAttribute("y2", axes.v.y2);
        g.appendChild(tl);
      });
    }
    svg.appendChild(g);
  }

  function drawLabels(svg, axes, axesLines) {
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

  function getAxisTicks(min, max, count, start, stop) {
    const axisTicks = [];
    const tickSize = getTickSize(min, max, count);
    let value = min;
    let position = start;
    while (true) {
      position = ((value - min) / (max - min)) * (stop - start) + start;
      if (!position || position > stop) break;
      axisTicks.push({ value, position });
      value += tickSize;
    }
    return axisTicks;
  }

  function getTickSize(min, max, count) {
    return Math.round((max - min) / (count - 1));
  }

  class ChartEase extends HTMLElement {
    constructor() {
      super();
      this.setStyles();
      this.init();
    }

    connectedCallback() {
      this.axesInit();
      this.svg = createSVG(this.width, this.height);
      this.appendChild(this.svg);
      drawAxes(this.svg, this.axes);
      drawTicks(this.svg, this.axes);
      drawLabels(this.svg, this.axes);
      drawGridLines(this.svg, this.axes);
    }
    disconnectedCallback() {}

    set ondraw(ondraw) {
      this.querySelector("data-set").ondraw = ondraw;
    }
    set data(data) {
      this.querySelector("data-set").data = data;
    }

    init() {
      this.height = parseFloat(this.getAttribute("height") ?? HEIGHT);
      this.width = parseFloat(this.getAttribute("width") ?? WIDTH);
      this.margin = {
        top: parseFloat(this.getAttribute("margin-top") ?? this.getAttribute("margin") ?? MARGIN),
        bottom: parseFloat(this.getAttribute("margin-bottom") ?? this.getAttribute("margin") ?? MARGIN),
        left: parseFloat(this.getAttribute("margin-left") ?? this.getAttribute("margin") ?? MARGIN),
        right: parseFloat(this.getAttribute("margin-right") ?? this.getAttribute("margin") ?? MARGIN),
      };
      this.querySelectorAll("data-set").forEach((ds) => {});
    }

    axesInit() {
      const getIntAttr = (elem, attr) => parseInt(elem.getAttribute(attr) ?? 0);
      const vAxis = this.querySelector(`g[is="v-axis"]`);
      const hAxis = this.querySelector(`g[is="h-axis"]`);

      const vStart = this.margin.bottom;
      const vStop = this.height - this.margin.top;
      const hStart = this.margin.left;
      const hStop = this.width - this.margin.right;

      this.axes = {};
      if (vAxis) {
        const position = vAxis.getAttribute("position");
        const min = getIntAttr(vAxis, "min");
        const max = getIntAttr(vAxis, "max");
        this.axes.v = {
          x: position == "right" ? hStop : hStart,
          y1: vStart,
          y2: vStop,
          min,
          max,
          position,
          type: vAxis.querySelector("line"),
          label: vAxis.querySelector("text"),
          grid: vAxis.querySelector(`line[is="grid"]`),
          ticks: getAxisTicks(min, max, getIntAttr(vAxis, "ticks"), vStart, vStop),
        };
      }
      if (hAxis) {
        const position = hAxis.getAttribute("position");
        const min = getIntAttr(hAxis, "min");
        const max = getIntAttr(hAxis, "max");
        this.axes.h = {
          y: position == "top" ? vStop : vStart,
          x1: hStart,
          x2: hStop,
          min,
          max,
          position,
          type: hAxis.querySelector("line"),
          label: hAxis.querySelector("text"),
          grid: vAxis.querySelector(`line[is="grid"]`),
          ticks: getAxisTicks(min, max, getIntAttr(hAxis, "ticks"), hStart, hStop),
        };
      }
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
