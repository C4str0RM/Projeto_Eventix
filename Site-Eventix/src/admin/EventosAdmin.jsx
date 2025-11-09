import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../config/supabaseClient";
import "./Style/Adminpages.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import TabelaEventos from "../components/TabelaEventos";
import ModalEdicao from "../components/ModalEdicao";
import ModalNovoEvento from "../components/ModalNovoEvento";
import CarregandoSpinner from "../components/CarregandoSpinner";

const EventosAdmin = () => {
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarNovoModal, setMostrarNovoModal] = useState(false);

  useEffect(() => {
    buscarEventos();
  }, []);

  const buscarEventos = async () => {
    const { data, error } = await supabase
      .from("eventos")
      .select("*")
      .eq("deletado", false)
      .order("data", { ascending: true });

    if (error) {
      toast.error("Erro ao buscar eventos.");
    } else {
      setEventos(data);
    }

    setCarregando(false);
  };

  const excluirEvento = async (id) => {
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
      .from("eventos")
      .update({ deletado: true })
      .eq("id", id);

    if (error) {
      toast.error("Não foi possível excluir o evento.");
    } else {
      toast.success("Evento excluído com sucesso!");
      setEventos((prev) => prev.filter((evento) => evento.id !== id));
    }
  };

  const abrirModal = (evento) => {
    setEventoSelecionado(evento);
    setMostrarModal(true);
  };

  const salvarEdicao = async (eventoAtualizado) => {
    const { error } = await supabase
      .from("eventos")
      .update({
        titulo: eventoAtualizado.titulo,
        data: eventoAtualizado.data,
        local: eventoAtualizado.local,
      })
      .eq("id", eventoAtualizado.id);

    if (error) {
      toast.error("Erro ao salvar edição.");
    } else {
      toast.success("Evento atualizado com sucesso!");
      setMostrarModal(false);
      setEventos((prev) =>
        prev.map((ev) =>
          ev.id === eventoAtualizado.id ? eventoAtualizado : ev
        )
      );
    }
  };

  const criarEvento = async (novo) => {
    const { data: criado, error } = await supabase
      .from("eventos")
      .insert([novo])
      .select()
      .single();

    if (error) {
      toast.error("Erro ao criar evento.");
    } else {
      toast.success("Evento criado com sucesso!");
      setEventos((prev) => [...prev, criado]);
      setMostrarNovoModal(false);
    }
  };

  return (
    <div className="admin-page">
      <h2>📋 Gerenciar Eventos</h2>
      <p>Aqui você pode visualizar os eventos cadastrados.</p>

      <button
        className="btn-novo-evento"
        onClick={() => setMostrarNovoModal(true)}
      >
        ➕ Novo Evento
      </button>

      {carregando ? (
        <CarregandoSpinner texto="Carregando eventos..." />
      ) : (
        <TabelaEventos
          eventos={eventos}
          onEditar={abrirModal}
          onExcluir={excluirEvento}
        />
      )}

      {mostrarModal && (
        <ModalEdicao
          evento={eventoSelecionado}
          onFechar={() => setMostrarModal(false)}
          onSalvar={salvarEdicao}
        />
      )}

      {mostrarNovoModal && (
        <ModalNovoEvento
          onFechar={() => setMostrarNovoModal(false)}
          onCriar={criarEvento}
        />
      )}

      <Link to="/admin" className="resumo-voltar">
        ⬅ Voltar ao painel
      </Link>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EventosAdmin;