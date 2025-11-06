import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../config/supabaseClient";
import "./Style/Adminpages.css";

const UsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    const carregarUsuario = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        console.error("Usuário não autenticado ou erro:", error);
        setCarregando(false);
        return;
      }

      setUsuarioLogado(user);
      buscarUsuarios();
    };

    carregarUsuario();
  }, []);

  const buscarUsuarios = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Erro ao buscar usuários:", error);
    } else {
      setUsuarios(data);
      setUsuariosFiltrados(data);
    }

    setCarregando(false);
  };

  const promoverParaAdmin = async (id) => {
    const { error } = await supabase
      .from("profiles")
      .update({ isAdmin: true })
      .eq("id", id);

    if (error) {
      console.error("Erro ao promover:", error);
    } else {
      buscarUsuarios();
    }
  };

  const editarUsuario = async (usuario) => {
    const novoNome = prompt("Novo nome:", usuario.name);
    if (!novoNome) return;

    const { error } = await supabase
      .from("profiles")
      .update({ name: novoNome })
      .eq("id", usuario.id);

    if (error) {
      console.error("Erro ao editar:", error);
    } else {
      buscarUsuarios();
    }
  };

  const excluirUsuario = async (id) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este usuário?");
    if (!confirmar) return;

    const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Erro ao excluir:", error);
    } else {
      buscarUsuarios();
    }
  };

  const filtrarUsuarios = (texto) => {
    const termo = texto.toLowerCase();
    const filtrados = usuarios.filter((u) =>
      u.name?.toLowerCase().includes(termo)
    );
    setUsuariosFiltrados(filtrados);
  };

  return (
    <div className="admin-page">
      <h2>👥 Gerenciar Usuários</h2>
      <p>Visualize, edite, promova ou remova usuários cadastrados.</p>

      <input
        type="text"
        placeholder="🔍 Buscar por nome..."
        onChange={(e) => filtrarUsuarios(e.target.value)}
        className="input-busca"
      />

      {carregando ? (
        <p>Carregando usuários...</p>
      ) : usuariosFiltrados.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
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
            {usuariosFiltrados.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.usuario}</td>
                <td>{usuario.name}</td>
                <td>{usuario.email}</td>
                <td>{usuario.isAdmin ? "✅" : "❌"}</td>
                <td>
                  <button
                    className="btn-editar"
                    onClick={() => editarUsuario(usuario)}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    className="btn-excluir"
                    onClick={() => excluirUsuario(usuario.id)}
                  >
                    🗑️ Excluir
                  </button>
                  {!usuario.isAdmin && (
                    <button
                      className="btn-promover"
                      onClick={() => promoverParaAdmin(usuario.id)}
                    >
                      🔓 Promover
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Link to="/admin" className="resumo-voltar">
        ⬅ Voltar ao painel
      </Link>
    </div>
  );
};

export default UsuariosAdmin;
