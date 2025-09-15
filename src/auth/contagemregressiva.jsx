import React, { useState, useEffect } from "react";

function ContagemRegressiva() {
  const [tempoRestante, setTempoRestante] = useState({});

  useEffect(() => {
    const dataEvento = new Date("2025-10-25T08:00:00");

    const intervalo = setInterval(() => {
      const agora = new Date();
      const diferenca = dataEvento - agora;

      if (diferenca <= 0) {
        clearInterval(intervalo);
        setTempoRestante({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
      } else {
        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
        const segundos = Math.floor((diferenca / 1000) % 60);

        setTempoRestante({ dias, horas, minutos, segundos });
      }
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="contador">
      <h3>⏳Faltam:</h3>
      <p>
        {tempoRestante.dias}d {tempoRestante.horas}h {tempoRestante.minutos}m {tempoRestante.segundos}s
      </p>
    </div>
  );
}

export default ContagemRegressiva;
