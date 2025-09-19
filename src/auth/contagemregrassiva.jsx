import React, { useState, useEffect } from "react";

function ContagemRegressiva() {
  const [tempoRestante, setTempoRestante] = useState({
    meses: 0,
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    const dataEvento = new Date("2026-05-11T16:00:00");

    const intervalo = setInterval(() => {
      const agora = new Date();

      if (dataEvento <= agora) {
        clearInterval(intervalo);
        setTempoRestante({
          meses: 0,
          dias: 0,
          horas: 0,
          minutos: 0,
          segundos: 0,
        });
      } else {
        // Cálculo de meses reais
        const anoAtual = agora.getFullYear();
        const mesAtual = agora.getMonth();
        const diaAtual = agora.getDate();

        const anoEvento = dataEvento.getFullYear();
        const mesEvento = dataEvento.getMonth();
        const diaEvento = dataEvento.getDate();

        let meses =
          (anoEvento - anoAtual) * 12 + (mesEvento - mesAtual);
        let dias = diaEvento - diaAtual;

        if (dias < 0) {
          meses -= 1;
          const ultimoDiaDoMesAnterior = new Date(
            anoEvento,
            mesEvento,
            0
          ).getDate();
          dias += ultimoDiaDoMesAnterior;
        }

        // Cálculo de horas, minutos e segundos
        const diferencaMs = dataEvento - agora;
        const horas = Math.floor((diferencaMs / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diferencaMs / (1000 * 60)) % 60);
        const segundos = Math.floor((diferencaMs / 1000) % 60);

        setTempoRestante({ meses, dias, horas, minutos, segundos });
      }
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="contador">
      <h3>⏳ Faltam:</h3>
      <p>
        {tempoRestante.meses}m {tempoRestante.dias}d{" "}
        {tempoRestante.horas}h {tempoRestante.minutos}m{" "}
        {tempoRestante.segundos}s
      </p>
    </div>
  );
}

export default ContagemRegressiva;
