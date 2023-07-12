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

  function drawDataSet(dataset, data, originalData) {
    const g = dataset.parentElement.querySelector('g[name="dataset"]');
    Array.prototype.slice.call(dataset.children).forEach((child) => {
      if (child.hasAttribute("path-type")) drawPath(g, child, data);
      else drawPoints(g, dataset, data, child, originalData);
    });
  }

  function drawPath(g, pathType, data) {
    if (!pathType) return;
    const path = cloneSVGElement(pathType);
    loadPathData(path, data);
    g.appendChild(path);
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

  function drawPoints(g, dataset, data, child, originalData) {
    const element = createSVGElements("g");
    data.forEach((row, index) => {
      const ondraw = dataset["ondraw"];
      const shape = cloneSVGElement(child);
      if (!ondraw) setDefaultPosition(shape, row.x, row.y);
      else
        ondraw({
          shape,
          row,
          originalRow: originalData[index],
          index,
        });
      element.appendChild(shape);
      flip(g, shape);
    });
    g.appendChild(element);
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

    set data(originalData) {
      const normalizeGroups = this.getNormalizeGroups();
      setGroupsMinMax(originalData, normalizeGroups);
      const data = normalize(originalData, normalizeGroups);
      drawDataSet(this, data, originalData);
      this.parentElement.removeChild(this);
    }

    getNormalizeGroups() {
      const margin = this.parentElement.margin;
      let h = {
        cols: this.getAttribute("hAxis") ? this.getAttribute("hAxis").split(",") : ["x"],
        start: margin.left,
        stop: this.parentElement.width - margin.right,
      };
      let hAxis =
        this.parentElement.querySelector("bottom-axis") ?? this.parentElement.querySelector("top-axis");
      if (hAxis) {
        h = {
          ...h,
          min: hAxis.min,
          max: hAxis.max,
        };
      }
      let v = {
        cols: this.getAttribute("vAxis") ? this.getAttribute("vAxis").split(",") : ["y"],
        start: margin.bottom,
        stop: this.parentElement.height - margin.top,
      };
      let vAxis =
        this.parentElement.querySelector("left-axis") ?? this.parentElement.querySelector("right-axis");
      if (vAxis) {
        v = {
          ...v,
          min: vAxis.min,
          max: vAxis.max,
        };
      }
      return [h, v];
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

  function createSVG(width, height) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("transform", "scale(1,-1)");
    const gDataSet = createSVGElements("g");
    gDataSet.setAttribute("name", "dataset");
    svg.appendChild(gDataSet);

    return svg;
  }

  function drawAxisLine(axis) {
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
    axis.parentElement.svg.appendChild(g);
  }

  function drawTicks(axis) {
    const g = createSVGElements("g");
    axis.ticks.forEach((tick) => {
      if (!axis.tick) return;
      const tl = cloneSVGElement(axis.tick);
      const offset = Number(tl.getAttribute("data-offset") || 0);
      const height = Number(tl.getAttribute("height") || 0);
      const width = Number(tl.getAttribute("width") || 0);
      if (axis.isVertical) {
        tl.setAttribute("x", axis.position - offset);
        tl.setAttribute("y", tick.position - height / 2);
      } else {
        tl.setAttribute("x", tick.position - width / 2);
        tl.setAttribute("y", axis.position - offset);
      }
      g.appendChild(tl);
    });

    axis.parentElement.svg.appendChild(g);
  }

  function drawGridLines(axis) {
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
    axis.parentElement.svg.appendChild(g);
  }

  function drawLabels(axis) {
    const svg = axis.parentElement.svg;
    const g = createSVGElements("g");
    svg.appendChild(g);
    axis.ticks.forEach((tick) => {
      if (!axis.label) return;
      const text = cloneSVGElement(axis.label);
      text.innerHTML = tick.value;
      g.appendChild(text);
      const { width, height } = text.getBoundingClientRect();
      switch (axis.direction) {
        case "right":
          text.setAttribute("x", axis.position + 7);
          text.setAttribute("y", tick.position - height / 3);
          break;
        case "left":
          text.setAttribute("x", axis.position - width - 7);
          text.setAttribute("y", tick.position - height / 3);
          break;
        case "top":
          text.setAttribute("x", tick.position - width / 2);
          text.setAttribute("y", axis.position + 7);
          break;
        case "bottom":
          text.setAttribute("x", tick.position - width / 2);
          text.setAttribute("y", axis.position - height);
          break;
        default:
          return;
      }
      flip(svg, text);
    });
  }

  class ChartAxis extends HTMLElement {
    constructor() {
      super();
      this.init();
      this.parentElement.addEventListener("created", (e) => {
        this.render();
      });
    }

    connectedCallback() {}
    disconnectedCallback() {}

    render() {
      this.setTickPositions();
      drawAxisLine(this);
      if (this.ticks.length > 0) {
        drawTicks(this);
        drawLabels(this);
        drawGridLines(this);
      }
    }

    init() {
      const pE = this.parentElement;
      this.height = parseFloat(pE.getAttribute("height") ?? HEIGHT);
      this.width = parseFloat(pE.getAttribute("width") ?? WIDTH);
      this.margin = {
        top: parseFloat(pE.getAttribute("margin-top") ?? pE.getAttribute("margin") ?? MARGIN),
        bottom: parseFloat(pE.getAttribute("margin-bottom") ?? pE.getAttribute("margin") ?? MARGIN),
        left: parseFloat(pE.getAttribute("margin-left") ?? pE.getAttribute("margin") ?? MARGIN),
        right: parseFloat(pE.getAttribute("margin-right") ?? pE.getAttribute("margin") ?? MARGIN),
      };
      this.min = parseInt(this.getAttribute("min") ?? 0);
      this.max = parseInt(this.getAttribute("max") ?? 0);
      this.label = this.querySelector("text");
      this.grid = this.querySelector(`line[grid-line]`);
      this.line = this.querySelector("line[axis-line]");
      this.tick = this.querySelector("rect[axis-tick]");
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
        if (position > this.stop) break;
        this.ticks.push({ value, position });
        value += tickSize;
      }
    }
  }

  class LeftAxis extends ChartAxis {
    constructor() {
      super();
      this.start = this.margin.bottom;
      this.stop = this.height - this.margin.top;
      this.position = this.margin.left;
      this.gridStart = this.margin.left;
      this.gridStop = this.width - this.margin.right;
      this.isVertical = true;
      this.direction = "left";
    }

    connectedCallback() {}
    disconnectedCallback() {}
  }

  class RightAxis extends ChartAxis {
    constructor() {
      super();
      this.start = this.margin.bottom;
      this.stop = this.height - this.margin.top;
      this.position = this.width - this.margin.right;
      this.gridStart = this.margin.left;
      this.gridStop = this.width - this.margin.right;
      this.isVertical = true;
      this.direction = "right";
    }

    connectedCallback() {}
    disconnectedCallback() {}
  }

  class TopAxis extends ChartAxis {
    constructor() {
      super();
      this.start = this.margin.left;
      this.stop = this.width - this.margin.right;
      this.position = this.height - this.margin.top;
      this.gridStart = this.margin.bottom;
      this.gridStop = this.height - this.margin.top;
      this.isVertical = false;
      this.direction = "top";
    }

    connectedCallback() {}
    disconnectedCallback() {}
  }

  class BottomAxis extends ChartAxis {
    constructor() {
      super();
      this.start = this.margin.left;
      this.stop = this.width - this.margin.right;
      this.position = this.margin.bottom;
      this.gridStart = this.margin.bottom;
      this.gridStop = this.height - this.margin.top;
      this.isVertical = false;
      this.direction = "bottom";
    }

    connectedCallback() {}
    disconnectedCallback() {}
  }

  class ChartEase extends HTMLElement {
    constructor() {
      super();
      this.setStyles();
      this.height = parseFloat(this.getAttribute("height") ?? HEIGHT);
      this.width = parseFloat(this.getAttribute("width") ?? WIDTH);
      this.margin = {
        top: parseFloat(this.getAttribute("margin-top") ?? this.getAttribute("margin") ?? MARGIN),
        bottom: parseFloat(this.getAttribute("margin-bottom") ?? this.getAttribute("margin") ?? MARGIN),
        left: parseFloat(this.getAttribute("margin-left") ?? this.getAttribute("margin") ?? MARGIN),
        right: parseFloat(this.getAttribute("margin-right") ?? this.getAttribute("margin") ?? MARGIN),
      };
      this.svg = createSVG(this.width, this.height);
      this.appendChild(this.svg);
      this.dispatchEvent(new Event("created"));
    }

    disconnectedCallback() {}

    set ondraw(ondraw) {
      this.querySelector("data-set").ondraw = ondraw;
    }
    set data(data) {
      this.querySelector("data-set").data = data;
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
