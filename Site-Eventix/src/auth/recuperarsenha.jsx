import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/recsenha.css";


function RecuperarSenha() {
    const [email, setEmail] = useState("");
    const [enviado, setEnviado] = useState(false);
    const [contador, setContador] = useState(30);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Recuperar Senha | Eventix";
    }, []);

    useEffect(() => {
        let timer;
        if (enviado && contador > 0) {
            timer = setTimeout(() => setContador(contador - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [enviado, contador]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setEnviado(true);
        setContador(30);
    };

    const handleReenviar = () => {
        setContador(30);
        alert("Novo link de recuperação enviado! 📩");
    };

    return (
        <div className="recuper-bg">
        <div className="container">
           <form className="recuperar-form" onSubmit={handleSubmit}>
                <h2>Recuperação de Senha</h2>

                {!enviado ? (
                    <>
                        <p className="descricao">
                            Digite seu e-mail cadastrado para receber instruções de recuperação.
                        </p>
                        <div className="input-group">
                            <span className="icon">📧</span>
                            <input
                                type="email"
                                placeholder="Seu e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Enviar</button>
                    </>
                ) : (
                    <>
                        <p className="confirmacao">
                            Se o e-mail estiver cadastrado, você receberá um link de recuperação em instantes.
                        </p>
                        {contador > 0 ? (
                            <p className="contador">
                                <span className="ampulheta">⏳</span> Reenviar em {contador}s
                            </p>

                        ) : (
                            <button type="button" onClick={handleReenviar}>
                                Reenviar link
                            </button>
                        )}
                    </>
                )}
            </form>
            <div className="voltar-login">
                <button type="button" onClick={() => navigate("/login")}>
                    ← Voltar para o login
                </button>
            </div>

        </div>
        </div>
    );
}

export default RecuperarSenha;