import React, { useEffect, useState } from "react";
import "../Styles/styleformpag.css";
import { useNavigate, useLocation } from "react-router-dom";

function FormasPagamento() {
  const [metodo, setMetodo] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const planoSelecionado = location.state?.planoSelecionado;

  useEffect(() => {
    document.title = "Escolha o método de pagamento | Eventix";
  }, []);

  const confirmarPagamento = () => {
    const destino = planoSelecionado === "Vitalício" ? "/vitalicio" : "/finalizacao";

    if (metodo === "Pix") {
      setTimeout(() => {
        navigate(destino);
      }, 3000);
    } else {
      navigate(destino);
    }
  };

  return (
    <div className="pagina-centralizada">
      <div className="pagamento-container">
        <h1>💳 Escolha o método de pagamento</h1>
        {planoSelecionado && (
          <h2 className="plano-info">Plano selecionado: <strong>{planoSelecionado}</strong></h2>
        )}

        {!metodo && (
          <div className="opcoes-pagamento">
            <button onClick={() => setMetodo("Pix")}>📱 Pix</button>
            <button onClick={() => setMetodo("Cartão")}>💳 Cartão de Crédito</button>
            <button onClick={() => setMetodo("Boleto")}>📄 Boleto Bancário</button>
          </div>
        )}

        {metodo === "Pix" && (
          <div className="pix-container">
            <p>Escaneie o QR Code abaixo para concluir o pagamento:</p>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=eventix-pix-fake"
              alt="QR Code Pix"
              className="qrcode-fake"
            />
            <p>Aguardando confirmação...</p>
            <button className="btn-paga" onClick={confirmarPagamento}>
              Confirmar pagamento
            </button>
          </div>
        )}

        {metodo === "Cartão" && (
          <div className="cartao-container">
            <p>Pagamento via cartão de crédito realizado com sucesso ✅</p>
            <button className="btn-paga" onClick={confirmarPagamento}>
              Continuar
            </button>
          </div>
        )}

        {metodo === "Boleto" && (
          <div className="boleto-container">
            <p>Boleto gerado e enviado para seu e-mail ✅</p>
            <button className="btn-paga" onClick={confirmarPagamento}>
              Continuar
            </button>
          </div>
        )}

        <footer>
          <p>&copy; 2025 Eventix. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
}

export default FormasPagamento;
