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

  function drawDataSet(dataset) {
    Array.prototype.slice.call(dataset.children).forEach((element) => {
      if (element.hasAttribute("data-drawn-as") && element.getAttribute("data-drawn-as") === "edge")
        drawPath(element, dataset);
      else drawPoints(dataset, element);
    });
  }

  function drawPath(pathType, dataset) {
    if (!pathType) return;
    const path = cloneSVGElement(pathType);
    if (path.nodeName === "path") loadPathData(path, dataset);
    else if (path.nodeName === "polyline") loadPolylineData(path, dataset);
    dataset.g.appendChild(path);
  }

  function loadPathData(path, dataset) {
    path.setAttribute(
      "d",
      dataset.normalizedData
        .map((point, index) => (index === 0 ? `M ${point.x} ${point.y}` : ` L ${point.x} ${point.y}`))
        .join(" ")
    );
    path.removeAttribute("is");
  }

  function loadPolylineData(node, dataset) {
    node.setAttribute("points", dataset.normalizedData.map((point) => `${point.x},${point.y}`).join(" "));
  }

  function drawPoints(dataset, element) {
    const pointGroup = createSVGElements("g");
    dataset.normalizedData.forEach((row, index) => {
      const ondraw = dataset["ondraw"];
      const shape = cloneSVGElement(element);
      if (!ondraw) setDefaultPosition(shape, row.x, row.y);
      else
        ondraw({
          shape,
          row,
          originalRow: dataset.originalData[index],
          index,
        });
      pointGroup.appendChild(shape);
      flip(pointGroup, shape);
    });
    dataset.g.appendChild(pointGroup);
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

    set data(data) {
      this.hAxis = this.getDirection("h");
      this.vAxis = this.getDirection("v");
      this.originalData = data;
      this.initData();
      const directionGroups = [this.hAxis, this.vAxis];
      setGroupsMinMax(this.originalData, directionGroups);
      this.normalizedData = normalize(this.originalData, directionGroups);
      this.render();
    }

    initData() {
      if (typeof this.originalData[0] !== "object") {
        this.originalData = this.originalData.map((item, index) => {
          return { x: index + 1, y: item };
        });
      }
      this.hAxis.cols.concat(this.vAxis.cols).forEach((col) => {
        if (typeof this.originalData[0][col] === "undefined") {
          this.originalData = this.originalData.map((item, index) => {
            item[col] = index + 1;
            return item;
          });
        }
      });
    }

    render() {
      this.init();
      this.g.innerHTML = "";
      drawDataSet(this);
    }

    init() {
      const dataSet = this.parentElement.querySelector('g[name="dataset"]');
      if (!this.g) {
        this.g = createSVGElements("g");
        dataSet.append(this.g);
      }
    }

    getDirection(dir) {
      let group = {
        cols: this.getCols(dir),
        start: this.getStart(dir),
        stop: this.getStop(dir),
      };
      let axis = this.getAxis(dir);
      if (axis) {
        group = {
          ...group,
          min: axis.min,
          max: axis.max,
        };
      }
      return group;
    }

    getAxis(dir) {
      if (dir === "h")
        return this.parentElement.querySelector("bottom-axis") ?? this.parentElement.querySelector("top-axis");
      return this.parentElement.querySelector("left-axis") ?? this.parentElement.querySelector("right-axis");
    }
    getStart(dir) {
      if (dir === "h") return this.parentElement.margin.left;
      return this.parentElement.margin.bottom;
    }
    getStop(dir) {
      if (dir === "h") return this.parentElement.width - this.parentElement.margin.right;
      return this.parentElement.height - this.parentElement.margin.top;
    }
    getCols(dir) {
      if (dir === "h") return this.getAttribute("hAxis") ? this.getAttribute("hAxis").split(",") : ["x"];
      return this.getAttribute("vAxis") ? this.getAttribute("vAxis").split(",") : ["y"];
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
  const MARGIN = 10;

  function createSVG(chart) {
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

  function drawAxisLine(axis, group) {
    const g = createSVGElements("g");
    if (!axis.line) return;
    const axisLine = cloneSVGElement(axis.line);
    if (axis.isVertical) {
      axisLine.setAttribute("x1", axis.position);
      axisLine.setAttribute("x2", axis.position);
      axisLine.setAttribute("y1", axis.start);
      axisLine.setAttribute("y2", axis.stop);
    } else {
      axisLine.setAttribute("x1", axis.start);
      axisLine.setAttribute("x2", axis.stop);
      axisLine.setAttribute("y1", axis.position);
      axisLine.setAttribute("y2", axis.position);
    }

    g.appendChild(axisLine);
    group.appendChild(g);
  }

  function drawTicks(axis, group) {
    const g = createSVGElements("g");
    axis.ticks.forEach((tick) => {
      if (!axis.tick) return;
      const tl = cloneSVGElement(axis.tick);
      const height = Number(tl.getAttribute("height") || 0);
      const width = Number(tl.getAttribute("width") || 0);
      const offset = axis.line?.getAttribute("stroke-width") || 0;
      if (axis.isVertical) {
        tl.setAttribute("x", axis.position - offset);
        tl.setAttribute("y", tick.position - height / 2);
      } else {
        tl.setAttribute("x", tick.position - width / 2);
        tl.setAttribute("y", axis.position - offset);
      }
      g.appendChild(tl);
    });

    group.appendChild(g);
  }

  function drawGridLines(axis, group) {
    const g = createSVGElements("g");
    if (axis.grid) {
      axis.ticks.forEach((tick) => {
        if (!axis.grid) return;
        const tl = cloneSVGElement(axis.grid);
        if (axis.isVertical) {
          tl.setAttribute("x1", axis.gridStart);
          tl.setAttribute("x2", axis.gridStop);
          tl.setAttribute("y1", tick.position);
          tl.setAttribute("y2", tick.position);
        } else {
          tl.setAttribute("x1", tick.position);
          tl.setAttribute("x2", tick.position);
          tl.setAttribute("y1", axis.gridStart);
          tl.setAttribute("y2", axis.gridStop);
        }
        g.appendChild(tl);
      });
    }
    group.appendChild(g);
  }

  function drawLabels(axis, group) {
    const g = createSVGElements("g");
    group.appendChild(g);
    axis.ticks.forEach((tick) => {
      if (!axis.label) return;
      const text = cloneSVGElement(axis.label);
      text.innerHTML = tick.value;
      g.appendChild(text);
      let { width, height } = text.getBoundingClientRect();
      const tickWidth = axis.tick?.getAttribute("width") || 0;
      const tickHeight = axis.tick?.getAttribute("height") || 0;
      switch (axis.direction) {
        case "left":
          width += width / tick.value.toString().length;
          text.setAttribute("x", axis.position - width - tickWidth / 2);
          text.setAttribute("y", tick.position - height / 3);
          break;
        case "right":
          text.setAttribute("x", axis.position + tickWidth / 2 + 5);
          text.setAttribute("y", tick.position - height / 3);
          break;
        case "bottom":
          text.setAttribute("x", tick.position - width / 2);
          text.setAttribute("y", axis.position - height - tickHeight / 2);
          break;
        case "top":
          text.setAttribute("x", tick.position - width / 2);
          text.setAttribute("y", axis.position + tickHeight + 5);
          break;
        default:
          return;
      }
      flip(group, text);
    });
  }

  class ChartAxis extends HTMLElement {
    constructor() {
      super();
      this.parentElement.addEventListener("created", (e) => {
        this.render();
      });
    }

    connectedCallback() {}
    disconnectedCallback() {}

    render() {
      const group = this.parentElement.querySelector('g[name="axes"]');
      const grid = this.parentElement.querySelector('g[name="grid"]');
      this.setTickPositions();
      drawAxisLine(this, group);
      if (this.ticks.length > 0) {
        drawTicks(this, group);
        drawLabels(this, group);
        drawGridLines(this, grid);
      }
    }

    setTickPositions() {
      this.ticks = [];
      const ticks = parseInt(this.getAttribute("ticks") ?? 0);
      if (ticks <= 0) return;
      const tickSize = Math.round((this.max - this.min) / (ticks - 1));
      let value = this.min;
      let position = this.start;
      while (true) {
        position = ((value - this.min) / (this.max - this.min)) * (this.stop - this.start) + this.start;
        if (position > this.stop || isNaN(position)) break;
        this.ticks.push({ value, position });
        value += tickSize;
      }
    }

    get min() {
      return parseInt(this.getAttribute("min") ?? 0);
    }
    get max() {
      return parseInt(this.getAttribute("max") ?? 0);
    }
    get label() {
      return this.querySelector("text");
    }
    get grid() {
      return this.querySelector(`line[grid-line]`);
    }
    get line() {
      return this.querySelector("line[axis-line]");
    }
    get tick() {
      return this.querySelector("rect[axis-tick]");
    }
    get margin() {
      return this.parentElement.margin;
    }
    get height() {
      return this.parentElement.height;
    }
    get width() {
      return this.parentElement.width;
    }
  }

  class LeftAxis extends ChartAxis {
    constructor() {
      super();
    }

    get start() {
      return this.margin.bottom;
    }

    get stop() {
      return this.height - this.margin.top;
    }

    get position() {
      return this.margin.left;
    }

    get gridStart() {
      return this.margin.left;
    }

    get gridStop() {
      return this.width - this.margin.right;
    }

    get isVertical() {
      return true;
    }

    get direction() {
      return "left";
    }

    connectedCallback() {}
    disconnectedCallback() {}
  }

  class RightAxis extends ChartAxis {
    constructor() {
      super();
    }

    get start() {
      return this.margin.bottom;
    }

    get stop() {
      return this.height - this.margin.top;
    }

    get position() {
      return this.width - this.margin.right;
    }

    get gridStart() {
      return this.margin.left;
    }

    get gridStop() {
      return this.width - this.margin.right;
    }

    get isVertical() {
      return true;
    }

    get direction() {
      return "right";
    }

    connectedCallback() {}
    disconnectedCallback() {}
  }

  class TopAxis extends ChartAxis {
    constructor() {
      super();
    }

    get start() {
      return this.margin.left;
    }

    get stop() {
      return this.width - this.margin.right;
    }

    get position() {
      return this.height - this.margin.top;
    }

    get gridStart() {
      return this.margin.bottom;
    }

    get gridStop() {
      return this.height - this.margin.top;
    }

    get isVertical() {
      return false;
    }

    get direction() {
      return "top";
    }

    connectedCallback() {}
    disconnectedCallback() {}
  }

  class BottomAxis extends ChartAxis {
    constructor() {
      super();
    }

    get start() {
      return this.margin.left;
    }

    get stop() {
      return this.width - this.margin.right;
    }

    get position() {
      return this.margin.bottom;
    }

    get gridStart() {
      return this.margin.bottom;
    }

    get gridStop() {
      return this.height - this.margin.top;
    }

    get isVertical() {
      return false;
    }

    get direction() {
      return "bottom";
    }

    connectedCallback() {}
    disconnectedCallback() {}
  }

  class ChartEase extends HTMLElement {
    constructor() {
      super();
      this.setStyles();
      createSVG(this);
    }

    disconnectedCallback() {}

    get height() {
      return parseFloat(this.getAttribute("height") ?? HEIGHT);
    }
    get width() {
      return parseFloat(this.getAttribute("width") ?? WIDTH);
    }
    get margin() {
      const getAxisWidth = (name) => parseFloat(this.querySelector(name)?.getAttribute("width")) || 0;
      const getAxisHeight = (name) => parseFloat(this.querySelector(name)?.getAttribute("height")) || 0;
      const getMargin = (name) => parseFloat(this.getAttribute(name) ?? this.getAttribute("margin") ?? MARGIN);
      const margin = {
        top: getAxisHeight("top-axis") + getMargin("margin-top"),
        bottom: getAxisHeight("bottom-axis") + getMargin("margin-bottom"),
        left: getAxisWidth("left-axis") + getMargin("margin-left"),
        right: getAxisWidth("right-axis") + getMargin("margin-right"),
      };
      return margin;
    }

    setStyles() {
      this.style.lineHeight = 0;
    }
  }

  customElements.get("left-axis") ?? customElements.define("left-axis", LeftAxis);
  customElements.get("right-axis") ?? customElements.define("right-axis", RightAxis);
  customElements.get("top-axis") ?? customElements.define("top-axis", TopAxis);
  customElements.get("bottom-axis") ?? customElements.define("bottom-axis", BottomAxis);

  customElements.get("data-set") ?? customElements.define("data-set", DataSet);
  customElements.get("chart-ease") ?? customElements.define("chart-ease", ChartEase);
  customElements.get("candle-stick") ?? customElements.define("candle-stick", CandleStick);

  return ChartEase;

})();
//# sourceMappingURL=chart-ease.js.map
