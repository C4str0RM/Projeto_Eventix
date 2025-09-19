import React, { useEffect } from "react";
import "../Styles/stylepag2.css";
import { useNavigate } from "react-router-dom";

function Vitalicio() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Acesso Vitalício | Eventix";
  }, []);

  return (
    <div className="pagina-centralizada">
      <div className="vitalicio-container">
        <h1>🔓 Acesso Vitalício Confirmado!</h1>
        <p>Parabéns por garantir acesso ilimitado à Conferência Global de Inovação.</p>

        <ul className="vitalicio-beneficios">
          <li> Participação em todas as edições futuras</li>
          <li> Certificados premium em cada evento</li>
          <li> Networking com grandes nomes da inovação</li>
          <li> Comunidade privada de inovação e tecnologia</li>
        </ul>

        <p className="vitalicio-destaque">
          Você agora faz parte da elite da inovação global 🌎
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

export default Vitalicio;
