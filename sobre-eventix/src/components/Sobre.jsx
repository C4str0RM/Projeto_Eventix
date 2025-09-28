import React from "react";
import "./sobre.css";

export default function Sobre() {
  return (
    <main className="sobre-container">
      <header>
        <h1>Sobre nós</h1>
        <p>
          Bem-vindo à nossa página sobre nós. Aqui você encontrará informações sobre os nossos eventos.
        </p>
      </header>

      <div className="sobre-sections">
        <section className="historia">
          <h2>Nossa História</h2>
          <p>
            A <strong>Eventix</strong> foi criada em <strong>2020</strong>, em um momento em que a tecnologia se tornou ainda mais essencial para aproximar pessoas.
            Com o crescimento dos eventos online e a necessidade de centralizar informações, nasceu a ideia de desenvolver uma plataforma que unisse organizadores e público de forma simples, acessível e moderna.
          </p>
          <p>
            O ponto de partida foi a criação de um site que permitisse cadastrar eventos com informações claras — nome, data, local e descrição.
            Rapidamente, a Eventix evoluiu e passou a oferecer recursos como:
          </p>
          <ul>
            <li><strong>Inscrição online</strong> rápida e segura;</li>
            <li><strong>Gerenciamento</strong> de convites e participantes;</li>
            <li><strong>Comunicação direta</strong> com inscritos via notificações e e-mail;</li>
            <li><strong>Cadastro de voluntários</strong> para apoiar a organização;</li>
            <li><strong>Pagamentos online</strong> e emissão de certificados.</li>
          </ul>
          <p>
            Desde então, a Eventix tem se consolidado como uma empresa inovadora no setor, ajudando comunidades, associações e empresas a ampliar sua presença digital e a tornar seus eventos mais acessíveis.
          </p>
          <p><em>Nosso lema resume bem nossa essência:</em></p>
          <p><strong>“Eventos mais próximos de você.”</strong></p>
        </section>
        <section className="missao">
          <h2>Missão</h2>
          <p>Nossa missão é proporcionar soluções inovadoras que atendam às necessidades de nossos clientes.</p>
        </section>
        <section className="visao">
          <h2>Visão</h2>
          <p>Ser reconhecida como a melhor empresa do setor, oferecendo qualidade e excelência em nossos serviços.</p>
        </section>
      </div>
    </main>
  );
}