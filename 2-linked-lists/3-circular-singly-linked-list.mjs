"use strict";

import { numbers, strings } from "../../yt/test-data.mjs";

export class CircularLinkedListNode {
  constructor(data) {
    this.data = data;
    this.next;
  }
}

export class CircularLinkedList {
  #length = 0;
  #head;
  #tail;
  constructor(head) {
    this.#head = this.#tail = head;
    while (this.#tail) {
      this.#incrementLength();
      if (!this.#tail.next) {
        this.#tail.next = this.#head;
        break;
      }
      this.#tail = this.#tail.next;
    }
  }

  get head() {
    return this.#head;
  }

  get tail() {
    return this.#tail;
  }

  /** The length of the linked list */
  get length() {
    return this.#length;
  }

  /** Get the node with the lowest value in the list
   * @returns {CircularLinkedListNode | undefined}
   */
  get min() {
    let min = this.#head;
    let current = this.#head;
    let counter = this.#length;
    while (counter > 0) {
      current = current.next;
      if (current?.data < min?.data) {
        min = current;
      }
      counter--;
    }
    return min;
  }

  /** Get the node with the highest value in the list
   * @returns {CircularLinkedListNode | undefined}
   */
  get max() {
    let max = this.#head;
    let current = this.#head;
    let counter = this.#length;
    while (counter > 0) {
      current = current.next;
      if (current?.data > max?.data) {
        max = current;
      }
      counter--;
    }
    return max;
  }

  /** Adds a node in the list
   * @param {CircularLinkedListNode} node The node to add
   */
  add(node) {
    /* Given a node with value to add in the list
        1. Set the next node of the adding node to be the head of the list
        2. Assign the adding node to head
    */
    if (this.#length == 0) {
      this.#head = this.#tail = node;
    } else {
      node.next = this.#head;
      this.#head = node;
    }
    this.#tail.next = this.#head;
    this.#incrementLength();
  }

  /** Gets a node in the list
   * @param {number} index The position of the node
   * @returns The node if found, otherwise -1
   */
  getAt(index) {
    let current = this.#head;
    while (current && index > 0) {
      current = current.next;
      index--;
    }
    return current ?? -1;
  }

  /** Updates a node data in the list
   * @param {number} index The position of the node
   */
  setAt(index, data) {
    let node = this.getAt(index);
    if (node) {
      node.data = data;
    }
  }

  #decrementLength() {
    if (this.length > 0) {
      this.#length--;
    }
  }

  #incrementLength() {
    this.#length++;
  }

  /** Deletes a node in the list
   * @param {number} index The position of the node to delete
   * @returns {CircularLinkedList | undefined} The deleted node if done, otherwise undefined
   */
  deleteAt(index) {
    if (index < 0) return;
    if (index == 0) {
      const nodeToDelete = this.#head;
      this.#head = nodeToDelete.next;
      if (this.#length > 1) {
        this.#tail.next = this.#head;
      }
      this.#decrementLength();
      nodeToDelete.next = null;
      return nodeToDelete;
    }
    let nodeBefore = this.getAt(index - 1);
    let nodeToDelete = nodeBefore.next;
    if (typeof nodeToDelete === "object") {
      nodeBefore.next = nodeToDelete.next;
      if (nodeToDelete == this.#tail) {
        this.#tail = nodeBefore;
      }
      this.#decrementLength();
      nodeToDelete.next = null;
      return nodeToDelete;
    }
  }

  toString() {
    if (this.length < 1) {
      return "";
    }
    if (this.length === 1) {
      return `[${this.#head.data}]`;
    }
    let current = this.#head;
    let counter = this.#length;
    let result = "";
    while (counter > 0) {
      if (current === this.#head) {
        result = result + `[ ${current.data} -> `;
      } else if (current.next) {
        result = result + `${current.data} -> `;
        if (current === this.#tail) {
          result = result + `]`;
        }
      } else {
        result = result + `${current.data}]`;
      }
      counter--;
      current = current.next;
    }
    return result;
  }
}

/**
 * Slice a linked list from start to end
 * @param {CircularLinkedList} [list] The linked list to slice
 * @param {number} [start=0] The begining of the slice
 * @param {number} [end] The end of the slice. If not specify, it equals to the length of the list
 * @returns {CircularLinkedList} The linked list slice
 */
function slice(list, start = 0, end) {
  /* Given a linked list to slice
    1. If there is less than two nodes, return the list
    2. Create a new linked list called slice
    3. While start is higher than or equals 0 and end is lower than list length and start is lower than or equals end:
      a. Get node at index of end
      b. Remove it next node reference
      c. Add it to the slice
      d. Decrement end by 1
    5. Return the slice
    */
  if (list.length < 2) return list;
  if (!end) {
    end = list.length;
  }
  end--;
  let slice = new CircularLinkedList();
  while (start <= end && start >= 0 && end < list.length) {
    let node = list.getAt(end);
    slice.add(new CircularLinkedListNode(node.data));
    end--;
  }
  return slice;
}

/**
 * Sorts a linked list in ascending order
 * @param {CircularLinkedList} list
 * @returns The a new sorted linked list
 */
function sort_debug(list) {
  console.log("list in => %s", list.toString());
  if (list.length < 2) return list;
  let middle = Math.floor(list.length / 2);
  let left = sort_debug(slice(list, 0, middle));
  let right = sort_debug(slice(list, middle));
  console.log("left: %s <=> right: %s", left.toString(), right.toString());
  let leftIndex = left.length - 1;
  let rightIndex = right.length - 1;
  list = new CircularLinkedList();
  while (leftIndex >= 0 && rightIndex >= 0) {
    if (left.getAt(leftIndex).data > right.getAt(rightIndex).data) {
      list.add(left.deleteAt(leftIndex));
      leftIndex--;
    } else {
      list.add(right.deleteAt(rightIndex));
      rightIndex--;
    }
  }
  while (leftIndex >= 0) {
    list.add(left.deleteAt(leftIndex));
    leftIndex--;
  }
  while (rightIndex >= 0) {
    list.add(right.deleteAt(rightIndex));
    rightIndex--;
  }
  console.log("list out => %s", list.toString());
  return list;
}

/**
 * Sorts a linked list in ascending order
 * @param {CircularLinkedList} list
 * @returns The a new sorted linked list
 */
function sort(list) {
  /* Given a list with nodes to sort 
    1. If there is less than 2 nodes in the list, return the list
    2. Else, find the middle of the list
      a. Divide the list by 2 and round down the result, then store it in a variable called middle
    3. Create two slices of the list
      a. Create the first slice going from position 0 to middle (exclusive) and store it in a variable named leftSlice
      b. Create a second slice going from middle position to the end of the list and store it in a variable named rightSlice
    4. Create a variable to store the maximun index of the left slice, namely leftIndex
    5. Create a variable to store the maximun index of the right slice, namely rightIndex
    6. Create a new empty list
    6. While leftIndex and rightIndex is higher than 0
      a. if node at leftIndex in leftSlice is higher than node at rightIndex in rightSlice
        1. Remove node at leftIndex in leftSlice and add it to the new list
        2. Decrement leftIndex
      b. else,
        1. Remove node at rightIndex in rightSlice and add it to the new list
        2. Decrement rightIndex
    7. While left index is higher than 0
      a. Repeat steps 6.a.1 and 6.a.2
    8. While right index is higher than 0
      a. Repeat steps 6.b.1 and 6.b.2
    9. Returns the new list
  */
  if (list.length < 2) return list;
  let middle = Math.floor(list.length / 2);
  let left = sort(slice(list, 0, middle));
  let right = sort(slice(list, middle));
  let leftIndex = left.length - 1;
  let rightIndex = right.length - 1;
  list = new CircularLinkedList();
  while (leftIndex >= 0 && rightIndex >= 0) {
    if (left.getAt(leftIndex).data > right.getAt(rightIndex).data) {
      list.add(left.deleteAt(leftIndex));
      leftIndex--;
    } else {
      list.add(right.deleteAt(rightIndex));
      rightIndex--;
    }
  }
  while (leftIndex >= 0) {
    list.add(left.deleteAt(leftIndex));
    leftIndex--;
  }
  while (rightIndex >= 0) {
    list.add(right.deleteAt(rightIndex));
    rightIndex--;
  }
  return list;
}

// let node1 = new CircularLinkedListNode(3);
// let node2 = new CircularLinkedListNode(65);
// let node3 = new CircularLinkedListNode(97);
// let node4 = new CircularLinkedListNode(44);
// let node5 = new CircularLinkedListNode(100);

// node1.next = node2;
// node2.next = node3;
// node3.next = node4;
// node4.next = node5;

// let linkedlist = new CircularLinkedList();

// for (let i = 0; i < strings.length; i++) {
//   linkedlist.add(new CircularLinkedListNode(strings[i]));
// }

// console.time("Length took");
// let length = linkedlist.length;
// console.timeEnd("Length took");

// console.log("List size:", length);
// // console.log("List nodes: %s", linkedlist.toString());

// console.time("Head took");
// let head = linkedlist.head;
// console.timeEnd("Head took");
// console.time("Tail took");
// let tail = linkedlist.tail;
// console.timeEnd("Tail took");

// console.log("Head:", head);
// console.log("Tail:", tail);

// console.time("Min took");
// let min = linkedlist.min;
// console.timeEnd("Min took");
// console.time("Max took");
// let max = linkedlist.max;
// console.timeEnd("Max took");
// console.log("Min node:", min);
// console.log("Max node:", max);

// console.log("----------------------------------------------------------");

// console.time("Sort took");
// linkedlist = sort(linkedlist);
// console.timeEnd("Sort took");

// console.log("List size:", length);
// // console.log("List nodes: %s", linkedlist.toString());

// console.time("Head took");
// head = linkedlist.head;
// console.timeEnd("Head took");

// console.time("Tail took");
// tail = linkedlist.tail;
// console.timeEnd("Tail took");

// console.log("Head:", head);
// console.log("Tail:", tail);

// console.time("Min took");
// min = linkedlist.min;
// console.timeEnd("Min took");

// console.time("Max took");
// max = linkedlist.max;
// console.timeEnd("Max took");

// console.log("Min node:", min);
// console.log("Max node:", max);
