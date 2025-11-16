import { supabase } from "../../config/supabaseClient.js";

async function obterNomeUsuario() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session?.user) {
    return "Administrador";
  }

  const user = session.user;

const { data: perfil, error: erroPerfil } = await supabase
  .from("profiles")
  .select("usuario, name, email")
  .eq("id", user.id)
  .single();

console.log("Perfil recebido:", perfil);

  if (erroPerfil || !perfil) {
    return user.email || "Administrador";
  }

  return perfil.usuario || perfil.nome || user.email || "Administrador";
}

obterNomeUsuario().then((nome) => {
  document.querySelector(".dashboard-container p").textContent =
    "Bem-vindo(a), " + nome + "!";
});
