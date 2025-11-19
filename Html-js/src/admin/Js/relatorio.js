import { supabase } from "../../config/supabaseClient.js";
import Chart from "chart.js/auto";

document.addEventListener("DOMContentLoaded", async () => {
  const resumoDiv = document.getElementById("resumo-relatorio");
  const ctx = document.getElementById("grafico-receita").getContext("2d");

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

    resumoDiv.innerHTML = `
      <div class="card-relatorio">👥 Usuários:<br>${usuarios || 0}</div>
      <div class="card-relatorio">🎉 Eventos:<br>${eventos || 0}</div>
      <div class="card-relatorio">🎟️ Ingressos vendidos:<br>${totalIngressos}</div>
      <div class="card-relatorio">💰 Receita total:<br>R$ ${receitaTotal.toLocaleString("pt-BR",{minimumFractionDigits:2})}</div>
    `;

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


    new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Receita por evento (R$)",
            data: valores,
            backgroundColor: [
              "#FF5733","#33C1FF","#9D33FF","#33FF57",
              "#FFC133","#FF33A8","#33FFD1","#4534DD"
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: "Receita por Evento" },
          tooltip: {
            callbacks: {
              label: (context) => {
                const valor = context.raw;
                const porcentagem = porcentagens[context.dataIndex];
                return `R$ ${valor.toLocaleString("pt-BR",{minimumFractionDigits:2})} (${porcentagem}%)`;
              },
            },
          },
        },
      },
    });
  } catch (error) {
    resumoDiv.innerHTML = `<p>Erro ao carregar relatórios.</p>`;
    console.error(error);
  }
});
