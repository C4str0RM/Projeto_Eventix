import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/sucesso.css';

function Sucesso() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Pagamento Confirmado | Eventix';
  }, []);

  return (
    <div className="sucesso-page-wrapper">
      <div className="sucesso-container">
        <h1>✅ Pagamento Confirmado!</h1>
        <p>Obrigado por comprar com a Eventix. Nos vemos no festival!</p>
        <button className="btn-voltar-home" onClick={() => navigate('/')}>
          Voltar para o início
        </button>
      </div>

    </div>
  );
}

export default Sucesso;
