import React from "react";
import { Link } from "react-router-dom";
import "../Styles/menu.css";
import iconePerfil from "../assets/icone-perfil.png";
import logoEventix from "../assets/logo.png";

const Menu = ({ usuario }) => {
  const quantidadeIngressos = usuario?.logado ? 3 : 0;

  return (
    <header className="menu">
      <Link to="/" className="logo">
        <img src={logoEventix} alt="Logo Eventix" className="logo-img" />
      </Link>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquise por artista, evento ou local..."
        />
        <button className="search-btn">🔍</button>
      </div>

      <nav>
        <Link to="/eventos">
          <i>🎫</i> Eventos
        </Link>
        <Link to="/categorias">
          <i>📂</i> Categorias
        </Link>

        <Link to="/carrinho" className="cart-icon">
          🛒 <span className="cart-count">{quantidadeIngressos}</span>
        </Link>

        {usuario?.logado ? (
          <div className="usuario-logado">
            <span className="ola">Olá,</span>
            <span className="nome">{usuario.nome}!</span>
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
