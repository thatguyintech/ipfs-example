// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract UniqueAsset is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  mapping(string => uint8) hashes;

  constructor() ERC721("UniqueAsset", "UNA") {}

  function getCurrentTokenId() public view returns (uint256) {
    return _tokenIds.current();
  }

  // recipient - the address that the newly minted NFT should go to
  // hash      - the IPFS hash of the content we are linking to the NFT
  // metadata  - a link to the JSON metadata for the asset
  function awardItem(address recipient, string memory hash, string memory metadata) public returns (uint256) {
    // Reject this awardItem call if the IPFS hash has already been used.
    require(hashes[hash] != 1, "IPFS hash has already been used. Please use a new IPFS hash.");
    // Since this IPFS is now being used, record that.
    hashes[hash] = 1;
    // Increment to the next tokenId for the newly minted token.
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    // Mint the NFT.
    _mint(recipient, newItemId);
    // Link the NFT's metadata to the json. 
    _setTokenURI(newItemId, metadata);
    return newItemId;
  }
}