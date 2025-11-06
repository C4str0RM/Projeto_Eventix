import React, { useEffect } from "react";
import "../../Styles/stylepag2.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import Menu from "../../components/menu";
import Footer from "../../components/footer";

function Pagamentoc() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const nome = searchParams.get("nome");
  const email = searchParams.get("email");
  const area = searchParams.get("area");

  useEffect(() => {
    document.title = "Pagamento | Eventix";
  }, []);

  const finalizarPagamento = (plano) => {
    navigate("/formapagamento", {
      state: {
        planoSelecionado: plano,
        nome,
        email,
        area,
      },
    });
  };

  const areasMap = {
    ia: "Inteligência Artificial",
    sustentavel: "Inovação Sustentável",
    educacao: "Educação & Cultura",
    dados: "Dados & Tendências",
    front: "Front-End Frameworks",
    tech: "Tecnologia na EI",
    design: "UI/UX Design",
  };

  const areaCompleta = areasMap[area] || area;

  return (
    <div className="conferencia-wrapper">
      <div className="banner-conferencia">
        <img
          src="https://i.pinimg.com/736x/26/84/f5/2684f59b1c7daf97ec94b3cc3037c97a.jpg"
          alt="Banner Futuristic Conference"
        />
      </div>

      <header className="cabecalho-conferencia">
        <h1>Conferência Global de Inovação</h1>
        <p>Escolha sua modalidade de acesso:</p>
        {nome && (
          <p className="info-pag">
            👤 <strong>{nome}</strong> | 🧠 Área: {areaCompleta}
          </p>
        )}
      </header>

      <section className="secao-conteudo-pag">
        <h2>🎫 Plano Padrão – R$ 29,90</h2>
        <p>Ao adquirir o plano padrão, você garante:</p>
        <ul className="beneficios-pagamento">
          <li>Certificado digital com selo de participação premium</li>
          <li>Acesso antecipado ao conteúdo exclusivo do evento</li>
          <li>Entrada prioritária nas salas interativas</li>
          <li>Participação em sorteios de brindes tecnológicos</li>
        </ul>

        <p className="info-pagamento">
          Pagamento único válido para esta edição do evento.
        </p>

        <div className="formas-pagamento">
          <h3>Formas de pagamento:</h3>
          <ul>
            <li>💳 Cartão de crédito</li>
            <li>📱 Pix</li>
            <li>📄 Boleto bancário</li>
          </ul>
        </div>

        <button
          className="btn-final"
          onClick={() => finalizarPagamento("Padrão")}
        >
          Finalizar pagamento
        </button>
      </section>

      <section className="secao-conteudo-pag">
        <h2>🔓 Acesso Vitalício – R$ 289,90</h2>
        <p>Com o plano vitalício, você recebe:</p>
        <ul className="beneficios-pagamento">
          <li>Acesso ilimitado a todas as edições futuras do evento</li>
          <li>Certificados premium em cada participação</li>
          <li>Conteúdo exclusivo pós-evento (vídeos, materiais, bônus)</li>
          <li>Comunidade privada de inovação e tecnologia</li>
        </ul>

        <p className="info-pagamento">
          Pagamento único. Acesso garantido para sempre, sem renovações.
        </p>

        <div className="formas-pagamento">
          <h3>Formas de pagamento:</h3>
          <ul>
            <li>💳 Cartão de crédito</li>
            <li>📱 Pix</li>
          </ul>
        </div>

        <button
          className="btn-final"
          onClick={() => finalizarPagamento("Vitalício")}
        >
          Adquirir acesso vitalício
        </button>
      </section>
    </div>
  );
}

export default Pagamentoc;
