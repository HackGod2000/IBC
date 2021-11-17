const { assert } = require('chai');

const Token = artifacts.require("Token");

require('chai')
.use(require('chai-as-promised'))
.should()


contract('Token',([owner,msg,pot,clientId,viaEvent])=> {

    describe('Token Deployment',async() =>{
        it('checking contracts balance of owner',async()=>
        {
            let token = await Token.new()
            let original_balance = await token.balanceOf(owner)
            token.buyTokens(1000000)
        .then(async (token,original_balance)=> 
        {
            let new_balance = await token.balanceOf(owner);
            console.log("Printing Original Balance")
            console.log(original_balance.toString())

            console.log("Printing New Balance")
            console.log(new_balance.toString())
            //assert.equal(100,100)
            assert.equal(new_balance.toString(),(original_balance-1000000).toString())
            //assert.equal(msg_new_balance.toString(),(msg_old_balance+1000000).toString())
        })
    })

    //Showing some stupid error(balanceOf)
    it('checking contracts balance of senders',async()=>
    {
        let token = await Token.new()
        let msg_old_balance=await token.balanceOf(msg.sender);
        token.buyTokens(1000000)
    .then(async (token,msg_old_balance)=> 
    {
        let msg_new_balance=await token.balanceOf(msg.sender);
        console.log("Printing Original Balance-Sender")
        console.log(msg_old_balance.toString())

        console.log("Printing New Balance-Senders")
        console.log(msg_new_balance.toString())
        
        assert.equal(msg_new_balance.toString(),(msg_old_balance+1000000).toString())
    })
    })


    /*

    it('checking Transfer function',async()=>
    {
        let token = await Token.new()
        let msg_old_balance=await token.balanceOfPot(pot);
        let result=await token.transfer(pot,1000000,clientId,viaEvent)
    .then(async (token,msg_old_balance)=> 
    {
        let msg_new_balance=await token.balanceOfPot(pot);
        console.log("Printing Original Balance-Sender")
        console.log(msg_old_balance.toString())

        console.log("Printing New Balance-Senders")
        console.log(msg_new_balance.toString())
        
        assert.equal(msg_new_balance.toString(),(msg_old_balance+1000000).toString())
    })
    })

    */


    
    })


})