const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3')
const {interface, bytecode} = require('./compile');
const provider = new HDWalletProvider(
    'seed either payment void place brick noise early garden drive drastic devote',
    'https://rinkeby.infura.io/v3/175c2409f2584babbe61b9395e85008d'

);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy Accounts",accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface)).
    deploy({data:bytecode,arguments:['hi there']}).
    send({gas:'1000000',from: accounts[0]});

    console.log("Contracts deployed too", result.options.address);

};

deploy();