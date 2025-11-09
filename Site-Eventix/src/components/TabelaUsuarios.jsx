import React from "react";
import { ClipLoader } from "react-spinners";

 export const TabelaUsuarios = ({
  usuarios,
  onEditar,
  onExcluir,
  onPromover,
  promovendoId,
}) => {
  if (usuarios.length === 0) {
    return <p>Nenhum usuário encontrado.</p>;
  }

  return (
    <table className="table-eventos">
      <thead>
        <tr>
          <th>Usuário</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Admin</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
          <tr key={usuario.id}>
            <td>{usuario.usuario}</td>
            <td>{usuario.name}</td>
            <td>{usuario.email}</td>
            <td>{usuario.isAdmin ? "✅" : "❌"}</td>
            <td>
              <button
                className="btn-editar"
                onClick={() => onEditar(usuario)}
              >
                ✏️ Editar
              </button>
              <button
                className="btn-excluir"
                onClick={() => onExcluir(usuario.id)}
              >
                🗑️ Excluir
              </button>
              {!usuario.isAdmin && (
                <button
                  className="btn-promover"
                  onClick={() => onPromover(usuario.id)}
                  disabled={promovendoId === usuario.id}
                >
                  {promovendoId === usuario.id ? (
                    <ClipLoader color="#fff" size={12} />
                  ) : (
                    "🔓 Promover"
                  )}
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelaUsuarios;
