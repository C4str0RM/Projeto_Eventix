import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../config/supabaseClient";
import "../Styles/login.css";

function Login({ setUsuario }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login | Eventix";
  }, []);

  useEffect(() => {
    const verificarUsuario = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUsuario(user);
        navigate("/");
      }
    };
    verificarUsuario();
  }, []);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173",
      },
    });
  };

  const handleFacebookLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: "-----------", 
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setErro("E-mail ou senha inválidos.");
      return;
    }

    if (data.session) {
      navigate("/");
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <div className="inputgroup">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={
                email
                  ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                    ? "input-valid"
                    : "input-error"
                  : ""
              }
            />
          </div>

          <div className="inputgroup">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className={senha.length >= 6 ? "input-valid" : "input-error"}
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
          <button
            type="button"
            className="google-btn"
            onClick={handleGoogleLogin}
          >
            Entrar com Google
          </button>
          <button
            type="button"
            className="facebook-btn"
            onClick={handleFacebookLogin}
          >
            Entrar com Facebook
          </button>
        </div>

        <p className="register">
          Ainda não possui uma conta? <Link to="/cadastro">Cadastre-se.</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
