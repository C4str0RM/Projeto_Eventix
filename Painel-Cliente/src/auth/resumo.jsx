import React, { useEffect, useState } from 'react';
import '../Styles/styleresumo.css';

const ResumoConta = () => {
  const [nome, setNome] = useState('Maria');
  const [eventosInscritos, setEventosInscritos] = useState(3);
  const [ultimoAcesso, setUltimoAcesso] = useState('20/09/2025');
  const [statusConta, setStatusConta] = useState('Ativa');
  const [proximoEvento, setProximoEvento] = useState({
    nome: 'Conferência Global de Inovação',
    data: '25/10/2025',
  });

  useEffect(() => {
    document.title = `Resumo da Conta | Eventix`;
  }, []);

  return (
    <section className="container-pagina">
      <h1>Resumo da sua conta</h1>
      <p>Olá, {nome}! Aqui está um resumo rápido da sua atividade.</p>

      <div className="cards-resumo">
        <div className="card-resumo">
          <h3>Eventos inscritos</h3>
          <p>{eventosInscritos}</p>
        </div>
        <div className="card-resumo">
          <h3>Último acesso</h3>
          <p>{ultimoAcesso}</p>
        </div>
        <div className="card-resumo">
          <h3>Status da conta</h3>
          <p className="ativo">{statusConta}</p>
        </div>
      </div>

      <div className="card-evento">
        <h3>🎉 Próximo evento</h3>
        <p>{proximoEvento.nome}</p>
        <p>Data: {proximoEvento.data}</p>
      </div>

      <a href="/" className="botao-voltar">⬅ Voltar ao painel</a>
    </section>
  );
};

export default ResumoConta;
