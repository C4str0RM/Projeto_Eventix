import { supabase } from "../config/supabaseClient.js";

document.addEventListener("DOMContentLoaded", async () => {
  const saudacao = document.getElementById("saudacao-resumo");
  const eventosInscritosEl = document.getElementById("eventos-inscritos");
  const ingressosCarrinhoEl = document.getElementById("ingressos-carrinho");
  const ultimoAcessoEl = document.getElementById("ultimo-acesso");
  const statusContaEl = document.getElementById("status-conta");

  const eventoNomeEl = document.getElementById("evento-nome");
  const eventoDataEl = document.getElementById("evento-data");
  const eventoLocalEl = document.getElementById("evento-local");
  const ingressoProximoEl = document.getElementById("ingresso-proximo");

  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, "0");
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const ano = hoje.getFullYear();
  ultimoAcessoEl.textContent = `${dia}/${mes}/${ano}`;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    saudacao.textContent =
      "Você precisa estar logado para ver o resumo da conta.";
    return;
  }

  const { data: perfil } = await supabase
    .from("profiles")
    .select("usuario, name, email")
    .eq("id", user.id)
    .single();

  const nomeUsuario =
    perfil?.usuario || perfil?.name || perfil?.email || user.email || "Usuário";

  saudacao.textContent = `Olá, ${nomeUsuario}! Aqui está um resumo rápido da sua atividade.`;

  const { data: inscricoes } = await supabase
    .from("inscricoes")
    .select("id")
    .eq("usuario_id", user.id);

  eventosInscritosEl.textContent = inscricoes ? inscricoes.length : 0;

  const { data: carrinho } = await supabase
    .from("carrinho")
    .select("id, ingresso_id")
    .eq("usuario_id", user.id)
    .eq("status", "ativo");

  ingressosCarrinhoEl.textContent = carrinho ? carrinho.length : 0;

  if (carrinho && carrinho.length > 0) {
    const ingressoIds = carrinho.map((item) => item.ingresso_id);

    const { data: ingressos } = await supabase
      .from("ingressos_novo")
      .select("id, tipo, valor, event_id")
      .in("id", ingressoIds);

    const eventoIds = ingressos.map((i) => i.event_id);

    const { data: eventos } = await supabase
      .from("eventos")
      .select("id, titulo, data, local")
      .in("id", eventoIds);

    const combinados = ingressos
      .map((ingresso) => {
        const evento = eventos.find((e) => e.id === ingresso.event_id);
        if (!evento || !evento.data) return null;
        return { nome: evento.titulo, data: evento.data, local: evento.local };
      })
      .filter(Boolean);

    const hojeZerado = new Date();
    hojeZerado.setHours(0, 0, 0, 0);

    const futuros = combinados.filter((e) => {
      const dataEvento = new Date(e.data);
      dataEvento.setHours(0, 0, 0, 0);
      return dataEvento >= hojeZerado;
    });

    futuros.sort((a, b) => new Date(a.data) - new Date(b.data));

    if (futuros.length > 0) {
      const proximo = futuros[0];
      eventoNomeEl.textContent = proximo.nome;
      eventoDataEl.textContent = new Date(proximo.data).toLocaleDateString(
        "pt-BR"
      );
      eventoLocalEl.textContent = proximo.local;
      ingressoProximoEl.style.display = "block";
    }
  }

  statusContaEl.textContent = "Ativa";
});
