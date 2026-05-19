// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SoulboundVisitCardERC721 is ERC721, Ownable {

    uint256 private _tokenId;

    struct StudentInfo {
        string studentName;
        string studentId;
        string course;
        string imageURI;
    }

    mapping(uint256 => StudentInfo) private _studentData;
    mapping(address => bool) public hasMinted;

    constructor() ERC721("Student Visit Card", "SVC") Ownable(msg.sender) {}

    function mint(
        address to,
        string memory studentName,
        string memory studentId,
        string memory course,
        string memory imageURI
    ) external onlyOwner {
        require(!hasMinted[to], "Already minted");

        _tokenId++;
        uint256 newTokenId = _tokenId;

        _safeMint(to, newTokenId);

        _studentData[newTokenId] = StudentInfo({
            studentName: studentName,
            studentId: studentId,
            course: course,
            imageURI: imageURI
        });

        hasMinted[to] = true;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");

        StudentInfo memory s = _studentData[tokenId];

        return string(
            abi.encodePacked(
                "data:application/json;utf8,",
                '{"name":"', s.studentName,
                '","description":"Soulbound Student Visit Card",',
                '"attributes":[',
                '{"trait_type":"Student ID","value":"', s.studentId, '"},',
                '{"trait_type":"Course","value":"', s.course, '"}',
                '],',
                '"image":"', s.imageURI, '"}'
            )
        );
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {
        address from = _ownerOf(tokenId);

        require(from == address(0) || to == address(0), "Soulbound: non-transferable");

        return super._update(to, tokenId, auth);
    }

    function approve(address, uint256) public pure override {
        revert("Soulbound: approvals disabled");
    }

    function setApprovalForAll(address, bool) public pure override {
        revert("Soulbound: approvals disabled");
    }
}