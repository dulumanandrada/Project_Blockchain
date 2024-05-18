
const hre = require("hardhat");

async function main() {
  // const Chai = await hre.ethers.getContractFactory("chai"); //fetching bytecode and ABI
  // const chai = await Chai.deploy(); //creating an instance of our smart contract

  // await chai.deployed();//deploying your smart contract

  // console.log("Deployed chai contract address:",`${chai.address}`);

  const Patient = await hre.ethers.getContractFactory("patient"); //fetching bytecode and ABI
  const patient = await Patient.deploy(); //creating an instance of our smart contract

  await patient.deployed();//deploying your smart contract

  console.log("Deployed patient contract address:",`${patient.address}`);

  const Doctor = await hre.ethers.getContractFactory("doctor"); //fetching bytecode and ABI
  const doctor = await Doctor.deploy(); //creating an instance of our smart contract

  await doctor.deployed();//deploying your smart contract

  console.log("Deployed doctor contract address:",`${doctor.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
//deployed contract address on sepolia
// Deployed chai contract address: 0xB341d24445fFb391B3938Fb1b7fFd771589c2f9C
// Deployed patient contract address: 0xa872949ba4E859B400C66fD771cC3539990CE822
// Deployed doctor contract address: 0x7804BE45Ded33b7b81DC192d093fF0ac9a4ec110