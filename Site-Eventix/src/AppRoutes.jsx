import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./auth/login";
import Cadastro from "./auth/cadastro";
import RecuperarSenha from "./auth/recuperarsenha";

import Evento from "./pages/EventoFestival/evento";
import Compra from "./pages/EventoFestival/compra";
import Pagamento from "./pages/EventoFestival/pagamento";

import TelaPix from "./pages/EventoFestival/telapix";
import Sucesso from "./pages/EventoFestival/sucesso";

import PaginaEvento from "./pages/EventoConference/eventoc";
import PagamentoC from "./pages/EventoConference/pagamentoc";
import Inscricao from "./pages/EventoConference/inscricao";

import FormasPagamento from "./pages/EventoConference/formapagamento";
import Finalizacao from "./pages/EventoConference/finalizacao";
import Vitalicio from "./pages/EventoConference/vitalicio";

import PainelConta from "./pages/Painel/painel";
import ResumoConta from "./pages/Painel/resumo";
import MeusIngressos from "./auth/carrinho";
import DetalhesConta from "./pages/Painel/detalhes";

import Home from "./pages/Home/home";
import Contato from "./pages/Contato/contato";
import Sobre from "./pages/Painel/sobre";

import RotaPrivada from "./private/RotaPrivada";
import TodosEventos from "./pages/Eventos/todoseventos";

import RotaAdmin from "./private/RotaAdmin";
import Dashboard from "./admin/Dashboard";

import EventosAdmin from "./admin/EventosAdmin";
import UsuariosAdmin from "./admin/UsuariosAdmin";
import RelatoriosAdmin from "./admin/RelatoriosAdmin";

function AppRoutes({
  usuario,
  setUsuario,
  carregandoUsuario,
}) {
  return (
    <Routes>
      <Route path="/" element={<Home usuario={usuario} />} />
      <Route path="/login" element={<Login setUsuario={setUsuario} />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/recuperarsenha" element={<RecuperarSenha />} />

      <Route
        path="/evento"
        element={
          <RotaPrivada usuario={usuario} carregandoUsuario={carregandoUsuario}>
            <Evento usuario={usuario} />
          </RotaPrivada>
        }
      />
      <Route path="/compra" element={<Compra />} />
      <Route path="/pagamento" element={<Pagamento />} />
      <Route path="/telapix" element={<TelaPix />} />
      <Route path="/sucesso" element={<Sucesso />} />

      <Route
        path="/eventoc"
        element={
          <RotaPrivada usuario={usuario} carregandoUsuario={carregandoUsuario}>
            <PaginaEvento usuario={usuario} />
          </RotaPrivada>
        }
      />
      <Route
        path="/eventos"
        element={
          <RotaPrivada usuario={usuario} carregandoUsuario={carregandoUsuario}>
            <TodosEventos usuario={usuario} />
          </RotaPrivada>
        }
      />

      <Route path="/pagamentoc" element={<PagamentoC />} />
      <Route path="/inscricao" element={<Inscricao />} />
      <Route path="/formapagamento" element={<FormasPagamento />} />
      <Route path="/finalizacao" element={<Finalizacao />} />
      <Route path="/vitalicio" element={<Vitalicio />} />

      <Route
        path="/painel"
        element={
          <RotaPrivada usuario={usuario} carregandoUsuario={carregandoUsuario}>
            <PainelConta usuario={usuario} setUsuario={setUsuario} />
          </RotaPrivada>
        }
      />
      <Route
        path="/resumo"
        element={
          <RotaPrivada usuario={usuario} carregandoUsuario={carregandoUsuario}>
            <ResumoConta usuario={usuario} />
          </RotaPrivada>
        }
      />
      <Route
        path="/carrinho"
        element={
          <RotaPrivada usuario={usuario} carregandoUsuario={carregandoUsuario}>
            <MeusIngressos usuario={usuario} />
          </RotaPrivada>
        }
      />
      <Route
        path="/detalhes"
        element={
          <RotaPrivada usuario={usuario} carregandoUsuario={carregandoUsuario}>
            <DetalhesConta usuario={usuario} />
          </RotaPrivada>
        }
      />

      <Route
        path="/admin"
        element={
          <RotaAdmin usuario={usuario} carregandoUsuario={carregandoUsuario}>
            <Dashboard usuario={usuario} />
          </RotaAdmin>
        }
      />
      <Route
        path="/admin/eventos"
        element={
          <RotaAdmin usuario={usuario} carregandoUsuario={carregandoUsuario}>
            <EventosAdmin />
          </RotaAdmin>
        }
      />
      <Route
        path="/admin/usuarios"
        element={
          <RotaAdmin usuario={usuario} carregandoUsuario={carregandoUsuario}>
            <UsuariosAdmin />
          </RotaAdmin>
        }
      />
      <Route
        path="/admin/relatorios"
        element={
          <RotaAdmin usuario={usuario} carregandoUsuario={carregandoUsuario}>
            <RelatoriosAdmin />
          </RotaAdmin>
        }
      />

      <Route path="/contato" element={<Contato usuario={usuario} />} />
      <Route path="/sobre" element={<Sobre />} />
    </Routes>
  );
}

export default AppRoutes;
