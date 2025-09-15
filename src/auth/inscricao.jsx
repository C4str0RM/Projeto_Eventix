import React, { useEffect } from "react";
import "./stylepag2.css";
import { useNavigate } from "react-router-dom";

function Inscricao() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Inscrição | Eventix";
  }, []);

  return (
    <div>
      <div className="banner-futurista">
        <img
          src="https://i.pinimg.com/736x/26/84/f5/2684f59b1c7daf97ec94b3cc3037c97a.jpg"
          alt="Banner Futuristic Conference"
        />
      </div>

      <header className="inscricaopag-header">
        <h1>Conferência Global de Inovação</h1>
        <p>Inscrição com certificado digital</p>
      </header>

      <section className="inscricaopag-destaque">
        <p>Participe e receba acesso ao conteúdo e o certificado.</p>
        <button className="btn-paga" onClick={() => navigate("/pagamento")}>
          Quero pagar pela inscrição
        </button>
      </section>

      <section className="inscricaopag-aprendizado">
        <h2>🧠 O que você vai aprender</h2>
        <div className="cardc-aprendizado">
          {[
            {
              icone: "🤖",
              titulos: "Inteligência Artificial",
              textos: "Entenda como a IA está transformando o mercado e a sociedade.",
            },
            {
              icone: "💡",
              titulos: "Ferramentas Digitais",
              textos: "Descubra plataformas que impulsionam negócios e criatividade.",
            },
            {
              icone: "🌱",
              titulos: "Inovação Sustentável",
              textos: "Explore soluções tecnológicas com impacto ambiental positivo.",
            },
            {
              icone: "🎓",
              titulos: "Educação & Cultura",
              textos: "Veja como aplicar tecnologia na aprendizagem e expressão cultural.",
            },
            {
              icone: "🤝",
              titulos: "Networking Global",
              textos: "Conecte-se com especialistas, empreendedores e líderes do setor.",
            },
            {
              icone: "📊",
              titulos: "Dados & Tendências",
              textos: "Aprenda a interpretar dados e identificar tendências tecnológicas que moldam o futuro.",
            },
          ].map((cardc, i) => (
            <div className="cardc" key={i}>
              <span className="icone">{cardc.icone}</span>
              <h3>{cardc.titulos}</h3>
              <p>{cardc.textos}</p>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>&copy; 2025 Eventix. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default Inscricao;
