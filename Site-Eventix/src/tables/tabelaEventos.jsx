import React from "react";
import "./tabela-eventos.css";

export default function TabelaEventos({ eventos = [], onDeletar = null }) {
  return (
    <div className="tabela-container eventos">
      <h2>Eventos Cadastrados</h2>

      <table className="tabela-eventos">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Evento</th>
            <th>Data</th>
            <th>Local</th>
            <th>Vagas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {eventos.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: 12 }}>
                Nenhum evento cadastrado
              </td>
            </tr>
          ) : (
            eventos.map((ev) => (
              <tr key={ev.id}>
                <td>{ev.id}</td>
                <td>{ev.nome}</td>
                <td>{ev.data}</td>
                <td>{ev.local}</td>
                <td>{ev.vagas ?? "-"}</td>
                <td>
                  <button
                    onClick={() => onDeletar && onDeletar(ev.id)}
                    className="btn-deletar"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}