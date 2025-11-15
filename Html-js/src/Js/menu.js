import { supabase } from "../config/supabaseClient.js";
import iconePerfil from "../assets/icone-perfil.png";
import logoEventix from "../assets/logo.png";

const quantidade = 2;

async function atualizarPerfil(usuario, nome) {
  const { data, error } = await supabase.auth.updateUser({
    data: {
      usuario,
      nome,
    },
  });

  if (error) {
    console.error("Erro ao atualizar perfil:", error.message);
    return null;
  }

  console.log("Perfil atualizado:", data);
  return data;
}

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
      <a href="/src/pages/admin.html" class="btn-adm">Painel ADM 🛠️</a>
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
          usuario.usuario || usuario.nome || "Usuário"
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
