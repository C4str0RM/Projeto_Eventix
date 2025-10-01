import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Login from "./auth/login";
import Cadastro from "./auth/cadastro";
import RecuperarSenha from "./auth/recuperarsenha";

import Evento from "./auth/evento";
import Compra from "./auth/compra";
import Pagamento from "./auth/pagamento";

import TelaPix from "./auth/telapix";
import Sucesso from "./auth/sucesso";

import PaginaEvento from "./auth/eventoc";
import PagamentoC from "./auth/pagamentoc";
import Inscricao from "./auth/inscricao";

import FormasPagamento from "./auth/formapagamento";
import Finalizacao from "./auth/finalizacao";
import Vitalicio from "./auth/vitalicio";

import PainelConta from "./auth/painel";
import ResumoConta from "./auth/resumo";
import MeusIngressos from "./auth/carrinho";
import DetalhesConta from "./auth/detalhes";

import Menu from "./auth/menu";
import Footer from "./auth/footer";
import Home from "./auth/home";
import Contato from "./auth/contato";
import Sobre from "./auth/sobre"; 

function App() {
  const [usuario, setUsuario] = useState(null);
  const location = useLocation();

  const hideLayout = [
    "/login",
    "/cadastro",
    "/recuperarsenha",
    "/telapix",
    "/sucesso",
  ].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Menu usuario={usuario} />}

      <Routes>
        <Route path="/" element={<Home usuario={usuario} />} />
        <Route path="/login" element={<Login setUsuario={setUsuario} />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperarsenha" element={<RecuperarSenha />} />
        <Route path="/evento" element={<Evento />} />
        <Route path="/compra" element={<Compra />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/telapix" element={<TelaPix />} />
        <Route path="/sucesso" element={<Sucesso />} />
        <Route path="/eventoc" element={<PaginaEvento />} />
        <Route path="/pagamentoc" element={<PagamentoC />} />
        <Route path="/inscricao" element={<Inscricao />} />
        <Route path="/formapagamento" element={<FormasPagamento />} />
        <Route path="/finalizacao" element={<Finalizacao />} />
        <Route path="/vitalicio" element={<Vitalicio />} />
        <Route path="/painel" element={<PainelConta usuario={usuario} />} />
        <Route path="/resumo" element={<ResumoConta usuario={usuario} />} />
        <Route path="/carrinho" element={<MeusIngressos usuario={usuario} />} />
        <Route path="/detalhes" element={<DetalhesConta usuario={usuario} />} />
        <Route path="/contato" element={<Contato usuario={usuario} />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
