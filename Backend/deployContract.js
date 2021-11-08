const express = require("express");
const app = express(); // creating an express application
const cors = require("cors");
const e = require("cors");
app.use(cors()); // setting up cors for app
//const Token = require('../build/contracts/Token.json');
const solc = require("solc");
const fs = require("fs");
const Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));


fileContent = fs.readFileSync("../Contracts/game_coin.sol").toString();
//console.log(fileContent);


var input = {
  language: "Solidity",
  sources: {
    "game_coin.sol": {
      content: fileContent,
    },
  },

  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};


// Compiling the solidity Code before deployment;
var output = JSON.parse(solc.compile(JSON.stringify(input)));
//console.log("Output: ", output);

const ABI = output.contracts["game_coin.sol"]["Token"].abi;
bytecode = output.contracts["game_coin.sol"]["Token"].evm.bytecode.object;
//console.log("Bytecode: ", bytecode);
//console.log("ABI: ", ABI);


// Passing the contract ABI and contract address default for the deployment
// of the contract !

contract = new web3.eth.Contract(ABI);
let defaultAccount;
web3.eth.getAccounts().then((accounts) => {
  //console.log("Accounts:", accounts); //it will show all the ganache accounts

  defaultAccount = accounts[0];
  console.log("Default Account:", defaultAccount); 

  contract
  .deploy({ data: bytecode})
  .send({ from: defaultAccount, gas: 6721975 })
  .on("receipt", (receipt) => { //event,transactions,contract address will be returned by blockchain
    console.log("Contract Address:", receipt.contractAddress);
  })
}
);