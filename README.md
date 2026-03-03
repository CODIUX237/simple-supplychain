# 📦 SupplyChain  (TraceLyt) – Tracciabilità su Blockchain

Questo progetto implementa una semplice ma completa applicazione decentralizzata (dApp) per la gestione della supply chain.  
La soluzione utilizza **Solidity**, **Hardhat**, **React**, **Ethers.js** e **MetaMask** per tracciare il ciclo di vita di un prodotto dalla creazione alla consegna.

---

## 🚀 Funzionalità principali

- Creazione di un nuovo prodotto con ID univoco.
- Gestione degli stati: **Creato → In Transito → Consegnato**.
- Cambio automatico del proprietario durante la consegna.
- Tracciabilità completa tramite eventi on-chain.
- Interfaccia React semplice e intuitiva.
- Integrazione con MetaMask per la firma delle transazioni.

---

## 🧱 Architettura del progetto

### **Smart Contract (Solidity)**
Il contratto `SupplyChain.sol` gestisce:
- struttura dati del prodotto
- controllo degli accessi tramite `msg.sender`
- validazione degli stati
- emissione di eventi per audit e tracciabilità

### **Front-end (React + Ethers.js)**
L’interfaccia permette di:
- connettere MetaMask
- creare prodotti
- spedire e ricevere prodotti
- visualizzare la lista aggiornata in tempo reale

### **Blockchain**
Il deploy può essere effettuato su:
- Hardhat local network
- Testnet (es. Sepolia)
- Mainnet (solo per produzione)

---

## 📂 Struttura del repository



---













## 🔚 Conclusione

Questo progetto dimostra come la blockchain possa essere applicata in modo semplice ma efficace alla tracciabilità della supply chain.  
La struttura modulare permette estensioni future e integrazioni con tecnologie avanzate come IPFS, IoT e dashboard professionali.