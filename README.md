# 🌾 AgriSure - Blockchain Powered Crop Insurance DApp

AgriSure is a decentralized insurance platform built on **Ethereum blockchain** using **Hardhat** and **Ethers.js**. It empowers farmers to easily insure their crops, bypass tedious paperwork, and ensures complete transparency and immutability of insurance records.

---

## 📜 Problem Statement

Traditional insurance systems involve cumbersome offline paperwork, delays, and lack of transparency.  
**AgriSure** addresses this by:
- Enabling farmers to insure their crops digitally.
- Maintaining transparent, tamper-proof records on blockchain.
- Eliminating intermediaries and offline documentation.

---

## 📂 Project Structure

/contracts → Smart contract files (Insurance.sol)  
/scripts → Scripts to deploy and interact with contracts  
/deployments → Deployment metadata (auto-created)  
/config.js → Contains private keys and RPC configuration  
/hardhat.config.js → Hardhat configuration file  

---

## ⚙️ Commands and Their Functionalities

| Command                                              | Purpose                                      |
|:-----------------------------------------------------|:---------------------------------------------|
| `npx hardhat help`                                   | Show all available Hardhat tasks             |
| `npx hardhat compile`                                | Compile smart contracts                     |
| `npx hardhat node`                                    | Spin up local blockchain network             |
| `npx hardhat run scripts/deploy.js --network localhost` | Deploy smart contract to local blockchain    |
| `npx hardhat run scripts/interact.js --network localhost` | Run interaction script with deployed contract |
| `git add .`                                           | Stage changes for git                        |
| `git commit -m "message"`                            | Commit staged changes                        |
| `git push -u origin main`                            | Push local repo to GitHub                     |

---

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/en/)
- Hardhat  
```bash
npm install --save-dev hardhat