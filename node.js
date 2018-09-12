const Block = require("./block");

class Node {
  constructor() {
    this.root = [Block.genesis()];
    this.nodeNumber = this.root[this.root.length - 1].nodeNumber + 1;
    this.genesisReferenceNodeId = this.root[0].nodeId;
    console.log(this.root);
  }

  createBlock(value, ownerName, ownerId) {
    const parentReferenceId = null;
    parentReferenceId = this.root.forEach(el => {
      let sum = 0;
      el.childReferenceNodeId.forEach(ele => {
        sum += ele.value;
      });

      if (sum + value < el.value) {
        return el.nodeId;
      }
    });
    if (!parentReferenceId) {
      parentReferenceId = this.root[0].nodeId;
    }

    const block = Block.createBlock(
      value,
      ownerName,
      ownerId,
      this.nodeNumber,
      this.genesisReferenceNodeId,
      (referenceNodeId = parentReferenceId)
    );

    this.addBlockToNode(block);
  }

  addBlockToNode(node, block) {
    let sum = 0;
    node.childReferenceNodeId.forEach(child => {
      sum += child.value;
    });
    if (sum + block.value > parent.value) {
      return 0;
    } else {
      this.root.push(block);
      node.childReferenceNodeId.push(block.nodeId);
      return 1;
    }
  }

  findNode(value) {
    const block = this.root.filter(block => {
      block.value == value;
    });

    return block;
  }

  verifyOwner(node, ownerName, key) {
    const data = node.decrypthash(this.node.data, key);
    if (data.ownerName == ownerName) {
      return 1;
    } else {
      return 0;
    }
  }
}

var a = new Node();

module.exports = Node;
