import React, { useEffect } from 'react';
import '../Styles/stylepainel.css';
import Menu from "./menu";
import Footer from "./footer";

const PainelConta = ({ usuario }) => {
  useEffect(() => {
    document.title = 'Minha Conta | Eventix';
  }, []);

  return (
    <div className="painelusuario-global">

      <section className="painelusuario-wrapper">
        <h1>Olá, {usuario?.nome || "usuário"}! Tudo bem?</h1>
        <p>Esta é a sua conta. Aqui você pode gerenciar seus dados e eventos.</p>

        <div className="painelusuario-opcoes">
          <a href="/resumo" className="painelusuario-card">
            <span role="img" aria-label="Painel">📊</span>
            <h2>Painel</h2>
            <p>Resumo da sua conta</p>
          </a>

          <a href="/carrinho" className="painelusuario-card">
            <span role="img" aria-label="Ingressos">🛒</span>
            <h2>Ingressos</h2>
            <p>Veja seus ingressos comprados</p>
          </a>

          <a href="/detalhes" className="painelusuario-card">
            <span role="img" aria-label="Conta">👤</span>
            <h2>Detalhes da Conta</h2>
            <p>Atualize seu perfil e senha</p>
          </a>

          <a href="/login" className="painelusuario-card sair">
            <span role="img" aria-label="Sair">🚪</span>
            <h2>Sair</h2>
            <p>Encerrar sessão</p>
          </a>
        </div>
      </section>

    </div>
  );
};

export default PainelConta;
