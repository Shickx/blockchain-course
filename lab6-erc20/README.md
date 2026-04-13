# Project: ERC20 Token (Hardhat)

## Smart Contract

MyToken is an ERC20 token based on OpenZeppelin implementation.  
Initial supply is minted to the deployer in the constructor.


## Contract Address (local network)

0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512



## Deployment Transaction

0x8f543feac07bf682cca80082c8ef4ab1377a09ff744c673da797ff377de25f79



## Functionality

- ERC20 token creation (MyToken, MTK)
- Initial mint in constructor
- Token transfers between accounts
- Balance checking via `balanceOf()`


## Testing

Manual tests were performed using Hardhat console:

- `balanceOf()` verification
- `transfer()` between accounts
- Deployment verification


## Screenshots

- Deployment & transaction logs  
- Balance checks in console  
- Token transfer execution
<img width="386" height="37" alt="Zrzut ekranu 2026-04-13 154314" src="https://github.com/user-attachments/assets/34c7a330-e317-411d-938f-9689e4b2a19f" />
<img width="1586" height="667" alt="Zrzut ekranu 2026-04-13 154424" src="https://github.com/user-attachments/assets/2597c37d-b8e8-441d-ae3d-116c64b8c5b9" />
<img width="634" height="36" alt="Zrzut ekranu 2026-04-13 154443" src="https://github.com/user-attachments/assets/f907030c-b422-496e-881b-4ed3bf2420d4" />
<img width="556" height="224" alt="Zrzut ekranu 2026-04-13 155617" src="https://github.com/user-attachments/assets/9b2b8cd7-b395-4dcd-8ac1-d8a0aa1c0137" />


## Files

- `contracts/MyToken.sol`
- `scripts/deploy.js`
- `test/MyToken.test.js`
