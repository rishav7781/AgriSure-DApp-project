// const hre = require("hardhat");
// const { ethers } = hre;

// async function main() {
//   const contractAddress = "0xb61675b164351767e5eCDC0Cc1e78E53f7fa5bd0";
//   const Insurance = await hre.ethers.getContractAt("Insurance", contractAddress);

//   console.log("Connected to Insurance contract at:", contractAddress);

//   const tx = await Insurance.insureCrop(
//     "Wheat", 
//     ethers.utils.parseEther("0.5"),  // sumInsured
//     ethers.utils.parseEther("0.01"), // premiumAmount
//     { value: ethers.utils.parseEther("0.01") }  // actual premium sent
//   );

//   await tx.wait();
//   console.log("Crop insured successfully!");

//   // Claim insurance
//   const claimTx = await Insurance.claimInsurance();
//   await claimTx.wait();
//   console.log("Insurance claimed successfully!");
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });



// const hre = require("hardhat");
// const fs = require("fs");

// async function main() {
//   // Get a signer (farmer)
//   const [farmer] = await hre.ethers.getSigners();

//   // Load deployed contract address from JSON
//   const address = JSON.parse(fs.readFileSync("deployedAddress.json")).address;

//   // Connect to deployed Insurance contract
//   const Insurance = await hre.ethers.getContractFactory("Insurance");
//   const insurance = await Insurance.attach(address);

//   console.log("Connected to Insurance contract at:", address);
//   console.log("Farmer Address:", farmer.address);

//   // Premium amount (in ETH)
//   const premiumAmount = hre.ethers.parseEther("0.01");

//   // Call insureCrop function on contract
//   const tx = await insurance.connect(farmer).insureCrop(
//     "Wheat",     // Crop Name
//     5000,        // Sum Insured
//     { value: premiumAmount }  // Premium paid
//   );
//   await tx.wait();

//   console.log("Crop insured successfully!");

//   // Fetch and display contract balance
//   const balance = await insurance.getContractBalance();
//   console.log("Contract Balance (ETH):", hre.ethers.formatEther(balance));
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });


// const hre = require("hardhat");
// const ethers = hre.ethers;

// async function main() {
//   // Get signers
//   const [deployer, farmer1, farmer2] = await ethers.getSigners();

//   // Contract address
//   const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

//   // Contract Factory
//   const Insurance = await ethers.getContractFactory("Insurance");

//   // Attach contract instance (with deployer signer)
//   const insurance = await Insurance.attach(contractAddress).connect(deployer);;

//   console.log("Connected to Insurance contract at:", contractAddress);

//   // Farmer 1 transaction (with farmer1 signer)
//   const insuranceWithFarmer1 = insurance.connect(farmer1);
//   const tx1 = await insuranceWithFarmer1.insureCrop("Wheat", 5000, { value: ethers.parseEther("1") });
//   await tx1.wait();
//   console.log(`Farmer1 ${farmer1.address} insured crop by paying 1 ETH.`);

//   // Farmer 2 transaction (with farmer2 signer)
//   const insuranceWithFarmer2 = insurance.connect(farmer2);
//   const tx2 = await insuranceWithFarmer2.insureCrop("Rice", 7000, { value: ethers.parseEther("2") });
//   await tx2.wait();
//   console.log(`Farmer2 ${farmer2.address} insured crop by paying 2 ETH.`);

//   // Check insured amounts
//   const amount1 = await insurance.insuredAmount(farmer1.address);
// console.log(`Insured amount for Farmer1: ${ethers.formatEther(amount1)} ETH`);

// const amount2 = await insurance.insuredAmount(farmer2.address);
// console.log(`Insured amount for Farmer2: ${ethers.formatEther(amount2)} ETH`);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

const hre = require("hardhat");
const ethers = hre.ethers;
const axios = require("axios");

async function getEthToInrRate() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
    );
    return response.data.ethereum.inr;
  } catch (error) {
    console.error("Error fetching ETH to INR rate:", error);
    return 250000; // fallback value
  }
}

async function main() {
  // Get signers
  const [deployer, farmer1, farmer2] = await ethers.getSigners();

  // Contract address
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // Contract Factory
  const Insurance = await ethers.getContractFactory("Insurance");

  // Attach contract instance
  const insurance = await Insurance.attach(contractAddress).connect(deployer);

  console.log("Connected to Insurance contract at:", contractAddress);

  // Fetch live ETH to INR rate
  const ethToInrRate = await getEthToInrRate();
  console.log(`💹 Current ETH to INR rate: ₹${ethToInrRate}`);

  // Farmer 1 transaction
  const insuranceWithFarmer1 = insurance.connect(farmer1);
  const tx1 = await insuranceWithFarmer1.insureCrop("Wheat", 5000, { value: ethers.parseEther("1") });
  await tx1.wait();
  console.log(`Farmer1 ${farmer1.address} insured crop by paying 1 ETH (₹${1 * ethToInrRate}).`);

  // Farmer 2 transaction
  const insuranceWithFarmer2 = insurance.connect(farmer2);
  const tx2 = await insuranceWithFarmer2.insureCrop("Rice", 7000, { value: ethers.parseEther("2") });
  await tx2.wait();
  console.log(`Farmer2 ${farmer2.address} insured crop by paying 2 ETH (₹${2 * ethToInrRate}).`);

  // Check insured amounts
  const amount1 = await insurance.insuredAmount(farmer1.address);
  const amount1InEth = ethers.formatEther(amount1);
  const amount1InInr = amount1InEth * ethToInrRate;
  console.log(`Insured amount for Farmer1: ${amount1InEth} ETH (₹${amount1InInr.toFixed(2)})`);

  const amount2 = await insurance.insuredAmount(farmer2.address);
  const amount2InEth = ethers.formatEther(amount2);
  const amount2InInr = amount2InEth * ethToInrRate;
  console.log(`Insured amount for Farmer2: ${amount2InEth} ETH (₹${amount2InInr.toFixed(2)})`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

