import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../config/supabaseClient";
import "../Styles/login.css";

import { InputGroup } from "../components/InputGroup";
import { Separador } from "../components/Separador";
import { SocialLoginButtons } from "../components/SocialLoginButtons";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

function Cadastro() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

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
          const { error } = await supabase.from("profiles").insert([
            {
              id: user.id,
              name: user.user_metadata?.name || "",
              email: user.email,
              usuario: user.user_metadata?.email?.split("@")[0] || "",
              created_at: new Date(),
              updated_at: new Date(),
            },
          ]);
          if (!error) navigate("/");
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
      options: { redirectTo: "http://localhost:5173" },
    });
  };

  const handleFacebookLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: { redirectTo: "http://localhost:5173" },
    });
  };

  const handleCadastro = async () => {
    const { error } = await supabase.auth.signUp({ email, password: senha });
    if (error?.message.includes("User already registered")) {
      toast.error("Este e-mail já está cadastrado.");
      setCarregando(false);
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      toast.error("Erro ao obter usuário autenticado.");
      setCarregando(false);
      return;
    }

    const { error: insertError } = await supabase.from("profiles").insert([
      {
        id: userData.user.id,
        name: nome,
        email,
        usuario,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    if (insertError) {
      toast.error("Erro ao salvar perfil: " + insertError.message);
      setCarregando(false);
      return;
    }

    toast.success("Cadastro realizado com sucesso!");
    navigate("/login");
    setCarregando(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);

    if (!nome || !email || !usuario || !senha || !confirmarSenha) {
      toast.warn("Preencha todos os campos.");
      setCarregando(false);
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
      toast.warn("Digite um e-mail válido.");
      setCarregando(false);
      return;
    }

    if (senha.length < 6) {
      toast.warn("A senha deve ter pelo menos 6 caracteres.");
      setCarregando(false);
      return;
    }

    if (senha !== confirmarSenha) {
      toast.warn("As senhas não coincidem.");
      setCarregando(false);
      return;
    }

    await handleCadastro();
  };

  return (
    <div className="auth-page">
      <div className="container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Cadastre-se</h2>

          <InputGroup
            label="Nome completo"
            placeholder="Nome Completo"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            isValid={nome.length > 0}
          />

          <InputGroup
            label="E-mail"
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isValid={/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
          />

          <InputGroup
            label="Usuário"
            placeholder="Usuário"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            isValid={usuario.length > 0}
          />

          <InputGroup
            label="Senha"
            placeholder="Senha"
            type={showPassword ? "text" : "password"}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            showToggle
            show={showPassword}
            toggle={() => setShowPassword(!showPassword)}
            isValid={senha.length >= 6}
          />

          <InputGroup
            label="Confirmar senha"
            placeholder="Confirmar senha"
            type={showConfirm ? "text" : "password"}
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            showToggle
            show={showConfirm}
            toggle={() => setShowConfirm(!showConfirm)}
            isValid={confirmarSenha === senha && confirmarSenha.length >= 6}
          />

          <button type="submit" disabled={carregando}>
            {carregando ? <ClipLoader color="#fff" size={20} /> : "Cadastrar"}
          </button>

          <Separador texto="ou cadastre-se com" />
          <SocialLoginButtons
            onGoogleClick={handleGoogleSignup}
            onFacebookClick={handleFacebookLogin}
          />
        </form>

        <p className="login-link">
          Já possui uma conta? <Link to="/login">Faça login.</Link>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Cadastro;
