import React, { useState } from "react";
import { supabase } from "../config/supabaseClient";
import { ingressosInfantis } from "../types/newindex";
import "../Styles/eventocard.css";
import { useCarrinho } from "../context/CarrinhoContext";
import ModalIngresso from "./ModalIngresso";

function EventoCard({ evento, usuario }) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [ingressos, setIngressos] = useState([]);
  const [erroIngressos, setErroIngressos] = useState(null);
  const [quantidades, setQuantidades] = useState({});
  const { atualizarCarrinho } = useCarrinho();

  const buscarIngressos = async () => {
    const valido = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!evento?.id || !valido.test(evento.id)) return setErroIngressos("ID inválido.");
    if (evento.titulo === "Infância Encantada") return setIngressos(ingressosInfantis);

    const { data, error } = await supabase
      .from("ingressos_novo")
      .select("*")
      .eq("event_id", evento.id);

    error ? setErroIngressos("Erro ao carregar ingressos.") : setIngressos(data || []);
  };

  const abrirModal = () => {
    setMostrarModal(true);
    buscarIngressos();
  };

  const adicionarAoCarrinho = async (tipo, quantidade = 1) => {
    if (!usuario?.id) return alert("Você precisa estar logado.");
    const ingresso = ingressos.find((i) => i.tipo === tipo);
    if (!ingresso) return alert("Tipo de ingresso não encontrado.");

    const { data: existente } = await supabase
      .from("carrinho")
      .select("id, quantidade")
      .eq("usuario_id", usuario.id)
      .eq("ingresso_id", ingresso.id)
      .eq("status", "ativo")
      .single();

    if (existente) {
      const { error } = await supabase
        .from("carrinho")
        .update({ quantidade: existente.quantidade + quantidade })
        .eq("id", existente.id);
      if (error) return alert("Erro ao atualizar carrinho.");
    } else {
      const { error } = await supabase.from("carrinho").insert([
        {
          usuario_id: usuario.id,
          evento_id: evento.id,
          ingresso_id: ingresso.id,
          quantidade,
        },
      ]);
      if (error) return alert("Erro ao adicionar ao carrinho.");
    }

    await atualizarCarrinho();
    alert(`Adicionado ${quantidade} ingresso(s) ao carrinho!`);
  };

  if (!evento?.id) return null;

  return (
    <>
      <div className="card-evento-todos" onClick={abrirModal}>
        <img
          src={evento.imagem || "/img/padrao.jpg"}
          alt={evento.titulo || "Evento"}
          className="imagem-evento-todos"
        />
        <h3 className="titulo-evento-todos">{evento.titulo || "Evento"}</h3>
        <p className="info-evento-todos">
          {evento.data
            ? new Date(evento.data).toLocaleDateString("pt-BR")
            : "Data indefinida"}{" "}
          — {evento.local || "Local não informado"}
        </p>
      </div>

      {mostrarModal && (
        <ModalIngresso
          evento={evento}
          ingressos={ingressos}
          erroIngressos={erroIngressos}
          quantidades={quantidades}
          setQuantidades={setQuantidades}
          adicionarAoCarrinho={adicionarAoCarrinho}
          fechar={() => setMostrarModal(false)}
        />
      )}
    </>
  );
}

export default EventoCard;
