const hre = require("hardhat");

async function main() {
  console.log("Inizio del deploy dello Smart Contract SupplyChain...");

  // Otteniamo il contratto da compilare/pubblicare
  const SupplyChain = await hre.ethers.getContractFactory("SupplyChain");
  
  // Eseguiamo il deploy
  const supplyChain = await SupplyChain.deploy();

  // Attendiamo che il deploy sia completato
  await supplyChain.waitForDeployment();

  const address = await supplyChain.getAddress();

  console.log("-----------------------------------------------");
  console.log(`SupplyChain distribuito con successo!`);
  console.log(`Indirizzo del contratto: ${address}`);
  console.log("-----------------------------------------------");
  console.log("Copia questo indirizzo, ti servirà per il Frontend.");
}

// Gestione degli errori standard di Hardhat
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});