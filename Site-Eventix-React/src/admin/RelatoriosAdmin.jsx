import React, { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import "./Style/Adminpages.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ResumoRelatorio from "../components/ResumoRelatorio";
import GraficoReceita from "../components/GraficoReceita";
import CarregandoSpinner from "../components/CarregandoSpinner";

const RelatoriosAdmin = () => {
  const [carregando, setCarregando] = useState(true);
  const [resumo, setResumo] = useState({
    totalUsuarios: 0,
    totalEventos: 0,
    totalIngressos: 0,
    receitaTotal: 0,
  });
  const [graficoDados, setGraficoDados] = useState({
    labels: [],
    valores: [],
    porcentagens: [],
  });

  useEffect(() => {
    const carregarRelatorios = async () => {
      try {
        const [
          { count: usuarios },
          { count: eventos },
          { data: ingressos },
          { data: eventosData },
        ] = await Promise.all([
          supabase.from("profiles").select("*", { count: "exact", head: true }),
          supabase.from("eventos").select("*", { count: "exact", head: true }),
          supabase.from("ingressos_novo").select("valor, event_id"),
          supabase.from("eventos").select("id, titulo"),
        ]);

        const totalIngressos = ingressos?.length || 0;
        const receitaTotal = ingressos?.reduce(
          (acc, item) => acc + (item.valor || 0),
          0
        );

        const receitaPorEvento = {};
        ingressos.forEach((ing) => {
          receitaPorEvento[ing.event_id] =
            (receitaPorEvento[ing.event_id] || 0) + (ing.valor || 0);
        });

        const labels = [];
        const valores = [];
        const porcentagens = [];

        eventosData.forEach((evento) => {
          const valor = receitaPorEvento[evento.id] || 0;
          labels.push(evento.titulo);
          valores.push(valor);
        });

        const total = valores.reduce((a, b) => a + b, 0);
        valores.forEach((v) => {
          const p = total > 0 ? ((v / total) * 100).toFixed(1) : 0;
          porcentagens.push(p);
        });

        setResumo({
          totalUsuarios: usuarios || 0,
          totalEventos: eventos || 0,
          totalIngressos,
          receitaTotal,
        });

        setGraficoDados({ labels, valores, porcentagens });
      } catch (error) {
        toast.error("Erro ao carregar relatórios.");
      } finally {
        setCarregando(false);
      }
    };

    carregarRelatorios();
  }, []);

  return (
    <div className="admin-page">
      <h2>📊 Relatórios</h2>
      <p>Acompanhe métricas e dados da plataforma.</p>

      {carregando ? (
        <CarregandoSpinner texto="Carregando dados..." />
      ) : (
        <>
          <ResumoRelatorio resumo={resumo} />
          <GraficoReceita dados={graficoDados} />
        </>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default RelatoriosAdmin;
