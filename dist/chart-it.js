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
      return Number(this.chartIt.getAttribute("height") || 200);
    }

    get width() {
      return Number(this.chartIt.getAttribute("width") || 200);
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
      const margin = Number(this.chartIt.getAttribute("margin") || 10);
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

    createSVG() {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      if (this.id) svg.setAttribute("id", this.id);
      if (this.class) svg.setAttribute("class", this.class);
      svg.setAttribute("width", this.width);
      svg.setAttribute("height", this.height);
      return svg;
    }
  }

  function dispatchOnDrawEvent(element, row, orginalRow, index) {
    const onDraw = new CustomEvent("draw", {
      bubbles: true,
      detail: {
        element,
        point: {
          row,
          orginalRow,
        },
        index,
      },
    });
    element.dispatchEvent(onDraw);
  }

  function cloneElement(element) {
    const tag = document.createElementNS(
      "http://www.w3.org/2000/svg",
      element.tagName.toLowerCase()
    );
    Array.from(element.attributes).forEach((attr) =>
      tag.setAttribute(attr.name, attr.value)
    );
    tag.style.cssText = element.style.cssText;
    return tag;
  }

  function drawPoints(svg, pointTypes, data) {
    data.forEach((point, index) => {
      pointTypes.forEach((pointType) => {
        //const tag = pointType.cloneNode(true);
        const tag = cloneElement(pointType);
        if (!tag.hasAttribute("ondraw"))
          setDefaultPosition(tag, point.x, point.y);
        svg.appendChild(tag);
        dispatchOnDrawEvent(tag, point, null, index);
      });
    });
  }

  function setDefaultPosition(tag, x, y) {
    switch (tag.tagName.toLowerCase()) {
      case "rect":
        tag.setAttribute("x", x - Number(tag.getAttribute("width")) / 2);
        tag.setAttribute("y", y - Number(tag.getAttribute("height")) / 2);
        break;
      case "circle":
      case "ellipse":
      default:
        tag.setAttribute("cx", x);
        tag.setAttribute("cy", y);
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

    draw(data) {
      const svg = this.element.createSVG();
      const pathType = this.element.pathType;
      const pointTypes = this.element.pointTypes;
      //this.outerHTML = svg.outerHTML;
      this.parentElement.insertBefore(svg, this);
      drawPath(svg, pathType, data);
      drawPoints(svg, pointTypes, data);
      this.parentElement.removeChild(this);
    }

    set data(data) {
      const nd = normalize(data, this.element.axes);
      this.draw(nd);
    }
  }

  customElements.get("chart-it") || customElements.define("chart-it", ChartIt);

})();
//# sourceMappingURL=chart-it.js.map
