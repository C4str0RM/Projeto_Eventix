import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/menu.css";
import iconePerfil from "../assets/icone-perfil.png";
import logoEventix from "../assets/logo.png";
import BarraDePesquisa from "./BarradePesquisa";
import { verificarAdmin } from "../utils/verificarAdmin";
import { useCarrinho } from "../context/CarrinhoContext";

const Menu = ({ usuario }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const { quantidade } = useCarrinho();

  useEffect(() => {
    const checarPermissao = async () => {
      const admin = await verificarAdmin(usuario);
      setIsAdmin(admin);
    };

    checarPermissao();
  }, [usuario]);

  return (
    <header className={`menu ${isAdmin ? "menu-adm" : ""}`}>
      <Link to="/" className="logo">
        <img src={logoEventix} alt="Logo Eventix" className="logo-img" />
      </Link>

      {!isAdmin && <BarraDePesquisa />}

      <nav>
        {isAdmin ? (
          <>
            <span className="selo-adm">👑 Administrador</span>
          </>
        ) : (
          <>
            <Link to="/eventos">
              <i>🎫</i> Eventos
            </Link>
            <Link to="/categorias">
              <i>📂</i> Categorias
            </Link>
            <Link to="/carrinho" className="cart-icon">
              🛒{" "}
              {quantidade > 0 && (
                <span className="cart-count">{quantidade}</span>
              )}
            </Link>
          </>
        )}

        {isAdmin && (
          <Link to="/admin" className="btn-adm">
            Painel ADM 🛠️
          </Link>
        )}

        {usuario?.logado ? (
          <div className="usuario-logado">
            <span className="ola">Olá,</span>
            <span className="nome">
              {usuario?.usuario || usuario?.nome || usuario?.email || "Usuário"}
              !
            </span>
            <Link to="/painel">
              <img src={iconePerfil} alt="Perfil" className="icone-perfil" />
            </Link>
          </div>
        ) : (
          <div className="menu-acoes">
            <Link to="/login">Entrar</Link>
            <Link to="/cadastro" className="btn-cadastro">
              Criar Conta
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Menu;
