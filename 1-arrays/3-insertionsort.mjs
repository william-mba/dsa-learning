function insertionsort_debug(data) {
  let n = data.length;
  console.warn("Data: length=%d set=[%s]", n, data.toString());
  for (let i = 1; i < n; i++) {
    let j = i;
    console.group("for i=%d; j=%d", i, j);
    let swapped = false;
    while (j > 0) {
      console.group("while j=%d > 0", j);
      console.group("if data[j - 1]=%d > data[j]=%d", data[j - 1], data[j]);
      if (data[j - 1] > data[j]) {
        const lowest = data[j];
        const greatest = data[j - 1];
        console.warn(
          "Swap: data[%d]=%d <-> data[%d]=%d",
          j - 1,
          greatest,
          j,
          lowest
        );
        console.log("Before: [%s]", data.toString());
        data[j - 1] = lowest;
        data[j] = greatest;
        swapped = true;
      }
      console.log("Current: [%s]", data.toString());
      console.groupEnd();
      j--;
      console.groupEnd();
      if (!swapped) break;
    }
    console.groupEnd();
  }
  return data;
}

function insertionsort(data) {
  let n = data.length;
  for (let i = 1; i < n; i++) {
    let j = i;
    let swapped = false;
    while (j > 0) {
      if (data[j - 1] > data[j]) {
        const lowest = data[j];
        const greatest = data[j - 1];
        data[j - 1] = lowest;
        data[j] = greatest;
        swapped = true;
      }
      j--;
      if (!swapped) break;
    }
  }
  return data;
}
const data = [64, 34, 25, 12, 22, 11, 90, 5];
console.time("Insertion sort");
const sortedData = insertionsort(data);
console.timeEnd("Insertion sort");

console.warn(sortedData.toString());
