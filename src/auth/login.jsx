import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Styles/login.css";
import "./Styles/base.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    document.title = "Login | Eventix";
  }, []);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleGoogleLogin = () => {
    alert("Login com Google ainda não está disponível.");
  };

  const handleFacebookLogin = () => {
    alert("Login com Facebook ainda não está disponível.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!usuario || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setErro("");
    alert("Login validado com sucesso! 🚀");
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="inputgroup">
          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>

        <div className="inputgroup">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <span className="eye-icon" onClick={togglePassword}>
            {showPassword ? "👁️" : "🔒"}
          </span>
        </div>

        <div className="options">
          <label>
            <input type="checkbox" />
            Lembrar
          </label>
          <Link to="/recuperarsenha">Esqueci a senha</Link>
        </div>

        {erro && <p className="erro">{erro}</p>}

        <button type="submit">Entrar</button>
      </form>

      <div className="separator">
        <span>OU</span>
      </div>

      <div className="social-login">
        <button type="button" className="google-btn" onClick={handleGoogleLogin}>
          Entrar com Google
        </button>
        <button type="button" className="facebook-btn" onClick={handleFacebookLogin}>
          Entrar com Facebook
        </button>
      </div>

      <p className="register">
        Ainda não possui uma conta? <Link to="/cadastro">Cadastre-se.</Link>
      </p>
    </div>
  );
}

export default Login;
