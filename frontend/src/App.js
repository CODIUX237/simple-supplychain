import './App.css';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from './contractConfig';

function App() {
  const [nomeProdotto, setNomeProdotto] = useState("");
  const [listaProdotti, setListaProdotti] = useState([]);
  const [account, setAccount] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = {
    bg: isDarkMode ? "#121212" : "#f0f2f5",
    card: isDarkMode ? "#1e1e1e" : "#ffffff",
    text: isDarkMode ? "#ffffff" : "#2c3e50",
    border: isDarkMode ? "#333" : "#e0e0e0",
  };

  // --- LE TUE LOGICHE ORIGINALI (Senza modifiche ai nomi) ---
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (err) { console.error("Connessione rifiutata"); }
    } else { alert("Per favore installa MetaMask!"); }
  };

  const creaNuovoProdotto = async () => {
    if (!nomeProdotto) return alert("Inserisci un nome!");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.creaProdotto(nomeProdotto);
      await tx.wait();
      alert("Prodotto registrato!");
      caricaProdotti();
    } catch (err) { console.error(err); }
  };

  const caricaProdotti = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const count = await contract.contaProdotti();
      let tempArray = [];
      for (let i = 1; i <= count; i++) {
        const p = await contract.prodotti(i);
        tempArray.push(p);
      }
      setListaProdotti(tempArray);
    } catch (err) { console.error("Errore nel caricamento:", err); }
  };

  const spedisci = async (id) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.spedisciProdotto(id);
      await tx.wait();
      alert("Prodotto in transito!");
      caricaProdotti();
    } catch (err) { alert("Errore: solo il proprietario può spedire."); }
  };

  const ricevi = async (id) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.riceviProdotto(id);
      await tx.wait();
      alert("Prodotto ricevuto!");
      caricaProdotti();
    } catch (err) { alert("Errore: il prodotto deve essere in transito."); }
  };

  return (
    <div style={{ ...styles.appWrapper, backgroundColor: theme.bg, color: theme.text }}>
      
      {/* NAVBAR */}
      <nav style={{ ...styles.navbar, backgroundColor: theme.card, borderBottom: `1px solid ${theme.border}` }}>
        <h2 style={{ margin: 0 }}>📦 SupplyChain</h2>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button onClick={() => setIsDarkMode(!isDarkMode)} style={styles.iconBtn}>
            {isDarkMode ? "☀️" : "🌙"}
          </button>
          {!account ? (
            <button onClick={connectWallet} style={styles.buttonMain}>Connect Wallet</button>
          ) : (
            <span style={styles.accountText}>{account.substring(0,6)}...{account.substring(38)}</span>
          )}
        </div>
      </nav>

      <div style={styles.mainContainer}>
        
        {/* SEZIONE INPUT */}
        <section style={{ ...styles.heroSection, backgroundColor: theme.card, borderColor: theme.border }}>
          <h3>Nuova Registrazione</h3>
          <div style={styles.inputGroup}>
            <input 
              type="text" 
              placeholder="Nome del prodotto..." 
              style={{ ...styles.input, backgroundColor: isDarkMode ? "#2d2d2d" : "#fff", color: theme.text, borderColor: theme.border }}
              onChange={(e) => setNomeProdotto(e.target.value)}
            />
            {/* AGGANCIATA TUA FUNZIONE creaNuovoProdotto */}
            <button onClick={creaNuovoProdotto} style={styles.buttonAction}>Registra su Blockchain</button>
          </div>
        </section>

        <div style={styles.listHeader}>
          <h3>Prodotti Tracciati</h3>
          <button onClick={caricaProdotti} style={styles.refreshBtn}>🔄 Aggiorna Dati</button>
        </div>

        {/* GRID DISPLAY */}
        <div style={styles.productGrid}>
          {listaProdotti.map((p, index) => {
            const id = p[0].toString();
            const stato = Number(p[3]);
            return (
              <div key={index} style={{ ...styles.productCard, backgroundColor: theme.card, borderColor: theme.border }}>
                <div style={styles.cardHeader}>
                  <span style={styles.idBadge}>ID: {id}</span>
                  <span style={{ ...styles.statusDot, backgroundColor: stato === 1 ? "orange" : (stato === 2 ? "#27ae60" : "#3498db") }}></span>
                </div>
                <h4 style={styles.productName}>{p[1]}</h4>
                <p style={styles.ownerText}>Proprietario:<br/>{p[2]}</p>
                
                <div style={styles.cardFooter}>
                  <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: stato === 1 ? "orange" : (stato === 2 ? "#27ae60" : "#3498db") }}>
                    {["🆕 Creato", "🚚 In Transito", "✅ Consegnato"][stato]}
                  </span>
                  <div style={styles.actionContainer}>
                    {/* AGGANCIATE TUE FUNZIONI spedisci E ricevi */}
                    {stato === 0 && <button onClick={() => spedisci(id)} style={styles.btnShip}>Spedisci</button>}
                    {stato === 1 && <button onClick={() => ricevi(id)} style={styles.btnReceive}>Ricevi</button>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// STILI AGGIORNATI PER IL GRID DISPLAY
const styles = {
  appWrapper: { minHeight: "100vh", transition: "0.3s", fontFamily: 'sans-serif' },
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 5%', position: 'sticky', top: 0, zIndex: 100 },
  mainContainer: { maxWidth: "1200px", margin: "0 auto", padding: "30px 20px" },
  heroSection: { padding: "30px", borderRadius: "15px", marginBottom: "40px", textAlign: 'center', border: '1px solid' },
  inputGroup: { display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '15px', flexWrap: 'wrap' },
  input: { padding: "12px", borderRadius: "8px", border: "1px solid", width: "300px", outline: 'none' },
  listHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
  productCard: { padding: '20px', borderRadius: '12px', border: '1px solid', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
  idBadge: { background: '#eee', color: '#333', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' },
  statusDot: { width: '10px', height: '10px', borderRadius: '50%' },
  productName: { margin: '0 0 10px 0', fontSize: '1.2rem' },
  ownerText: { fontSize: '0.7rem', opacity: 0.6, marginBottom: '20px', wordBreak: 'break-all' },
  cardFooter: { marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' },
  buttonMain: { background: '#3498db', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' },
  buttonAction: { background: '#2c3e50', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  btnShip: { background: "orange", color: "white", border: "none", padding: "8px 15px", borderRadius: "6px", cursor: "pointer", fontWeight: 'bold' },
  btnReceive: { background: "#27ae60", color: "white", border: "none", padding: "8px 15px", borderRadius: "6px", cursor: "pointer", fontWeight: 'bold' },
  refreshBtn: { background: 'transparent', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer', padding: '8px 15px' },
  iconBtn: { background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' },
  accountText: { fontSize: '0.8rem', fontWeight: 'bold', background: 'rgba(0,0,0,0.05)', padding: '5px 10px', borderRadius: '5px' }
};

export default App;