const { ethers } = require("ethers");

import { MockProvider } from 'ethereum-waffle';
const provider = new MockProvider();

const [wallet, otherWallet] = provider.getWallets();

const PUBLIC_KEY = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
const PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const contract = require("../artifacts/contracts/UniqueAsset.sol/UniqueAsset.json"); 
const uniqueAssetContract = new ethers.Contract(contractAddress, contract.abi);

async function main() {
  const wallet = ethers.Wallet(PRIVATE_KEY);
  const nonce = wallet.getTransactionCount();

  //the transaction
  const tx = {
    'from': PUBLIC_KEY,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'maxPriorityFeePerGas': 1999999987,
    'data': uniqueAssetContract.methods.awardItem(PUBLIC_KEY, "QmSZAff8BnnKqUMRi1gmFvrPkuN6ZCC6q6jZXh32MUAdMN", "ipfs://QmSZAff8BnnKqUMRi1gmFvrPkuN6ZCC6q6jZXh32MUAdMN").encodeABI()
  };

  const signPromise = wallet.sendTransaction(tx);
  signPromise.then(() => {
    console.log("tx sent!");
  }).catch((err) => {
    console.log(" Promise failed:", err);
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });