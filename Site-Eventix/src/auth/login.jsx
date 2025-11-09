import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../config/supabaseClient";
import "../Styles/login.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

function Login({ setUsuario }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
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
        redirectTo: "http://localhost:5173",
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);

    if (!email || !senha) {
      toast.warn("Preencha todos os campos.");
      setCarregando(false);
      return;
    }

    if (senha.length < 6) {
      toast.warn("A senha deve ter pelo menos 6 caracteres.");
      setCarregando(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      toast.error("E-mail ou senha inválidos.");
      setCarregando(false);
      return;
    }

    if (data.session) {
      toast.success("Login realizado com sucesso!");
      setUsuario(data.user);
      navigate("/");
    }

    setCarregando(false);
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

          <button type="submit" disabled={carregando}>
            {carregando ? <ClipLoader color="#fff" size={20} /> : "Entrar"}
          </button>
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

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Login;