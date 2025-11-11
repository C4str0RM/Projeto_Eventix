import React, { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import "../Styles/stylecarrinho.css";
import { calcularTempoRestante } from "../utils/temporestante";
import { useCarrinho } from "../context/CarrinhoContext";

const Carrinho = ({ usuario }) => {
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const { atualizarCarrinho } = useCarrinho();

  useEffect(() => {
    document.title = "Meus Ingressos | Eventix";
  }, []);

  useEffect(() => {
    const buscarIngressos = async () => {
      if (!usuario?.id) return;

      const { data: carrinho, error } = await supabase
        .from("carrinho")
        .select("id, ingresso_id, quantidade")
        .eq("usuario_id", usuario.id)
        .eq("status", "ativo");

      if (error) {
        console.error("Erro ao buscar carrinho:", error.message);
        setCarregando(false);
        return;
      }

      if (!carrinho || carrinho.length === 0) {
        setEventos([]);
        setCarregando(false);
        return;
      }

      const ingressoIds = carrinho.map((item) => item.ingresso_id);
      const { data: ingressosData, error: ingressosErro } = await supabase
        .from("ingressos_novo")
        .select("id, tipo, valor, event_id")
        .in("id", ingressoIds);

      if (ingressosErro) {
        console.error("Erro ao buscar ingressos:", ingressosErro.message);
        setCarregando(false);
        return;
      }

      const eventoIds = ingressosData
        .map((i) => i.event_id)
        .filter((id) => typeof id === "string" && id.length === 36);

      const { data: eventosData, error: eventosErro } = await supabase
        .from("eventos")
        .select("*")
        .in("id", eventoIds);

      if (eventosErro) {
        console.error("Erro ao buscar eventos:", eventosErro.message);
        setCarregando(false);
        return;
      }

      const eventosComDados = carrinho.map((item) => {
        const ingresso = ingressosData.find(
          (i) => i.id === item.ingresso_id || i.id === item.ingresso_id
        );
        if (!ingresso) return null;

        const evento = eventosData.find(
          (e) => e.id === ingresso.evento_id || e.id === ingresso.event_id
        );
        if (!evento) return null;

        return {
          ...evento,
          tipo_ingresso: ingresso.tipo,
          valor_unitario: ingresso.valor,
          quantidade: item.quantidade,
          total: item.quantidade * ingresso.valor,
          carrinho_id: item.id,
        };
      });

      setEventos(eventosComDados.filter(Boolean));
      setCarregando(false);
    };

    buscarIngressos();
  }, [usuario]);

  const cancelarIngresso = async (evento) => {
    const confirmacao = window.confirm(
      `Tem certeza que deseja cancelar o ingresso para "${evento.titulo}"?`
    );
    if (confirmacao) {
      const { error } = await supabase
        .from("carrinho")
        .delete()
        .match({ id: evento.carrinho_id });

      if (error) {
        alert("Erro ao cancelar ingresso.");
        return;
      }

      setEventos((prev) =>
        prev.filter((e) => e.carrinho_id !== evento.carrinho_id)
      );

      await atualizarCarrinho();

      alert(`Ingresso para "${evento.titulo}" cancelado com sucesso.`);
    }
  };

  if (carregando)
    return <p className="carregando">Carregando seus ingressos...</p>;

  if (eventos.length === 0) {
    return (
      <div className="carrinho-body">
        <section className="carrinho-painel">
          <h1>🎟️ Meus Ingressos</h1>
          <p>
            Olá,{" "}
            {usuario?.usuario || usuario?.nome || usuario?.email || "Usuário"}!{" "}
            Você ainda não possui ingressos no carrinho.
          </p>
          <a href="/eventos" className="carrinho-voltar">
            ⬅ Ver eventos disponíveis
          </a>
        </section>
      </div>
    );
  }

  return (
    <div className="carrinho-body">
      <section className="carrinho-painel">
        <h1>🎟️ Meus Ingressos</h1>
        <p>
          Olá,{" "}
          {usuario?.usuario || usuario?.nome || usuario?.email || "Usuário"}!{" "}
          Aqui estão seus ingressos dos eventos que você garantiu 🎉
        </p>
      </section>

      <div className="carrinho-grade">
        {eventos.map((evento) => (
          <div key={evento.carrinho_id} className="carrinho-card">
            <h3>{evento.titulo}</h3>
            <p>
              <strong>Data:</strong>{" "}
              {new Date(evento.data).toLocaleDateString()}
            </p>
            <p>
              <strong>Local:</strong> {evento.local}
            </p>
            <p className="carrinho-tempo">
              {calcularTempoRestante(evento.data)}
            </p>

            <div className="carrinho-ingressos">
              <h4>🎫 Ingressos:</h4>
              <p>
                <strong>Tipo: </strong> {evento.tipo_ingresso}
              </p>
              <p>
                <strong>Quantidade: </strong> {evento.quantidade}
              </p>
              <p>
                <strong>Preço unitário: </strong> R${" "}
                {evento.valor_unitario.toFixed(2)}
              </p>
              <p>
                <strong>Total: R$</strong> {evento.total.toFixed(2)}
              </p>
            </div>

            <div className="carrinho-acoes">
              <button
                className="carrinho-cancelar"
                onClick={() => cancelarIngresso(evento)}
              >
                Cancelar ingresso
              </button>
            </div>
          </div>
        ))}
      </div>

      <a href="/painel" className="carrinho-voltar">
        ⬅ Voltar ao painel
      </a>
    </div>
  );
};

export default Carrinho;
