import React, { useEffect } from 'react';
import '../Styles/style.css';
import '../Styles/stylepadrao.css'

const PainelConta = () => {
  useEffect(() => {
    document.title = 'Minha Conta | Eventix';
  }, []);

  return (
    <section className="painel-conta">
      <h1>Olá, Maria! Tudo bem?</h1>
      <p>Esta é a sua conta. Aqui você pode gerenciar seus dados e eventos.</p>

      <div className="opcoes-conta">
        <a href="/resumo" className="card-opcao">
          <span role="img" aria-label="Painel">📊</span>
          <h2>Painel</h2>
          <p>Resumo da sua conta</p>
        </a>

        <a href="/carrinho" className="card-opcao">
          <span role="img" aria-label="Ingressos">🛒</span>
          <h2>Ingressos</h2>
          <p>Veja seus ingressos comprados</p>
        </a>

        <a href="/detalhes" className="card-opcao">
          <span role="img" aria-label="Conta">👤</span>
          <h2>Detalhes da Conta</h2>
          <p>Atualize seu perfil e senha</p>
        </a>

        <a href="/" className="card-opcao sair">
          <span role="img" aria-label="Sair">🚪</span>
          <h2>Sair</h2>
          <p>Encerrar sessão</p>
        </a>
      </div>
    </section>
  );
};

export default PainelConta;
