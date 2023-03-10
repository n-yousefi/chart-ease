export default function normalize(arr, normalizeKeys) {
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

  const axesTicks = [];
  nGroups.forEach((group) => {
    const axisTicks = [];
    const ticks = getTicks(group.min, group.max, group.ticks);
    ticks.forEach((value) => {
      axisTicks.push({ value, position: normalizeNumber(value, group) });
    });
    axesTicks.push(axisTicks);
  });

  const arrKeys = Object.keys(arr[0]);
  normalizedArr.forEach((item) => {
    nGroups.forEach((group) => {
      arrKeys.forEach((key) => {
        if (group.cols.includes(key)) {
          item[key] = normalizeNumber(item[key], group);
          item[key] = Math.round(item[key]);
        }
      });
    });
  });

  nGroups
    .filter((group) => group.flip)
    .forEach((group) => {
      flip(normalizedArr, group);
    });

  return { data: normalizedArr, ticks: axesTicks };
}

function getTicks(min, max, count) {
  const size = Math.round((max - min) / (count - 1));
  const result = [];
  for (let i = 0; i <= count; i++) {
    result.push([min + i * size]);
  }
  return result;
}

function normalizeNumber(num, group) {
  return ((num - group.min) / (group.max - group.min)) * (group.upperBound - group.lowerBound) + group.lowerBound;
}

function getKeysMin(arr, keys) {
  let min = Number.MAX_VALUE;
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < keys.length; j++) {
      const keyMin = getKeyMin(arr, keys[j]);
      if (min > keyMin) min = keyMin;
    }
  }
  return min;
}

function getKeysMax(arr, keys) {
  let max = Number.MIN_VALUE;
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < keys.length; j++) {
      const keyMax = getKeyMax(arr, keys[j]);
      if (keyMax > max) max = keyMax;
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
