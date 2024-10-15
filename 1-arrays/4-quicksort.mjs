import { numbers, strings } from "../../yt/test-data.mjs";
import { strings as orderStrings } from "./ordered-strings.mjs";

/** Sorts an array in ascending order.
 * @returns The sorted arrary.
 * @note Takes O(n log n) */
function quicksort(data) {
  if (data.length < 2) return data;
  let pivot = data[0];
  let less = [];
  let high = [];
  for (let i = 1; i < data.length; i++) {
    if (data[i] < pivot) {
      less.push(data[i]);
    } else {
      high.push(data[i]);
    }
  }
  return `${quicksort(less)} ${pivot} ${quicksort(high)}`;
}

const data = [64, 34, 25, 12, 22, 11, 90, 5];
const n = data.length;
console.time(`Quick sort of ${n} item(s) took`);
const sortedData = quicksort(data);
console.timeEnd(`Quick sort of ${n} item(s) took`);

console.log(
  "Sorting result: %s",
  sortedData.replaceAll("  ", " ").split(" ").toString()
);
