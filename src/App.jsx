import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PaginaEvento from "./auth/evento";
import Pagamento from "./auth/pagamento";
import Inscricao from "./auth/inscricao";

import FormasPagamento from "./auth/formapagamento";
import Finalizacao from "./auth/finalizacao";
import Vitalicio from "./auth/vitalicio";

function App() {
  useEffect(() => {
    document.body.style.backgroundColor = "#1B1F3B";
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaEvento />} />
        <Route path="/evento" element={<PaginaEvento />} />
        <Route path="/inscricao" element={<Inscricao />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/formapagamento" element={<FormasPagamento />} />
        <Route path="/finalizacao" element={<Finalizacao />} />
        <Route path="/vitalicio" element={<Vitalicio />} />


      </Routes>
    </Router>
  );
}

export default App;
