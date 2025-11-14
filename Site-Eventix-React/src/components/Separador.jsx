import React from "react";

export const Separador = ({ texto = "ou" }) => (
  <div className="separator">
    <span>{texto}</span>
  </div>
);
