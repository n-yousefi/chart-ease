export default function setGroupsMinMax(data, groups) {
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
