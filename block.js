var CryptoJS = require("crypto-js");
var util = require("util");

class Block {
  constructor(
    timestamp,
    value,
    ownerName,
    ownerId,
    nodeNumber,
    nodeId,
    referenceNodeId,
    childReferenceNodeId,
    genesisReferenceNodeId
  ) {
    this.timestamp = timestamp;
    this.value = value;
    this.ownerName = ownerName;
    this.ownerId = ownerId;
    this.nodeNumber = nodeNumber;
    this.nodeId = nodeId;
    this.referenceNodeId = referenceNodeId;
    this.childReferenceNodeId = childReferenceNodeId;
    this.genesisReferenceNodeId = genesisReferenceNodeId;
    this.originaldata = {
      ownerId,
      value,
      ownerName
    };
    this.data = Block.encrypt(
      {
        ownerId,
        value,
        ownerName
      },
      "secret key"
    );
    this.hash = Block.encrypt(
      {
        timestamp,
        data: this.originaldata,
        nodeNumber,
        nodeId,
        referenceNodeId,
        childReferenceNodeId,
        genesisReferenceNodeId
      },
      "secret key"
    );
  }

  static genesis() {
    return new this(
      "Genesis Time YAY!",
      500,
      "Lakshya",
      15,
      0,
      this.guid(),
      null,
      [],
      0
    );
  }

  static guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  }

  static createBlock(
    value,
    ownerName,
    ownerId,
    nodeNumber,
    genesisReferenceNodeId,
    referenceNodeId
  ) {
    const timestamp = Date.now();
    const nodeId = this.guid();

    return new this(
      timestamp,
      value,
      ownerName,
      ownerId,
      nodeNumber,
      nodeId,
      referenceNodeId,
      (childReferenceNodeId = null),
      genesisReferenceNodeId
    );
  }

  static encrypt(data, key) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key);
  }

  static decrypthash(ciphertext, key) {
    let bytes = CryptoJS.AES.decrypt(ciphertext.toString(), key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
}

module.exports = Block;
