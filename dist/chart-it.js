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

  class Element {
    constructor(chartIt) {
      this.chartIt = chartIt;
      this.defaultWidth = 200;
      this.defaultHeight = 200;
      this.defaultMargin = 10;
    }

    get axes() {
      const axesArr = this.chartIt["axes"] ? this.chartIt["axes"] : [];
      if (axesArr.length > 0) {
        return axesArr.map((axis) => {
          const margin = axis.margin || this.defaultMargin;
          return {
            cols: axis.cols,
            lowerBound: axis.marginStart || margin,
            upperBound: axis.length - (axis.marginEnd || margin),
            flip: axis.flip,
            length: axis.length,
          };
        });
      }
      return [
        {
          cols: ["x"],
          lowerBound: this.defaultMargin,
          upperBound: this.defaultWidth - this.defaultMargin,
          length: this.defaultWidth,
        },
        {
          cols: ["y"],
          lowerBound: this.defaultMargin,
          upperBound: this.defaultHeight - this.defaultMargin,
          length: this.defaultHeight,
          flip: true,
        },
      ];
    }

    get width() {
      return this.axes[1].length || this.defaultWidth;
    }

    get height() {
      return this.axes[0].length || this.defaultHeight;
    }

    get id() {
      return this.chartIt.getAttribute("id");
    }

    get class() {
      return this.chartIt.getAttribute("class");
    }

    get pathType() {
      return this.chartIt.querySelector(`path[is="path-type"]`);
    }

    get pointTypes() {
      return this.chartIt.querySelectorAll(`:not(path[is="path-type"])`);
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
