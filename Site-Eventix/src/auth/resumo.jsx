import React, { useEffect, useState } from 'react';
import '../Styles/styleresumo.css';
import Menu from "./menu";
import Footer from "./footer";

const ResumoConta = ({ usuario }) => {
  const [eventosInscritos, setEventosInscritos] = useState(3);
  const [ultimoAcesso, setUltimoAcesso] = useState('');
  const [statusConta, setStatusConta] = useState('Ativa');
  const [proximoEvento, setProximoEvento] = useState({
    nome: 'Conferência Global de Inovação',
    data: '25/10/2025',
  });

  useEffect(() => {
    document.title = `Resumo da Conta | Eventix`;

    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    setUltimoAcesso(`${dia}/${mes}/${ano}`);
  }, []);

  return (
    <div className="resumo-body">

      <section className="resumo-container">
        <h1>Resumo da sua conta</h1>
        <p>Olá, {usuario?.nome || "usuário"}! Aqui está um resumo rápido da sua atividade.</p>

        <div className="resumo-cards">
          <div className="resumo-card">
            <h3>Eventos inscritos</h3>
            <p>{eventosInscritos}</p>
          </div>
          <div className="resumo-card">
            <h3>Último acesso</h3>
            <p>{ultimoAcesso}</p>
          </div>
          <div className="resumo-card">
            <h3>Status da conta</h3>
            <p className="resumo-ativo">{statusConta}</p>
          </div>
        </div>

        <div className="resumo-evento">
          <h3>🎉 Próximo evento</h3>
          <p>{proximoEvento.nome}</p>
          <p>Data: {proximoEvento.data}</p>
        </div>

        <a href="/painel" className="resumo-voltar">⬅ Voltar ao painel</a>
      </section>

    </div>
  );
};

export default ResumoConta;
