import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../config/supabaseClient";
import "../../Styles/styleresumo.css";
import Menu from "../../components/menu";
import Footer from "../../components/footer";

const ResumoConta = ({ usuario }) => {
  const [eventosInscritos, setEventosInscritos] = useState(0);
  const [ingressosCarrinho, setIngressosCarrinho] = useState(0);
  const [ultimoAcesso, setUltimoAcesso] = useState("");
  const [statusConta, setStatusConta] = useState("Ativa");
  const [ingressoMaisProximo, setIngressoMaisProximo] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Resumo da Conta | Eventix`;

    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, "0");
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const ano = hoje.getFullYear();
    setUltimoAcesso(`${dia}/${mes}/${ano}`);

    const buscarEventosInscritos = async () => {
      if (!usuario?.id) return;

      const { data } = await supabase
        .from("inscricoes")
        .select("id")
        .eq("usuario_id", usuario.id);

      if (data) setEventosInscritos(data.length);
    };

    const buscarIngressosCarrinho = async () => {
      if (!usuario?.id) return;

      const { data } = await supabase
        .from("carrinho")
        .select("id, ingresso_id")
        .eq("usuario_id", usuario.id)
        .eq("status", "ativo");

      if (!data || data.length === 0) return;

      setIngressosCarrinho(data.length);

      const ingressoIds = data.map((item) => item.ingresso_id);

      const { data: ingressos } = await supabase
        .from("ingressos_novo")
        .select("id, tipo, valor, event_id")
        .in("id", ingressoIds);

      const eventoIds = ingressos.map((i) => i.event_id);

      const { data: eventos } = await supabase
        .from("eventos")
        .select("id, titulo, data, local")
        .in("id", eventoIds);

      const combinados = ingressos
        .map((ingresso) => {
          const evento = eventos.find((e) => e.id === ingresso.event_id);
          if (!evento || !evento.data) return null;

          return {
            nome: evento.titulo,
            data: evento.data,
            local: evento.local
          };
        })
        .filter(Boolean);

      const hojeZerado = new Date();
      hojeZerado.setHours(0, 0, 0, 0);

      const futuros = combinados.filter((e) => {
        const dataEvento = new Date(e.data);
        dataEvento.setHours(0, 0, 0, 0);
        return dataEvento >= hojeZerado;
      });

      futuros.sort((a, b) => new Date(a.data) - new Date(b.data));

      if (futuros.length > 0) {
        setIngressoMaisProximo({
          ...futuros[0],
          data: new Date(futuros[0].data).toLocaleDateString("pt-BR"),
        });
      }
    };

    buscarEventosInscritos();
    buscarIngressosCarrinho();
  }, [usuario]);

  return (
    <div className="resumo-body">
      <section className="resumo-container">
        <h1>Resumo da sua conta</h1>
        <p>
          Olá, {usuario?.usuario || usuario?.nome || usuario?.email || "usuário"}! Aqui está um resumo rápido da sua atividade.
        </p>

        <div className="resumo-cards">
          <div className="resumo-card">
            <h3>Eventos inscritos</h3>
            <p>{eventosInscritos}</p>
          </div>
          <div className="resumo-card">
            <h3>Ingressos no carrinho</h3>
            <p>{ingressosCarrinho}</p>
          </div>
          <div className="resumo-card">
            <h3>Último acesso</h3>
            <p>{ultimoAcesso}</p>
          </div>
          <div className="resumo-card">
            <h3>Status da conta</h3>
            <p className="resumo-ativo">{statusConta}</p>
          </div>
        </div>

        {ingressoMaisProximo && (
          <div className="resumo-evento">
            <h3>🎟️ Ingresso mais próximo</h3>
            <p><strong>Evento:</strong> {ingressoMaisProximo.nome}</p>
            <p><strong>Data:</strong> {ingressoMaisProximo.data}</p>
            <p><strong>Local:</strong> {ingressoMaisProximo.local}</p>
          </div>
        )}

        <a href="/painel" className="resumo-voltar">⬅ Voltar ao painel</a>
      </section>
    </div>
  );
};

export default ResumoConta;
