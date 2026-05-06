# Multi-Signature Wallet (Hardhat)

## Project Overview

This project implements a **Multi-Signature Wallet** smart contract in Solidity.

A multi-signature wallet requires multiple owners to approve a transaction before it can be executed. This improves security and is widely used in decentralized finance (DeFi) and blockchain governance.

In this implementation:
- 3 owners are defined
- 2 confirmations are required to execute a transaction

---

## Features

- Multiple wallet owners
- Configurable confirmation threshold
- Submit transactions (ETH transfer)
- Confirm transactions by multiple owners
- Execute transactions after required confirmations
- Revoke confirmations before execution
- Secure ETH handling

---

## Project Structure


contracts/
MultiSigWallet.sol

scripts/
deploy.js

test/
MultiSigWallet.test.js


---

## Deployment

Run local node:

```bash
npx hardhat node

Deploy contract:

npx hardhat run scripts/deploy.js --network localhost
Usage (Hardhat Console)

Open console:

npx hardhat console --network localhost
Example Flow
Send ETH to contract
Submit transaction
Confirm transaction (2 owners)
Execute transaction
Example Commands
// Submit transaction
await contract.submitTransaction(user.address, ethers.parseEther("0.5"), "0x");

// Confirm transaction
await contract.connect(owner1).confirmTransaction(0);
await contract.connect(owner2).confirmTransaction(0);

// Execute transaction
await contract.executeTransaction(0);
Testing

Run tests:

npx hardhat test

Tests include:

Deployment verification
Transaction submission
Confirmation logic
Execution after required confirmations
Edge case: duplicate confirmation
Screenshots
```

The following screenshots demonstrate contract functionality:

-Contract deployment output

-Sending ETH to contract

-Submitting a transaction

-Confirmations from multiple owners

-Transaction execution

-Test results (Hardhat tests)

- <img width="1024" height="70" alt="Zrzut ekranu 2026-05-05 174520" src="https://github.com/user-attachments/assets/1f3e5cbd-8ca2-457e-808c-9ec48ad55a2a" />


- <img width="1094" height="538" alt="Zrzut ekranu 2026-05-05 175142" src="https://github.com/user-attachments/assets/75ef2f55-2266-4154-8a56-e45f2a820cd8" />


- <img width="1090" height="686" alt="Zrzut ekranu 2026-05-05 174745" src="https://github.com/user-attachments/assets/61a4a7d9-993b-40e8-97d3-d04175a1e121" />


- <img width="1089" height="541" alt="Zrzut ekranu 2026-05-05 175132" src="https://github.com/user-attachments/assets/8a1a474d-4b25-4a48-abc3-3ed386738d19" />


- <img width="386" height="125" alt="Zrzut ekranu 2026-05-05 175215" src="https://github.com/user-attachments/assets/7f03b7f2-2fe0-445e-b1b3-dca6825842a7" />


- <img width="770" height="531" alt="Zrzut ekranu 2026-05-06 154011" src="https://github.com/user-attachments/assets/b5a76523-d7ab-479f-831c-b0b5c59fc420" />










