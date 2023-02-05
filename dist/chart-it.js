(function () {
  'use strict';

  function normalize(arr, normalizeKeys) {
    const normalizedArr = arr.map((item) => {
      return { ...item };
    });
    const nGroups = [];
    normalizeKeys.forEach((nGroup) => {
      nGroups.push({
        cols: nGroup.cols,
        min: getKeysMin(arr, nGroup.cols),
        max: getKeysMax(arr, nGroup.cols),
        lowerBound: nGroup.lowerBound,
        upperBound: nGroup.upperBound,
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

    return flipY(normalizedArr, nGroups[1].lowerBound);
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

  function flipY(arr, yLowerBound) {
    const keys = Object.keys(arr[0]).filter((x) => x !== "x");
    let max = getKeysMax(arr, keys);
    const newArr = arr.map((item) => {
      const res = { x: item.x };
      keys.forEach((key) => {
        res[key] = max - item[key] + yLowerBound;
      });
      return res;
    });
    return newArr;
  }

  class Element {
    constructor(chartIt) {
      this.chartIt = chartIt;
    }

    get pathType() {
      return this.chartIt.querySelector(`path[is="path-type"]`);
    }

    get pointTypes() {
      return this.chartIt.querySelectorAll(`:not(path[is="path-type"])`);
    }

    get axes() {
      return [
        {
          cols: this.hAxis,
          lowerBound: this.margins.left,
          upperBound: this.width - this.margins.right,
        },
        {
          cols: this.vAxis,
          lowerBound: this.margins.top,
          upperBound: this.height - this.margins.bottom,
        },
      ];
    }

    get height() {
      return Number(this.chartIt.getAttribute("height") ?? 150);
    }

    get width() {
      return Number(this.chartIt.getAttribute("width") ?? 150);
    }

    get hAxis() {
      const axis = this.chartIt.getAttribute("horizontalAxis") || "x";
      return axis.split(",").filter((q) => q);
    }

    get vAxis() {
      const axis = this.chartIt.getAttribute("verticalAxis") || "y";
      return axis.split(",").filter((q) => q);
    }

    get margins() {
      const margin = Number(this.chartIt.getAttribute("margin") || 20);
      const marginLeft = Number(
        this.chartIt.getAttribute("marginLeft") || margin
      );
      const marginRight = Number(
        this.chartIt.getAttribute("marginRight") || margin
      );
      const marginTop = Number(this.chartIt.getAttribute("marginTop") || margin);
      const marginBottom = Number(
        this.chartIt.getAttribute("marginBottom") || margin
      );
      return {
        left: marginLeft,
        right: marginRight,
        top: marginTop,
        bottom: marginBottom,
      };
    }

    get id() {
      return this.chartIt.getAttribute("id");
    }

    get class() {
      return this.chartIt.getAttribute("clas");
    }
  }

  function createSVG(element) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    if (element.id) svg.setAttribute("id", element.id);
    if (element.class) svg.setAttribute("class", element.class);
    svg.setAttribute("width", element.width);
    svg.setAttribute("height", element.height);
    return svg;
  }

  function cloneElement(element) {
    const tag = document.createElementNS(
      "http://www.w3.org/2000/svg",
      element.tagName.toLowerCase()
    );
    Array.from(element.attributes).forEach((attr) => {
      if (attr.value) tag.setAttribute(attr.name, attr.value);
    });
    if (tag.style.cssText) tag.style.cssText = element.style.cssText;
    return tag;
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
        const shape = cloneElement(pointType);
        if (!ondraw) setDefaultPosition(shape, row.x, row.y);
        else
          ondraw({
            shape,
            row,
            orginalRow: originalData[index],
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

  function drawPath(svg, pathType, data) {
    if (!pathType) return;
    const path = cloneElement(pathType);
    loadPathData(path, data);
    svg.appendChild(path);
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

  class ChartIt extends HTMLElement {
    constructor() {
      super();
      this.element = new Element(this);
    }

    connectedCallback() {}
    disconnectedCallback() {}

    draw(data, originalData) {
      const svg = createSVG(this.element);
      const pathType = this.element.pathType;
      const pointTypes = this.element.pointTypes;
      this.parentElement.insertBefore(svg, this);
      drawPath(svg, pathType, data);
      drawPoints(svg, pointTypes, data, originalData, this["ondraw"]);
      this.parentElement.removeChild(this);
    }

    set data(originalData) {
      const data = normalize(originalData, this.element.axes);
      this.draw(data, originalData);
    }
  }

  customElements.get("chart-it") || customElements.define("chart-it", ChartIt);

})();
//# sourceMappingURL=chart-it.js.map
