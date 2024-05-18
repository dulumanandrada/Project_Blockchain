
const hre = require("hardhat");

async function main() {
  const Chai = await hre.ethers.getContractFactory("chai"); //fetching bytecode and ABI
  const chai = await Chai.deploy(); //creating an instance of our smart contract

  await chai.deployed();//deploying your smart contract

  console.log("Deployed chai contract address:",`${chai.address}`);

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
//0x0743B1C274110c3E7DA765cF56E5E362F17cd8eb