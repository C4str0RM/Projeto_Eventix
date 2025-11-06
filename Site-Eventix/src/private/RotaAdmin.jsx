import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../config/supabaseClient";

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
        console.error("Erro ao verificar admin:", error?.message);
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
    return <p>Verificando acesso...</p>;
  }

  if (!usuario || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RotaAdmin;
