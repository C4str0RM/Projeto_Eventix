import React from "react";


export const ResumoRelatorio = ({ resumo }) => {
  return (
    <div className="relatorio-resumo">
      <div className="card-relatorio">
        👥 Usuários: <br /> {resumo.totalUsuarios}
      </div>
      <div className="card-relatorio">
        🎉 Eventos: <br /> {resumo.totalEventos}
      </div>
      <div className="card-relatorio">
        🎟️ Ingressos vendidos: <br /> {resumo.totalIngressos}
      </div>
      <div className="card-relatorio">
        💰 Receita total: <br />
        R${" "}
        {resumo.receitaTotal.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
    </div>
  );
};

export default ResumoRelatorio;