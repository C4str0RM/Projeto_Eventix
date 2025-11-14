import { supabase } from "../config/supabaseClient.js";

let eventos = [];
let filtroAtual = "todos";

const erroEl = document.getElementById("erro-eventos");
const carregandoEl = document.getElementById("carregando-eventos");
const gradeEl = document.getElementById("grade-eventos-todos");

export async function buscarEventos() {
  if (!erroEl || !carregandoEl || !gradeEl) {
    console.warn("Elementos de eventos não encontrados na página.");
    return;
  }

  carregandoEl.style.display = "block";

  const { data, error } = await supabase.from("eventos").select("*");

  if (error) {
    erroEl.textContent = "Erro ao carregar eventos.";
    erroEl.style.display = "block";
    console.error(error);
  } else {
    eventos = data || [];
    erroEl.style.display = "none";
    console.log("Eventos recebidos:", eventos);
  }

  carregandoEl.style.display = "none";
  renderizarEventos();
}

function renderizarEventos() {
  gradeEl.innerHTML = "";
  const hoje = new Date();

  const filtrados = eventos
    .filter((evento) => {
      const dataEvento = evento.data ? new Date(evento.data) : null;
      if (!dataEvento) return false;

      switch (filtroAtual) {
        case "destaques":
          return evento.destaque === true;
        case "novos":
          return dataEvento > new Date("2025-11-01");
        case "antigos":
          return dataEvento <= new Date("2025-11-01");
        case "embreve":
          return dataEvento > hoje;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      if (filtroAtual === "novos") return new Date(b.data) - new Date(a.data);
      if (filtroAtual === "antigos") return new Date(a.data) - new Date(b.data);
      return 0;
    });

  if (filtrados.length === 0) {
    gradeEl.innerHTML = `<p class="sem-eventos-todos">Nenhum evento disponível no momento.</p>`;
    return;
  }

  filtrados.forEach((evento) => {
    const card = document.createElement("div");
    card.className = "card-evento-todos";

    const imagem = evento.imagem || "/img/padrao.jpg";
    const titulo = evento.titulo || "Evento";
    const local = evento.local || "Local não informado";
    const dataFormatada = evento.data
      ? new Date(evento.data).toLocaleDateString("pt-BR")
      : "Data indefinida";

    card.innerHTML = `
    <img src="${imagem}" alt="${titulo}" class="imagem-evento-todos" />
    <h3 class="titulo-evento-todos">${titulo}</h3>
    <p class="info-evento-todos">${dataFormatada} — ${local}</p>
  `;

    gradeEl.appendChild(card);
  });
}

function formatarData(dataISO) {
  const data = new Date(dataISO);
  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

document.querySelectorAll("[data-filtro]").forEach((btn) => {
  btn.addEventListener("click", () => {
    filtroAtual = btn.getAttribute("data-filtro");
    document
      .querySelectorAll("[data-filtro]")
      .forEach((b) => b.classList.remove("ativo"));
    btn.classList.add("ativo");
    renderizarEventos();
  });
});

buscarEventos();
