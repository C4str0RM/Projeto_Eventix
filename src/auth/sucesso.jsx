import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/sucesso.css'

function Sucesso() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('sucesso')
    return () => document.body.classList.remove('sucesso')
  }, [])

  return (
    <>
      <div className="sucesso-container">
        <h1>✅ Pagamento Confirmado!</h1>
        <p>Obrigado por comprar com a Eventix. Nos vemos no festival!</p>
        <button className="btn-voltar-home" onClick={() => navigate('/')}>
          Voltar para o início
        </button>
      </div>

      <footer>
        <p>&copy; 2025 Eventix. Todos os direitos reservados.</p>
      </footer>
    </>
  )
}

export default Sucesso
