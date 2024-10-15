function radixsort_debug(data) {
  let radixSet = [];
  while (radixSet.length < 10) {
    radixSet.push([]);
  }
  let exp = 1;
  let max = Math.max(...data);
  console.log(data.toString());

  while (Math.floor(max / exp) > 0) {
    while (data.length > 0) {
      const val = data.pop();
      // find the modulo to be use as index
      const radixIndex = Math.floor(val / exp) % 10;
      radixSet[radixIndex].push(val);
    }
    for (let i = 0; i < radixSet.length; i++) {
      while (radixSet[i].length > 0) {
        data.push(radixSet[i].pop());
      }
    }
    exp *= 10;
  }
  return data;
}

/**
 * Sorts an array on non negative integer
 * @returns the sorted array
 * @note takes O(k*m*p*n^n) O(n^2)
 * k = 10 The radix indexes
 * m = n The time take to find the max value
 * p = the number of units in the max value determining the number of while loop
 * n = the number of items
 */
function radixsort(data) {
  let radixSet = [];
  while (radixSet.length < 10) {
    radixSet.push([]);
  }

  let exp = 1;
  let max = Math.max(...data);

  while (Math.floor(max / exp) > 0) {
    while (data.length > 0) {
      const val = data.pop();
      // find the modulo to be use as index
      const radixIndex = Math.floor(val / exp) % 10;
      radixSet[radixIndex].push(val);
    }
    for (let i = 0; i < radixSet.length; i++) {
      while (radixSet[i].length > 0) {
        data.push(radixSet[i].pop());
      }
    }
    exp *= 10;
  }
  return data;
}

function radixsort2(data) {
  let radixArray = [];
  while (radixArray.length < 10) {
    radixArray.push([]);
  }

  const max = Math.max(...data);
  let exp = 1;
  while (Math.floor(max / exp) > 0) {
    while (data.length > 0) {
      let value = data.pop();
      let radixIndex = Math.floor(value / exp) % 10;

      radixArray[radixIndex].push(value);
    }
    for (let i = 0; i < radixArray.length; i++) {
      while (radixArray[i].length > 0) {
        data.push(radixArray[i].pop());
      }
    }
    exp *= 10;
  }
  return data;
}

const data = [170, 45, 75, 90, 802, 24, 2, 66, 1];
console.time("Radix sort");
const sortedData = radixsort2(data);
console.timeEnd("Radix sort");

console.warn(sortedData.toString());
