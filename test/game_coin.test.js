const { assert } = require("chai");

const Token = artifacts.require("Token");

require("chai").use(require("chai-as-promised")).should();

contract("Token BuyTest", async ([owner, player1, player2]) => {
	it("Buying Tokens for Multi Player and Checking Test", async () => {
		const tokenInstance = await Token.deployed();
		const owner_balance = await tokenInstance.getBalance();
		const player1_balance = await tokenInstance.getBalanceOther(player1);
		const player2_balance = await tokenInstance.getBalanceOther(player2);
		//player2 = 0xF033fC3c3daf5baEDAd2845Ee8C47F007547e062
		// player1 = 0x900D340f7ba5F95b28aC66DebdFEc495b48a7C4B
		// Owner = 0x0A01b9fF422300177D54D4C09bf3961Eb2B417F2

		//const contractAddress = await tokenInstance.getContractAddress();

		await tokenInstance.buyTokens(100, { from: player1, value: 1000 });
		await tokenInstance.buyTokens(250, { from: player2, value: 1000 });

		let player1_balance_updated = await tokenInstance.getBalanceOther(player1);
		let player2_balance_updated = await tokenInstance.getBalanceOther(player2);
		console.log(
			player1_balance_updated.toString(),
			player2_balance_updated.toString()
		);
		const owner_balance_updated = await tokenInstance.getBalanceOther(owner);
		const etherAmount = await tokenInstance.getContractBalance();
		console.log("The Ether Amount for buying the tokens " + etherAmount);
		assert.equal(
			(player2_balance_updated - -player1_balance_updated).toString(),
			(owner_balance - owner_balance_updated).toString()
		);
	});

	it("Starting Game and Testing Round", async () => {
		const tokenInstance = await Token.deployed();
        
		const player1_balance = await tokenInstance.getBalanceOther(player1);
		const player2_balance = await tokenInstance.getBalanceOther(player2);
		console.log(player1_balance.toString(), player2_balance.toString());
		const room_id = "ohRgclC";
		const p1_id = "p1hash";
		const p2_id = "p2hash";
		await tokenInstance.transfer(room_id, 2, p1_id, "bet", { from: player1 });
		await tokenInstance.transfer(room_id, 2, p2_id, "bet", { from: player2 });
		await tokenInstance.transfer(room_id, 4, p1_id, "raise", {
			from: player1,
		});
		await tokenInstance.transfer(room_id, 4, p2_id, "bet", {
			from: player2,
		});
		await tokenInstance.transfer(room_id, 4, p1_id, "show", {
			from: player1,
		});
		await tokenInstance.winnerTransfer(room_id, player1),
			{
				from: owner,
			};

		player1_balance_updated = await tokenInstance.getBalanceOther(player1);
		player2_balance_updated = await tokenInstance.getBalanceOther(player2);

		console.log(
			player1_balance_updated.toString(),
			player2_balance_updated.toString()
		);

		assert.equal(100, 101);
	});
});
