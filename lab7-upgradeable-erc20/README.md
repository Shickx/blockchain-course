# Upgradeable ERC20 Token (Hardhat + OpenZeppelin)

## Project Overview

Upgradeable ERC20 token using OpenZeppelin and Hardhat with proxy architecture.  
The contract supports upgrade from V1 to V2 without losing stored state (balances remain unchanged).

V2 adds a new version() function.


## Features

- ERC20 token (MyToken V1)
- Initial mint on deployment
- Token transfers
- Balance checking via balanceOf()
- Proxy-based upgradeable architecture
- Upgrade from V1 to V2 without state loss
- Added version() function in V2


## Project Structure

contracts/
- MyTokenV1.sol
- MyTokenV2.sol

scripts/
- deploy.js
- upgrade.js

test/
- MyToken.test.js


## Deployment Details

Proxy Address:
0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

Deployment Transaction:
0x8f543feac07bf682cca80082c8ef4ab1377a09ff744c673da797ff377de25f79


## Functionality

V1:
- ERC20 token creation
- Initial supply minted to deployer
- Transfers between accounts
- Balance checks

V2:
- All V1 features preserved
- Added version() function returning "V2"


## Testing

Manual testing via Hardhat console:

- Deployment verification
- balanceOf() checks
- transfer() execution
- Upgrade to V2
- version() verification after upgrade


## Screenshots

The following screenshots are included as proof of execution:

- Contract deployment output (proxy deployment + address)
- Token transfer execution in console
- Balance verification before and after transfer
- Upgrade transaction execution
- version() output after upgrade (V2 confirmation)
<img width="993" height="70" alt="Zrzut ekranu 2026-04-20 124418" src="https://github.com/user-attachments/assets/8a48a3e3-94ba-4a90-bb12-b137f1eca379" />
<br>
<img width="933" height="176" alt="Zrzut ekranu 2026-04-20 124538" src="https://github.com/user-attachments/assets/c8ab610a-fd2f-492e-9efe-2f03f493b405" />
<br>
<img width="1593" height="705" alt="Zrzut ekranu 2026-04-20 124709" src="https://github.com/user-attachments/assets/d75f4059-8fb1-4494-a208-4868c1e8398c" />
<br>
<img width="1002" height="64" alt="Zrzut ekranu 2026-04-20 124754" src="https://github.com/user-attachments/assets/951bef02-5e04-4742-810f-eaa67c661ef5" />
<br>
<img width="926" height="132" alt="Zrzut ekranu 2026-04-20 124829" src="https://github.com/user-attachments/assets/3dc2ebe4-530d-4034-ba30-d95dc0136dd7" />
<br>
<img width="357" height="34" alt="Zrzut ekranu 2026-04-20 124924" src="https://github.com/user-attachments/assets/d796718d-028a-497b-b4b0-bd9eda2d2c2a" />
<br>






## Example Usage

Get balance:
await token.balanceOf(owner.address);

Transfer tokens:
await token.transfer(user.address, 1000);

Check version:
await token.version();


## Upgrade Process

1. Deploy V1 via proxy
2. Interact with token normally
3. Deploy V2 implementation
4. Upgrade proxy to V2
5. Verify state preservation and new functionality


## Key Notes

- Proxy address stays the same after upgrade
- Storage is preserved across upgrades
- Only logic contract changes during upgrade
- Balances remain unchanged after upgrade



