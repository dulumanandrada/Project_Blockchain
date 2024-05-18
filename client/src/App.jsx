// import { useState,useEffect } from 'react'
// import abi from "./contractJson/chai.json"
// import {ethers} from "ethers"
// import Memos from './components/Memos'
// import Buy from './components/Buy'
// import chai from "./chai.png";
// import './App.css'

// function App() {
//   const [state,setState]=useState({
//     provider:null,
//     signer:null,
//     contract:null
//   })
//   const [account,setAccount]=useState('Not connected');
//   useEffect(()=>{
//     const template=async()=>{
   
//       const contractAddres="0xD2c6d3FB0b0E90DF12Ea619B02a33bECe175032E";
//       const contractABI=abi.abi;
//       //Metamask part
//       //1. In order do transactions on goerli testnet
//       //2. Metmask consists of infura api which actually help in connectig to the blockhain
//       try{
//         const {ethereum}=window;
//         const account = await ethereum.request({
//           method:"eth_requestAccounts"
//         })
 
//         window.ethereum.on("accountsChanged",()=>{
//          window.location.reload()
//         })
//         setAccount(account);
//         const provider = new ethers.providers.Web3Provider(ethereum); //read the Blockchain
//         const signer =  provider.getSigner(); //write the blockchain
        
//         const contract = new ethers.Contract(
//           contractAddres,
//           contractABI,
//           signer
//         )
//         console.log(contract)
//       setState({provider,signer,contract});
       
//       }catch(error){
//         console.log(error)
//       }
//     }
//     template();
//   },[])
//   return (
//     <div >
//     <img src={chai} className="img-fluid" alt=".." width="100%" />
//     <p style={{ marginTop: "10px", marginLeft: "5px" }}>
//       <small>Connected Account - {account}</small>
//     </p>
   
//       <Buy state={state} />
//       <Memos state={state} />
    
//   </div>
//   )
// }

// export default App


import { useState,useEffect } from 'react'
import abi from "./contractJson/patient.json"
import abiDoctor from "./contractJson/doctor.json"
import {ethers} from "ethers"
import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import RegisterDoctor from './pages/RegisterDoctor';
import RecordsList from './pages/RecordsList';
import RegisterPatient from './pages/RegisterPatient';
import DoctorsList from './pages/DoctorsList';
import RecordDetails from './pages/RecordDetails';
import DoctorDetails from './pages/DoctorDetails';
import AproveDoctor from './pages/AproveDoctor';

function App() {
  const [state,setState]=useState({
    provider:null,
    signer:null,
    contract:null
  })
  const [doctor,setDoctor]=useState({
    provider:null,
    signer:null,
    contract:null
  })
  const [account,setAccount]=useState('Not connected');
  const [balance,setBalance]=useState('Not connected');

  useEffect(()=>{
    const template=async()=>{
    
      //patient
      const contractAddres="0xb9656af2E12451F9210163b83C3ECce6C51086C1";
      const contractABI=abi.abi;

      //doctor
      const contractAddresDoctor="0xd3BfFFB06a1b7A652e5bc99abE71dd2Eb14345a3";
      const contractABIDoctor=abiDoctor.abi;


      //Metamask part
      //1. In order do transactions on sepolia testnet
      //2. Metmask consists of infura api which actually help in connectig to the blockhain
      try{
        const {ethereum}=window;
        const account = await ethereum.request({
          method:"eth_requestAccounts"
        })
  
        window.ethereum.on("accountsChanged",()=>{
          window.location.reload()
        })
        setAccount(account[0]);
        const provider = new ethers.providers.Web3Provider(ethereum); //read the Blockchain
        const signer =  provider.getSigner(); //write the blockchain

        const balance = await provider.getBalance(account[0]);
        setBalance(ethers.utils.formatEther(balance));

        const contract = new ethers.Contract(
          contractAddres,
          contractABI,
          signer
        )
        console.log(contract)
        contract.on('PatientRegistered', (patientAddress, ic, name, diagnostic) => {
          console.log(`Patient registered: ${patientAddress}, IC: ${ic}, Name: ${name}, Diagnostic: ${diagnostic}`)
          alert(`Patient registered: ${patientAddress}, IC: ${ic}, Name: ${name}, Diagnostic: ${diagnostic}`)
        })

        contract.on('PatientEdited', (patientAddress, ic, name, diagnostic) => {
          console.log(`Patient edited: ${patientAddress}, IC: ${ic}, Name: ${name}, Diagnostic: ${diagnostic}`)
          alert(`Patient edited: ${patientAddress}, IC: ${ic}, Name: ${name}, Diagnostic: ${diagnostic}`)
        })

        contract.on('AccessGranted', (patientAddress, doctorAddress) => {
          console.log(`Acces granted for patient: ${patientAddress}, to doctor: ${doctorAddress}`)
          alert(`Acces granted for patient: ${patientAddress}, to doctor: ${doctorAddress}`)
        })

        const contractDoctor = new ethers.Contract(
          contractAddresDoctor,
          contractABIDoctor,
          signer
        )
        console.log(contractDoctor)
        setState({provider,signer,contract});
        setDoctor({provider,signer,contract: contractDoctor})
      }catch(error){
        console.log(error)
      }
    }
    template();
  },[])
  return (
    <>
      <p style={{ marginBottom: '0', paddingBottom: "10px", paddingTop: "10px", paddingLeft: "5px", backgroundColor: 'rgba(35,39,47, 1)', color: 'aliceblue' }}>
       <small>Connected Account - {account}</small>
       <br />
       <small>Balance Account - {balance}</small>
      </p>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/register-patient" element={<RegisterPatient state={state} />} />
        <Route path="/register-doctor" element={<RegisterDoctor state={doctor} />} />
        <Route path="/records-list" element={<RecordsList state={state} />} />
        <Route path="/doctors-list" element={<DoctorsList state={doctor} />} />
        <Route path="/records-list/details/:address" element={<RecordDetails state={state} />} />
        <Route path="/doctors-list/details/:address" element={<DoctorDetails state={doctor} />} />
        <Route path="/aprove-doctor" element={<AproveDoctor state={state} />} />
      </Routes>
    </>
  );
}

export default App;
