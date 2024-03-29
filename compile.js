const path = require("path");
const fs = require("fs");
const solc = require("solc");

const poutinePath = path.resolve(__dirname, "Poutine.sol");
const source = fs.readFileSync(poutinePath, "utf-8");

const input = {
  language: "Solidity",
  sources: {
    "Poutine.sol": {
      content: source
    }
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"]
      }
    }
  }
};

const findImports = (path) => {
  return {
    "contents": fs.readFileSync(path, "utf-8")
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));

const abi = output.contracts["Poutine.sol"].PTNToken.abi;
const bytecode = output.contracts["Poutine.sol"].PTNToken.evm.bytecode.object;

const artifact = JSON.stringify({ abi, bytecode }, null, 2)

fs.writeFile("Poutine.json", artifact, (err) => {
  if (err) throw err
  console.log("Artifact contract file saved!")
})
