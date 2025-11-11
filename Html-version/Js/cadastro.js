document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".register-form");
  const inputs = form.querySelectorAll("input");
  const nome = inputs[0];
  const email = inputs[1];
  const usuario = inputs[2];
  const senha = inputs[3];
  const confirmarSenha = inputs[4];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (
      !nome.value ||
      !email.value ||
      !usuario.value ||
      !senha.value ||
      !confirmarSenha.value
    ) {
      alert("Preencha todos os campos!");
      return;
    }

    if (!email.value.includes("@")) {
      alert("E-mail inválido!");
      return;
    }

    if (senha.value !== confirmarSenha.value) {
      alert("As senhas não coincidem!");
      return;
    }

    alert(`Cadastro realizado com sucesso, ${nome.value}!`);
    window.location.href = "login.html";
  });

  document.querySelector(".google-btn").addEventListener("click", () => {
    alert("Cadastro com Google ainda não implementado.");
  });

  document.querySelector(".facebook-btn").addEventListener("click", () => {
    alert("Cadastro com Facebook ainda não implementado.");
  });
});
