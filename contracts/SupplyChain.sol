// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SupplyChain {
    enum State { Prodotto, InTransito, Consegnato }

    struct Prodotto {
        uint256 id;
        string nome;
        address proprietarioAttuale;
        State stato;
        uint256 timestamp;
    }

    mapping(uint256 => Prodotto) public prodotti;
    uint256 public contaProdotti;

    event StatoAggiornato(uint256 id, State nuovoStato, address operatore);

    // 1. Il Produttore crea il bene
    function creaProdotto(string memory _nome) public {
        contaProdotti++;
        prodotti[contaProdotti] = Prodotto(
            contaProdotti,
            _nome,
            msg.sender,
            State.Prodotto,
            block.timestamp
        );
        emit StatoAggiornato(contaProdotti, State.Prodotto, msg.sender);
    }

    // 2. Spedizione (cambia stato a InTransito)
    function spedisciProdotto(uint256 _id) public {
        require(prodotti[_id].proprietarioAttuale == msg.sender, "Non sei il proprietario");
        prodotti[_id].stato = State.InTransito;
        emit StatoAggiornato(_id, State.InTransito, msg.sender);
    }

    // 3. Ricezione (il destinatario diventa il nuovo proprietario)
    function riceviProdotto(uint256 _id) public {
        require(prodotti[_id].stato == State.InTransito, "Il prodotto non e' in viaggio");
        prodotti[_id].proprietarioAttuale = msg.sender;
        prodotti[_id].stato = State.Consegnato;
        emit StatoAggiornato(_id, State.Consegnato, msg.sender);
    }
}