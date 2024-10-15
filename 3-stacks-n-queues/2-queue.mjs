import {
  CircularDoublyLinkedList as LinkedList,
  CircularDoublyLinkedListNode as LinkedListNode,
} from "../2-linked-lists/4-circular-doubly-linked-list.mjs";
import { numbers, strings } from "../../yt/test-data.mjs";

// Queue follows the FIFO prniciple
class Queue {
  /**@type {LinkedList} */
  #list;

  /**@param {LinkedList} list  */
  constructor(list) {
    this.#list = list ?? new LinkedList();
  }

  get size() {
    return this.#list.length;
  }

  get peek() {
    return this.#list.tail;
  }

  /**Add an element in the queue */
  enqueue(data) {
    this.#list.add(new LinkedListNode(data));
  }

  dequeue() {
    return this.#list.deleteAt(this.#list.length - 1);
  }

  isEmpty() {
    return this.#list.length === 0;
  }

  toString() {
    return this.#list.toString();
  }
}

let queue = new Queue();
let counter = 50;

// while (counter > 0) {
//   console.time("Enqueue");
//   queue.enqueue(strings.pop());
//   console.timeEnd("Enqueue");
//   counter--;
// }
const length = numbers.length;
console.group("Enqueue: [%d] items", length);
console.time("Enqueue");
while (numbers.length > 0) {
  queue.enqueue(numbers.pop());
  counter--;
}
console.timeEnd("Enqueue");
console.groupEnd("Enqueue: [%d] items", length);

console.time("Size");
let size = queue.size;
console.timeEnd("Size");

console.log("Size:", size);
// console.log("Elements: %s", queue);
console.log("Dequeue: %s", queue.dequeue());
// console.log("Elements: %s", queue);
console.log("Peek: %s", queue.peek);
console.log("Is empty:", queue.isEmpty());
// while (queue.size > 0) {
//   console.time("Dequeue");
//   queue.dequeue();
//   console.timeEnd("Dequeue");
// }
console.group("Dequeue: [%d] items", length);
console.time("Dequeue");
while (queue.size > 0) {
  queue.dequeue();
}
console.timeEnd("Dequeue");
console.groupEnd("Dequeue: [%d] items", length);
console.log("Is empty:", queue.isEmpty());
