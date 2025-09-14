import React, { useEffect } from 'react';
import './stylep.css';


const ingressos = [
  {
    tipo: 'Social 🤝',
    nome: 'Conexão Popular',
    preco: 'R$30,00',
    observacao: '*Ingresso social para ações inclusivas',
    classe: 'social',
  },
  {
    tipo: 'Estudante 🎓',
    nome: 'Mente Brilhante',
    preco: 'R$40,00',
    observacao: '*Desconto para estudantes com documento',
    classe: 'estudante',
  },
  {
    tipo: 'PCD ♿',
    nome: 'Acesso Livre',
    preco: 'R$50,00',
    observacao: '*Acesso adaptado para pessoas com deficiência',
    classe: 'pcd',
  },
  {
    tipo: 'Pista ⚡',
    nome: 'Pulse Zone',
    preco: 'R$90,00',
    observacao: '*Área geral com energia e movimento',
    classe: 'pista',
  },
  {
    tipo: 'Camarote 🪩',
    nome: 'Vista Lounge',
    preco: 'R$280,00',
    observacao: '*Visão privilegiada e espaço elevado',
    classe: 'camarote',
  },
  {
    tipo: 'Camarote PLUS 🍾',
    nome: 'Imperial Lounge',
    preco: 'R$300,00',
    observacao: '*Inclui lounge exclusivo e serviços extras',
    classe: 'camarote-plus',
  },
  {
    tipo: 'Premium 🌕',
    nome: 'Eclipse Gold',
    preco: 'R$340,00',
    observacao: '*Benefícios premium e localização especial',
    classe: 'premium',
  },
  {
    tipo: 'VIP 👑',
    nome: 'Aurora Prime',
    preco: 'R$450,00',
    observacao: '*Acesso prioritário e área VIP exclusiva',
    classe: 'vip',
  },
];

export default function CompraIngressos() {
  useEffect(() => {
    document.title = 'Ingressos | Eventix';
  }, []);

  return (
    <>
      {/* Área principal */}
      <div className="compra-page">
        {/* Lista de ingressos */}
        <div className="ingressos">
          <h2>Escolha seu ingresso:</h2>
          <ul>
            {ingressos.map((ingresso, index) => (
              <li key={index} className={`ingresso-card ${ingresso.classe}`}>
                <div className="badge">{ingresso.tipo}</div>
                <div className="info">
                  <span>{ingresso.nome}</span>
                  <p>{ingresso.preco}</p>
                  <button>Adicionar</button>
                  <small className="observacao">{ingresso.observacao}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Carrinho lateral */}
        <div className="carrinho-fixo">
          <h2>Carrinho</h2>
          <ul>
            <li>Ingresso VIP - R$450,00</li>
            <li>Ingresso Pista - R$90,00</li>
          </ul>
          <p>
            <strong>Total:</strong> R$540,00
          </p>

          <div className="botoes-carrinho">
            <button className="btn-finalizar">Finalizar Compra</button>
            <button className="btn-limpar">Limpar Carrinho</button>
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <footer>
        <p>&copy; 2025 Eventix. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}
