import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1';
import * as util from 'ethereum-cryptography/utils';
import * as kec from 'ethereum-cryptography/keccak';
//const secp = require("ethereum-cryptography/secp256k1");
//const { toHex } = require("ethereum-cryptography/utils");
//const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
  console.log(publicKey);
  const arr = publicKey.slice(1);
  console.log(arr);
  const hash = kec.keccak256(arr);
  return hash.slice(-20);
}

function Wallet({ address, setAddress, balance, setBalance, private_key, setPrivateKey }) { 
  async function onChange(evt) {
    //const private_key = evt.target.value;
    //setPrivateKey(private_key);
    //let address = toHex(secp.secp256k1.getPublicKey(utf8ToBytes(private_key)));
    private_key = evt.target.value;
    address = util.toHex(secp.secp256k1.getPublicKey(private_key));
    setPrivateKey(private_key);
    //address = private_key;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type a private key: " value={private_key} onChange={onChange}></input>
      </label>

      <div className="address">Address: {address}</div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
