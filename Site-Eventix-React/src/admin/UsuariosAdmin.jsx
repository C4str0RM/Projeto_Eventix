import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../config/supabaseClient";
import "./Styles/Adminpages.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import TabelaUsuarios from "../components/TabelaUsuarios";
import CarregandoSpinner from "../components/CarregandoSpinner";
import InputBusca from "../components/InputBusca";

const UsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [promovendoId, setPromovendoId] = useState(null);

  useEffect(() => {
    document.title = "Usuários | Eventix";
  }, []);

  useEffect(() => {
    const carregarUsuario = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        toast.error("Usuário não autenticado.");
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
      .eq("deletado", false)
      .order("name", { ascending: true });

    if (error) {
      toast.error("Erro ao buscar usuários.");
    } else {
      setUsuarios(data);
      setUsuariosFiltrados(data);
    }

    setCarregando(false);
  };

  const promoverParaAdmin = async (id) => {
    setPromovendoId(id);

    const { error } = await supabase
      .from("profiles")
      .update({ isAdmin: true })
      .eq("id", id);

    if (error) {
      toast.error("Erro ao promover usuário.");
    } else {
      toast.success("Usuário promovido com sucesso!");
      buscarUsuarios();
    }

    setPromovendoId(null);
  };

  const editarUsuario = async (usuario) => {
    const { value: novoNome } = await Swal.fire({
      title: "Editar nome",
      input: "text",
      inputValue: usuario.name,
      showCancelButton: true,
      confirmButtonText: "Salvar",
      cancelButtonText: "Cancelar",
    });

    if (!novoNome) return;

    const { error } = await supabase
      .from("profiles")
      .update({ name: novoNome })
      .eq("id", usuario.id);

    if (error) {
      toast.error("Erro ao editar usuário.");
    } else {
      toast.success("Nome atualizado!");
      buscarUsuarios();
    }
  };

  const excluirUsuario = async (id) => {
    const confirmar = await Swal.fire({
      title: "Tem certeza?",
      text: "Essa ação não poderá ser desfeita.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
    });

    if (!confirmar.isConfirmed) return;

    const { error } = await supabase
      .from("profiles")
      .update({ deletado: true })
      .eq("id", id);

    if (error) {
      toast.error("Erro ao excluir usuário.");
    } else {
      toast.success("Usuário excluído com sucesso!");
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

      <InputBusca onFiltrar={filtrarUsuarios} />

      {carregando ? (
        <CarregandoSpinner texto="Carregando usuários..." />
      ) : (
        <TabelaUsuarios
          usuarios={usuariosFiltrados}
          onEditar={editarUsuario}
          onExcluir={excluirUsuario}
          onPromover={promoverParaAdmin}
          promovendoId={promovendoId}
        />
      )}

      <Link to="/admin" className="resumo-voltar">
        ⬅ Voltar ao painel
      </Link>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default UsuariosAdmin;
