import React, { useState, useEffect } from 'react';
import '../Styles/styledetalhe.css';
import Menu from "./menu";
import Footer from "./footer";

const DetalhesConta = ({ usuario }) => {
  const [nome, setNome] = useState(usuario?.nome || '');
  const [email, setEmail] = useState(usuario?.email || '');
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
      //Futuramente usar Supabase para atualizar a senha
    }
  };

  const excluirConta = () => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir sua conta? Essa ação é irreversível.');
    if (confirmacao) {
      alert('Conta excluída com sucesso.');
      // Aqui futuramente você pode usar Supabase para deletar o usuário
    }
  };

  return (
    <div className="perfil-body">

      <section className="perfil-container">
        <h1>👤 Detalhes da Conta</h1>
        <p>Gerencie suas informações pessoais e preferências.</p>

        <div className="perfil-bloco">
          <h3>📛 Nome completo</h3>
          <input
            type="text"
            placeholder="Digite seu nome completo"
            value={nome}
            onChange={(e) => validarNome(e.target.value)}
          />
          {erroNome && <span className="perfil-erro">{erroNome}</span>}
        </div>

        <div className="perfil-bloco">
          <h3>📧 E-mail</h3>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => validarEmail(e.target.value)}
          />
          {erroEmail && <span className="perfil-erro">{erroEmail}</span>}
        </div>

        <div className="perfil-bloco">
          <h3>🔒 Alterar senha</h3>

          <div className="perfil-senha">
            <input
              type={mostrarSenha ? 'text' : 'password'}
              placeholder="Nova senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <span className="perfil-icone" onClick={() => setMostrarSenha(!mostrarSenha)}>
              {mostrarSenha ? '👁️' : '🔒'}
            </span>
          </div>

          <div className="perfil-senha">
            <input
              type={mostrarConfirmacao ? 'text' : 'password'}
              placeholder="Confirmar nova senha"
              value={confirmacao}
              onChange={(e) => setConfirmacao(e.target.value)}
            />
            <span className="perfil-icone" onClick={() => setMostrarConfirmacao(!mostrarConfirmacao)}>
              {mostrarConfirmacao ? '👁️' : '🔒'}
            </span>
          </div>

          <button className="perfil-botao" onClick={salvarSenha}>Salvar senha</button>
          {mensagem && <span className="perfil-sucesso">{mensagem}</span>}
        </div>

        <div className="perfil-bloco">
          <h3>🗑️ Encerrar conta</h3>
          <button className="perfil-botao cancelar" onClick={excluirConta}>Excluir minha conta</button>
        </div>

        <a href="/painel" className="perfil-voltar">⬅ Voltar ao painel</a>
      </section>

    </div>
  );
};

export default DetalhesConta;
