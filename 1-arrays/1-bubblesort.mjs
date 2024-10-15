function bubblesort_debug(data) {
  let n = data.length - 1;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i; j++) {
      console.log(
        "for i=%d -> for j=%d: if %d > %d",
        i,
        j,
        data[j],
        data[j + 1]
      );
      if (data[j] > data[j + 1]) {
        const highest = data[j];
        const lowest = data[j + 1];
        data[j] = lowest;
        data[j + 1] = highest;
        swapped = true;
        console.log("swapped");
      }
    }
    if (!swapped) break;
  }
  return data;
}

function bubblesort(data) {
  let n = data.length - 1;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i; j++) {
      if (data[j] > data[j + 1]) {
        const highest = data[j];
        const lowest = data[j + 1];
        data[j] = lowest;
        data[j + 1] = highest;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return data;
}

const data = [64, 34, 25, 12, 22, 11, 90, 5];

console.time("Bubble sort");
const sortedData = bubblesort(data);
console.timeEnd("Bubble sort");

console.log(sortedData.toString());
