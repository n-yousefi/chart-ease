export default function normalize(arr, normalizeKeys) {
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
