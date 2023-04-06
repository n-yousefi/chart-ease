export default function normalize(arr, normalizeGroups) {
  const normalizedArr = arr.map((item) => {
    return { ...item };
  });

  const arrKeys = Object.keys(arr[0]);
  normalizedArr.forEach((item) => {
    normalizeGroups.forEach((group) => {
      arrKeys.forEach((key) => {
        if (group.cols.includes(key)) {
          item[key] = Math.round(normalizeNumber(item[key], group));
        }
      });
    });
  });

  return normalizedArr;
}

function normalizeNumber(num, group) {
  return ((num - group.min) / (group.max - group.min)) * (group.stop - group.start) + group.start;
}
