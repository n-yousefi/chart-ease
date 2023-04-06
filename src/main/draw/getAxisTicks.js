export function getAxisTicks(min, max, count, start, stop) {
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
