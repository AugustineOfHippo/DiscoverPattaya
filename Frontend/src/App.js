import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';
import { BigNumber, ethers } from "ethers";


import smartContract from './abi/smartContract';
import faucetContract from './abi/faucetContract';
import tokenContract from './abi/tokenContract';

// COMPONENTS
import NavbarComponent from './components/NavbarComponent';
import UserComponent from './components/UserComponent';
import FaucetComponent from './components/FaucetComponent';
import BookingComponent from './components/BookingComponent';

function App() {

  const [smtContract,setSmtContract] = useState(undefined);
  const [fctContract,setFctContract] = useState(undefined);
  const [tknContract,setTknContract] = useState(undefined);
  const [activities,setActivities] = useState([]);
  const [myAllowance,setMyAllowance] = useState();
  const [walletAddress, setWalletAddress] = useState("");
  const [signer,setSigner] = useState();
  const [loading,setLoading] = useState(false);
  const [loggedUser,setLoggedUser] = useState({
    email:"",
    fullName:"",
    phoneNumber:""
    }
  ) 


  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
    getMyActivities();
    getClientInfo();
  },[walletAddress])

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        // Get provider
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        // Get accounts
        const accounts = await provider.send("eth_requestAccounts",[])
        // Get Signer
        setSigner(provider.getSigner());
        // Local Contract Instance
        setSmtContract(smartContract(provider))
        setFctContract(faucetContract(provider))
        setTknContract(tokenContract(provider))

        // const accounts = await window.ethereum.request({
        //   method: "eth_requestAccounts",
        // });
        setWalletAddress(accounts[0]);
        await getClientInfo();
        console.log("Connect Wallet")
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
         // Get provider
         const provider = new ethers.providers.Web3Provider(window.ethereum)
         // Get accounts
         const accounts = await provider.send("eth_accounts",[])
         
        if (accounts.length > 0) {
          // Get Signer
         setSigner(provider.getSigner());
         // Local Contract Instance
         setSmtContract(smartContract(provider))
        setFctContract(faucetContract(provider))
        setTknContract(tokenContract(provider))

          setWalletAddress(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log("AddWalletListener")
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };

  const requestFunds = async () => {
    try {
        const faucetSigner = fctContract.connect(signer);
        const resp = await faucetSigner.giveFunds();
        console.log(resp)
    } catch (error) {
    }
  }

  const getClientInfo = async() => {
    try {
      const contractSigner = smtContract.connect(signer);
      const resp = await contractSigner.getClientByAddress(walletAddress);
      setLoggedUser({
        email:resp.email,
        fullName:resp.fullName,
        phoneNumber:resp.phoneNumber
      })
    } catch (error) {
    }
  }
  const getMyActivities = async() => {
    try {
      const smtSigned = smtContract.connect(signer);
      const resp = await smtSigned.getActivityByAddress(walletAddress)
      if(resp !== null){
      setActivities(resp);
    }
    } catch (error) {
      
    }

}

  const getAllo = async () => {
    const contractSigner = tknContract.connect(signer);
    const resp =  await contractSigner.allowance(walletAddress,smtContract.address);
    console.log("WalletAddress: " + walletAddress);
    console.log("SmartContractAddress: " +smtContract.address )
    console.log(resp);
    setMyAllowance(resp._hex);

  }
  const approveTrans = async () => {
    const contractSigner = tknContract.connect(signer);
    const resp =  await contractSigner.approve(smtContract.address,BigNumber.from("1000000000000000000000"))
  }


  const bookDiving = async() => {
      // const contractSigner = tknContract.connect(signer);
      await approveTrans().then(async() => {
        try {
          //  const resp =  await contractSigner.approve(fctContract.address,BigNumber.from("1000000000000000000000"))
            //  .then(async() => {
              const smtSigned = smtContract.connect(signer);
              const resp2 = await smtSigned.bookScuba();
              const resp3 = await smtSigned.getActivityByAddress(walletAddress);
              setActivities(resp3);
            //  }) 
            } catch (error) {
              console.log(error)
            }
      })
  }

  return (
   <div className='mx-auto flex flex-col bg-gradient-to-b from-orange-100 to-pink-200  h-screen overflow-auto'> 
        <NavbarComponent connectWallet={connectWallet} walletAddress={walletAddress} getClientInfo={getClientInfo}/>
        <FaucetComponent requestFunds={requestFunds} />
        {smtContract !== '' ? 
         <UserComponent
         activities={activities}
         getClientInfo={getClientInfo}
          setLoggedUser={setLoggedUser} 
          loggedUser={loggedUser} 
          smtContract={smtContract}
           walletAddress={walletAddress}
            signer={signer} /> 
        : ''}
        <BookingComponent bookDiving={bookDiving}/>
        {/* <div className='bg-white w-1/3 p-2 rounded-md mx-auto mt-2'>
          <h1>Smart Contract Address:{smtContract.address}</h1>
          <h1>Faucet Contract Address:{fctContract.address}</h1>
          <h1>Token Contract Address:{tknContract.address}</h1>
        </div> */}
        <div className='bg-white w-1/3 p-2 rounded-md mx-auto mt-2'>
          <p>In case you somehow landed on this page, this was my very first "blockchain" project.I created my own ERC20 token,
            created a Faucet where you can request tokens and then "Book" a scuba diving experience in pattaya.This is just
            a prototype but eventually I will make it a real website.I put 0 effort into the frontend since this was just a learning experience
          </p>
        </div>

   </div>
  );
}

export default App;
