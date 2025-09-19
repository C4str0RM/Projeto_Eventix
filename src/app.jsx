import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Evento from './auth/evento'
import Compra from './auth/compra'
import Pagamento from './auth/pagamento'
import TelaPix from './auth/telapix' 
import Sucesso from './auth/sucesso'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Evento />} />
        <Route path="/compra" element={<Compra />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/telaPix" element={<TelaPix />} />
        <Route path="/sucesso" element={<Sucesso />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
