import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

import { useCadastroForm } from "../components/useCadastroForm.Js";
import { useVerificarUsuario } from "../components/useVerificarUsuario";
import CadastroForm from "../components/CadastroForm";

import "./Styles/login.css";

function Cadastro() {
  const navigate = useNavigate();
  const {
    nome,
    email,
    usuario,
    senha,
    confirmarSenha,
    setNome,
    setEmail,
    setUsuario,
    setSenha,
    setConfirmarSenha,
    showPassword,
    setShowPassword,
    showConfirm,
    setShowConfirm,
    carregando,
    handleSubmit,
    handleGoogleSignup,
    handleFacebookLogin,
  } = useCadastroForm(navigate);

  useVerificarUsuario(navigate);

  useEffect(() => {
    document.title = "Cadastro | Eventix";
  }, []);

  return (
    <div className="auth-page">
      <div className="container">
        <CadastroForm
          nome={nome}
          email={email}
          usuario={usuario}
          senha={senha}
          confirmarSenha={confirmarSenha}
          setNome={setNome}
          setEmail={setEmail}
          setUsuario={setUsuario}
          setSenha={setSenha}
          setConfirmarSenha={setConfirmarSenha}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          carregando={carregando}
          handleSubmit={handleSubmit}
          handleGoogleSignup={handleGoogleSignup}
          handleFacebookLogin={handleFacebookLogin}
        />
        <p className="login-link">
          Já possui uma conta? <Link to="/login">Faça login.</Link>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Cadastro;
