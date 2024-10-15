/**
 * Sort an array of non negative integers in ascending order
 */
function countingsort_debug(data) {
  /*
    1. Create an empty counter array
    2. Create a variable to store the max value existing in the unsorted array
    3. Initialize the counter array with 0 from index 0 to the index corresponding to the max value get above
    4. Iterate over the unsorted array
        a. For each item, increment the value in the counter array at index corresponding to the item value
    5. Iterate over the counter array
        a. For each item, while it value is greater than 0, push the item index in the sorted array
        b. Decrement the item value in the counter array
    6. Return the sorted array
   */
  let counter = [];

  for (let i = 0; i <= Math.max(...data); i++) {
    counter.push(0);
  }
  console.log(
    "Counter before: length=%d; data=%s",
    counter.length,
    counter.toString()
  );

  for (let i = 0; i < data.length; i++) {
    counter[data[i]] += 1;
  }

  console.log(
    "Counter after: length=%d; data=%s",
    counter.length,
    counter.toString()
  );
  data = [];
  for (let i = 0; i < counter.length; i++) {
    while (counter[i] > 0) {
      data.push(i);
      counter[i] -= 1;
    }
  }
  return data;
}

/**
 * Sort an array of non negative integers in ascending order
 * @returns The array sorted
 * @note Takes O(k*n^k*n)
 */
function countingsort(data) {
  let counter = [];

  for (let i = 0; i <= Math.max(...data); i++) {
    counter.push(0);
  }

  for (let i = 0; i < data.length; i++) {
    counter[data[i]] += 1;
  }

  data = [];
  for (let i = 0; i < counter.length; i++) {
    while (counter[i] > 0) {
      data.push(i);
      counter[i] -= 1;
    }
  }
  return data;
}
const data = [4, 2, 2, 6, 3, 3, 1, 6, 5, 2, 3];
console.time("Counting sort");
const sortedData = countingsort(data);
console.timeEnd("Counting sort");

console.warn(sortedData.toString());
