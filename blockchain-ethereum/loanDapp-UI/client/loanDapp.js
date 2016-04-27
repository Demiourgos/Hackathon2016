if (Meteor.isClient) {
Session.setDefault('currentViewIs','newLoan');
Session.setDefault('showLoanDetails',false);
Session.setDefault('loanDetailsClass','loan-details-hide');
Session.setDefault('loanProfileInfo','');
Session.setDefault('showLoanDetails',false);
Session.setDefault('loanDetailsClass','loan-details-hide');
Session.setDefault('loanProfileInfo','');
Session.setDefault('loanAmountContributed','');
Session.setDefault('loanAmount','');
Session.setDefault('loanTenor','');
Session.setDefault('userName','Rob');
Session.setDefault('userAccountAddr','0xd7bef05ba0c9fa50ea39ec725f28cdc47183d43e');
Session.setDefault('loanIdCreated','');
Session.setDefault('loanIdCreatedClass','loan-details-hide');
Session.setDefault('loanContributed','');
Session.setDefault('loanIdContributedClass','loan-details-hide');
Session.setDefault('userBalance',' ');
Router.route('/configPage', { template: 'hello' });
Session.setDefault('isLoading',false);
Session.setDefault('spinnerLoanShow','loan-details-hide');
Session.setDefault('spinnerContributeShow','loan-details-hide');
Session.setDefault('spinnerCheckLoanShow','loan-details-hide');
Session.setDefault('loanIdCheckClass','loan-details-hide');
var loan=web3.eth.contract([{ constant: false, inputs: [{ name: "LoanID", type: "uint256" }], name: "checkGoalReached", outputs: [{ name: "reached", type: "bool" }], type: "function" }, { constant: false, inputs: [{ name: "beneficiary", type: "address" }, { name: "goal", type: "uint256" }, { name: "deadline", type: "uint256" }, { name: "grace_period", type: "uint256" }, { name: "tenor", type: "uint256" }, { name: "interest_rate", type: "uint256" }], name: "newLoan", outputs: [{ name: "LoanID", type: "uint256" }], type: "function" }, { constant: false, inputs: [{ name: "loanId", type: "uint256" }], name: "loanInfo", outputs: [{ name: "", type: "uint256" }, { name: "", type: "uint256" }, { name: "", type: "uint256" }, { name: "", type: "address" }], type: "function" }, { constant: false, inputs: [{ name: "LoanID", type: "uint256" }, { name: "contributor", type: "address" }, { name: "amount", type: "uint256" }], name: "contribute", outputs: [], type: "function" }, { constant: false, inputs: [], name: "getAllLoans", outputs: [{ name: "", type: "uint256[]" }], type: "function" }, { constant: false, inputs: [{ name: "LoanID", type: "uint256" }], name: "repayLoan", outputs: [], type: "function" }, { anonymous: false, inputs: [{ indexed: false, name: "outMsg", type: "string" }, { indexed: false, name: "loanId", type: "uint256" }], name: "loanCreated", type: "event" }, { anonymous: false, inputs: [{ indexed: false, name: "outMsg", type: "string" }], name: "PrintMsg", type: "event" }, { anonymous: false, inputs: [{ indexed: false, name: "amount", type: "uint256" }], name: "contributeMsg", type: "event" }, { anonymous: false, inputs: [{ indexed: false, name: "val", type: "bool" }], name: "sendEvent", type: "event" }, { anonymous: false, inputs: [{ indexed: false, name: "outMsg", type: "string" }, { indexed: false, name: "fundingGoal", type: "uint256" }, { indexed: false, name: "tenor", type: "uint256" }, { indexed: false, name: "numfunders", type: "uint256" }, { indexed: false, name: "amount", type: "uint256" }], name: "loanInfoEvnt", type: "event" }]).at('0xe4e9ad54f9e84b082542dff336066ef34351efee');

var event1 = loan.PrintMsg({}, '', function(error, result){if (!error){console.log("PrintMsg" + result.args.outMsg);
}});

var event2 = loan.loanCreated({}, '', function(error, result){if (!error){console.log("LoanCreated" + result.args.outMsg +"loanId" + result.args.loanId);
var l=result.args.loanId;
Session.set('isLoading',false);
	Session.set('spinnerLoanShow','loan-details-hide');
Session.set('loanIdCreated',l.toNumber());
Session.set('loanIdCreatedClass','loan-details-show');
}});
var event3 = loan.sendEvent({}, '', function(error, result){if (!error){console.log("Send Event" + result.args.val);
Session.set('spinnerCheckLoanShow','loan-details-hide');
Session.set('loanIdCheckClass','loan-details-show');
var addr=Session.get('userAccountAddr');
var bal=web3.fromWei(web3.eth.getBalance(addr), "ether");
Session.set('userBalance',bal.toNumber());
}

alert("Congratulations||Goal is reached and amount is credited to beneficiary's account");
});
var event4 = loan.contributeMsg({},'',function(error,result){if(!error){
console.log("Contribute msg.."+result.args.amount);
var addr=Session.get('userAccountAddr');
var totalAm=result.args.amount/Math.pow(10,18);
var bal=web3.fromWei(web3.eth.getBalance(addr), "ether");
Session.set('spinnerContributeShow','loan-details-hide');
Session.set('loanContributed',totalAm);
Session.set('userBalance',bal.toNumber());
Session.set('loanIdContributedClass','loan-details-show');

}});
var userJson =[{"name":"Alice","account":"0x47bfb9335f30f00b776026d1bc620d4090d75717"},
{"name":"Rob","account":"0xd7bef05ba0c9fa50ea39ec725f28cdc47183d43e"},
{"name":"Mathew","account":"0x378e8081de652b054079437d58e5237977270c00"},
{"name":"Allen","account":"0x7fbe93bc104ac4bcae5d643fd3747e1866f1ece4"},
]

  
Template.hello.helpers({
currentViewIs:function(view){
if(Session.get('currentViewIs')==view)
{
Session.set('loanDetailsClass','loan-details-hide');
return true;
}
else{
Session.set('loanDetailsClass','loan-details-hide');
return false;
}
},
userName: function(){
return Session.get('userName');
},
userAccountAddr:function(){
var bal=web3.fromWei(web3.eth.getBalance(Session.get('userAccountAddr')), "ether");
Session.set('userBalance',bal.toNumber());
return Session.get('userAccountAddr');
},
userBalance:function(){
return Session.get('userBalance');
}
});
Template.hello.events({
'click .newLoan': function(event){
  event.preventDefault();

Session.set('currentViewIs','newLoan');
},
'click .contribute': function(event){
  event.preventDefault();
Session.set('currentViewIs','contribute');
},
'click .checkLoan': function(event){
  event.preventDefault();
Session.set('currentViewIs','checkLoan');
},
'change #selectUser':function(event,template){
  event.preventDefault();
  var userName= template.$("#selectUser").val();
for(i=0;i<userJson.length;i++)
{
	if(userName==userJson[i].name)
	{
		accountAddr=userJson[i].account;
	}
}
Session.set('userAccountAddr',accountAddr);
Session.set('userName',userName);
var bal=web3.fromWei(web3.eth.getBalance(accountAddr), "ether");
Session.set('userBalance',bal.toNumber());
	}
});
Template.newLoanTemplate.helpers({
userName: function(){
return Session.get('userName');
},
userAccountAddr:function(){
return Session.get('userAccountAddr');
},
loanIdCreatedClass:function(){
return Session.get('loanIdCreatedClass');
},
loanIdCreated:function(){
return Session.get('loanIdCreated');
},
isLoading:function(){
return Session.get('isLoading');
},
spinnerLoanShow:function(){
if(Session.get('isLoading'))
{
return 'loan-details-show';
}
else
return 'loan-details-hide';

}
});
Template.newLoanTemplate.events({
	'submit .newLoanForm':function (event){
	event.preventDefault();
	Session.set('isLoading',true);
	Session.set('spinnerLoanShow','loan-details-show');
var addr1=event.target.beneficiary.value;
console.log("addr11.."+addr1);
var goal=event.target.goal.value * Math.pow(10,18);
var gracePeriod=event.target.gracePeriod.value;
var deadline=event.target.deadline.value;
var tenor=event.target.tenor.value;
var interestRate=event.target.interestRate.value;
loan.newLoan.sendTransaction(addr1,goal,deadline,gracePeriod,tenor,interestRate,{from:web3.eth.accounts[0],gas:500000});
console.log("web3 accounts.."+web3.eth.accounts);
}
});
	
Template.contributeTemplate.helpers({
loanIds:function(){
var loanIdArr=loan.getAllLoans.call();
var loanIds=[];
for(i=0;i<loanIdArr.length;i++)
{
var loanId={"id":loanIdArr[i]};
loanIds.push(loanId);
}
return loanIds;
},
userName: function(){
return Session.get('userName');
},
userAccountAddr:function(){
return Session.get('userAccountAddr');
},
userBalance:function(){
return Session.get('userBalance');
},
loanAmount:function(){
var loanAmt=Session.get('loanAmount');
var loanAmtEther=loanAmt/Math.pow(10,18);
return loanAmtEther;
},
loanDetailsClass:function(){
return Session.get('loanDetailsClass');
},
tenorDiff:function(){
var latestBlock= web3.eth.getBlock('latest').number;
var diff=Session.get('loanTenor')-latestBlock;
return diff;
},
fundersAmount:function(){
return Session.get('loanAmountContributed');
},
loanContributed:function(){
return Session.get('loanContributed');
},
loanIdContributedClass:function(){
return Session.get('loanIdContributedClass');
},
spinnerContributeShow:function(){
return Session.get('spinnerContributeShow');
}

});
Template.contributeTemplate.events({
'change #loanSelectId':function(event,template){
  event.preventDefault();
	var selectValue = template.$("#loanSelectId").val();
    console.log(selectValue); 
	if(selectValue=='Select')
	{
	Session.set('loanDetailsClass','loan-details-hide');
	}
	else
	{
	Session.set('loanIdSelected',selectValue);
	var loanProfileInfo=loan.loanInfo.call(selectValue);
	var loanAmountInfo=loanProfileInfo[2].toNumber()/Math.pow(10,18);;
	console.log(loanProfileInfo);
	Session.set('loanProfileInfo',loanProfileInfo);
	Session.set('loanAmountContributed',loanAmountInfo);
	Session.set('loanAmount',loanProfileInfo[0].toNumber());
	Session.set('showLoanDetails',true);
	Session.set('loanDetailsClass','loan-details-show');
	Session.set('loanTenor',loanProfileInfo[1].toNumber());
	}
	},
	'submit .contributeForm':function(event){
event.preventDefault();
Session.set('spinnerContributeShow','loan-details-show');
console.log("contributing");
var contributor = Session.get('userAccountAddr');
var loanId=Session.get('loanIdSelected');
var amount=event.target.amount.value * Math.pow(10,18);
console.log('cont..'+contributor+'..+loanId..'+loanId+'..amount..'+amount);
loan.contribute.sendTransaction(loanId,contributor,amount,{from:web3.eth.accounts[0],gas:500000});
var tx =  web3.eth.sendTransaction({from: contributor, to: loan.address, value: amount});
console.log('tx'+ tx);
console.log("contributing..."+loanId);

}
});
Template.checkLoanStatusTemplate.helpers({
loanIds:function(){
var loanIdArr=loan.getAllLoans.call();
var loanIds=[];
for(i=0;i<loanIdArr.length;i++)
{
var loanId={"id":loanIdArr[i]};
loanIds.push(loanId);
}
return loanIds;
},

loanAmount:function(){
var loanAmt=Session.get('loanAmount');
var loanAmtEther=loanAmt/Math.pow(10,18);
return loanAmtEther;
},
loanDetailsClass:function(){
return Session.get('loanDetailsClass');
},
tenorDiff:function(){
var latestBlock= web3.eth.getBlock('latest').number;
var diff=Session.get('loanTenor')-latestBlock;
return diff;
},
fundersAmount:function(){
return Session.get('loanAmountContributed');
},
loanBeneficiary:function(){
var beneficiaryName='';
var beneficiaryAddr = Session.get('loanProfileInfo')[3];
for(i=0;i<userJson.length;i++)
{
	if(beneficiaryAddr==userJson[i].account)
	{
		beneficiaryName=userJson[i].name;
	}
}
return beneficiaryName;
},
spinnerCheckLoanShow:function(){
return Session.get('spinnerCheckLoanShow');
},
loanIdCheckClass:function(){
return Session.get('loanIdCheckClass');
}
});
Template.checkLoanStatusTemplate.events({
'change #loanSelectId':function(event,template){
  event.preventDefault();
	var selectValue = template.$("#loanSelectId").val();
    console.log(selectValue); 
	if(selectValue=='Select')
	{
	Session.set('loanDetailsClass','loan-details-hide');
	}
	else
	{
	Session.set('loanIdSelected',selectValue);
	var loanProfileInfo=loan.loanInfo.call(selectValue);
	var loanAmountInfo=loanProfileInfo[2].toNumber()/Math.pow(10,18);;
	console.log(loanProfileInfo);
	Session.set('loanProfileInfo',loanProfileInfo);
	Session.set('loanAmountContributed',loanAmountInfo);
	Session.set('loanAmount',loanProfileInfo[0].toNumber());
	Session.set('showLoanDetails',true);
	Session.set('loanDetailsClass','loan-details-show');
	Session.set('loanTenor',loanProfileInfo[1].toNumber());
	}
	},
	'submit .checkGoalReached':function(event){
event.preventDefault();
Session.set('spinnerCheckLoanShow','loan-details-show');
console.log("check goal reached");
var loanIdToCheck=Session.get('loanIdSelected');

loan.checkGoalReached.sendTransaction(loanIdToCheck,{from:web3.eth.accounts[0],gas:1000000});
}
});
}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
