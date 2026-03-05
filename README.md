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



## ⚙️ Requisiti

- Node.js **v18+**
- npm **v8+**
- MetaMask installato nel browser
- Rete Ethereum locale (Hardhat) o testnet (Sepolia)

---

## 🛠️ Installazione del Backend (Hardhat)

### 1. Creazione della cartella del progetto

```bash
mkdir supplychain-project
cd supplychain-project
```

### 2. Inizializzazione del progetto Node

```bash
npm init -y
```

### 3. Installazione della versione corretta di Hardhat

Per evitare conflitti, **NON usare Hardhat 3.x**.  
La versione stabile e compatibile con tutti i plugin è:

```bash
npm install --save-dev hardhat@^2.28.0
```

### 4. Creazione del progetto Hardhat

```bash
npx hardhat
```

Seleziona:

- **Create a JavaScript project**
- **Ethers + Mocha**
- Installa le dipendenze → **Yes**

### 5. Installazione dei plugin necessari

Versioni compatibili con Hardhat 2.28.x:

```bash
npm install --save-dev \
  @nomicfoundation/hardhat-toolbox@^6.0.0 \
  @nomicfoundation/hardhat-chai-matchers@^2.0.0 \
  @nomicfoundation/hardhat-ethers@^3.0.0 \
  @nomicfoundation/hardhat-network-helpers@^1.0.0 \
  @nomicfoundation/hardhat-verify@^2.0.0 \
  hardhat-gas-reporter@^2.3.0 \
  solidity-coverage@^0.8.0
```

### 6. Installazione di Ethers.js v6

```bash
npm install ethers@^6.4.0
```

### 7. (Opzionale) Typechain per generare tipi TypeScript

```bash
npm install --save-dev \
  @typechain/hardhat@^9.0.0 \
  @typechain/ethers-v6@^0.5.0 \
  typechain@^8.3.0
```

---

## 📁 Configurazione del progetto Hardhat

### `hardhat.config.js` (CommonJS)

```js
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
};
```

⚠️ **Non aggiungere `"type": "module"` nel package.json**.  
Il progetto deve restare **CommonJS**.

---

## 🧪 Compilazione, Test e Deploy

Compilazione:

```bash
npx hardhat compile
```

Avvio nodo locale:

```bash
npx hardhat node
```

Deploy su rete locale:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Test:

```bash
npx hardhat test
```

---

## 🌐 Installazione del Frontend (React)

### 1. Creazione dell’app React

```bash
npx create-react-app frontend
cd frontend
```

### 2. Installazione di Ethers v6

```bash
npm install ethers@^6.4.0
```

### 3. Configurazione del contratto

Crea:

```
frontend/src/contractConfig.js
```

con:

```js
export const contractAddress = "INSERISCI_INDIRIZZO_DEPLOY";
export const contractABI = [ /* ABI del contratto */ ];
```

---

## 🚀 Avvio dell’Applicazione

Backend:

```bash
npx hardhat node
```

Frontend:

```bash
cd frontend
npm start
```

Apri:

```
http://localhost:3000
```

---

## 📌 Versioni Consigliate (per evitare conflitti)

| Componente | Versione | Note |
|-----------|----------|------|
| **Hardhat** | `^2.28.0` | Evita i conflitti con Toolbox |
| **Hardhat Toolbox** | `^6.0.0` | Compatibile solo con Hardhat 2.x |
| **Ethers.js** | `^6.4.0` | API moderne |
| **Node.js** | `18+` | Supporto completo |
| **React** | `18+` | Compatibile con Ethers v6 |

---

## 📎 Note Importanti

- Il backend Hardhat è **CommonJS**, quindi usa `require()` e `module.exports`.
- Il frontend React è **ESM**, quindi usa `import` e `export`.
- Non mischiare `require()` nel frontend.
- Non aggiornare Hardhat alla versione 3.x: rompe la compatibilità con i plugins.
---

## 🔚 Conclusione

Questo progetto dimostra come la blockchain possa essere applicata in modo semplice ma efficace alla tracciabilità della supply chain.  
La struttura modulare permette estensioni future e integrazioni con tecnologie avanzate come IPFS, IoT e dashboard professionali.