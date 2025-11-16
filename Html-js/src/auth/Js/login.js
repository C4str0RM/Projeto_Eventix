import { supabase } from "../../config/supabaseClient.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const googleBtn = document.querySelector(".google-btn");
  const facebookBtn = document.querySelector(".facebook-btn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    if (!email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    if (senha.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      alert("E-mail ou senha inválidos.");
      console.error(error);
      return;
    }

    window.location.href = "../pages/home.html";
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
