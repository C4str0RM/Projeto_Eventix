import React, { useState } from "react";
import "src/Styles/tabela-usuarios.css";

export default function TabelaUsuarios() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: "João Silva", email: "joao@example.com", telefone: "(11) 99999-0000" },
    { id: 2, nome: "Maria Santos", email: "maria@example.com", telefone: "(11) 99999-0001" },
    { id: 3, nome: "Pedro Oliveira", email: "pedro@example.com", telefone: "(11) 99999-0002" },
  ]);

  const [novoUsuario, setNovoUsuario] = useState({ nome: "", email: "", telefone: "" });

  const handleAdicionar = () => {
    if (novoUsuario.nome && novoUsuario.email && novoUsuario.telefone) {
      const usuario = {
        id: usuarios.length + 1,
        ...novoUsuario,
      };
      setUsuarios([...usuarios, usuario]);
      setNovoUsuario({ nome: "", email: "", telefone: "" });
    } else {
      alert("Preencha todos os campos!");
    }
  };

  const handleDeletar = (id) => {
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoUsuario({ ...novoUsuario, [name]: value });
  };

  return (
    <div className="tabela-container">
      <h2>Gerenciar Usuários</h2>

      {/* Formulário para adicionar usuário */}
      <div className="form-container">
        <h3>Adicionar Novo Usuário</h3>
        <div className="form-group">
          <input
            type="text"
            name="nome"
            placeholder="Nome completo"
            value={novoUsuario.nome}
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={novoUsuario.email}
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="tel"
            name="telefone"
            placeholder="Telefone"
            value={novoUsuario.telefone}
            onChange={handleInputChange}
            className="input-field"
          />
          <button onClick={handleAdicionar} className="btn-adicionar">
            Adicionar
          </button>
        </div>
      </div>

      {/* Tabela de usuários */}
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
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{usuario.telefone}</td>
              <td>
                <button
                  onClick={() => handleDeletar(usuario.id)}
                  className="btn-deletar"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}