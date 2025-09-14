import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  useEffect(() => {
    document.title = "Login | Eventix";
  }, []);

  return (
    <div className="container">
      <form className="login-form">
        <h2>Login</h2>

        <input type="text" placeholder="Usuário" required />
        <input type="password" placeholder="Senha" required />

        <div className="options">
          <label>
            <input type="checkbox" />
            Lembrar
          </label>
          <a href="#">Esqueci a senha</a>
        </div>

        <button type="submit">Login</button>
      </form>

      <div className="separator">
        <span>ou</span>
      </div>

      <div className="social-login">
        <button type="button" className="google-btn">Entrar com Google</button>
        <button type="button" className="facebook-btn">Entrar com Facebook</button>
      </div>

      <p className="register">
        Ainda não possui uma conta? <Link to="/cadastro">Cadastre-se.</Link>
      </p>
    </div>
  );
}

export default Login;
