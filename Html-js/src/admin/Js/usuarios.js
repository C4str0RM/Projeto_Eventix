import { supabase } from "../../config/supabaseClient.js";

document.addEventListener("DOMContentLoaded", async () => {
  const inputBusca = document.getElementById("input-busca");
  const tbody = document.querySelector("#table-usuarios tbody");

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    tbody.innerHTML = `<tr><td colspan="5">Você precisa estar logado.</td></tr>`;
    return;
  }

  const { data: usuarios, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("deletado", false)
    .order("name", { ascending: true });

  if (error || !usuarios) {
    tbody.innerHTML = `<tr><td colspan="5">Erro ao carregar usuários.</td></tr>`;
    return;
  }

  function renderizarTabela(lista) {
    tbody.innerHTML = "";
    lista.forEach((usuario) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${usuario.usuario || "-"}</td>
        <td>${usuario.name || "-"}</td>
        <td>${usuario.email || "-"}</td>
        <td>${usuario.isAdmin ? "✅" : "❌"}</td>
        <td>
          <button class="btn-editar" data-id="${usuario.id}">✏️ Editar</button>
          <button class="btn-excluir" data-id="${usuario.id}">🗑️ Excluir</button>
          ${
            !usuario.isAdmin
              ? `<button class="btn-promover" data-id="${usuario.id}">🔓 Promover</button>`
              : ""
          }
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  renderizarTabela(usuarios);

  inputBusca.addEventListener("input", (e) => {
    const termo = e.target.value.toLowerCase();
    const filtrados = usuarios.filter((u) =>
      u.name?.toLowerCase().includes(termo)
    );
    renderizarTabela(filtrados);
  });
});
