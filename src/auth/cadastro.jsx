import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css"; 

function Cadastro() {
  useEffect(() => {
    document.title = "Cadastro | Eventix";
  }, []);

  return (
    <div className="container">
      <form className="register-form">
        <h2>Cadastro</h2>

        <input type="text" placeholder="Nome completo" required />
        <input type="email" placeholder="E-mail" required />
        <input type="text" placeholder="Usuário" required />
        <input type="password" placeholder="Senha" required />
        <input type="password" placeholder="Confirmar senha" required />

        <button type="submit">Cadastrar</button>
      </form>

      <div className="separator">
        <span>ou</span>
      </div>

      <div className="social-login">
        <button type="button" className="google-btn">Cadastrar com Google</button>
        <button type="button" className="facebook-btn">Cadastrar com Facebook</button>
      </div>

      <p className="login-link">
        Já possui uma conta? <Link to="/">Faça login.</Link>
      </p>
    </div>
  );
}

export default Cadastro;
