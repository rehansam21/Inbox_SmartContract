const assert = require('assert');
//console.log(assert)
const ganache = require('ganache-cli')
//Web3 is a constructor function. Used to create instances of web3 lib
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');

// beforeEach(()=>{
//     // Get a list of all accounts
//     web3.eth.getAccounts().then( fetchedAccounts=> {
//              console.log(fetchedAccounts);

//          })
// });

let accounts;
let inbox;
beforeEach(async ()=>{
    
    accounts = await web3.eth.getAccounts();

    //Contract is capital C . so it is a constructor f() 
    //& we're creating instance of it
    inbox= await new web3.eth.Contract(JSON.parse(interface))  //web3 interacts with contracts ABI file  JS Object
        //deploy created and Object that can be deployed to the network
        .deploy({data:bytecode,arguments:["hi there"]})  //deploy contracts & provide argument to contructor of a contract
        .send({from: accounts[0], gas: '1000000'}); // triggers communication from web3 to the N/w.

});

describe('Inbox',()=> {
    it("deploys a contract", ()=>{
        console.log("Inbox Contract Inside",inbox)
        assert.ok(inbox.options.address);

    });
    // use one of the contracts to deploy the contract
    it('has a default message',async ()=>{
        const message = await inbox.methods.message().call();
        assert.equal(message,'hi there');

    });

    it("set message ", async ()=> {
        await inbox.methods.setMessage('How there').send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message,'How there');

    });

    it('get message', async ()=> {
        const result = await inbox.methods.getMessage().call();
        console.log('result ----->>>',result)
        const message = await inbox.methods.message().call();
        console.log("message ----->>>>>",message)
        assert.equal(message ,'How there');
    });

});















































































































// class Car {
//     park(){
//         return "stopped";
//     }
//     drive(){
//         return "vroom";
//     }
// }
// // mocha test code
// let car;
// beforeEach('Before Each ',()=> { 
//     car = new Car()

// });
// describe("Car",() => {
//     it('can park',()=>{
     
//         assert.equal(car.park(), 'stopped');
//     });

//     it('drive .....',()=>{
       
//         assert.equal(car.drive(),'vroom');
//     });

// });