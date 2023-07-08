const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const private_key = secp.secp256k1.utils.randomPrivateKey();
const pr_key = toHex(private_key);
console.log("Private Key: ", pr_key);

let public_key = secp.secp256k1.getPublicKey(private_key);
console.log("Public Key: ", toHex(public_key));

public_key = secp.secp256k1.getPublicKey(pr_key);
console.log("Public Key: ", toHex(public_key));


