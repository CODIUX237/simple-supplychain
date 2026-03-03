// L'ABI si trova in: artifacts/contracts/SupplyChain.sol/SupplyChain.json
// Copiamo solo l'array sotto la voce "abi"
export const contractABI = [
  "function creaProdotto(string memory _nome) public",
  "function prodotti(uint256) public view returns (uint256 id, string memory nome, address proprietarioAttuale, uint8 stato, uint256 timestamp)",
  "function contaProdotti() public view returns (uint256)",
  "function spedisciProdotto(uint256 _id) public",
  "function riceviProdotto(uint256 _id) public"
];

// L'indirizzo che è apparso nel terminale dopo npx hardhat run scripts/deploy.js
export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";