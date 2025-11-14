document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-contato");
  const mensagem = document.getElementById("mensagem-sucesso");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    form.reset();

    mensagem.style.display = "block";

    setTimeout(() => {
      mensagem.style.display = "none";
    }, 4000);
  });
});
