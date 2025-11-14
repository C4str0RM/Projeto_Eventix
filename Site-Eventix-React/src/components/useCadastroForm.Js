import { useState } from "react";
import { supabase } from "../config/supabaseClient";
import { toast } from "react-toastify";

export function useCadastroForm(navigate) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

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

  return {
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
  };
}
