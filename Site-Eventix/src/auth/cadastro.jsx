import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/login.css";

function Cadastro() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    document.title = "Cadastro | Eventix";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !email || !usuario || !senha || !confirmarSenha) {
      setErro("Preencha todos os campos.");
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
      setErro("Digite um e-mail válido.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setErro("");
    alert("Cadastro validado com sucesso!");
  };

  return (
    <div className="auth-page">
      <div className="container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Cadastre-se</h2>

          <div className="inputgroup">
            <input
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={nome ? "input-valid" : ""}
              required
            />
          </div>

          <div className="inputgroup">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={
                email
                  ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                    ? "input-valid"
                    : "input-error"
                  : ""
              }
              required
            />
          </div>

          <div className="inputgroup">
            <input
              type="text"
              placeholder="Usuário"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className={usuario ? "input-valid" : ""}
              required
            />
          </div>

          <div className="inputgroup">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className={senha.length >= 6 ? "input-valid" : "input-error"}
              required
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "👁️" : "🔒"}
            </span>
          </div>

          <div className="inputgroup">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirmar senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className={
                confirmarSenha === senha && confirmarSenha.length >= 6
                  ? "input-valid"
                  : "input-error"
              }
              required
            />
            <span className="eye-icon" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? "👁️" : "🔒"}
            </span>
          </div>

          {erro && <p className="erro">{erro}</p>}

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
          Já possui uma conta? <Link to="/login">Faça login.</Link>
        </p>
      </div>
    </div>
  );
}

export default Cadastro;
