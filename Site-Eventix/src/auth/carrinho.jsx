import React, { useEffect } from 'react';
import '../Styles/stylecarrinho.css';
import Menu from "./menu";
import Footer from "./footer";

const MeusEventos = ({ usuario }) => {
  useEffect(() => {
    document.title = 'Meus Ingressos | Eventix';
  }, []);

  const calcularTempoRestante = (dataEvento) => {
    const hoje = new Date();
    const partes = dataEvento.split('/');
    const evento = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`);
    const diffMs = evento - hoje;
    if (diffMs <= 0) return 'Hoje ou já passou';
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const meses = Math.floor(diffDias / 30);
    const dias = diffDias % 30;
    let texto = 'Faltam ';
    if (meses > 0) texto += `${meses} ${meses === 1 ? 'mês' : 'meses'}`;
    if (dias > 0) texto += `${meses > 0 ? ' e ' : ''}${dias} ${dias === 1 ? 'dia' : 'dias'}`;
    return texto;
  };

  const cancelarIngresso = (evento) => {
    const confirmacao = window.confirm(`Tem certeza que deseja cancelar o ingresso para "${evento.nome}"?`);
    if (confirmacao) {
      alert(`Ingresso para "${evento.nome}" cancelado com sucesso.`);
    }
  };

  const eventos = [
    {
      id: 'aurora',
      nome: 'Festival Aurora-Boreal',
      data: '11/05/2026',
      local: 'Praça das Águas, Cacoal – RO',
      ingressos: [
        { tipo: 'Eclipse Gold', valor: 'R$ 340,00', nivel: 'Premium' },
        { tipo: 'Pulse Zone', valor: 'R$ 90,00', nivel: 'Pista' }
      ],
      status: 'Confirmado'
    },
    {
      id: 'inovacao',
      nome: 'Conferência Global de Inovação',
      data: '25/10/2025',
      local: 'Centro de Convenções, Porto Velho – RO',
      ingressos: [
        { tipo: 'Plano Padrão', valor: 'R$ 29,90', nivel: 'Acesso completo' }
      ],
      status: 'Confirmado'
    },
    {
      id: 'ballet',
      nome: 'Ballet das Estações',
      data: '03/12/2025',
      local: 'Teatro Municipal, Ji-Paraná – RO',
      ingressos: [
        { tipo: 'Assento Orquestra', valor: 'R$ 120,00', nivel: 'Frente palco' }
      ],
      status: 'Confirmado'
    }
  ];

  return (
    <div className="carrinho-body">

      <section className="carrinho-painel">
        <h1>🎟️ Meus Ingressos</h1>
        <p>Olá, {usuario?.nome || "usuário"}! Aqui estão os ingressos dos eventos que você comprou.</p>

        <div className="carrinho-grade">
          {eventos.map((evento) => (
            <div key={evento.id} className={`carrinho-card ${evento.id}`}>
              <h3>{evento.nome}</h3>
              <p><strong>Data:</strong> {evento.data}</p>
              <p><strong>Local:</strong> {evento.local}</p>
              <p className="carrinho-tempo">{calcularTempoRestante(evento.data)}</p>

              <div className="carrinho-ingressos">
                <h4>🎫 Tipos de ingresso:</h4>
                <ul>
                  {evento.ingressos.map((ingresso, index) => (
                    <li key={index}>
                      <strong>{ingresso.tipo}</strong> – {ingresso.valor}
                      <span className="carrinho-etiqueta">{ingresso.nivel}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="carrinho-acoes">
                <button className="carrinho-cancelar" onClick={() => cancelarIngresso(evento)}>
                  Cancelar ingresso
                </button>
              </div>
            </div>
          ))}
        </div>

        <a href="/painel" className="carrinho-voltar">⬅ Voltar ao painel</a>
      </section>

    </div>
  );
};

export default MeusEventos;
