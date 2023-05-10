import "./App.css";
import { ethers, Signer } from "ethers";
import { useState, useEffect } from "react";
import erc721Abi from "./abi/erc721.json";
import Header from "./components/Header";

function App() {
  const [account, setAccount] = useState("");
  const [signer, setSigner] = useState(null);
  const [btnHide, setbtnhide] = useState(false);
  const [eventlog, seteventlogs] = useState([]);
  const [currentblock, setcurrentblock] = useState();
  const listentransferevent = async () => {
    // const signer1 = new ethers.providers.Web3Provider(
    //   window.ethereum
    // ).getSigner();
    console.log("iam started");
    const contract = new ethers.Contract(
      "0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258",
      erc721Abi,
      signer
    );
  await contract.queryFilter("Transfer",-1000).then((e,res)=>{console.log(res);
  console.log(e);})
      
    setbtnhide(true);
  };
  const balance = async (tokenAddress) => {
    const contract = new ethers.Contract(tokenAddress, erc721Abi, signer);
    const balance = await contract.balanceOf(account);
    console.log(balance.toString());
  };

  const connect = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      setSigner(signer);
      setAccount(accounts[0]);
      setcurrentblock( await provider.getBlockNumber());
    } else {
      console.log("Please install metamask.");
    }
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    <div className="page">
      <Header connect={connect} account={account} />
      <div className="main">
        <p>Dapp starter</p>
        <br />
        <button
          style={{ display: btnHide ? "none" : null }}
          className="button"
          onClick={() => listentransferevent()}
        >
          Get Event
        </button>
        {eventlog.reverse().map((event, index) => {
          return (
            <div key={index} className="container">
              <p>From : {event.from}</p>
              <p>{">>>>>>"}</p>
              <p>To : {event.to} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
