// import { strings as data } from "./ordered-strings.mjs";
import { numbers as data } from "./ordered-numbers.mjs";

/**
 * Find the index of a value in a given array.
 * @return the index if found. Otherwise, return -1
 */
function binarysearch(data, value) {
  let first = 0;
  let last = data.length - 1;

  while (first <= last) {
    let middle = Math.floor((first + last) / 2);
    if (data[middle] == value) {
      return middle;
    } else if (data[middle] < value) {
      first = middle + 1;
    } else {
      last = middle - 1;
    }
  }
  return -1;
}

const n = data.length;
console.time(`Binary search in ${n} item(s) took`);
const index = binarysearch(data, 13);
console.timeEnd(`Binary search in ${n} item(s) took`);
console.log("Result: %d", index);
