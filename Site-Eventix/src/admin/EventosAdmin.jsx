import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../config/supabaseClient";
import "./Style/Adminpages.css";

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
      .order("data", { ascending: true });

    if (error) {
      console.error("Erro ao buscar eventos:", error);
    } else {
      setEventos(data);
    }

    setCarregando(false);
  };

  const excluirEvento = async (id) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este evento?");
    if (!confirmar) return;

    const { error } = await supabase.from("eventos").delete().eq("id", id);

    if (error) {
      console.error("Erro ao excluir evento:", error);
      alert("Não foi possível excluir o evento.");
    } else {
      setEventos((prev) => prev.filter((evento) => evento.id !== id));
    }
  };

  const abrirModal = (evento) => {
    setEventoSelecionado(evento);
    setMostrarModal(true);
  };

  const ModalEdicao = () => {
    const [titulo, setTitulo] = useState(eventoSelecionado?.titulo || "");
    const [data, setData] = useState(eventoSelecionado?.data || "");
    const [local, setLocal] = useState(eventoSelecionado?.local || "");

    const salvarEdicao = async () => {
      const { error } = await supabase
        .from("eventos")
        .update({ titulo, data, local })
        .eq("id", eventoSelecionado.id);

      if (error) {
        alert("Erro ao salvar edição.");
        console.error(error);
      } else {
        alert("Evento atualizado com sucesso!");
        setMostrarModal(false);
        setEventos((prev) =>
          prev.map((ev) =>
            ev.id === eventoSelecionado.id ? { ...ev, titulo, data, local } : ev
          )
        );
      }
    };

    return (
      <div className="modal-admin-overlay">
        <div className="modal-admin">
          <h3>Editar Evento</h3>

          <label>Título:</label>
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />

          <label>Data:</label>
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} />

          <label>Local:</label>
          <input value={local} onChange={(e) => setLocal(e.target.value)} />

          <div className="modal-admin-buttons">
            <button onClick={salvarEdicao}>💾 Salvar</button>
            <button onClick={() => setMostrarModal(false)}>❌ Cancelar</button>
          </div>
        </div>
      </div>
    );
  };

  const ModalNovoEvento = () => {
    const [titulo, setTitulo] = useState("");
    const [data, setData] = useState("");
    const [local, setLocal] = useState("");

    const criarEvento = async () => {
      if (!titulo || !data || !local) {
        alert("Preencha todos os campos.");
        return;
      }

      const { data: novoEvento, error } = await supabase
        .from("eventos")
        .insert([{ titulo, data, local }])
        .select()
        .single();

      if (error) {
        alert("Erro ao criar evento.");
        console.error(error);
      } else {
        alert("Evento criado com sucesso!");
        setEventos((prev) => [...prev, novoEvento]);
        setMostrarNovoModal(false);
      }
    };

    return (
      <div className="modal-admin-overlay">
        <div className="modal-admin">
          <h3>Novo Evento</h3>

          <label>Título:</label>
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />

          <label>Data:</label>
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} />

          <label>Local:</label>
          <input value={local} onChange={(e) => setLocal(e.target.value)} />

          <div className="modal-admin-buttons">
            <button onClick={criarEvento}>💾 Criar</button>
            <button onClick={() => setMostrarNovoModal(false)}>❌ Cancelar</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-page">
      <h2>📋 Gerenciar Eventos</h2>
      <p>Aqui você pode visualizar os eventos cadastrados.</p>

      <button className="btn-novo-evento" onClick={() => setMostrarNovoModal(true)}>
        ➕ Novo Evento
      </button>

      {carregando ? (
        <p>Carregando eventos...</p>
      ) : eventos.length === 0 ? (
        <p>Nenhum evento encontrado.</p>
      ) : (
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
                  <button className="btn-editar" onClick={() => abrirModal(evento)}>
                    ✏️ Editar
                  </button>
                  <button className="btn-excluir" onClick={() => excluirEvento(evento.id)}>
                    🗑️ Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {mostrarModal && <ModalEdicao />}
      {mostrarNovoModal && <ModalNovoEvento />}

      <Link to="/admin" className="resumo-voltar">
        ⬅ Voltar ao painel
      </Link>
    </div>
  );
};

export default EventosAdmin;
