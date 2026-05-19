# Lab 9 — NFTs (ERC-721 Soulbound + ERC-1155 Game Collection)

## Overview

This project implements two NFT smart contracts using Solidity and OpenZeppelin:

- ERC-721 Soulbound Student Visit Card (non-transferable NFT)
- ERC-1155 Game Character Collection (multi-token NFT system)

The goal is to demonstrate:
- Identity NFTs (ERC-721)
- Game asset NFTs (ERC-1155)
- Soulbound restrictions
- Batch minting and transfers
- Metadata usage (IPFS-compatible structure)

---

# 1. ERC-721 Soulbound Student Visit Card

## Description

This contract represents a **non-transferable NFT (Soulbound Token)** issued to a student.

Each student receives exactly **one NFT visit card**.

---

## Features

- Mint only by contract owner/admin
- One NFT per student
- Metadata includes:
  - studentName
  - studentID
  - course
  - tokenURI (IPFS or external metadata)
- Soulbound (non-transferable):
  - Transfers are blocked
  - Approvals are disabled

---

## Mint Function

```solidity
mint(
  address to,
  string studentName,
  string studentID,
  string course,
  string tokenURI
)
```

---

## Soulbound Logic

- `_beforeTokenTransfer` overridden
- Prevents transfer after minting
- Reverts on any transfer attempt

---

# 2. ERC-1155 Game Character Collection

## Description

This contract implements a game-style NFT collection with 10 different token IDs.

Each token represents a unique game character.

---

## Features

- 10 unique token IDs (0–9)
- Each token has:
  - unique image URI
  - attributes (strength, speed, rarity, color)
- Supports:
  - single mint
  - batch mint
  - batch transfer
- Compatible with NFT marketplaces (ERC-1155 standard)

---

## Example Operations

### Mint single token

```solidity
mint(address to, uint256 id, uint256 amount)
```

---

### Batch mint

```solidity
mintBatch(
  address to,
  uint256[] ids,
  uint256[] amounts
)
```

---

# Setup & Installation

```bash
npm install
npx hardhat compile
```

---

# Running Local Blockchain

```bash
npx hardhat node
```

---

# Deployment

```bash
npx hardhat run scripts/deploy.js --network localhost
```

After deployment, copy contract addresses from console output.

---

# Minting

## ERC-721 Mint

```bash
npx hardhat run scripts/mint721.js --network localhost
```

### Expected output:
```
Mint success: 0x...
```

---

## ERC-1155 Mint

Make sure contract address is correct in script

```bash
npx hardhat run scripts/mint1155.js --network localhost
```

### Expected output:
```
ERC1155 minted successfully
```

---

# Hardhat Console Testing

```bash
npx hardhat console --network localhost
```

---

## ERC-721 check

```js
const soulbound = await ethers.getContractAt(
  "SoulboundVisitCardERC721",
  "DEPLOYED_ADDRESS"
);

await soulbound.ownerOf(1);
```

---

## Transfer test (should fail)

```js
await soulbound.connect(student).transferFrom(
  student.address,
  "0x0000000000000000000000000000000000000001",
  1
);
```

Expected:
```
Soulbound: non-transferable
```

---

## ERC-1155 check

```js
const game = await ethers.getContractAt(
  "GameCharacterCollectionERC1155",
  "DEPLOYED_ADDRESS"
);

await game.balanceOf(student.address, 1);
```

---

# Testing

```bash
npx hardhat test
```

Expected result:
```
✔ All tests passing
```

---

# Proof of Functionality (Screenshots)

## ERC-721
- Deployment output
<img width="912" height="78" alt="Zrzut ekranu 2026-05-19 124339" src="https://github.com/user-attachments/assets/58891416-da45-494b-8762-565810eb87bb" />

- Mint transaction
<img width="919" height="39" alt="Zrzut ekranu 2026-05-19 124352" src="https://github.com/user-attachments/assets/26a96fb8-6724-4d48-b3a9-697173c53c5c" />

- ownerOf result
<img width="1092" height="98" alt="Zrzut ekranu 2026-05-19 124520" src="https://github.com/user-attachments/assets/8be95cd2-45aa-479d-9e0d-035dce5fc633" />

- Failed transfer (Soulbound restriction)
<img width="1091" height="266" alt="Zrzut ekranu 2026-05-19 124555" src="https://github.com/user-attachments/assets/863831dc-743d-4a86-bb35-b007a19aca2f" />

## ERC-1155
- Mint script execution
<img width="934" height="47" alt="Zrzut ekranu 2026-05-19 124422" src="https://github.com/user-attachments/assets/b7f39a72-45a2-4364-9b4b-089336ef435e" />

- balanceOf results (>0 values)
<img width="1088" height="269" alt="Zrzut ekranu 2026-05-19 124626" src="https://github.com/user-attachments/assets/6983ee24-ee5d-416f-8648-3364970c955f" />

## Tests
- Hardhat test passing output
<img width="584" height="262" alt="Zrzut ekranu 2026-05-19 124640" src="https://github.com/user-attachments/assets/056bfe10-c896-4df7-84f7-744a4795f660" />

## 
---
