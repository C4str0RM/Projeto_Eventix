import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/login";
import Cadastro from "./auth/cadastro";
import RecuperarSenha from "./auth/recuperarsenha";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperarsenha" element={<RecuperarSenha />} />
      </Routes>
    </Router>
  );
}

export default App;
