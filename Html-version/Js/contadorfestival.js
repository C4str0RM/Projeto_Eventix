document.addEventListener("DOMContentLoaded", () => {
  const dataEvento = new Date("2026-05-11T16:00:00");
  const tempoRef = document.getElementById("tempo-restante");

  if (!tempoRef) return; 

  function atualizarContagem() {
    const agora = new Date();

    if (dataEvento <= agora) {
      tempoRef.textContent = "🎉 O evento já começou!";
      tempoRef.classList.remove("pulse-text");
      clearInterval(intervalo);
      return;
    }

    const anoAtual = agora.getFullYear();
    const mesAtual = agora.getMonth();
    const diaAtual = agora.getDate();

    const anoEvento = dataEvento.getFullYear();
    const mesEvento = dataEvento.getMonth();
    const diaEvento = dataEvento.getDate();

    let meses = (anoEvento - anoAtual) * 12 + (mesEvento - mesAtual);
    let dias = diaEvento - diaAtual;

    if (dias < 0) {
      meses -= 1;
      const ultimoDiaDoMesAnterior = new Date(anoEvento, mesEvento, 0).getDate();
      dias += ultimoDiaDoMesAnterior;
    }

    const diferencaMs = dataEvento - agora;
    const horas = Math.floor((diferencaMs / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencaMs / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencaMs / 1000) % 60);

    tempoRef.textContent = `${meses}m ${dias}d ${horas}h ${minutos}m ${segundos}s`;
  }

  atualizarContagem();
  const intervalo = setInterval(atualizarContagem, 1000);
});
