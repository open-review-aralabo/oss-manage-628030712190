import React, { Component } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import auth from "../service/auth";
// import web3 from './contract';
import Web3 from "web3";
// const web3 = new Web3(window.web3.currentProvider);
const web3 = window.web3;

var abi = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "sender",
        type: "address"
      },
      {
        indexed: false,
        name: "newWord",
        type: "string"
      }
    ],
    name: "Set",
    type: "event"
  },
  {
    constant: true,
    inputs: [],
    name: "get",
    outputs: [
      {
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "newWord",
        type: "string"
      }
    ],
    name: "set",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
];
var address = "0x4bd17b5fc6d0bbe4a4a881a559d051f97ce7aadb"; // コントラクトアドレス

window.onload = function() {
  // var contract = web3.eth.contract(abi).at(address);
  // contract.get((error, result) => {
  //     document.getElementById("contract_result").textContent = result;
  // });
  // var web3Local = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  // var eventContract = web3Local.eth.contract(abi).at(address);
  // eventContract.Set((error, data) => {
  //     console.log("event callback.");
  //     document.getElementById("contract_result").textContent = data.args.newWord;
  // });
  // document.getElementById("button_set").onclick = () => {
  //     let time = Math.floor(new Date().getTime() / 1000);
  //     console.log(time);
  //     contract.set("" + time, (error, txid) => {
  //         console.log(txid);
  //     });
  // };
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {}
    };
  }

  componentDidMount() {
    this.setUserInfo();

    console.log(web3);

    var contract = web3.eth.contract(abi).at(address);
    contract.get((error, result) => {
      document.getElementById("contract_result").textContent = result;
    });

    var web3Local = new Web3(
      new Web3.providers.HttpProvider("http://localhost:7545")
    );
    var eventContract = web3Local.eth.contract(abi).at(address);
    eventContract.Set((error, data) => {
      console.log("event callback.");
      document.getElementById("contract_result").textContent =
        data.args.newWord;
    });

    document.getElementById("button_set").onclick = () => {
      let time = Math.floor(new Date().getTime() / 1000);
      console.log(time);
      contract.set("" + time, (error, txid) => {
        console.log(txid);
      });
    };
  }

  setUserInfo = async () => {
    const res = await axios.get(
      `https://api.github.com/user?access_token=${auth.token}`
    );
    auth.setUserName(res.data.login);
    this.setState({ userInfo: res.data });
  };

  render() {
    return (
      <div className="Login">
        ホーム
        <div id="contract_result">loading...</div>
        <button type="button" id="button_set">
          更新
        </button>
        {Object.entries(this.state.userInfo).map(([key, value], index) => (
          <p key={index}>
            <span>{key}</span>：<span>{value ? value.toString() : ""}</span>
          </p>
        ))}
      </div>
    );
  }
}
export default withRouter(Home);
