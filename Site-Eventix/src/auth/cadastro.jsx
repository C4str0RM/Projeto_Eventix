import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../config/supabaseClient";
import "../Styles/login.css";

function Cadastro() {
  const navigate = useNavigate();

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

  useEffect(() => {
  const verificarUsuario = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: perfilExistente } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id);

      if (!perfilExistente || perfilExistente.length === 0) {
        const { error: insertError } = await supabase.from("profiles").insert([
          {
            id: user.id,
            name: user.user_metadata?.name || "",
            email: user.email,
            usuario: user.user_metadata?.email?.split("@")[0] || "",
            created_at: new Date(),
            updated_at: new Date(),
          },
        ]);

        if (!insertError) {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    }
  };

  verificarUsuario();
}, []);


  const handleGoogleSignup = async () => {
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

  const handleCadastro = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    if (error?.message.includes("User already registered")) {
      setErro("Este e-mail já está cadastrado.");
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      setErro("Erro ao obter usuário autenticado.");
      return;
    }

    const { error: insertError } = await supabase.from("profiles").insert([
      {
        id: userData.user.id,
        name: nome,
        email: email,
        usuario: usuario,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    if (insertError) {
      setErro("Erro ao salvar perfil: " + insertError.message);
      return;
    }

    alert("Cadastro realizado com sucesso!");
    navigate("/login");
  };

  const handleSubmit = async (e) => {
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
    await handleCadastro();
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
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
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
            <span
              className="eye-icon"
              onClick={() => setShowConfirm(!showConfirm)}
            >
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
          <button
            type="button"
            className="google-btn"
            onClick={handleGoogleSignup}
          >
            Cadastrar com Google
          </button>

          <button
            type="button"
            className="facebook-btn"
            onClick={handleFacebookLogin}
          >
            Cadastrar com Facebook
          </button>
        </div>

        <p className="login-link">
          Já possui uma conta? <Link to="/login">Faça login.</Link>
        </p>
      </div>
    </div>
  );
}

export default Cadastro;
