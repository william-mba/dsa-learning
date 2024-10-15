import { numbers, strings } from "../../yt/test-data.mjs";
import { strings as orderStrings } from "./ordered-strings.mjs";
import { numbers as orderNumbers } from "./ordered-numbers.mjs";

/**
 * Sorts an array of numbers/strings in ascending order
 * @retuns The sorted array
 * @note Takes O(n log n)
 */
function mergesort_debug(data) {
  /*
    Given an array with values to sorted

    1. If the array has less than 2 values, return it
    2. Else, create a variable called middle to store the result of the division of the array by 2 (using floor division)
    4. Split the unsorted array and store each part in variable named leftHalf and rightHalf
    5. Create two variables named i and j and initialize them with value 0
    6. Create an empty array variable named result or just reset the unsorted array to empty
    7. loop over leftHalf and rightHalf as long as i is less than the length of leftHalf and j is less than the length of rightHalf
        a. if value at index i in leftHalf is less than value at index j in rightHalf,
            1. put value at index i in leftHalf into result
        b. else, put value at index j in rightHalf into result
    8. copy all remaining values in leftHalf and rightHalf into result
    9. return result
     */

  if (data.length < 2) return data;

  let middle = Math.floor(data.length / 2);
  let leftHalf = mergesort(data.slice(0, middle));
  let rightHalf = mergesort(data.slice(middle));

  let i = 0;
  let j = 0;
  data = [];
  console.log("left: %s; right: %s", leftHalf.toString(), rightHalf.toString());

  while (i < leftHalf.length && j < rightHalf.length) {
    if (leftHalf[i] < rightHalf[j]) {
      data.push(leftHalf[i]);
      i++;
    } else {
      data.push(rightHalf[j]);
      j++;
    }
  }

  while (i < leftHalf.length) {
    data.push(leftHalf[i]);
    i++;
  }

  while (j < rightHalf.length) {
    data.push(rightHalf[j]);
    j++;
  }

  return data;
}

/**
 * Sorts an array of numbers/strings in ascending order
 * @retuns The sorted array
 * @note Takes O(n log n)
 */
function mergesort(data) {
  /*
    Given an array with values to sorted

    1. If the array has less than 2 values, return it
    2. Else, create a variable called middle to store the result of the division of the array by 2 (using floor division)
    4. Split the unsorted array and store each part in variable named leftHalf and rightHalf
    5. Create two variables named i and j and initialize them with value 0
    6. Create an empty array variable named result or just reset the unsorted array to empty
    7. loop over leftHalf and rightHalf as long as i is less than the length of leftHalf and j is less than the length of rightHalf
        a. if value at index i in leftHalf is less than value at index j in rightHalf,
            1. put value at index i in leftHalf into result
        b. else, put value at index j in rightHalf into result
    8. copy all remaining values in leftHalf and rightHalf into result
    9. return result
     */

  if (data.length < 2) return data;

  let middle = Math.floor(data.length / 2);
  let leftHalf = mergesort(data.slice(0, middle));
  let rightHalf = mergesort(data.slice(middle));

  let i = 0;
  let j = 0;
  data = [];

  while (i < leftHalf.length && j < rightHalf.length) {
    if (leftHalf[i] < rightHalf[j]) {
      data.push(leftHalf[i]);
      i++;
    } else {
      data.push(rightHalf[j]);
      j++;
    }
  }

  while (i < leftHalf.length) {
    data.push(leftHalf[i]);
    i++;
  }

  while (j < rightHalf.length) {
    data.push(rightHalf[j]);
    j++;
  }

  return data;
}
const data = [64, 34, 25, 12, 22, 11, 90, 5];
const n = data.length;
console.time(`Merge sort of ${n} item(s) took`);
const sortedData = mergesort(data);
console.timeEnd(`Merge sort of ${n} item(s) took`);
// console.log("Sorting result: %s", sortedData.toString());
