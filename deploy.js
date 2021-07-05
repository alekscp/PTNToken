const Web3 = require("web3");

const fs = require("fs")
const { abi, bytecode } = JSON.parse(fs.readFileSync("Poutine.json"));

async function main() {
  const network = process.env.ETHEREUM_NETWORK;
  const web3 = new Web3(`https://${network}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);

  const signer = web3.eth.accounts.privateKeyToAccount(process.env.SIGNER_PRIVATE_KEY);
  web3.eth.accounts.wallet.add(signer);

  const contract = new web3.eth.Contract(abi);

  const deployTx = contract.deploy({
    data: bytecode,
    arguments: [1000000]
  })

  const deployedContract = await deployTx
    .send({
      from: signer.address,
      gas: await deployTx.estimateGas()
    })
    .once("transactionHash", (txHash) => {
      console.log("Mining deployment transaction ...")
      console.log(`https://${network}.etherscan.io/tx/${txHash}`)
    })

  console.log(`Contract deployed at ${deployedContract.options.address}`)
}

require("dotenv").config();
main()
