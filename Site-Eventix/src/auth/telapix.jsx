import React, { useEffect } from 'react';
import '../styles/telaPix.css';

function TelaPix({ valor = 'R$ 540,00', onVoltar }) {
  useEffect(() => {
    document.title = 'Pagamento via Pix | Eventix';
  }, []);

  return (
    <div className="pix-page-wrapper">
      <div className="pix-container">
        <h1>⚡ Pagamento via Pix</h1>
        <p className="pix-info">Use o QR Code abaixo para realizar o pagamento:</p>

        <div className="pix-box">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=eventix-pix-fake"
            alt="QR Code Pix"
            className="pix-qr"
          />
          <p className="pix-valor">Valor: <strong>{valor}</strong></p>
          <p className="pix-chave">Chave Pix: <code>eventix@festival.com</code></p>
        </div>

        <button className="btn-voltar" onClick={onVoltar}>Voltar</button>
      </div>

    </div>
  );
}

export default TelaPix;
