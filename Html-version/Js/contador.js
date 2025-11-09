document.addEventListener("DOMContentLoaded", () => {
  const dataEvento = new Date("2025-10-25T08:00:00");
  const tempoRef = document.getElementById("tempo-restante");

  function atualizarContagem() {
    const agora = new Date();
    const diferenca = dataEvento - agora;

    if (diferenca <= 0) {
      tempoRef.textContent = "O evento já passou!";
      tempoRef.classList.remove("pulse-text");
      clearInterval(intervalo);
      return;
    }

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
    const segundos = Math.floor((diferenca / 1000) % 60);

    tempoRef.textContent = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
  }

  atualizarContagem();
  const intervalo = setInterval(atualizarContagem, 1000);
});
