import React from "react";
import "./tabela-usuarios.css";

export default function TabelaUsuarios({ usuarios = [], onDeletar = null }) {
  return (
    <div className="tabela-container">
      <h2>Usuários Cadastrados</h2>

      <table className="tabela-usuarios">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: 12 }}>
                Nenhum usuário cadastrado
              </td>
            </tr>
          ) : (
            usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>{usuario.telefone}</td>
                <td>
                  <button
                    onClick={() => onDeletar && onDeletar(usuario.id)}
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