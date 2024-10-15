"use strict";
import { numbers, strings } from "../../yt/test-data.mjs";

class TreeNode {
  /**@type {TreeNode} */
  left;
  /**@type {TreeNode} */
  right;
  constructor(data) {
    this.data = data;
  }
}

class BinaryTree {
  #root;
  /**@param {TreeNode} root  */
  constructor(root) {
    this.#root = root;
  }

  get root() {
    return this.#root;
  }

  /**Inserts a node in the tree
   * @param {TreeNode} node
   * @returns True if data was added, else false
   */
  add_debug(node, root = this.#root) {
    if (!node) return;
    if (!this.#root) {
      this.#root = node;
      console.log("ROOT ADDED", node);
      return;
    }
    if (!root) {
      root = node;
      console.log("Added to root", node);
    } else {
      console.warn("%s > %s = %s", root.data, node.data, root.data > node.data);
      if (root.data > node.data) {
        if (!root.left) {
          console.warn("Left child is null");
          root.left = node;
          console.log("Added %s to %s left child", node.data, root.data);
        } else {
          console.log("Adding %s to %s left child", node.data, root.data);
          this.add_debug(node, root.left);
        }
      } else {
        if (!root.right) {
          console.warn("Right child is null");
          root.right = node;
          console.log("Added %s to %s right child", node.data, root.data);
        } else {
          console.log("Adding %s to %s right child", node.data, root.data);
          this.add_debug(node, root.right);
        }
      }
    }
  }

  /**Inserts a node in the tree
   * @param {TreeNode} node
   * @returns True if data was added, else false
   */
  add(node, root = this.#root) {
    if (!node) return;
    if (!this.#root) {
      this.#root = node;
    } else {
      if (!root) {
        root = node;
      } else {
        if (root.data > node.data) {
          if (!root.left) {
            root.left = node;
          } else {
            this.add(node, root.left);
          }
        } else {
          if (!root.right) {
            root.right = node;
          } else {
            this.add(node, root.right);
          }
        }
      }
    }
  }

  /**Delete data in the tree
   * @param {TreeNode} node
   * @returns True if data was deleted, else false
   */
  delete(data, node) {
    if (!data) return;
    if (!node) return false;
    if (data === node.data) {
      const leftNode = node.left;
      const rightNode = node.right;
      this.add(leftNode, rightNode);
      node = rightNode;
    } else {
      if (data < node.data) {
        level++;
        node.left = this.delete(data, node.left);
      } else {
        level++;
        node.right = this.delete(data, node.right);
      }
    }
    return node;
  }

  print() {
    if (typeof this.#root === "undefined") return;
    toString(this.#root.left);
    console.log("Root %s:", this.#root.data, this.#root);
    toString(this.#root.right);
  }
}

function toString(node) {
  if (typeof node === "undefined") return "";
  toString(node.left);
  console.log("Node %s:", node.data, node);
  toString(node.right);
}

var level = 0;
/**Returns the node with corresponding data if found, else return -1
 * @param {TreeNode} node
 */
function search(data, node) {
  if (!node) return -1;
  if (data === node.data) {
    return node;
  } else {
    if (data < node.data) {
      level++;
      return search(data, node.left);
    } else {
      level++;
      return search(data, node.right);
    }
  }
}

let binarytree = new BinaryTree();

let counter = strings.length;
while (counter > 0) {
  binarytree.add(new TreeNode(strings.pop()));
  counter--;
}

// binarytree.print();
// console.log();
console.time("Search");
let node = search("cap", binarytree.root);
console.timeEnd("Search");
console.log("Search result:", node);
console.log("Level(s) traversed:", level);

level = 0;
console.log("----------------------------------------------------------");
console.time("Delete");
node = binarytree.delete("cap", binarytree.root);
console.timeEnd("Delete");
console.log("Delete result:", node);
console.log("Level(s) traversed:", level);

level = 0;
console.log("----------------------------------------------------------");
console.time("Search");
node = search("cap", binarytree.root);
console.timeEnd("Search");
console.log("Search result:", node);
console.log("Level(s) traversed:", level);

level = 0;
console.log("----------------------------------------------------------");
console.time("Search");
node = search("billable", binarytree.root);
console.timeEnd("Search");
console.log("Search result:", node);
console.log("Level(s) traversed:", level);
