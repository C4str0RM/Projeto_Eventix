import React from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaginaEvento from "./auth/evento";
import Pagamento from "./auth/pagamento";
import Inscricao from "./auth/inscricao";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaEvento />} />
        <Route path="/evento" element={<PaginaEvento />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/inscricao" element={<Inscricao />} />
      </Routes>
    </Router>
  );
}

export default App;
