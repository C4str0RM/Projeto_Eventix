import { supabase } from "../config/supabaseClient.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".register-form");
  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");
  const usuarioInput = document.getElementById("usuario");
  const senhaInput = document.getElementById("senha");
  const confirmarInput = document.getElementById("confirmar");

  const googleBtn = document.querySelector(".google-btn");
  const facebookBtn = document.querySelector(".facebook-btn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const usuario = usuarioInput.value.trim();
    const senha = senhaInput.value.trim();
    const confirmarSenha = confirmarInput.value.trim();

    if (!nome || !email || !usuario || !senha || !confirmarSenha) {
      alert("Preencha todos os campos!");
      return;
    }

    if (!email.includes("@")) {
      alert("E-mail inválido!");
      return;
    }

    if (senha.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: { nome, usuario }, 
      },
    });

    if (error) {
      alert("Erro ao cadastrar: " + error.message);
      console.error(error);
      return;
    }

    alert(`Cadastro realizado com sucesso, ${nome}!`);
    window.location.href = "login.html";
  });

  googleBtn.addEventListener("click", async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/Html-js/src/pages/home.html",
      },
    });
  });

  facebookBtn.addEventListener("click", async () => {
    await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: "http://localhost:5173/Html-js/src/pages/home.html",
      },
    });
  });
});
