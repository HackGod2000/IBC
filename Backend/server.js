const express = require("express");
const app = express(); // creating an express application
const cors = require("cors");
const e = require("cors");
app.use(cors()); // setting up cors for app

const port = process.env.PORT || 3000; // specifying port

const http = require("http").createServer(app); // creating http server of the express ap
const io = require("socket.io")(http, {
  // creating an io socket from the http server.
  cors: {
    origin: "*",
  },
});

// web3 setup ......................................................

const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
process.env.PRIVATE_KEY =
  "c08a5cf709cd10a008ec9b167e86e1b2a3e484947a3faef22de27a11cdae8173";
process.env.ACCOUNT = "0x8cBe9bCbeb8608AedAa7b45a4Bb6Af1c055bb893";
process.env.RPC_URL =
  "https://rpc-mumbai.maticvigil.com/v1/f089913a68315a36fbd0951f9d05c0510b10e859";
// WEB3 CONFIG
const web3 = new Web3(
  new HDWalletProvider(process.env.PRIVATE_KEY, process.env.RPC_URL)
);

const CONTRACT_ABI = [
  {
    constant: !1,
    inputs: [
      { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
    ],
    name: "buyTokens",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: !0,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: !1,
    inputs: [],
    name: "sendContractAmountToOwner",
    outputs: [],
    payable: !0,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: !1,
    inputs: [
      { internalType: "string", name: "pot", type: "string" },
      { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
      { internalType: "string", name: "clientId", type: "string" },
      { internalType: "string", name: "viaEvent", type: "string" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: !1,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "initialSupply", type: "uint256" },
      { internalType: "uint256", name: "pricePerToken", type: "uint256" },
    ],
    payable: !1,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, internalType: "address", name: "_from", type: "address" },
      { indexed: !1, internalType: "address", name: "_to", type: "address" },
      {
        indexed: !1,
        internalType: "uint256",
        name: "_numberOfTokens",
        type: "uint256",
      },
    ],
    name: "Transfered",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, internalType: "address", name: "_from", type: "address" },
      { indexed: !1, internalType: "string", name: "_to", type: "string" },
      {
        indexed: !1,
        internalType: "string",
        name: "_clientId",
        type: "string",
      },
      {
        indexed: !1,
        internalType: "string",
        name: "_viaEvent",
        type: "string",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "_numberOfTokens",
        type: "uint256",
      },
    ],
    name: "TransferedToPot",
    type: "event",
  },
  {
    constant: !1,
    inputs: [
      { internalType: "string", name: "pot", type: "string" },
      { internalType: "address", name: "to", type: "address" },
    ],
    name: "winnerTransfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: !1,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: !1,
    inputs: [
      { internalType: "string", name: "pot", type: "string" },
      { internalType: "address", name: "to1", type: "address" },
      { internalType: "address", name: "to2", type: "address" },
    ],
    name: "winnerTransferTie",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: !1,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: !0,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: !1,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: !0,
    inputs: [{ internalType: "string", name: "", type: "string" }],
    name: "balanceOfPot",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: !1,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: !0,
    inputs: [],
    name: "count",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: !1,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: !0,
    inputs: [],
    name: "etherAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: !1,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: !0,
    inputs: [],
    name: "getBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: !1,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: !0,
    inputs: [{ internalType: "address", name: "id", type: "address" }],
    name: "getBalanceOther",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: !1,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: !0,
    inputs: [{ internalType: "string", name: "id", type: "string" }],
    name: "getBalancePot",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: !1,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: !0,
    inputs: [],
    name: "getContractBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: !1,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: !0,
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: !1,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: !0,
    inputs: [],
    name: "standard",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: !1,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: !0,
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: !1,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: !0,
    inputs: [],
    name: "tokenPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: !1,
    stateMutability: "view",
    type: "function",
  },
];

const CONTRACT_ADDRESS = "0x681f6aF0c05e1a667FDd336d5dE6f14CFDa2b3fd";

var game_chips_contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

async function request_account_balance() {
  let result = await game_chips_contract.methods.getBalanceOther(
    process.env.ACCOUNT
  );

  // let result = await game_chips_contract.methods.getBalance().call({}, function(e, r){
  //       console.log(r);
  // });
  console.log(result);

  let balance = await game_chips_contract.methods
    .getBalanceOther(process.env.ACCOUNT)
    .call();
  console.log(balance);
}
//request_account_balance();
// web3 setup ......................................................

function makeid(length) {
  // utility function to create a new room id

  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

let users = {}; // all connected users room_id => array of all users in that room.
let messages = {}; // room_id => array of all messages in that room
let clientRooms = {}; // client id => room_id
let players = {}; // client_id(unique across rooms) => index of user in room
let game_data = {}; // game_id => all infromation about that particular room
let gamePlayData = {}; // game_id => all information about gameplay of that particular room
let distribution_turn = {}; // room_id => distribution turn in that room
let address_records = {};

// Gameplay utilities...
function addUserToGameplay(user, room_id) {
  // utility function to add user to gameplay
  var cur = gamePlayData[room_id]["totalPlayers"] - 1;
  gamePlayData[room_id]["user"][cur] = {};
  gamePlayData[room_id]["user"][cur] = user;
  gamePlayData[room_id]["user"][cur]["value"] = 100;
  gamePlayData[room_id]["user"][cur]["blind"] = true;
  gamePlayData[room_id]["user"][cur]["live"] = true;
  gamePlayData[room_id]["user"][cur]["currentBet"] = 0;
}

function updateTurn(room_id, move) {
  if (gamePlayData[room_id]["totalPlayers"] > 1) {
    gamePlayData[room_id]["turn"]++;
    gamePlayData[room_id]["turn"] %= gamePlayData[room_id]["totalPlayers"];

    while (
      gamePlayData[room_id]["user"][gamePlayData[room_id]["turn"]]["live"] !=
      true
    ) {
      if (gamePlayData[room_id]["turn"] == 0) {
        gamePlayData[room_id]["betValue"] *= 2;
      }
      gamePlayData[room_id]["turn"]++;
      gamePlayData[room_id]["turn"] %= gamePlayData[room_id]["totalPlayers"];
    }
  }
  console.log("Turn Complete");
  io.to(room_id).emit("turn complete", gamePlayData[room_id], move);
}

// function transactionHandler(amount, action) {
//   let toContract = current_user.room_id;
//   let client_id = current_user.client_id;

//   game_chips.transfer(toContract, amount, client_id, action, (e, r) => {
//     if (e) console.log(JSON.stringify(e));
//     else {
//       console.log(action + " Tx Hash " + r);
//       socket.emit(action, current_user.room_id, current_user.client_id);
//       //game_chips.allEvents();
//     }
//   });
// }

function endGame(room_id, win_indexes) {
  if (win_indexes.length == 1) {
    let cid = users[room_id][win_indexes[0]].client_id;
    let add = address_records[room_id][cid];

    io.to(room_id).emit("game completed", gamePlayData[room_id], win_indexes);
    //handle this promise rejection.
    console.log("Sending to : " + add);
    game_chips_contract.methods
      .winnerTransfer(room_id, add)
      .send({
        from: process.env.ACCOUNT,
      })
      .on("receipt", (confirmationNumber, receipt) => {
        console.log("confirmed transaction");
      })
      .catch((e) => {
        if (e) {
          console.log("Error Occcured while running ON ");
          console.log(JSON.stringify(e));
        }
      });
  } else {
    let cid1 = users[room_id][win_indexes[0]].client_id;
    let cid2 = users[room_id][win_indexes[1]].client_id;

    let add1 = address_records[room_id][cid1];
    let add2 = address_records[room_id][cid2];

    console.log("Sending to : + " + add1 + " : " + add2);
    game_chips_contract.methods
      .winnerTransferTie(room_id, add1, add2)
      .send({
        from: process.env.ACCOUNT,
      })
      .on("confirmation", (confirmationNumber, receipt) => {
        console.log("confirmation reciept");
        console.log(receipt);

        io.to(room_id).emit(
          "game completed",
          gamePlayData[room_id],
          win_indexes
        );
      });
  }

  gamePlayData[room_id]["turn"] = -1;
  gamePlayData[room_id]["pot"] = 0;
  gamePlayData[room_id]["betValue"] = 2;
  gamePlayData[room_id]["livePlayers"] = 0;
  gamePlayData[room_id]["sideShowInProgress"] = false;
  gamePlayData[room_id]["sideShowId"] = -1;

  for (let i = 0; i < users[room_id].length; i++) {
    gamePlayData[room_id]["user"][i]["blind"] = true;
    gamePlayData[room_id]["user"][i]["live"] = true;
    console.log(gamePlayData[room_id]["user"][i]["currentBet"]);
    gamePlayData[room_id]["user"][i]["currentBet"] = 0;
  }
}
// Gameplay utilities...

// setting up even listener
io.on("connection", (client) => {
  console.log("A user connected: " + client.id);

  client.on("create new game", (username) => {
    let room_id = makeid(7);

    const user = {
      username: username,
      client_id: client.id,
      room_id: room_id,
    };

    users[room_id] = [];
    messages[room_id] = [];
    distribution_turn[room_id] = 0;
    // Gameplay add object for particular roomId...
    gamePlayData[room_id] = {};
    gamePlayData[room_id]["user"] = {};
    gamePlayData[room_id]["turn"] = -1;
    gamePlayData[room_id]["pot"] = 0;
    gamePlayData[room_id]["betValue"] = 2;
    gamePlayData[room_id]["totalPlayers"] = 1;
    gamePlayData[room_id]["livePlayers"] = 0;
    gamePlayData[room_id]["sideShowInProgress"] = false;
    gamePlayData[room_id]["sideShowId"] = -1;
    addUserToGameplay(user, room_id);
    // Gameplay add object for particular roomId...

    users[room_id].push(user);
    clientRooms[client.id] = room_id;

    client.emit("new room id", room_id, client.id);
    client.join(room_id);
    io.to(room_id).emit("new users", users[room_id]);

    //console.log(user);
    console.log(users);
    console.log(io.sockets.adapter.rooms);
  });

  client.on("join game", (username, room_id) => {
    if (users[room_id] === undefined) {
      // if room_id does not exist
      console.log("Invalid room id");
      client.emit("room_id does not exist");
      return;
    }

    const user = {
      username: username,
      client_id: client.id,
      room_id: room_id,
    };

    users[room_id].push(user);
    clientRooms[client.id] = room_id;

    // Update Gameplay data...
    gamePlayData[room_id]["totalPlayers"]++;
    addUserToGameplay(user, room_id);
    // Update Gameplay data...

    client.emit("new room id", room_id, client.id);
    client.join(room_id);
    io.to(room_id).emit("new users", users[room_id]);

    //console.log(user);
    //console.log(users);
    //console.log(io.sockets.adapter.rooms);
  });

  client.on("send message", (message, sender, room_id) => {
    messages[room_id].push({ message, sender });

    io.to(room_id).emit("new message", messages[room_id]);
  });

  client.on("disconnect", () => {
    console.log("disconnect");

    if (clientRooms[client.id] === undefined) {
      // if room_id does not exist
      return;
    }

    var room_id = clientRooms[client.id];
    delete clientRooms[client.id];

    users[room_id] = users[room_id].filter((u) => u.client_id !== client.id);

    if (users[room_id].length === 0) {
      delete users[room_id];
      delete messages[room_id];
    } else {
      io.to(room_id).emit("new users", users[room_id]);
    }

    console.log(clientRooms);
    console.log(users);
  });

  client.on("start new game", () => {
    const room_id = clientRooms[client.id];

    // set up game_data and players
    game_data[room_id] = {};
    address_records[room_id] = {};

    for (let i = 0; i < users[room_id].length; i++) {
      players[users[room_id][i].client_id] = i;
    }

    io.to(room_id).emit("start game for all users", users[room_id]);
  });

  client.on("inform server about new round", (room_id) => {
    distribution_turn[room_id] =
      (distribution_turn[room_id] + 1) % users[room_id].length;
    io.to(room_id).emit("start new round", gamePlayData[room_id]);
  });
  // NOTE : Needs updation for next round.
  client.on("distribute", (cards, sender, room_id) => {
    // turn of the player distrbuting card
    let N = users[room_id].length;

    // pidx = player index according to users[room_id]
    game_data[room_id]["distribution"] = {};
    for (let pidx = 0; pidx < N; pidx++) {
      game_data[room_id]["distribution"][pidx] = [];

      for (let j = 0; j < 3; j++)
        game_data[room_id]["distribution"][pidx].push({
          deck_idx: 51 - (N * j + pidx),
          card_idx: cards[51 - (N * j + pidx)].i,
        });
      console.log("Player index : " + pidx + "\nCards : ");
      console.log(game_data[room_id]["distribution"][pidx]);
    }

    // emit the cards and information about players to all clients
    game_data[room_id]["cards"] = cards;

    // Gameplay Update...
    gamePlayData[room_id]["livePlayers"] =
      gamePlayData[room_id]["totalPlayers"];
    gamePlayData[room_id]["turn"] = distribution_turn[room_id];
    // Gameplay Update...

    io.to(room_id).emit("distribution done", game_data, gamePlayData[room_id]);
  });

  client.on("request own card data", (room_id, client_id) => {
    let pidx = players[client_id];
    gamePlayData[room_id]["user"][pidx]["blind"] = false;
    client.emit(
      "view own cards",
      game_data[room_id]["distribution"][pidx],
      gamePlayData[room_id]
    );
  });

  // Gameplay options....
  // Make bet...
  client.on("make bet", (room_id, client_id) => {
    let pidx = players[client_id];
    console.log(
      client_id + " is making bet for" + gamePlayData[room_id]["betValue"]
    );
    if (pidx != gamePlayData[room_id]["turn"]) {
      client.emit("its not your turn");
    } else {
      var betValue = gamePlayData[room_id]["betValue"];
      if (gamePlayData[room_id]["user"][pidx]["blind"] == true) {
        gamePlayData[room_id]["user"][pidx]["value"] -= betValue / 2;
        gamePlayData[room_id]["pot"] += betValue / 2;
        gamePlayData[room_id]["user"][pidx]["currentBet"] += betValue / 2;
      } else {
        gamePlayData[room_id]["user"][pidx]["value"] -= betValue;
        gamePlayData[room_id]["pot"] += betValue;
        gamePlayData[room_id]["user"][pidx]["currentBet"] += betValue;
      }
      updateTurn(room_id, "make bet");
    }
  });
  // Make bet...

  // Raise bet...
  client.on("raise bet", (room_id, client_id) => {
    let pidx = players[client_id];
    if (pidx != gamePlayData[room_id]["turn"]) {
      client.emit("its not your turn");
    } else {
      gamePlayData[room_id]["betValue"] *= 2;
      var betValue = gamePlayData[room_id]["betValue"];

      if (gamePlayData[room_id]["user"][pidx]["blind"] == true) {
        gamePlayData[room_id]["user"][pidx]["value"] -= betValue / 2;
        gamePlayData[room_id]["pot"] += betValue / 2;
        gamePlayData[room_id]["user"][pidx]["currentBet"] += betValue / 2;
      } else {
        gamePlayData[room_id]["user"][pidx]["value"] -= betValue;
        gamePlayData[room_id]["pot"] += betValue;
        gamePlayData[room_id]["user"][pidx]["currentBet"] += betValue;
      }
      updateTurn(room_id, "raise bet");
    }
  });
  // Raise bet...

  // Request side show...
  client.on("request side show", (room_id, client_id) => {
    let pidx = players[client_id];
    if (pidx != gamePlayData[room_id]["turn"]) {
      client.emit("its not your turn");
    } else if (gamePlayData[room_id]["livePlayers"] <= 2) {
      client.emit("cannot request side show without more than 2 players");
    } else {
      let pidx2 = pidx;
      pidx2--;
      if (pidx2 == -1) {
        pidx2 = gamePlayData[room_id]["totalPlayers"] - 1;
      }
      while (gamePlayData[room_id]["user"][pidx2]["live"] != true) {
        pidx2--;
        if (pidx2 == -1) {
          pidx2 = gamePlayData[room_id]["totalPlayers"] - 1;
        }
      }
      var betValue = gamePlayData[room_id]["betValue"];
      if (gamePlayData[room_id]["user"][pidx]["blind"] == true) {
        gamePlayData[room_id]["user"][pidx]["value"] -= betValue / 2;
        gamePlayData[room_id]["pot"] += betValue / 2;
        gamePlayData[room_id]["user"][pidx]["currentBet"] += betValue / 2;
      } else {
        gamePlayData[room_id]["user"][pidx]["value"] -= betValue;
        gamePlayData[room_id]["pot"] += betValue;
        gamePlayData[room_id]["user"][pidx]["currentBet"] += betValue;
      }
      gamePlayData[room_id]["sideShowInProgress"] = true;
      gamePlayData[room_id]["sideShowId"] = pidx;
      let destination = users[room_id][pidx2].client_id;
      client.to(destination).emit("side show requested");
    }
  });
  // Request side show...

  //Sideshow response...
  client.on("sideshow response", (room_id, client_id, response) => {
    if (gamePlayData[room_id]["sideShowInProgress"] == true) {
      var pidx = gamePlayData[room_id]["sideShowId"];
      var pidx2 = players[client_id];
      let move_string = "Side Show ; Result : ";
      if (response == 1) {
        let playerOneCards = extractCardData(
          game_data[room_id]["distribution"][pidx]
        );
        let playerTwoCards = extractCardData(
          game_data[room_id]["distribution"][pidx2]
        );

        var winner = getResult(playerOneCards, playerTwoCards);

        if (winner == 2) {
          gamePlayData[room_id]["user"][pidx]["live"] = false;
          gamePlayData[room_id]["livePlayers"]--;
          move_string += users[room_id][pidx2].username;
          move_string += " Won";
          move_string = move_string + "$" + pidx;
          updateTurn(room_id, move_string);
        } else if (winner == 1) {
          gamePlayData[room_id]["user"][pidx2]["live"] = false;
          gamePlayData[room_id]["livePlayers"]--;
          move_string += users[room_id][pidx].username;
          move_string += " Won";
          move_string = move_string + "$" + pidx2;
          updateTurn(room_id, move_string);
        } else {
          console.log("No result of side show");
          updateTurn(room_id, move_string + " Tie");
        }
        let destination = users[room_id][pidx].client_id;
        client.to(destination).emit("side show accepted");
      } else {
        let destination = users[room_id][pidx].client_id;
        client.to(destination).emit("side show declined");
        updateTurn(
          room_id,
          move_string + " Declined by " + users[room_id][pidx2].username
        );
      }
    } else {
      client.emit("No side show request to respond to");
    }
  });
  //Sideshow response...

  // Request show...
  client.on("request show", (room_id, client_id) => {
    let pidx = players[client_id];
    console.log("Requesting Show");
    if (pidx != gamePlayData[room_id]["turn"]) {
      client.emit("its not your turn");
    } else if (gamePlayData[room_id]["livePlayers"] != 2) {
      client.emit("cannot show until exactly 2 players left");
    } else {
      var betValue = gamePlayData[room_id]["betValue"];
      if (gamePlayData[room_id]["user"][pidx]["blind"] == true) {
        gamePlayData[room_id]["user"][pidx]["value"] -= betValue / 2;
        gamePlayData[room_id]["pot"] += betValue / 2;
        gamePlayData[room_id]["user"][pidx]["currentBet"] += betValue / 2;
      } else {
        gamePlayData[room_id]["user"][pidx]["value"] -= betValue;
        gamePlayData[room_id]["pot"] += betValue;
        gamePlayData[room_id]["user"][pidx]["currentBet"] += betValue;
      }
      var pidx2;
      updateTurn(room_id, "Show");
      pidx2 = gamePlayData[room_id]["turn"];

      let playerOneCards = extractCardData(
        game_data[room_id]["distribution"][pidx]
      );
      let playerTwoCards = extractCardData(
        game_data[room_id]["distribution"][pidx2]
      );

      console.log("playerOneCards = " + playerOneCards);
      console.log("playerTwoCards = " + playerTwoCards);

      var winner = getResult(playerOneCards, playerTwoCards);

      // list of indexes who won the game
      let win_indexes = [];
      if (winner == 1) {
        gamePlayData[room_id]["user"][pidx]["value"] +=
          gamePlayData[room_id]["pot"];
        win_indexes.push(pidx);
      } else if (winner == 2) {
        gamePlayData[room_id]["user"][pidx2]["value"] +=
          gamePlayData[room_id]["pot"];
        win_indexes.push(pidx2);
      } else {
        gamePlayData[room_id]["user"][pidx]["value"] +=
          gamePlayData[room_id]["pot"] / 2;
        gamePlayData[room_id]["user"][pidx2]["value"] +=
          gamePlayData[room_id]["pot"] / 2;
        console.log("2 players winning case");
        win_indexes.push(pidx);
        win_indexes.push(pidx2);
      }
      endGame(room_id, win_indexes);
    }
  });
  client.on("request final show data", (room_id, pidx, pidx2) => {
    io.to(room_id).emit(
      "recieved final show data",
      game_data[room_id]["distribution"][pidx],
      game_data[room_id]["distribution"][pidx2]
    );
  });
  // Request show...

  // Fold...
  client.on("fold", (room_id, client_id) => {
    let pidx = players[client_id];
    if (pidx != gamePlayData[room_id]["turn"]) {
      client.emit("its not your turn");
    } else {
      gamePlayData[room_id]["user"][pidx]["live"] = false;
      gamePlayData[room_id]["livePlayers"]--;

      updateTurn(room_id, "fold");

      if (gamePlayData[room_id]["livePlayers"] == 1) {
        gamePlayData[room_id]["user"][gamePlayData[room_id]["turn"]]["value"] +=
          gamePlayData[room_id]["pot"];

        let win_indexes = [];
        win_indexes.push(gamePlayData[room_id]["turn"]);
        endGame(room_id, win_indexes);
      }
    }
  });
  // Fold...

  // Add client account address to our records
  client.on("record account address", (room_id, client_id, account_address) => {
    address_records[room_id][client_id] = account_address;

    let pidx = players[client_id];
    game_chips_contract.methods
      .getBalanceOther(account_address)
      .call(function (error, result) {
        if (error) console.log("error in fetching balance " + error);
        else {
          gamePlayData[room_id]["user"][pidx]["value"] = result;
          console.log("Init balance : " + result + " of " + account_address);
        }
      });
  });

  // Gameplay options....
});

http.listen(port, function () {
  // http server listening at port
  console.log("Server started!");
});

// Get result of game
function extractCardData(cardData) {
  let arr = [];
  for (let j = 0; j < 3; j++) arr.push(cardData[j].card_idx);
  return arr;
}
// playerOneCards and playerTwoCards are arrays containing 'i' values of the cards
function getResult(playerOneCards, playerTwoCards) {
  let playerOneCardsRank = getRank(playerOneCards);
  let playerTwoCardsRank = getRank(playerTwoCards);

  if (playerOneCardsRank > playerTwoCardsRank) {
    // playerOne wins
    return 1;
  } else if (playerTwoCardsRank > playerOneCardsRank) {
    // playerTwo wins
    return 2;
  } else {
    // draw
    return 0;
  }
}

function getRank(cards) {
  let categoryRank = getCategoryRank(cards);

  let cardRanks = [];

  for (let i = 0; i < 3; i++) {
    if ((cards[i] % 13) + 1 === 1) {
      cardRanks.push(14);
    } else {
      cardRanks.push((cards[i] % 13) + 1);
    }
  }

  cardRanks.sort((a, b) => b - a);

  let rankInCategory;

  switch (categoryRank) {
    case 6:
      rankInCategory = cardRanks[0];
      break;
    case 5:
    case 4:
      if (cardRanks[0] === 14 && cardRanks[1] === 13 && cardRanks[2] === 12) {
        rankInCategory = 15;
      } else if (
        cardRanks[0] === 14 &&
        cardRanks[1] === 3 &&
        cardRanks[2] === 2
      ) {
        rankInCategory = 14;
      } else {
        rankInCategory = cardRanks[0];
      }
      break;
    case 3:
      rankInCategory = cardRanks[0] * 1e4 + cardRanks[1] * 1e2 + cardRanks[2];
      break;
    case 2:
      if (cardRanks[0] === cardRanks[1]) {
        rankInCategory = cardRanks[0] * 1e2 + cardRanks[2];
      } else if (cardRanks[0] === cardRanks[2]) {
        rankInCategory = cardRanks[0] * 1e2 + cardRanks[1];
      } else {
        rankInCategory = cardRanks[1] * 1e2 + cardRanks[0];
      }
      break;
    case 1:
      rankInCategory = cardRanks[0] * 1e4 + cardRanks[1] * 1e2 + cardRanks[2];
  }

  return categoryRank * 1e6 + rankInCategory;
}

function getCategoryRank(cards) {
  let cardRanks = [];
  let cardSuits = [];

  for (let i = 0; i < 3; i++) {
    if ((cards[i] % 13) + 1 === 1) {
      cardRanks.push(14);
    } else {
      cardRanks.push((cards[i] % 13) + 1);
    }
    cardSuits.push(Math.floor(cards[i] / 13));
  }

  cardRanks.sort((a, b) => b - a);
  cardSuits.sort();

  if (cardRanks[0] === cardRanks[1] && cardRanks[0] === cardRanks[2]) {
    // Trail (three of same rank)
    return 6;
  } else if (
    (cardRanks[0] === cardRanks[1] + 1 && cardRanks[0] === cardRanks[2] + 2) ||
    (cardRanks[0] === 14 && cardRanks[1] === 3 && cardRanks[2] === 2)
  ) {
    // Sequence

    if (cardSuits[0] === cardSuits[1] && cardSuits[0] === cardSuits[2]) {
      // Pure sequence
      return 5;
    } else {
      // Regular sequence
      return 4;
    }
  } else if (cardSuits[0] === cardSuits[1] && cardSuits[0] === cardSuits[2]) {
    // Color (Three of same suit)
    return 3;
  } else if (
    cardRanks[0] === cardRanks[1] ||
    cardRanks[0] === cardRanks[2] ||
    cardRanks[1] === cardRanks[2]
  ) {
    // Pair
    return 2;
  } else {
    // High card
    return 1;
  }
}
