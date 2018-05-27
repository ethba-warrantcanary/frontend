let web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545/"));
let account = '';
let contractAddress = '0x345ca3e014aaf5dca488057592ee47305d9b3e10';
let contract = web3.eth.contract(abi).at(contractAddress);
web3.eth.defaultAccount = account;

// Get the initial account balance so it can be displayed.
web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
    }

    if (accs.length == 0) {
        console.log("No accounts found!");
        return;
    }

    accounts = accs;
    account = accounts[0];
    console.log("Account: "+ account);
    document.querySelector('form#check_canary_status input').value = account;
});

console.log(contract);

var objCheckCanary = document.getElementById("check_canary_status");
objCheckCanary.addEventListener('submit', (e) => {
    e.preventDefault();
    _0xaddress = document.querySelector('form#check_canary_status input').value;

    if(contract.isCanaryAlive(_0xaddress)) {
        document.getElementById("canary_status").innerText = "CANARY IS ALIVE";

        var lastblock = contract.getCanaryLastBlockPing(_0xaddress);
        document.getElementById("canary_status").innerText = lastblock;

    } else {
        document.getElementById("canary_status").innerText = "CANARY IS DEAD ALIVE";
    }
});
