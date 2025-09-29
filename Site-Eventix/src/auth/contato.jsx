import React, { useState, useEffect } from 'react';
import '../Styles/stylecontato.css';
import Menu from './menu';
import Footer from './footer';

const Contato = ({ usuario }) => {
  const [formEnviado, setFormEnviado] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    document.title = 'Contato | Eventix';
    if (usuario?.nome) setNome(usuario.nome);
    if (usuario?.email) setEmail(usuario.email);
  }, [usuario]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Mensagem enviada:', { nome, email, mensagem });

    setFormEnviado(true);
    setMensagem('');

    setTimeout(() => setFormEnviado(false), 4000);
  };

  return (
    <div className="contato-page">

      <section className="contato-wrapper">
        <h2>Fale com a gente</h2>
        <p>Tem dúvidas, sugestões ou quer saber mais sobre o evento? Envie sua mensagem!</p>

        <form className="contato-form" onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="mensagem">Mensagem</label>
          <textarea
            id="mensagem"
            name="mensagem"
            rows="5"
            placeholder="Escreva aqui..."
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            required
          ></textarea>

          <button type="submit" className="contato-botao">Enviar</button>
        </form>

        {formEnviado && (
          <p className="contato-sucesso">✅ Sua mensagem foi enviada com sucesso!</p>
        )}
      </section>

    </div>
  );
};

export default Contato;
