const Block = require("./block");

class Node {
  constructor() {
    this.root = [Block.genesis()];
    this.nodeNumber = this.root[this.root.length - 1].nodeNumber + 1;
    this.genesisReferenceNodeId = this.root[0].nodeId;
    console.log(this.root);
  }

  createBlock(value, ownerName, ownerId) {
    // let parent = null;
    let block = this.root.forEach(el => {
      let sum = 0;
      el.childReferenceNodeId.forEach(ele => {
        sum += ele.value;
      });
      if (sum + value < el.value) {
        let referenceNodeId = el.nodeId;
        let block = Block.createBlock(
          value,
          ownerName,
          ownerId,
          this.nodeNumber,
          this.genesisReferenceNodeId,
          referenceNodeId
        );
        this.root.push(block);
        this.root[0].childReferenceNodeId.push(block.nodeId);
        return block;
      }
    });
    // if (!parent) {
    //   parent = this.root[0].nodeId;
    // }
  }

  createBlockDontAdd(value, ownerName, ownerId) {
    return Block.createBlock(
      value,
      ownerName,
      ownerId,
      this.nodeNumber,
      this.genesisReferenceNodeId
    );
  }

  addBlockToNode(node, block) {
    let sum = 0;
    node.childReferenceNodeId.forEach(child => {
      sum += child.value;
    });
    if (sum + block.value < parent.value) {
      this.root.push(block);
      node.childReferenceNodeId.push(block.nodeId);
      return 1;
    }
  }

  findNode(value) {
    let block = this.root.filter(block => {
      block.value == value;
    });

    return block;
  }

  verifyOwner(node, ownerName, key) {
    let data = node.decrypthash(this.node.data, key);
    if (data.ownerName == ownerName) {
      return 1;
    } else {
      return 0;
    }
  }
}

var a = new Node();
var node1 = a.createBlock(30, "Ayush", 14);
var node2 = a.createBlock(40, "Ayusch", 15);
var node3 = a.createBlock(50, "Tarun", 16);
console.log(a.root[0].childReferenceNodeId);
a.addBlockToNode(node3, a.createBlockDontAdd());

module.exports = Node;
