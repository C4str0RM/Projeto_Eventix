import React from "react";

import { InputGroup } from "./InputGroup";
import { Separador } from "./Separador";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { ClipLoader } from "react-spinners";

export default function CadastroForm({
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
}) {
  return (
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
  );
}
