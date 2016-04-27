# Ethereum - Smart Contracts
To create and deploy smart contracts in etherum, we need an instance with ethereum and all the required packages,compilers installed.

Below are the steps to follow to deploy new contracts or use the existing ones:

- Ubuntu virtual machine with ethereum is setup on Microsoft azure. To access the instance please send an email to - [Hina.watts@rbs.com](Hina.watts@rbs.com) or [Vivek.lamba@rbs.com](Vivek.lamba@rbs.com) and ask for the required details of the ethereum instance.
- Once you have the information of the instance (hostname,username and password), you can login to the machine using any SSH client.
- Ethereum Private network - *101010101* is setup on this instance with smart contract deployed.Run the geth console using the command ` geth --maxpeers 0 --genesis genesis.json --networkid 101010101  --rpc  --rpcaddr="0.0.0.0" --rpccorsdomain "*"  --rpcport="8545" --rpcapi "db,eth,net,web3"   console`.You can also run in different network by changing the `networkid` flag to another unique number.This command will start the geth console of ethereum which provides JavaScript Runtime Environment.
- One smart contract (Syndicate Loan ) is already deployed to this network.This contract caters the basic use case of syndicate loan where several banks contribute to single loan using single loan agreement.The contract is written in solidity language and exposes below methods:
    -   Create a new loan 
    -   Contributors can contribute to loan 
    -   Check if the loan target is reached
    -   Fetch all the loan Ids created 
    -   Fetch the detailed information of each loanId
Please refer the file *loan-contract.txt* to look into the contract code.
- To access the contract from console ,type the command `var loan=web3.eth.contract([{ constant: false, inputs: [{ name: "LoanID", type: "uint256" }], name: "checkGoalReached", outputs: [{ name: "reached", type: "bool" }], type: "function" }, { constant: false, inputs: [{ name: "beneficiary", type: "address" }, { name: "goal", type: "uint256" }, { name: "deadline", type: "uint256" }, { name: "grace_period", type: "uint256" }, { name: "tenor", type: "uint256" }, { name: "interest_rate", type: "uint256" }], name: "newLoan", outputs: [{ name: "LoanID", type: "uint256" }], type: "function" }, { constant: false, inputs: [{ name: "loanId", type: "uint256" }], name: "loanInfo", outputs: [{ name: "", type: "uint256" }, { name: "", type: "uint256" }, { name: "", type: "uint256" }, { name: "", type: "address" }], type: "function" }, { constant: false, inputs: [{ name: "LoanID", type: "uint256" }, { name: "contributor", type: "address" }, { name: "amount", type: "uint256" }], name: "contribute", outputs: [], type: "function" }, { constant: false, inputs: [], name: "getAllLoans", outputs: [{ name: "", type: "uint256[]" }], type: "function" }, { constant: false, inputs: [{ name: "LoanID", type: "uint256" }], name: "repayLoan", outputs: [], type: "function" }, { anonymous: false, inputs: [{ indexed: false, name: "outMsg", type: "string" }, { indexed: false, name: "loanId", type: "uint256" }], name: "loanCreated", type: "event" }, { anonymous: false, inputs: [{ indexed: false, name: "outMsg", type: "string" }], name: "PrintMsg", type: "event" }, { anonymous: false, inputs: [{ indexed: false, name: "amount", type: "uint256" }], name: "contributeMsg", type: "event" }, { anonymous: false, inputs: [{ indexed: false, name: "val", type: "bool" }], name: "sendEvent", type: "event" }, { anonymous: false, inputs: [{ indexed: false, name: "outMsg", type: "string" }, { indexed: false, name: "fundingGoal", type: "uint256" }, { indexed: false, name: "tenor", type: "uint256" }, { indexed: false, name: "numfunders", type: "uint256" }, { indexed: false, name: "amount", type: "uint256" }], name: "loanInfoEvnt", type: "event" }]).at('0xe4e9ad54f9e84b082542dff336066ef34351efee');` . This gives the reference to the contract deployed and hence can be used to access the methods that contract provides.

- **Optional** - For logging in contract methods,solidity events are used which are triggered when any contract method is completed.The logic that should run when an event occurs should be written in geth console. So type below commands to see the proper logs coming when an event is triggered:
    - `var event1 = loan.PrintMsg({}, '', function(error, result){if (!error){console.log("PrintMsg" + result.args.outMsg);
}})`;
    - `var event2 = loan.loanCreated({}, '', function(error, result){if (!error){console.log("LoanCreated" + result.args.outMsg +"loanId" + result.args.loanId);}})`;
    - `var event3 = loan.sendEvent({}, '', function(error, result){if (!error){console.log("Send Event" + result.args.val);}})`;
	- `var event4 = loan.contributeMsg({},'',function(error,result){if(!error){console.log("Contribute msg.."+result.args.amount);}})`;
- To access any of the method of the above contract,say *createLoan* ,type the below command `loan.newLoan.sendTransaction(eth.accounts[1],20000000000000000000,1000,3,1,1,{from: eth.accounts[0],gas:500000})` .This creates a new loan for the beneficiary with address of account at index 1.Please refer the contract file for each parameter.
This way you can access the methods of the contract.
- To create a new contract please refer [https://www.ethereum.org/greeter](https://www.ethereum.org/greeter) 

# Syndicate Loan Dapp(UI)
- To just play around with the functionality of loan contract,you can use the decentralized app(Dapp) we have created which in backend calls the contract APIS.The UI is written using meteor framework.Please refer the folder loanDapp-UI.
- To run the loanDapp,ssh to the instance again and navigate to loanDapp folder which is on the root and type meteor.It will start the dapp.Use the URL -[http://`hostname`/configPage](http://`hostname`/configPage) to access the syndicate loan Dapp.
- New Dapp can be created by running the command *meteor create dappName* and refer the loanDapp to create the directory structure where you can write the logic to interact with ethereum geth console through Dapp.



