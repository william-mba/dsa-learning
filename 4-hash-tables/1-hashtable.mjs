"use strict";

import { numbers, strings } from "../../yt/test-data.mjs";

class HashTable {
  #set = [];
  #limit = 100;
  constructor() {}

  get size() {
    let sum = 0;
    let counter = this.#set.length - 1;

    while (counter >= 0) {
      let bucket = this.#set[counter];
      if (bucket) {
        if (typeof bucket === "object") {
          sum += bucket.length;
        } else if (typeof bucket !== "undefined") {
          sum++;
        }
      }
      counter--;
    }
    return sum;
  }

  /**Returns the hash code of the given value
   * @param {string} value*/
  hash(value) {
    if (typeof value === "number") {
      value = `${value}`;
    }
    let sum = 0;
    let index = 0;
    while (index < value.length) {
      sum += value.charCodeAt(index);
      index++;
    }
    return sum % this.#limit;
  }

  /**Returns true if value exists in the table, otherwise false.*/
  contains(value) {
    if (!value) return false;

    let code = this.hash(value);
    let bucket = this.#set[code];

    if (!bucket) return false;

    if (typeof bucket !== "object") {
      if (bucket === value) return true;
    } else {
      for (let data of bucket) {
        if (data === value) return true;
      }
    }
    return false;
  }

  /**Adds value in the hash table. */
  add(value) {
    if (!value) return;

    let code = this.hash(value);

    // When the bucket is empty, set a new value
    if (!this.#set[code]) {
      this.#set[code] = value;
    } else {
      // Handle collision when the bucket is not empty
      // and adding value has same hash code
      // as existing value in the bucket

      // When there is only one value in place,
      // create an array for storing new values
      if (typeof this.#set[code] !== "object") {
        let existing = this.#set[code];
        if (existing != value) {
          this.#set[code] = [existing, value];
        }
      } else {
        let bucket = this.#set[code];
        if (!bucket.includes(value)) {
          this.#set[code].push(value);
        }
      }
    }
  }

  /**Removes value in the hash set */
  delete(value) {
    if (!value) return false;
    let code = this.hash(value);
    if (typeof this.#set[code] !== "object") {
      if (this.#set[code] === value) {
        this.#set[code] = null;
        return true;
      }
    } else {
      let indexOfValue = this.#set[code].indexOf(value);
      if (indexOfValue >= 0) {
        this.#set[code][indexOfValue] = null;
        return true;
      }
    }
    return false;
  }
}

let hashtable = new HashTable();
let counter = strings.length;

while (counter > 0) {
  hashtable.add(strings.pop());
  counter--;
}

let value = "choses";
console.time("Contains");
let result = hashtable.contains(value);
console.timeEnd("Contains");
console.log("Hash table contains: %s => %s", value, result);

value = "Join";
console.time("Contains");
result = hashtable.contains(value);
console.timeEnd("Contains");

console.time("Size");
result = hashtable.size;
console.timeEnd("Size");
console.log("Size:", result);

value = "choses";
console.time("Delete");
result = hashtable.delete(value);
console.timeEnd("Delete");
console.log("Deleted: %s => %s", value, result);

console.time("Size");
result = hashtable.size;
console.timeEnd("Size");
console.log("Size:", result);

value = "Join";
console.time("Delete");
result = hashtable.delete(value);
console.timeEnd("Delete");
console.log("Deleted: %s => %s", value, result);

console.time("Size");
result = hashtable.size;
console.timeEnd("Size");
console.log("Size:", result);

value = "choses";
console.time("Contains");
result = hashtable.contains(value);
console.timeEnd("Contains");
console.log("Hash table contains: %s => %s", value, result);