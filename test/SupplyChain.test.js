const { expect } = require("chai");

describe("SupplyChain", function () {
  it("Dovrebbe creare un prodotto correttamente", async function () {
    const SupplyChain = await ethers.getContractFactory("SupplyChain");
    const sc = await SupplyChain.deploy();
    
    await sc.creaProdotto("Laptop Dell");
    const p = await sc.prodotti(1);
    expect(p.nome).to.equal("Laptop Dell");
  });
});