"use strict";

class DoublyLinkedListNode {
  constructor(data) {
    this.data = data;
    this.next;
    this.prev;
  }
}

class DoublyLinkedList {
  #length = 0;
  #head;
  constructor(head) {
    this.#head = head;
    let current = this.#head;
    while (current) {
      this.#incrementLength();
      current = current.next;
    }
  }

  get head() {
    return this.#head;
  }

  /** The length of the linked list */
  get length() {
    return this.#length;
  }

  /** Get the node with the lowest value in the list
   * @returns {DoublyLinkedListNode | undefined}
   */
  get min() {
    let min = this.#head;
    let current = this.#head;
    while (current) {
      current = current.next;
      if (current?.data < min?.data) {
        min = current;
      }
    }
    return min;
  }

  /** Get the node with the highest value in the list
   * @returns {DoublyLinkedListNode | undefined}
   */
  get max() {
    let max = this.#head;
    let current = this.#head;
    while (current) {
      current = current.next;
      if (current?.data > max?.data) {
        max = current;
      }
    }
    return max;
  }

  /** Adds a node in the list
   * @param {DoublyLinkedListNode} node The node to add
   */
  add(node) {
    /* Given a node with value to add in the list
        1. Set the next node of the adding node to be the head of the list
        2. Assign the adding node to head
    */
    if (this.#head) {
      this.#head.prev = node;
    }
    node.next = this.#head;
    this.#head = node;
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
   * @returns {DoublyLinkedList | undefined} The deleted node if done, otherwise undefined
   */
  deleteAt(index) {
    if (index < 0) return;
    if (index == 0) {
      const nodeToDelete = this.#head;
      this.#head = nodeToDelete.next;
      this.#decrementLength();
      nodeToDelete.next = null;
      return nodeToDelete;
    }
    let nodeToDelete = this.getAt(index);
    if (typeof nodeToDelete == "object") {
      nodeToDelete.prev.next = nodeToDelete.next;
      this.#decrementLength();
      nodeToDelete.prev = null;
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
    let result = "";
    while (current) {
      if (current === this.#head) {
        result = result + `[${current.data} <=> `;
      } else if (current.next) {
        result = result + `${current.data} <=> `;
      } else {
        result = result + `${current.data}]`;
      }
      current = current.next;
    }
    return result;
  }
}

/**
 * Slice a linked list from start to end
 * @param {DoublyLinkedList} [list] The linked list to slice
 * @param {number} [start=0] The begining of the slice
 * @param {number} [end] The end of the slice. If not specify, it equals to the length of the list
 * @returns {DoublyLinkedList} The linked list slice
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
  let slice = new DoublyLinkedList();
  while (start >= 0 && end < list.length && start <= end) {
    let node = list.getAt(end);
    slice.add(new DoublyLinkedListNode(node.data));
    end--;
  }
  return slice;
}

/**
 * Sorts a linked list in ascending order
 * @param {DoublyLinkedList} list
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
  list = new DoublyLinkedList();
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

let linkedlist = new DoublyLinkedList();

linkedlist.add(new DoublyLinkedListNode(20));
linkedlist.add(new DoublyLinkedListNode(5));
linkedlist.add(new DoublyLinkedListNode(18));
linkedlist.add(new DoublyLinkedListNode(8));
linkedlist.add(new DoublyLinkedListNode(15));

console.log("List size:", linkedlist.length);
linkedlist.add(new DoublyLinkedListNode(30));
console.warn("Added node: %s", linkedlist.head);
console.log("List size:", linkedlist.length);
console.warn("List nodes: %s", linkedlist.toString());
let node = linkedlist.getAt(linkedlist.length - 2);
console.log("Prev node:", node.prev?.data);
console.log("Current node:", node?.data);
console.log("Next node:", node.next?.data);
let deleted = linkedlist.deleteAt(0);
console.warn("Deleted node: %s", deleted);
console.log("List size:", linkedlist.length);
console.warn("List nodes: %s", linkedlist.toString());
linkedlist.add(new DoublyLinkedListNode(100));
linkedlist.add(new DoublyLinkedListNode(9));
linkedlist.add(new DoublyLinkedListNode(35));
console.log("List size:", linkedlist.length);
console.warn("List nodes: %s", linkedlist.toString());
let sortedList = sort(linkedlist);
console.warn("Sorted list: %s", sortedList.toString());
console.warn("Minimum nodes: %s", sortedList.min);
console.warn("Maximum nodes: %s", sortedList.max);

node = sortedList.getAt(sortedList.length - 2);
console.log("Prev node:", node.prev?.data);
console.log("Current node:", node?.data);
console.log("Next node:", node.next?.data);
