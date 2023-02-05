export default function dispatchOnDrawEvent(element, row, orginalRow, index) {
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
