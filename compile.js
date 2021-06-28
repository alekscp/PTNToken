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

console.log("output: ", output)
for (let contractName in output.contracts["Poutine.sol"]) {
  console.log(contractName + ": " + output.contracts["Poutine.sol"][contractName].evm.bytecode.object);
}


