import { supabase } from "../config/supabaseClient.js";
import { verificarAdmin } from "../Js/verificarAdmin.js";
import iconePerfil from "../assets/icone-perfil.png";
import logoEventix from "../assets/logo.png";

const quantidade = 2;

document.addEventListener("DOMContentLoaded", async () => {
  const menu = document.getElementById("menu");
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const usuario = user || null;

  const isAdmin = usuario ? await verificarAdmin(usuario) : false;

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

      `
          : `
        <a href="/src/pages/eventos.html"><i>🎫</i> Eventos</a>
        <a href="/src/pages/categorias.html"><i>📂</i> Categorias</a>
        <a href="/src/pages/carrinho.html" class="cart-icon">
          🛒 ${
            quantidade > 0
              ? `<span class="cart-count">${quantidade}</span>`
              : ""
          }
        </a>
      `
      }

      ${
        usuario
          ? `
        <div class="usuario-logado">
          <span class="ola">Olá,</span>
          <span class="nome">${
            usuario.user_metadata?.usuario ||
            usuario.user_metadata?.nome ||
            "Usuário"
          }!</span>

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
});
