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
            item[key] =
              ((item[key] - group.min) / (group.max - group.min)) *
                (group.upperBound - group.lowerBound) +
              group.lowerBound;
          }
        });
      });
    });

    nGroups
      .filter((group) => group.flip)
      .forEach((group) => {
        flip(normalizedArr, group);
      });

    return normalizedArr;
  }

  function getKeysMin(arr, keys) {
    let min;
    for (let i = 1; i < arr.length; i++) {
      for (let j = 0; j < keys.length; j++) {
        min = getKeyMin(arr, keys[j]);
      }
    }
    return min;
  }

  function getKeysMax(arr, keys) {
    let max;
    for (let i = 1; i < arr.length; i++) {
      for (let j = 0; j < keys.length; j++) {
        max = getKeyMax(arr, keys[j]);
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
    return newElement;
  }

  function drawPoints(
    svg,
    pointTypes,
    data,
    originalData,
    ondraw
  ) {
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
        svg.appendChild(shape);
      });
    });
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
        .map((point, index) =>
          index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`
        )
        .join(" ")
    );
    path.removeAttribute("is");
  }

  const Width = 200;
  const Height = 200;
  const Margin = 10;

  class DataSet extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {}
    disconnectedCallback() {}

    draw(data, originalData) {
      const svg = this.parentElement.shadowRoot.querySelector("svg");
      drawPath(svg, this.pathType, data);
      drawPoints(svg, this.pointTypes, data, originalData, this["ondraw"]);
    }

    set data(originalData) {
      const axesArr = this["axes"] ? this["axes"] : [];
      let axes =
        axesArr.length > 0
          ? axesArr.map(this.getAxesObj)
          : this.getDefaultAxesObj();
      const data = normalize(originalData, axes);
      this.draw(data, originalData);
    }

    getAxesObj(axis) {
      const margin = axis.margin || Margin;
      return {
        cols: axis.cols,
        lowerBound: axis.marginStart || margin,
        upperBound: axis.length - (axis.marginEnd || margin),
        flip: axis.flip,
        length: axis.length,
      };
    }
    getDefaultAxesObj() {
      const width = Number(this.parentElement.getAttribute("width") || Width);
      const height = Number(this.parentElement.getAttribute("height") || Height);
      const margin = Number(this.parentElement.getAttribute("margin") || Margin);
      return [
        {
          cols: ["x"],
          lowerBound: margin,
          upperBound: width - margin,
          length: width,
        },
        {
          cols: ["y"],
          lowerBound: margin,
          upperBound: height - margin,
          length: height,
          flip: true,
        },
      ];
    }

    get pathType() {
      return this.querySelector(`path[is="path-type"]`);
    }

    get pointTypes() {
      return this.querySelectorAll(`:not(path[is="path-type"]):not(template)`);
    }
  }

  function createSVGElements(tagName) {
    return document.createElementNS("http://www.w3.org/2000/svg", tagName);
  }

  class CandleStick extends HTMLElement {
    constructor() {
      super();

      this.dataSet = document.createElement("data-set");
      this.dataSet.appendChild(createSVGElements("line"));
      this.dataSet.appendChild(createSVGElements("rect"));
      this.parentElement.insertBefore(this.dataSet, this);
      this.parentElement.removeChild(this);
      this.adjust();
    }

    connectedCallback() {}
    disconnectedCallback() {}

    adjust() {
      this.dataSet.ondraw = ({ shape, row }) => {
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
      this.dataSet.axes = [
        { cols: ["x"], length: 200, margin: 10 },
        {
          cols: ["low", "open", "close", "high"],
          length: 200,
          margin: 10,
          flip: true,
        },
      ];
    }

    set data(data) {
      this.dataSet.data = data;
    }
  }

  function createSVG(width, height) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    //if (id) svg.setAttribute("id", id);
    //if (className) svg.setAttribute("class", className);
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    return svg;
  }

  class ChartIt extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      const template = this.querySelector("template");
      this.dataSet = this.querySelector("data-set");
      this.svg = createSVG(this.width, this.height);
      this.shadowRoot.appendChild(this.svg);
      if (template) this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    disconnectedCallback() {}

    set axes(axes) {
      this.dataSet.axes = axes;
    }
    set ondraw(ondraw) {
      this.dataSet.ondraw = ondraw;
    }
    set data(data) {
      this.dataSet.data = data;
    }

    get width() {
      return this.getAttribute("width") || Width;
    }
    get height() {
      return this.getAttribute("height") || Height;
    }
  }

  customElements.get("data-set") || customElements.define("data-set", DataSet);
  customElements.get("chart-it") || customElements.define("chart-it", ChartIt);
  customElements.get("candle-stick") ||
    customElements.define("candle-stick", CandleStick);

  return ChartIt;

})();
//# sourceMappingURL=chart-it.js.map
