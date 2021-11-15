
const Token = artifacts.require("Token");

require('chai')
.use(require('chai-as-promised'))
.should()


contract('Token',([owner])=> {

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
        })
    })
    
    })
})