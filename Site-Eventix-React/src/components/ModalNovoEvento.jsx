import React, { useState } from "react";

export const ModalNovoEvento = ({ onFechar, onCriar }) => {
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");

  const criar = () => {
    if (!titulo || !data || !local) {
      alert("Preencha todos os campos.");
      return;
    }

    onCriar({ titulo, data, local });
  };

  return (
    <div className="modal-admin-overlay">
      <div className="modal-admin">
        <h3>Novo Evento</h3>

        <label>Título:</label>
        <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />

        <label>Data:</label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />

        <label>Local:</label>
        <input value={local} onChange={(e) => setLocal(e.target.value)} />

        <div className="modal-admin-buttons">
          <button onClick={criar}>💾 Criar</button>
          <button onClick={onFechar}>❌ Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalNovoEvento;
