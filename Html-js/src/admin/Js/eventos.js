import { supabase } from "../../config/supabaseClient.js";

document.addEventListener("DOMContentLoaded", async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const tbody = document.querySelector("#table-eventos tbody");
    tbody.innerHTML = `<tr><td colspan="4">Você precisa estar logado.</td></tr>`;
    return;
  }

  const { data: eventos, error } = await supabase
    .from("eventos")
    .select("*")
    .eq("deletado", false);

  if (error) {
    console.error("Erro ao buscar eventos:", error.message);
    return;
  }

  const tbody = document.querySelector("#table-eventos tbody");
  tbody.innerHTML = "";

  eventos.forEach((ev) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${ev.titulo}</td>
      <td>${ev.data}</td>
      <td>${ev.local}</td>
      <td>
        <button class="btn-editar" data-id="${ev.id}">✏️ Editar</button>
        <button class="btn-excluir" data-id="${ev.id}">🗑️ Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
});
