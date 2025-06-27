// async function main() {
//     const [deployer] = await hre.ethers.getSigners();
//     console.log("Deploying contracts with the account:", deployer.address);
  
//     // Get the contract factory
//     const Insurance = await hre.ethers.getContractFactory("Insurance");
//     console.log("Deploying Insurance contract...");
    
//     // Deploy the contract
//     const insurance = await Insurance.deploy();
//     //await insurance.deployed();
//     await insurance.waitForDeployment();

//     console.log("Insurance contract deployed to:", insurance.target);
//   }
  
//   main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//       console.error(error);
//       process.exit(1);
//     });
  

const hre = require("hardhat");
const fs = require("fs");

async function main() {
  // Get the deployer account
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the Insurance contract
  const Insurance = await hre.ethers.getContractFactory("Insurance");
  const insurance = await Insurance.deploy();
  await insurance.waitForDeployment();

  console.log("Insurance contract deployed to:", insurance.target);

  // Save contract address in JSON file
  fs.writeFileSync(
    "deployedAddress.json",
    JSON.stringify({ address: insurance.target }, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
