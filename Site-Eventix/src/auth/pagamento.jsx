import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TelaPix from './telapix';
import '../styles/stylepagm.css';

function Pagamento() {
  const navigate = useNavigate();
  const [metodoSelecionado, setMetodoSelecionado] = useState('');
  const [pagamentoConfirmado, setPagamentoConfirmado] = useState(false);
  const [mostrarPix, setMostrarPix] = useState(false);

  useEffect(() => {
    document.title = 'Finalizar Pagamento | Eventix';
  }, []);

  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => {
      const valor = parseFloat(item.preco.replace('R$', '').replace(',', '.'));
      return total + valor;
    }, 0);
  };

  const confirmarPagamento = () => {
    if (!metodoSelecionado) {
      alert('Selecione uma forma de pagamento!');
      return;
    }

    if (metodoSelecionado === 'Pix') {
      setMostrarPix(true);
    } else {
      setPagamentoConfirmado(true);
      setTimeout(() => {
        navigate('/sucesso');
      }, 2000);
    }
  };

  if (mostrarPix) {
    return (
      <TelaPix
        valor={`R$ ${calcularTotal().toFixed(2)}`}
        onVoltar={() => setMostrarPix(false)}
      />
    );
  }

  const formas = [
    { nome: 'Pix', icone: '⚡', descricao: 'Transferência instantânea' },
    { nome: 'Carteira Digital', icone: '📲', descricao: 'Pague com PicPay, Mercado Pago ou PayPal' },
    { nome: 'Cartão de Crédito', icone: '💳', descricao: 'Até 3x sem juros' },
    { nome: 'Boleto', icone: '🧾', descricao: 'Prazo de até 3 dias úteis' },
    { nome: 'Cartão de Débito', icone: '🏦', descricao: 'Débito automático' }
  ];

  return (
    <div className="pagamento-page-wrapper">
      <div className="banner-fest">
        <img
          src="https://i.pinimg.com/1200x/07/29/08/0729082c4175cd7f4e367aa46a004006.jpg"
          alt="Banner Festival Aurora-Boreal"
        />
      </div>

      <header className="fest-header">
        <h1>Festival Aurora-Boreal</h1>
        <p>Uma celebração vibrante da cultura brasileira com música, dança e experiências únicas</p>
      </header>

      <div className="container-pagamento">
        <div className="titulo-pagamento">
          <h1>💳 Finalizar Pagamento</h1>
        </div>

        <div className="box-valor">
          <h2>Total da Compra</h2>
          <p className="valor-final">R$ {calcularTotal().toFixed(2)}</p>
        </div>

        <div className="formas-section">
          <h3>Formas de Pagamento</h3>
          <p className="subtexto">Escolha a forma que mais combina com você:</p>
          <div className="opcoes-pagamento">
            {formas.map((metodo, index) => (
              <div
                key={index}
                className={`metodo-box 
                  ${metodo.nome === 'Boleto' ? 'centralizado' : ''} 
                  ${metodo.nome === 'Carteira Digital' ? 'carteira-box' : ''} 
                  ${metodoSelecionado === metodo.nome ? 'selecionado' : ''}`}
                onClick={() => setMetodoSelecionado(metodo.nome)}
              >
                <strong>
                  <span className="icone">{metodo.icone}</span> {metodo.nome}
                </strong>
                <p className="descricao">{metodo.descricao}</p>
              </div>
            ))}

            <div className="metodo-box confirm-box" onClick={confirmarPagamento}>
              <strong><span className="icone">✅</span> Confirmar Pagamento</strong>
              <p className="descricao">Finalize sua compra com a opção selecionada</p>
            </div>
          </div>
        </div>

        {pagamentoConfirmado && (
          <p className="mensagem-sucesso">✅ Redirecionando...</p>
        )}
      </div>

    </div>
  );
}

export default Pagamento;
