import { supabase } from "../config/supabaseClient.js";

document.addEventListener("DOMContentLoaded", async () => {
  const saudacaoPainel = document.getElementById("saudacao-painel");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if (saudacaoPainel) {
      saudacaoPainel.textContent =
        "Você precisa estar logado para acessar o painel.";
    }
    return;
  }

  const { data: perfil, error } = await supabase
    .from("profiles")
    .select("usuario, name, email")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Erro ao buscar perfil:", error.message);
  }

  const nomeUsuario =
    perfil?.usuario ||
    perfil?.name ||
    perfil?.email ||
    user.user_metadata?.usuario ||
    user.email ||
    "Usuário";

  if (saudacaoPainel) {
    saudacaoPainel.textContent = `Olá, ${nomeUsuario}! Tudo bem?`;
  }
});
