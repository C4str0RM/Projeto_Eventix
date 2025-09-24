import React, { useState, useEffect } from 'react';
import '../Styles/styledetalhe.css';
import '../Styles/stylepadrao.css';

const DetalhesConta = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  const [erroNome, setErroNome] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    document.title = 'Detalhes da Conta | Eventix';
  }, []);

  const validarNome = (valor) => {
    setNome(valor);
    setErroNome(valor.length < 3 ? 'Nome muito curto' : '');
  };

  const validarEmail = (valor) => {
    setEmail(valor);
    const regex = /\S+@\S+\.\S+/;
    setErroEmail(!regex.test(valor) ? 'E-mail inválido' : '');
  };

  const salvarSenha = () => {
    if (senha !== confirmacao) {
      alert('As senhas não coincidem!');
    } else {
      setMensagem('Senha atualizada com sucesso!');
      setTimeout(() => setMensagem(''), 3000);
    }
  };

  const excluirConta = () => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir sua conta? Essa ação é irreversível.');
    if (confirmacao) {
      alert('Conta excluída com sucesso.');
    }
  };

  return (
    <section className="container-pagina">
      <h1>👤 Detalhes da Conta</h1>
      <p>Gerencie suas informações pessoais e preferências.</p>

      <div className="bloco-conta">
        <h3>📛 Nome completo</h3>
        <input
          type="text"
          placeholder="Digite seu nome completo"
          value={nome}
          onChange={(e) => validarNome(e.target.value)}
        />
        {erroNome && <span className="error">{erroNome}</span>}
      </div>

      <div className="bloco-conta">
        <h3>📧 E-mail</h3>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => validarEmail(e.target.value)}
        />
        {erroEmail && <span className="error">{erroEmail}</span>}
      </div>

      <div className="bloco-conta">
        <h3>🔒 Alterar senha</h3>

        <div className="campo-senha">
          <input
            type={mostrarSenha ? 'text' : 'password'}
            placeholder="Nova senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <span className="icone-senha" onClick={() => setMostrarSenha(!mostrarSenha)}>
            {mostrarSenha ? '👁️' : '🔒'}
          </span>
        </div>

        <div className="campo-senha">
          <input
            type={mostrarConfirmacao ? 'text' : 'password'}
            placeholder="Confirmar nova senha"
            value={confirmacao}
            onChange={(e) => setConfirmacao(e.target.value)}
          />
          <span className="icone-senha" onClick={() => setMostrarConfirmacao(!mostrarConfirmacao)}>
            {mostrarConfirmacao ? '👁️' : '🔒'}
          </span>
        </div>

        <button className="botao-acao" onClick={salvarSenha}>Salvar senha</button>
        {mensagem && <span className="sucessos">{mensagem}</span>}
      </div>

      <div className="bloco-conta">
        <h3>🗑️ Encerrar conta</h3>
        <button className="botao-acao cancelar" onClick={excluirConta}>Excluir minha conta</button>
      </div>

      <a href="/" className="botao-voltar">⬅ Voltar ao painel</a>
    </section>
  );
};

export default DetalhesConta;
