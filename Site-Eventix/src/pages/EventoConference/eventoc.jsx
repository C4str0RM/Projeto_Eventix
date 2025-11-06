import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/styleconf.css";
import ContadorEvento from "../../components/contagemregressiva";

function PaginaConferencia() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Conferência Global de Inovação | Eventix";
  }, []);

  return (
    <div className="conferencia-wrapper">
      <div className="contador-conferencia">
        <ContadorEvento />
      </div>

      <div className="banner-conferencia">
        <img
          src="https://i.pinimg.com/736x/26/84/f5/2684f59b1c7daf97ec94b3cc3037c97a.jpg"
          alt="Banner Futuristic Conference"
        />
      </div>

      <header className="cabecalho-conferencia">
        <h1>Conferência Global de Inovação</h1>
        <p>Conectando mentes criativas e tecnologias emergentes</p>
      </header>

      <section className="bloco-destaque">
        <div className="info-conferencia">
          <h2>📅 25 de Outubro de 2025</h2>
          <p>Centro de Convenções, Porto Velho – RO</p>
          <p>Credenciamento: 08h • Abertura: 09h</p>
          <p>Organização: PulsarTech</p>
          <p>Classificação: Livre</p>
        </div>

        <div className="cta-inscricao">
          <button
            className="btn-inscrever"
            onClick={() => navigate("/inscricao")}
          >
            GARANTIR MINHA VAGA
          </button>
          <p>Inscrição gratuita com certificado</p>
        </div>
      </section>

      <section className="secao-conteudo">
        <h2>🧠 Sobre a Conferência</h2>
        <p>
          A Conferência Global de Inovação reúne líderes, pesquisadores,
          empreendedores e estudantes para discutir os avanços em tecnologia,
          sustentabilidade, educação e cultura digital. Um espaço para troca de
          ideias, networking e inspiração.
        </p>
      </section>

      <section className="secao-conteudo">
        <h2>🎤 Palestrantes Confirmados</h2>
        <ul>
          <li>Dr. Ana Lima – Inteligência Artificial e Ética</li>
          <li>MC Baltazar – Criatividade e Futuro das Mídias</li>
          <li>DJ Eclipse – Tecnologia e Música Interativa</li>
        </ul>
      </section>

      <section className="secao-conteudo">
        <h2>📅 Agenda do Evento</h2>
        <ul>
          <li>09h00 – Abertura e boas-vindas</li>
          <li>10h00 – Painel: Inovação Sustentável</li>
          <li>13h30 – Workshop: IA aplicada à educação</li>
          <li>16h00 – Encerramento com performance interativa</li>
        </ul>
      </section>

      <section className="secao-conteudo">
        <h2>📍 Local e Inscrição</h2>
        <p>Endereço: Av. das Nações, 1234 – Porto Velho – RO</p>
        <p>Inscrição online gratuita até 25/09</p>
        <p>Presença garante certificado digital</p>
      </section>
    </div>
  );
}

export default PaginaConferencia;
