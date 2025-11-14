import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient";

const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ usuario, children }) => {
  const [quantidade, setQuantidade] = useState(0);

  const atualizarCarrinho = async () => {
    if (!usuario?.id) return;

    const { data, error } = await supabase
      .from("carrinho")
      .select("id")
      .eq("usuario_id", usuario.id)
      .eq("status", "ativo");

    if (error) {
      console.error("Erro ao atualizar carrinho:", error.message);
      return;
    }

    setQuantidade(data?.length || 0);
  };

  useEffect(() => {
    atualizarCarrinho();
  }, [usuario]);

  return (
    <CarrinhoContext.Provider value={{ quantidade, atualizarCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => useContext(CarrinhoContext);
