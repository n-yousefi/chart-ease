const axesStore = {
  data: {
    state: "null",
    cols: [],
  },
  setCols(cols) {
    this.data.cols = cols;
    this.dispatchChangeEvent();
  },
  addChangeListener(callback) {
    this.changeListeners.push(callback);
  },
  dispatchChangeEvent() {
    this.changeListeners.forEach((callback) => callback(this.data));
  },
  changeListeners: [],
};

export default axesStore;
