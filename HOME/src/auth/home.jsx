import React, { useRef, useEffect, useState } from "react";
import "../Styles/stylehome.css";
import { todosEventos } from "../Types";
import { novosBanners } from "../Types/index2";
import { destaqueBanners } from "../Types/index3";

const Home = ({ usuario }) => {
  const [filtro, setFiltro] = useState("todos");

  const eventosFiltrados = todosEventos
    .filter((evento) => {
      const hoje = new Date();
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

  const horizontalRef = useRef(null);
  const novosRef = useRef(null);

  const scroll = (ref, direction, amount) => {
    ref.current?.scrollBy({
      [direction === "horizontal" ? "left" : "top"]: amount,
      behavior: "smooth",
    });
  };

  const reiniciarScroll = (ref, direction, passo) => {
    const el = ref.current;
    if (!el) return;

    const scrollAtual = direction === "horizontal" ? el.scrollLeft : el.scrollTop;
    const scrollMax = direction === "horizontal"
      ? el.scrollWidth - el.clientWidth
      : el.scrollHeight - el.clientHeight;

    if (scrollAtual >= scrollMax - passo) {
      el.scrollTo({ [direction === "horizontal" ? "left" : "top"]: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ [direction === "horizontal" ? "left" : "top"]: passo, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const intervalH = setInterval(() => reiniciarScroll(horizontalRef, "horizontal", 735), 4000);
    const intervalNovos = setInterval(() => reiniciarScroll(novosRef, "horizontal", 400), 4000);
    return () => {
      clearInterval(intervalH);
      clearInterval(intervalNovos);
    };
  }, []);

  useEffect(() => {
    document.title = "Home | Eventix";
  }, []);

  return (
    <main className="home-container">
      {/* Saudação se estiver logado */}
      {usuario?.logado && (
        <div className="saudacao-usuario">
        </div>
      )}

      {/* Destaques */}
      <section className="destaques">
        <h2 className="faixa-titulo">Eventos em Destaque</h2>
        <div className="carrossel-wrapper">
          <button onClick={() => scroll(horizontalRef, "horizontal", -735)}>←</button>
          <div className="carrossel-horizontal" ref={horizontalRef}>
            {destaqueBanners.map((banner, i) => (
              <div className="banner" key={i}>
                {banner.link ? (
                  <a href={banner.link}>
                    <img src={banner.src} alt={`Destaque ${i + 1}`} />
                  </a>
                ) : (
                  <img src={banner.src} alt={`Destaque ${i + 1}`} />
                )}
              </div>
            ))}
          </div>
          <button onClick={() => scroll(horizontalRef, "horizontal", 735)}>→</button>
        </div>
      </section>

      {/* Novos Eventos */}
      <section className="novos-eventos">
        <h2 className="faixa-titulo">Eventos Novos ou Futuros</h2>
        <div className="carrossel-wrapper">
          <button onClick={() => scroll(novosRef, "horizontal", -560)}>←</button>
          <div className="carrossel-horizontal" ref={novosRef}>
            {novosBanners.map((src, i) => (
              <div className="banner novos" key={i}>
                <img src={src} alt={`Novo ${i + 1}`} />
              </div>
            ))}
          </div>
          <button onClick={() => scroll(novosRef, "horizontal", 400)}>→</button>
        </div>
      </section>

      {/* Todos os Eventos */}
      <section className="todos-eventos">
        <h2 className="faixa-titulo">Todos os Eventos</h2>
        <div className="layout-eventos">
          <aside className="filtro-lateral">
            <h3>Filtrar por:</h3>
            <ul>
              <li>
                <button className={filtro === "todos" ? "ativo" : ""} onClick={() => setFiltro("todos")}>
                  <span>📋</span> Todos
                </button>
              </li>
              <li>
                <button className={filtro === "destaques" ? "ativo" : ""} onClick={() => setFiltro("destaques")}>
                  <span>⭐</span> Destaques
                </button>
              </li>
              <li>
                <button className={filtro === "novos" ? "ativo" : ""} onClick={() => setFiltro("novos")}>
                  <span>🆕</span> Mais Novos
                </button>
              </li>
              <li>
                <button className={filtro === "antigos" ? "ativo" : ""} onClick={() => setFiltro("antigos")}>
                  <span>📅</span> Mais Antigos
                </button>
              </li>
              <li>
                <button className={filtro === "embreve" ? "ativo" : ""} onClick={() => setFiltro("embreve")}>
                  <span>⏳</span> Em Breve
                </button>
              </li>
            </ul>
          </aside>

          <div className="grid-eventos">
            {eventosFiltrados.map((evento) => (
              <div className="card" key={evento.id}>
                <img src={evento.imagem} alt={evento.titulo} />
                <h3>{evento.titulo}</h3>
                <p>
                  {evento.local} •{" "}
                  {new Date(evento.data).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
