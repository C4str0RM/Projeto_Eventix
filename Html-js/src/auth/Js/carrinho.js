import { supabase } from "../../config/supabaseClient.js";
import { carrinhoContext } from "../../context/carrinhoContext.js";
import { calcularTempoRestante } from "../../utils/temporestante.js";

document.addEventListener("DOMContentLoaded", async () => {
  const lista = document.querySelector(".lista-ingressos");
  const saudacao = document.getElementById("saudacao");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if (saudacao)
      saudacao.textContent =
        "Você precisa estar logado para ver seus ingressos.";
    if (lista) lista.innerHTML = "";
    return;
  }

  let perfilUsuario = null;
  const { data: perfil, error } = await supabase
    .from("profiles")
    .select("usuario, name, email")
    .eq("id", user.id)
    .single();

  if (!error && perfil) {
    perfilUsuario = perfil;
  }

  const nomeUsuario =
    perfilUsuario?.usuario ||
    perfilUsuario?.name ||
    perfilUsuario?.email ||
    user.user_metadata?.usuario ||
    user.email ||
    "Usuário";

  await carrinhoContext.carregarCarrinho(user.id);
  renderizarCarrinho(carrinhoContext.itens, user, nomeUsuario);

  carrinhoContext.inscrever((ctx) => {
    renderizarCarrinho(ctx.itens, user, nomeUsuario);
  });

  async function renderizarCarrinho(itens, usuario, nomeUsuario) {
    if (!lista) return;

    if (!itens || itens.length === 0) {
      if (saudacao) {
        saudacao.textContent = `Olá, ${nomeUsuario}! Você ainda não possui ingressos no carrinho.`;
      }

      lista.innerHTML = `
        <a href="/eventos.html" class="carrinho-voltar">⬅ Ver eventos disponíveis</a>
      `;
      return;
    }

    if (saudacao) {
      saudacao.textContent = `Olá, ${nomeUsuario}! Aqui estão seus ingressos dos eventos que você garantiu 🎉`;
    }

    lista.innerHTML = "";
    for (const item of itens) {
      const { data: ingresso } = await supabase
        .from("ingressos_novo")
        .select("id, tipo, valor, event_id")
        .eq("id", item.ingresso_id)
        .single();

      if (!ingresso) continue;

      const { data: evento } = await supabase
        .from("eventos")
        .select("*")
        .eq("id", ingresso.event_id)
        .single();

      if (!evento) continue;

      const card = document.createElement("div");
      card.classList.add("carrinho-card");
      card.innerHTML = `
      <h3>${evento.titulo}</h3>
      <p><strong>Data:</strong> ${new Date(
          evento.data
        ).toLocaleDateString()}</p>
        <p><strong>Local:</strong> ${evento.local}</p>
        <p class="carrinho-tempo">${calcularTempoRestante(evento.data)}</p>
        
        <div class="carrinho-ingressos">
          <h4>🎫 Ingressos:</h4>
          <p><strong>Tipo:</strong> ${ingresso.tipo}</p>
          <p><strong>Quantidade:</strong> ${item.quantidade}</p>
          <p><strong>Preço unitário:</strong> R$ ${ingresso.valor.toFixed(
            2
          )}</p>
          <p><strong>Total:</strong> <strong>R$ </strong> ${(
            item.quantidade * ingresso.valor
          ).toFixed(2)}</p>
        </div>

        <div class="carrinho-acoes">
          <button class="carrinho-cancelar"> <strong>Cancelar ingresso </strong></button>
        </div>
      `;

      card
        .querySelector(".carrinho-cancelar")
        .addEventListener("click", async () => {
          if (confirm(`Cancelar ingresso para "${evento.titulo}"?`)) {
            await carrinhoContext.removerItem(item.id, usuario.id);
            alert(`Ingresso para "${evento.titulo}" cancelado com sucesso.`);
          }
        });

      lista.appendChild(card);
    }
  }
});
