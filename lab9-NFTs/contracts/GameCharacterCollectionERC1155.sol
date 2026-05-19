// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameCharacterCollectionERC1155 is ERC1155, Ownable {

    uint256 public constant CHARACTER_COUNT = 10;

    struct Character {
        string name;
        string rarity;
        string imageURI;
        uint256 strength;
        uint256 speed;
    }

    mapping(uint256 => Character) public characters;

    constructor() ERC1155("https://game.example/api/item/{id}.json") Ownable(msg.sender) {

        for (uint256 i = 0; i < CHARACTER_COUNT; i++) {
            characters[i] = Character({
                name: string(abi.encodePacked("Character #", uintToString(i))),
                rarity: i % 3 == 0 ? "Legendary" : (i % 3 == 1 ? "Rare" : "Common"),
                imageURI: "ipfs://example-image",
                strength: 10 + i,
                speed: 5 + i
            });
        }
    }

    function mint(address to, uint256 id, uint256 amount) external onlyOwner {
        require(id < CHARACTER_COUNT, "Invalid character ID");
        _mint(to, id, amount, "");
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts
    ) external onlyOwner {
        _mintBatch(to, ids, amounts, "");
    }

    function uri(uint256 id) public view override returns (string memory) {
        require(id < CHARACTER_COUNT, "Invalid ID");

        Character memory c = characters[id];

        return string(
            abi.encodePacked(
                "data:application/json;utf8,",
                '{"name":"', c.name,
                '","attributes":[',
                '{"trait_type":"rarity","value":"', c.rarity, '"},',
                '{"trait_type":"strength","value":"', uintToString(c.strength), '"},',
                '{"trait_type":"speed","value":"', uintToString(c.speed), '"}',
                '],',
                '"image":"', c.imageURI, '"}'
            )
        );
    }

    function uintToString(uint256 v) internal pure returns (string memory) {
        if (v == 0) return "0";

        uint256 j = v;
        uint256 len;

        while (j != 0) {
            len++;
            j /= 10;
        }

        bytes memory bstr = new bytes(len);
        uint256 k = len;

        while (v != 0) {
            k = k - 1;
            uint8 temp = uint8(48 + v % 10);
            bstr[k] = bytes1(temp);
            v /= 10;
        }

        return string(bstr);
    }
}