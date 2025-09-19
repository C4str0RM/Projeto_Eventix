import React, { useEffect } from "react";
import "../Styles/stylepag2.css";
import { useNavigate } from "react-router-dom";

function Finalizacao() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Inscrição Confirmada | Eventix";
  }, []);

  return (
    <div className="pagina-centralizada">
      <div className="finalizacao-container">
        <h1>🎉 Inscrição Confirmada!</h1>
        <p>Obrigado por garantir sua participação na Conferência Global de Inovação.</p>
        <p>Seu certificado digital será enviado por e-mail após o evento.</p>
        <p className="finalizacao-destaque">
          Plano selecionado: <strong>Padrão</strong>
        </p>
        <button className="btn-paga" onClick={() => navigate("/")}>
          Voltar para o início
        </button>

        <footer>
          <p>&copy; 2025 Eventix. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
}

export default Finalizacao;
