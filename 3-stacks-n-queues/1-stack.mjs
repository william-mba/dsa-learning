import {
  LinkedListNode,
  LinkedList,
} from "../2-linked-lists/1-singly-linked-list.mjs";
import { numbers, strings } from "../../yt/test-data.mjs";

// Stack follows the principle of LIFO
class Stack {
  /**
   * @type {LinkedList}
   */
  #list;

  /**@param {LinkedList} list  */
  constructor(list) {
    this.#list = list ?? new LinkedList();
  }

  get size() {
    return this.#list.length;
  }

  push(data) {
    this.#list.add(new LinkedListNode(data));
  }

  pop() {
    return this.#list.deleteAt(0);
  }

  get peek() {
    return this.#list.head;
  }

  isEmpty() {
    return this.#list.length === 0;
  }

  toString() {
    return this.#list.toString();
  }
}

let stack = new Stack();
let counter = 50;
while (counter > 0) {
  stack.push(strings.pop());
  counter--;
}

console.log("Size:", stack.size);
console.log("Elements: %s", stack);
console.log("Pop:", stack.pop());
console.log("Elements: %s", stack);
console.log("Peek:", stack.peek);
console.log("Is empty:", stack.isEmpty());
while (stack.peek) {
  stack.pop();
}
console.log("Is empty:", stack.isEmpty());
