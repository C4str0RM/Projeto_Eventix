import { supabase } from "../config/supabaseClient.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-contato");
  const formEnviado = document.getElementById("formEnviado");
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const mensagem = document.getElementById("mensagem");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("Mensagem enviada:", {
      nome: nome.value,
      email: email.value,
      mensagem: mensagem.value,
    });

    formEnviado.style.display = "block";

    mensagem.value = "";

    setTimeout(() => {
      formEnviado.style.display = "none";
    }, 4000);
  });
});
