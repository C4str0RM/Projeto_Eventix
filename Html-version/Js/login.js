document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");
  const usuarioInput = form.querySelector("input[type='text']");
  const senhaInput = form.querySelector("input[type='password']");
  const lembrarCheckbox = form.querySelector("input[type='checkbox']");

  const usuarioSalvo = localStorage.getItem("usuario");
  if (usuarioSalvo) {
    usuarioInput.value = usuarioSalvo;
    lembrarCheckbox.checked = true;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = usuarioInput.value.trim();
    const senha = senhaInput.value.trim();

    if (!usuario || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    if (lembrarCheckbox.checked) {
      localStorage.setItem("usuario", usuario);
    } else {
      localStorage.removeItem("usuario");
    }

    alert(`Bem-vindo, ${usuario}!`);
    window.location.href = "home.html"; 
  });

  document.querySelector(".google-btn").addEventListener("click", () => {
    alert("Login com Google ainda não implementado.");
  });

  document.querySelector(".facebook-btn").addEventListener("click", () => {
    alert("Login com Facebook ainda não implementado.");
  });
});
