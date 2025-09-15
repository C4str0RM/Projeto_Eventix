import React from "react";
import "./stylepag.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ContadorEvento from "./contagemregressiva";

function PaginaEvento() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Conferência Global de Inovação | Eventix";
  }, []);

  return (

    <div>
      <div className="contador-flutuante">
        <ContadorEvento />
      </div>

      <div className="banner-futuro">
        <img
          src="https://i.pinimg.com/736x/26/84/f5/2684f59b1c7daf97ec94b3cc3037c97a.jpg"
          alt="Banner Futuristic Conference"
        />
      </div>

      <header className="evento-header">
        <h1>Conferência Global de Inovação</h1>
        <p>Conectando mentes criativas e tecnologias emergentes</p>
      </header>

      <section className="evento-destaque">
        <div className="info-principal">
          <h2>📅 25 de Outubro de 2025</h2>
          <p>Centro de Convenções, Porto Velho – RO</p>
          <p>Credenciamento: 08h • Abertura: 09h</p>
          <p>Organização: PulsarTech</p>
          <p>Classificação: Livre</p>
        </div>

        <div className="botao-compra">
          <button className="btn-comprar" onClick={() => navigate("/inscricao")}>
            GARANTIR MINHA VAGA
          </button>
          <p>Inscrição gratuita com certificado</p>
        </div>
      </section>

      <section>
        <h2>🧠 Sobre a Conferência</h2>
        <p>
          A Conferência Global de Inovação reúne líderes, pesquisadores, empreendedores e estudantes
          para discutir os avanços em tecnologia, sustentabilidade, educação e cultura digital.
          Um espaço para troca de ideias, networking e inspiração.
        </p>
      </section>

      <section>
        <h2>🎤 Palestrantes Confirmados</h2>
        <ul>
          <li>Dr. Ana Lima – Inteligência Artificial e Ética</li>
          <li>MC Baltazar – Criatividade e Futuro das Mídias</li>
          <li>DJ Eclipse – Tecnologia e Música Interativa</li>
        </ul>
      </section>

      <section>
        <h2>📅 Agenda do Evento</h2>
        <ul>
          <li>09h00 – Abertura e boas-vindas</li>
          <li>10h00 – Painel: Inovação Sustentável</li>
          <li>13h30 – Workshop: IA aplicada à educação</li>
          <li>16h00 – Encerramento com performance interativa</li>
        </ul>
      </section>

      <section>
        <h2>📍 Local e Inscrição</h2>
        <p>Endereço: Av. das Nações, 1234 – Porto Velho – RO</p>
        <p>Inscrição online gratuita até 25/09</p>
        <p>Presença garante certificado digital</p>
      </section>

      <footer>
        <p>&copy; 2025 Eventix. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default PaginaEvento;
