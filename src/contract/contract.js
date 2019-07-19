var abi = [
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "newWord",
                "type": "string"
            }
        ],
        "name": "Set",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "get",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newWord",
                "type": "string"
            }
        ],
        "name": "set",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
var address = "0x4bd17b5fc6d0bbe4a4a881a559d051f97ce7aadb"; // コントラクトアドレス
export default new web3.eth.Contract(abi, address);
// window.onload = function () {
//     var contract = web3.eth.contract(abi).at(address);
//     contract.get((error, result) => {
//         document.getElementById("contract_result").textContent = result;
//     });

//     web3Local = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
//     var eventContract = web3Local.eth.contract(abi).at(address);
//     eventContract.Set((error, data) => {
//         console.log("event callback.");
//         document.getElementById("contract_result").textContent = data.args.newWord;
//     });

//     document.getElementById("button_set").onclick = () => {
//         let time = Math.floor(new Date().getTime() / 1000);
//         console.log(time);
//         contract.set("" + time, (error, txid) => {
//             console.log(txid);
//         });
//     };
// };