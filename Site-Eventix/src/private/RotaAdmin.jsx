import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../config/supabaseClient";

import CarregandoSpinner from "../components/CarregandoSpinner";
import { toast } from "react-toastify";

const RotaAdmin = ({ usuario, carregandoUsuario, children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    const verificarAdmin = async () => {
      if (!usuario) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("isAdmin")
        .eq("id", usuario.id)
        .single();

      if (error || !data) {
        toast.error("Erro ao verificar permissão de administrador.");
        setIsAdmin(false);
      } else {
        setIsAdmin(data.isAdmin === true);
      }

      setVerificando(false);
    };

    if (!carregandoUsuario && usuario) {
      verificarAdmin();
    }
  }, [carregandoUsuario, usuario]);

  if (carregandoUsuario || verificando) {
    return <CarregandoSpinner texto="Verificando acesso..." />;
  }

  if (!usuario || !isAdmin) {
    toast.error("Acesso restrito a administradores.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RotaAdmin;
