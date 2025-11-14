import { buscarEventos } from "./Js/eventos.js";

document.addEventListener("DOMContentLoaded", () => {
  const paginaAtual = window.location.pathname;

  if (paginaAtual.includes("eventos.html")) {
    buscarEventos();
  }
});
