import React, { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Style/Adminpages.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RelatoriosAdmin = () => {
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [totalEventos, setTotalEventos] = useState(0);
  const [totalIngressos, setTotalIngressos] = useState(0);
  const [receitaTotal, setReceitaTotal] = useState(0);
  const [graficoDados, setGraficoDados] = useState({ labels: [], valores: [] });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarRelatorios = async () => {
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

      setTotalUsuarios(usuarios || 0);
      setTotalEventos(eventos || 0);
      setTotalIngressos(ingressos?.length || 0);

      const totalReceita = ingressos?.reduce(
        (acc, item) => acc + (item.valor || 0),
        0
      );
      setReceitaTotal(totalReceita || 0);

      const contagem = {};
      ingressos.forEach((ingresso) => {
        contagem[ingresso.event_id] = (contagem[ingresso.event_id] || 0) + 1;
      });

      const labels = [];
      const valores = [];

      eventosData.forEach((evento) => {
        labels.push(evento.titulo);
        valores.push(contagem[evento.id] || 0);
      });

      setGraficoDados({ labels, valores });
      setCarregando(false);
    };

    carregarRelatorios();
  }, []);

  const dadosGrafico = {
    labels: graficoDados.labels,
    datasets: [
      {
        label: "Ingressos vendidos",
        data: graficoDados.valores,
        backgroundColor: "#4caf50",
      },
    ],
  };

  const opcoesGrafico = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Ingressos vendidos por evento" },
    },
  };

  return (
    <div className="admin-page">
      <h2>📊 Relatórios</h2>
      <p>Acompanhe métricas e dados da plataforma.</p>

      {carregando ? (
        <p>Carregando dados...</p>
      ) : (
        <>
          <div className="relatorio-resumo">
            <div className="card-relatorio">
              👥 Usuários: <br /> {totalUsuarios}
            </div>
            <div className="card-relatorio">
              🎉 Eventos: <br /> {totalEventos}
            </div>
            <div className="card-relatorio">
              🎟️ Ingressos vendidos: <br /> {totalIngressos}
            </div>
            <div className="card-relatorio">
              💰 Receita total: <br />
              R${" "}
              {receitaTotal.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>

          <div className="grafico-container">
            <Bar data={dadosGrafico} options={opcoesGrafico} />
          </div>
        </>
      )}
    </div>
  );
};

export default RelatoriosAdmin;
