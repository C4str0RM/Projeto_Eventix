import React from "react";
import { Navigate } from "react-router-dom";

function RotaPrivada({ usuario, carregandoUsuario, children }) {
  if (carregandoUsuario) return null; 

  if (!usuario?.logado) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RotaPrivada;
