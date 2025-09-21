import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PainelConta from './auth/painel';
import ResumoConta from './auth/resumo';
import MeusIngressos from './auth/carrinho';
import DetalhesConta from './auth/detalhes'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PainelConta />} />
        <Route path="/resumo" element={<ResumoConta />} />
          <Route path="/carrinho" element={<MeusIngressos />} />
          <Route path="/detalhes" element={<DetalhesConta />} />
      </Routes>
    </Router>
  );
}

export default App;
