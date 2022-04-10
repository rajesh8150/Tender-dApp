import React, { Fragment, useEffect, useState } from "react";
import logo from './logo.svg';
import Web3 from 'web3';
import './App.css';
import Biddingabi from "./contracts/Bidding.json";
import Navbar from "./Navbar";
import Body from "./Body";
import Body2 from "./Body2";
import Body3 from "./Body3";

function App() {

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  },[])

  const[Currentaccount,setCurrentaccount] = useState("");
  const[loader,setloader] = useState(true);
  const[HighestBid,setHighestBid] = useState();
  const[Count,setCount] = useState();
  var BidName = "";
  

  const[Biddingsm,setBiddingsm] = useState();

  const loadWeb3 = async () => {                    //Interact with the web3
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };


  const loadBlockchainData = async () => {         //Creating an instance of smart contract

    setloader(true);

    const web3 = window.web3;
    

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);

    const networkId = await web3.eth.net.getId();

    const networkData = Biddingabi.networks[networkId];

    if(networkData){
      const bidding  = new web3.eth.Contract(Biddingabi.abi,networkData.address);
      const bid = await bidding.methods.getHighestBid().call();
      setHighestBid(bid/1000000000000000000);
      const cnt = await bidding.methods.getcount().call();
      console.log(cnt);
      console.log("adnvcdjkvn");
      setCount(cnt);
      setBiddingsm(bidding);
      setloader(false);
    } else{
      window.alert('The smart contract is not deployed on current network')
    }
  };

  const setuser = async(name) => {
    setloader(true);
    console.log(Currentaccount);
    await Biddingsm.methods.setuser(Currentaccount).call()
    console.log(Count);
    await Biddingsm.methods.setcount().call()
    const cnt=await Biddingsm.methods.getcount().call()
    console.log(cnt);
    setCount(cnt);
    console.log(Count);
    window['BidName'] = name;
    console.log(name);
    console.log(window['BidName']);
    setloader(false);
  }

  function getName(){
    console.log(window['BidName']);
    return window['BidName'];
  }


  const makeBid = async (val) => {
    setloader(true);
    await Biddingsm.methods.bid().send({
      from : Currentaccount,
      value:val
    })
    .on('transactionhash',()=>{
      console.log("Successfully ran");
    })
    await Biddingsm.methods.setcount().call()
    setloader(false);
  }

  const endBid = async () => {
    setloader(true);
    console.log(Currentaccount);
    await Biddingsm.methods.endbid().send({
      from : Currentaccount
    })
    await Biddingsm.methods.setcount().call()
    setloader(false);
  }

  /*const getcount = async () => {
    console.log("he");
    setloader(true);
    console.log("hf");
    const tf = await Biddingsm.methods.getcount().call()
    console.log("djf");
    console.log(tf);
    console.log("hello");
    setloader(false);
    console.log("sjdbhd");
    return tf;
  }*/

  if(loader){
    return <div>loading...</div>
  }

  console.log(Count);
  
  
    return (
      <div>
        <div><Navbar account={Currentaccount}/></div>
        <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
      <Body makeBid={makeBid} HighestBid={HighestBid} getName={getName}/>
      <Body2 endBid={endBid}/></div>
      </div>
    );
  
}

export default App;
