import React, { useState, useEffect } from "react";

export const ModalEdicao = ({ evento, onFechar, onSalvar }) => {
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");

  useEffect(() => {
    if (evento) {
      setTitulo(evento.titulo || "");
      setData(evento.data || "");
      setLocal(evento.local || "");
    }
  }, [evento]);

  const salvar = () => {
    if (!titulo || !data || !local) {
      alert("Preencha todos os campos.");
      return;
    }
    onSalvar({ ...evento, titulo, data, local });
  };

  return (
    <div className="modal-admin-overlay">
      <div className="modal-admin">
        <h3>Editar Evento</h3>

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
          <button onClick={salvar}>💾 Salvar</button>
          <button onClick={onFechar}>❌ Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalEdicao;
