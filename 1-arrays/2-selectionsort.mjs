function selectionsort_debug(data) {
  let n = data.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    let swapped = false;
    for (let j = i + 1; j < n; j++) {
      console.log(
        "for i=%d -> for j=%d: if %d < %d",
        i,
        j,
        data[j],
        data[minIndex]
      );
      if (data[j] < data[minIndex]) {
        console.log("Min index: current %d -> new %d", minIndex, j);
        minIndex = j;
        swapped = true;
      }
    }
    if (swapped) {
      const current = data[i];
      const minValue = data[minIndex];
      console.warn("Before swap: %s", data.toString());
      console.log(
        "Current at %d = %d; Min at %d = %d",
        i,
        current,
        minIndex,
        minValue
      );
      data[i] = minValue;
      data[minIndex] = current;
      console.warn("After swap: %s", data.toString());
    }
  }
  return data;
}

function selectionsort(data) {
  let n = data.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    let swapped = false;
    for (let j = i + 1; j < n; j++) {
      if (data[j] < data[minIndex]) {
        minIndex = j;
        swapped = true;
      }
    }
    if (swapped) {
      const currentValue = data[i];
      const minValue = data[minIndex];
      data[i] = minValue;
      data[minIndex] = currentValue;
    }
  }
  return data;
}
const data = [64, 34, 25, 12, 22, 11, 90, 5];

console.time("Selection sort");
const sortedData = selectionsort(data);
console.timeEnd("Selection sort");

console.warn(sortedData.toString());
