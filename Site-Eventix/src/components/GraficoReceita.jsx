import React from "react";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoReceita = ({ dados }) => {
  const dadosGrafico = {
    labels: dados.labels,
    datasets: [
      {
        label: "Receita por evento (R$)",
        data: dados.valores,
        backgroundColor: [
          "#FF5733",
          "#33C1FF",
          "#9D33FF",
          "#33FF57",
          "#FFC133",
          "#FF33A8",
          "#33FFD1",
          "#4534DD",
        ],
      },
    ],
  };

  const opcoesGrafico = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Receita por Evento" },
      tooltip: {
        callbacks: {
          label: (context) => {
            const valor = context.raw;
            const porcentagem = dados.porcentagens[context.dataIndex];
            return `R$ ${valor.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })} (${porcentagem}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="grafico-container">
      <Bar data={dadosGrafico} options={opcoesGrafico} />
    </div>
  );
};

export default GraficoReceita;
