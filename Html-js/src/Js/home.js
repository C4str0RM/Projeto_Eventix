function scrollCarrossel(selector, amount) {
  const el = document.querySelector(selector);
  if (el) {
    el.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const destaquesRef = document.querySelector(
    ".carrossel-horizontal.destaques"
  );
  const novosRef = document.querySelector(".carrossel-horizontal.novos");
  const gridEventos = document.querySelector(".grid-eventos");
  const filtroBtns = document.querySelectorAll(".filtro-lateral button");

  let filtro = "todos";

  function aplicarFiltro() {
    const hoje = new Date();

    const eventosFiltrados = window.todosEventos
      .filter((evento) => {
        const dataEvento = new Date(evento.data);
        if (filtro === "todos") return true;
        if (filtro === "destaques") return evento.destaque;
        if (filtro === "novos") return dataEvento > new Date("2025-11-01");
        if (filtro === "antigos") return dataEvento <= new Date("2025-11-01");
        if (filtro === "embreve") return dataEvento > hoje;
        return true;
      })
      .sort((a, b) => {
        if (filtro === "novos") return new Date(b.data) - new Date(a.data);
        if (filtro === "antigos") return new Date(a.data) - new Date(b.data);
        return 0;
      });

    gridEventos.innerHTML = eventosFiltrados
      .map(
        (evento) => `
      <div class="card">
        <img src="${evento.imagem}" alt="${evento.titulo}" />
        <h3>${evento.titulo}</h3>
        <p>${evento.local} • ${new Date(evento.data).toLocaleDateString(
          "pt-BR",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        )}</p>
      </div>
    `
      )
      .join("");
  }

  filtroBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filtroBtns.forEach((b) => b.classList.remove("ativo"));
      btn.classList.add("ativo");
      const texto = btn.innerText.toLowerCase();
      if (texto.includes("todos")) filtro = "todos";
      else if (texto.includes("destaques")) filtro = "destaques";
      else if (texto.includes("novos")) filtro = "novos";
      else if (texto.includes("antigos")) filtro = "antigos";
      else if (texto.includes("em breve")) filtro = "embreve";
      aplicarFiltro();
    });
  });

  function renderizarDestaques() {
    destaquesRef.innerHTML = window.destaqueBanners
      .map((banner) => {
        return `
        <div class="banner">
          ${
            banner.link
              ? `<a href="${banner.link}"><img src="${banner.src}" alt="Destaque" /></a>`
              : `<img src="${banner.src}" alt="Destaque" />`
          }
        </div>`;
      })
      .join("");
  }

  function renderizarNovos() {
    novosRef.innerHTML = window.novosBanners
      .map(
        (src) => `
      <div class="banner novos">
        <img src="${src}" alt="Novo Evento" />
      </div>
    `
      )
      .join("");
  }

  function iniciarScroll(ref, direction, passo, intervalo) {
    let scrollAtual = 0;
    setInterval(() => {
      const maxScroll =
        direction === "horizontal"
          ? ref.scrollWidth - ref.clientWidth
          : ref.scrollHeight - ref.clientHeight;

      scrollAtual += passo;
      if (scrollAtual >= maxScroll) scrollAtual = 0;

      ref.scrollTo({
        [direction === "horizontal" ? "left" : "top"]: scrollAtual,
        behavior: "smooth",
      });
    }, intervalo);
  }

  renderizarDestaques();
  renderizarNovos();
  aplicarFiltro();
  iniciarScroll(destaquesRef, "horizontal", 835, 4000);
  iniciarScroll(novosRef, "horizontal", 400, 4000);
});

