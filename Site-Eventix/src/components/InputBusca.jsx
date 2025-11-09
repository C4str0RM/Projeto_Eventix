import React from "react";

export const InputBusca = ({ onFiltrar }) => (
  <input
    type="text"
    placeholder="🔍 Buscar por nome..."
    onChange={(e) => onFiltrar(e.target.value)}
    className="input-busca"
  />
);

export default InputBusca;
