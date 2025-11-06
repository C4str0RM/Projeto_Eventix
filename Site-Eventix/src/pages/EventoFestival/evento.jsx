import React, { useEffect } from "react";
import "../../styles/stylenp.css";
import { useNavigate } from "react-router-dom";
import ContadorEvento from "../../components/contagemregrassiva";

function Evento() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Festival Aurora-Boreal | Eventix";
  }, []);

  return (
    <div className="evento-page-wrapper">
      <div className="contador-flutuante">
        <ContadorEvento />
      </div>

      <div className="banner-festa">
        <img
          src="https://i.pinimg.com/1200x/07/29/08/0729082c4175cd7f4e367aa46a004006.jpg"
          alt="Banner Festival Aurora-Boreal"
        />
      </div>

      <header className="evento-header">
        <h1>Festival Aurora-Boreal</h1>
        <p>
          Uma celebração vibrante da cultura brasileira com música, dança e
          experiências únicas
        </p>
      </header>

      <section className="evento-destaque">
        <div className="info-principal">
          <h2>📅 11 de Maio de 2026</h2>
          <p>Praça das Águas, Cacoal – RO</p>
          <p>Início: 16h00 • Encerramento: ao amanhecer 🌅</p>
          <p>Organização: Aurora Produções</p>
          <p className="classificacao">
            <strong>Classificação: +16</strong>
          </p>
        </div>

        <div className="botao-compra">
          <button className="btn-comprar" onClick={() => navigate("/compra")}>
            VER INGRESSOS
          </button>
          <p>Confira os ingressos disponíveis!!</p>
        </div>
      </section>

      <section className="sobre-festival">
        <h2>🎶 Sobre o Festival</h2>
        <p>
          O Festival Aurora-Boreal é uma experiência cultural que mistura ritmos
          brasileiros, arte urbana, gastronomia regional e muita energia. Uma
          noite de celebração com atrações ao vivo, oficinas interativas e
          espaços temáticos para todos os públicos.
        </p>
      </section>

      <section className="atracoes-confirmadas">
        <h2>🎤 Atrações Confirmadas</h2>
        <ul>
          <li>Grupo Batuque Livre – Samba raiz com roda ao vivo</li>
          <li>DJ Morena Tropicana – Funk, axé e samba eletrônico</li>
          <li>Bloco Aurora do Samba – Desfile com passistas e bateria</li>
          <li>Martinha do Cavaco – Revelação do samba feminino</li>
        </ul>
      </section>

      <section className="experiencias">
        <h2>🎨 Experiências</h2>
        <ul>
          <li>Oficina de percussão com mestres locais</li>
          <li>Pintura corporal com glitter e neon</li>
          <li>Espaço zen com rede e massagem gratuita</li>
        </ul>
      </section>

      <section className="local-ingressos">
        <h2>📍 Local e Ingressos</h2>
        <p>Endereço: Praça das Águas – Av. Central, Cacoal – RO</p>
        <p>Entrada gratuita até 18h • Após: ingressos entre R$30 e R$450</p>
        <p>Venda online disponível até 10/10 • Ingressos limitados</p>
      </section>
    </div>
  );
}

export default Evento;
