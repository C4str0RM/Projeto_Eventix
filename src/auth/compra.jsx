import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/stylep.css'

function Compra() {
  useEffect(() => {
    document.title = 'Ingressos | Eventix'
  }, [])

  const navigate = useNavigate()
  const [carrinho, setCarrinho] = useState([])

  const ingressosDisponiveis = [
    { tipo: 'Social 🤝', nome: 'Conexão Popular', preco: 'R$30,00', classe: 'social', obs: '*Ingresso social para ações inclusivas' },
    { tipo: 'Estudante 🎓', nome: 'Mente Brilhante', preco: 'R$40,00', classe: 'estudante', obs: '*Desconto para estudantes com documento' },
    { tipo: 'PCD ♿', nome: 'Acesso Livre', preco: 'R$0,00', classe: 'pcd', obs: '*Acesso adaptado para pessoas com deficiência' },
    { tipo: 'Pista ⚡', nome: 'Pulse Zone', preco: 'R$90,00', classe: 'pista', obs: '*Área geral com energia e movimento' },
    { tipo: 'Camarote 🪩', nome: 'Vista Lounge', preco: 'R$280,00', classe: 'camarote', obs: '*Visão privilegiada e espaço elevado' },
    { tipo: 'Camarote PLUS 🍾', nome: 'Imperial Lounge', preco: 'R$300,00', classe: 'camarote-plus', obs: '*Inclui lounge exclusivo e serviços extras' },
    { tipo: 'Premium 🌕', nome: 'Eclipse Gold', preco: 'R$340,00', classe: 'premium', obs: '*Benefícios premium e localização especial' },
    { tipo: 'VIP 👑', nome: 'Aurora Prime', preco: 'R$450,00', classe: 'vip', obs: '*Acesso prioritário e área VIP exclusiva' }
  ]

  const adicionarAoCarrinho = (ingresso) => {
    setCarrinho((prev) => [...prev, ingresso])
  }

  const limparCarrinho = () => {
    setCarrinho([])
  }

  const irParaPagamento = () => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho))
    navigate('/pagamento')
  }

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => {
      const valor = parseFloat(item.preco.replace('R$', '').replace(',', '.'))
      return total + valor
    }, 0)
  }

  return (
    <div>
      <div className="banner-festival">
        <img
          src="https://i.pinimg.com/1200x/07/29/08/0729082c4175cd7f4e367aa46a004006.jpg"
          alt="Banner Festival Aurora-Boreal"
        />
      </div>

      <header className="festa-header">
        <h1>Festival Aurora-Boreal</h1>
        <p>Uma celebração vibrante da cultura brasileira com música, dança e experiências únicas</p>
      </header>

      <div className="compra-page">
        <div className="ingressos">
          <h2>Escolha seu ingresso:</h2>
          <ul>
            {ingressosDisponiveis.map((ingresso, index) => (
              <li key={index} className={`ingresso-card ${ingresso.classe}`}>
                <div className="badge">{ingresso.tipo}</div>
                <div className="info">
                  <span>{ingresso.nome}</span>
                  <p>{ingresso.preco}</p>
                  <button onClick={() => adicionarAoCarrinho(ingresso)}>Adicionar</button>
                  <small className="observacao">{ingresso.obs}</small>
                </div>
              </li>
            ))}
          </ul>

          <div className="carrinho-fixo">
            <h2>Carrinho</h2>
            <ul>
              {carrinho.map((item, index) => (
                <li key={index}>{item.nome} - {item.preco}</li>
              ))}
            </ul>
            <p><strong>Total:</strong> R${calcularTotal().toFixed(2)}</p>
            <div className="botoes-carrinho">
              <button className="btn-finalizar" onClick={irParaPagamento}>
                Finalizar Compra
              </button>
              <button className="btn-limpar" onClick={limparCarrinho}>
                Limpar Carrinho
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="destaques-eventos">
        <h2>✨ Por que participar do Festival Aurora-Boreal?</h2>
        <div className="cards-destaques">
          {[
            { titulo: '🎶 Música sem limites', texto: 'Line-up com artistas que misturam ritmos brasileiros, eletrônicos e experimentais. Prepare-se pra dançar até o amanhecer!' },
            { titulo: '🌌 Atmosfera imersiva', texto: 'Projeções, luzes, arte interativa e espaços temáticos que transformam o ambiente em uma experiência sensorial.' },
            { titulo: '🧘‍♀️ Espaços de bem-estar', texto: 'Área zen com redes, massagens gratuitas e oficinas de respiração para recarregar as energias durante o evento.' },
            { titulo: '🍴 Gastronomia regional', texto: 'Food trucks e barracas com sabores típicos da Amazônia e do cerrado — do açaí raiz ao tacacá gourmet.' },
            { titulo: '🌈 Inclusão & Diversidade', texto: 'Ambiente acolhedor com acessibilidade, respeito às identidades e celebração da pluralidade cultural.' },
            { titulo: '🎭 Performances Surpreendentes', texto: 'Artistas visuais, dançarinos e intervenções espontâneas que transformam o público em parte do espetáculo.' }
          ].map((card, index) => (
            <div key={index} className="card-destaque">
              <h3>{card.titulo}</h3>
              <p>{card.texto}</p>
            </div>
          ))}
        </div>
      </div>

      <footer>
        <p>&copy; 2025 Eventix. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default Compra
