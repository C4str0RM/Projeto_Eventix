import React, { useEffect, useState } from "react";
import "../Styles/stylepag2.css";
import { useNavigate } from "react-router-dom";

function Inscricao() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");

  useEffect(() => {
    document.title = "Inscrição | Eventix";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/pagamento?nome=${encodeURIComponent(nome)}&email=${encodeURIComponent(email)}&area=${area}`);
  };

  const aprendizados = [
    { icone: "🤖", titulo: "Inteligência Artificial", texto: "Entenda como a IA está transformando o mercado e a sociedade." },
    { icone: "💡", titulo: "Ferramentas Digitais", texto: "Descubra plataformas que impulsionam negócios e criatividade." },
    { icone: "🌱", titulo: "Inovação Sustentável", texto: "Explore soluções tecnológicas com impacto ambiental positivo." },
    { icone: "🎓", titulo: "Educação & Cultura", texto: "Veja como aplicar tecnologia na aprendizagem e expressão cultural." },
    { icone: "🤝", titulo: "Networking Global", texto: "Conecte-se com especialistas, empreendedores e líderes do setor." },
    { icone: "📊", titulo: "Dados & Tendências", texto: "Aprenda a interpretar dados e identificar tendências tecnológicas que moldam o futuro." },
  ];

  return (
    <div>
      <div className="banner-futurista">
        <img src="https://i.pinimg.com/736x/26/84/f5/2684f59b1c7daf97ec94b3cc3037c97a.jpg" alt="Banner Futuristic Conference" />
      </div>

      <header className="inscricaopag-header">
        <h1>Conferência Global de Inovação</h1>
        <p>Inscrição com certificado digital</p>
      </header>

      <section className="inscricaopag-destaque">
        <p>Preencha seus dados para garantir sua inscrição e receber o certificado:</p>
        <form className="form-inscricao" onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome completo:</label>
          <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />

          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label htmlFor="area">Área de interesse:</label>
          <select id="area" value={area} onChange={(e) => setArea(e.target.value)} required>
            <option value="">Selecione</option>
            <option value="ia">Inteligência Artificial</option>
            <option value="sustentavel">Inovação Sustentável</option>
            <option value="educacao">Educação & Cultura</option>
            <option value="dados">Dados & Tendências</option>
            <option value="front">Front-End Frameworks</option>
            <option value="tech">Tecnologia na Educação Infantil</option>
            <option value="design">UI/UX Design</option>
          </select>

          <button type="submit" className="btn-paga">Continuar para pagamento</button>
        </form>
      </section>

      <section className="inscricaopag-aprendizado">
        <h2>🧠 O que você vai aprender</h2>
        <div className="cardc-aprendizado">
          {aprendizados.map((item, i) => (
            <div className="cardc" key={i}>
              <span className="icone">{item.icone}</span>
              <h3>{item.titulo}</h3>
              <p>{item.texto}</p>
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
