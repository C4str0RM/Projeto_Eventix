import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "./config/supabaseClient";
import AppRoutes from "./AppRoutes";

import Menu from "./components/menu";
import Footer from "./components/footer";
import CarregandoSpinner from "./components/CarregandoSpinner";

import { CarrinhoProvider } from "./context/CarrinhoContext";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [carregandoUsuario, setCarregandoUsuario] = useState(true);
  const [quantidadeCarrinho, setQuantidadeCarrinho] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const hideLayout = [
    "/login",
    "/cadastro",
    "/recuperarsenha",
    "/telapix",
    "/sucesso",
  ].includes(location.pathname);

  const buscarQuantidadeCarrinho = async (usuarioId) => {
    const { data, error } = await supabase
      .from("carrinho")
      .select("quantidade")
      .eq("usuario_id", usuarioId);

    if (error) {
      toast.error("Erro ao buscar carrinho.");
      return;
    }

    const total = data.reduce((acc, item) => acc + item.quantidade, 0);
    setQuantidadeCarrinho(total);
  };

  const carregarPerfil = async (user) => {
    const { data: perfil, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      toast.error("Erro ao carregar perfil.");
      return;
    }

    setUsuario({
      id: user.id,
      email: user.email,
      logado: true,
      usuario: perfil?.usuario,
      nome: perfil?.nome,
    });

    await buscarQuantidadeCarrinho(user.id);
    setCarregandoUsuario(false);
  };

  useEffect(() => {
    const verificarSessao = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        toast.error("Erro ao verificar sessão.");
        setCarregandoUsuario(false);
        return;
      }

      const user = session?.user;

      if (user) {
        await carregarPerfil(user);
      } else {
        setCarregandoUsuario(false);
      }
    };

    verificarSessao();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          setUsuario(null);
          setQuantidadeCarrinho(0);
          setCarregandoUsuario(false);
          navigate("/");
        } else if (session?.user) {
          carregarPerfil(session.user);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (carregandoUsuario) {
    return <CarregandoSpinner texto="Carregando sessão..." />;
  }

  return (
    <CarrinhoProvider usuario={usuario}>
      {!hideLayout && (
        <Menu usuario={usuario} quantidadeCarrinho={quantidadeCarrinho} />
      )}

      <AppRoutes
        usuario={usuario}
        setUsuario={setUsuario}
        carregandoUsuario={carregandoUsuario}
        setQuantidadeCarrinho={setQuantidadeCarrinho}
      />

      {!hideLayout && <Footer />}
      <ToastContainer position="top-right" autoClose={3000} />
    </CarrinhoProvider>
  );
}

export default App;