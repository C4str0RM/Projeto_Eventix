import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Menu from "./auth/menu";
import Footer from "./auth/footer";
import Home from "./auth/home";

function App() {
  const [usuario, setUsuario] = useState({
    nome: "Maria",
    logado: true 
  });

  return (
    <Router>
      <Menu usuario={usuario} />
      <main className="home-container">
        <Routes>
          <Route path="/" element={<Home usuario={usuario} />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
