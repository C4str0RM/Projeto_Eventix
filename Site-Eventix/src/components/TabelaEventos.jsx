import React from "react";

export const TabelaEventos = ({ eventos, onEditar, onExcluir }) => {
  if (eventos.length === 0) {
    return <p>Nenhum evento encontrado.</p>;
  }

  return (
    <table className="table-eventos">
      <thead>
        <tr>
          <th>Título</th>
          <th>Data</th>
          <th>Local</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {eventos.map((evento) => (
          <tr key={evento.id}>
            <td>{evento.titulo}</td>
            <td>{evento.data}</td>
            <td>{evento.local}</td>
            <td>
              <button
                className="btn-editar"
                onClick={() => onEditar(evento)}
              >
                ✏️ Editar
              </button>
              <button
                className="btn-excluir"
                onClick={() => onExcluir(evento.id)}
              >
                🗑️ Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelaEventos;
