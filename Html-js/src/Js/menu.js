import { supabase } from "../config/supabaseClient.js";
import { carrinhoContext } from "../context/carrinhoContext.js";
import iconePerfil from "../assets/icone-perfil.png";
import logoEventix from "../assets/logo.png";

document.addEventListener("DOMContentLoaded", async () => {
  const menu = document.getElementById("menu");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let usuario = null;

  if (user) {
    const { data: perfil, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Erro ao buscar perfil:", error.message);
    } else {
      usuario = {
        logado: true,
        usuario: perfil.usuario,
        nome: perfil.name,
        email: perfil.email,
        isAdmin: perfil.isAdmin,
      };
    }
  }

  const isAdmin = usuario?.isAdmin || false;

  menu.classList.toggle("menu-adm", isAdmin);

  menu.innerHTML = `
    <a href="/src/pages/home.html" class="logo">
      <img src="${logoEventix}" alt="Logo Eventix" class="logo-img" />
    </a>

    ${
      !isAdmin
        ? `
      <div class="search-bar">
        <input type="text" placeholder="Pesquise por artista, evento ou local..." />
        <button class="search-btn">🔍</button>
      </div>
    `
        : ""
    }

    <nav> 
      ${
        isAdmin
          ? `
      <span class="selo-adm">👑 Administrador</span>
      <a href="/src/admin/dashboard.html" class="btn-adm">Painel ADM 🛠️</a>
      `
          : `
        <a href="/src/pages/eventos.html"><i>🎫</i> Eventos</a>
        <a href=""><i>📂</i> Categorias</a>
        <a href="../auth/carrinho.html" class="cart-icon">🛒</a>
      `
      }

      ${
        usuario
          ? `
        <div class="usuario-logado">
          <span class="ola">Olá,</span>
          <span class="nome">${usuario.usuario || usuario.nome || "Usuário"}!</span>
          <a href="/src/pages/painel.html">
            <img src="${iconePerfil}" alt="Perfil" class="icone-perfil" />
          </a>
        </div>
      `
          : `
        <div class="menu-acoes">
          <a href="/src/pages/login.html">Entrar</a>
          <a href="/src/pages/cadastro.html" class="btn-cadastro">Criar Conta</a>
        </div>
      `
      }
    </nav>
  `;

  const cartIcon = document.querySelector(".cart-icon");

  if (user && cartIcon) {
    await carrinhoContext.carregarCarrinho(user.id);
    atualizarBadge(carrinhoContext.quantidade, cartIcon);

    carrinhoContext.inscrever((ctx) => {
      atualizarBadge(ctx.quantidade, cartIcon);
    });
  }

  function atualizarBadge(quantidade, cartIcon) {
    if (!cartIcon) return;
    let badge = cartIcon.querySelector(".cart-count");

    if (quantidade > 0) {
      if (badge) {
        badge.textContent = quantidade;
      } else {
        badge = document.createElement("span");
        badge.classList.add("cart-count");
        badge.textContent = quantidade;
        cartIcon.appendChild(badge);
      }
    } else {
      if (badge) badge.remove();
    }
  }
});
