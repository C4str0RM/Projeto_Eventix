import React, { useEffect, useState } from "react";
import { supabase } from "../../config/supabaseClient";
import Menu from "../../components/menu";
import Footer from "../../components/footer";
import EventoCard from "../../components/EventoCard";
import "../../Styles/eventos.css";

import CarregandoSpinner from "../../components/CarregandoSpinner";

function TodosEventos({ usuario }) {
  const [eventos, setEventos] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const [carregandoEventos, setCarregandoEventos] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    document.title = "Todos os Eventos | Eventix";

    const buscarEventos = async () => {
      const { data, error } = await supabase.from("eventos").select("*");
      if (error) {
        console.error("Erro ao buscar eventos:", error.message);
        setErro("Erro ao carregar eventos.");
      } else {
        setEventos(data || []);
      }
      setCarregandoEventos(false);
    };

    buscarEventos();
  }, []);

  const eventosFiltrados = eventos
    .filter((evento) => {
      const hoje = new Date();
      const dataEvento = evento.data ? new Date(evento.data) : null;

      if (!dataEvento) return false;

      if (filtro === "todos") return true;
      if (filtro === "destaques") return evento.destaque === true;
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

  return (
    <div className="pagina-eventos-todos">
      <h1 className="titulo-eventos-todos">Todos os Eventos</h1>

      <aside className="filtro-horizontal">
        <h3>Filtrar por:</h3>
        <ul>
          <li>
            <button
              className={filtro === "todos" ? "ativo" : ""}
              onClick={() => setFiltro("todos")}
            >
              <span>📋</span> Todos
            </button>
          </li>
          <li>
            <button
              className={filtro === "destaques" ? "ativo" : ""}
              onClick={() => setFiltro("destaques")}
            >
              <span>⭐</span> Destaques
            </button>
          </li>
          <li>
            <button
              className={filtro === "novos" ? "ativo" : ""}
              onClick={() => setFiltro("novos")}
            >
              <span>🆕</span> Mais Novos
            </button>
          </li>
          <li>
            <button
              className={filtro === "antigos" ? "ativo" : ""}
              onClick={() => setFiltro("antigos")}
            >
              <span>📅</span> Mais Antigos
            </button>
          </li>
          <li>
            <button
              className={filtro === "embreve" ? "ativo" : ""}
              onClick={() => setFiltro("embreve")}
            >
              <span>⏳</span> Em Breve
            </button>
          </li>
        </ul>
      </aside>

      {erro && <p className="erro-eventos">{erro}</p>}
      {carregandoEventos ? (
        <CarregandoSpinner texto="Carregando eventos..." />
      ) : (
        <section className="grade-eventos-todos">
          {eventosFiltrados.length > 0 ? (
            eventosFiltrados.map((evento) => (
              <EventoCard key={evento.id} evento={evento} usuario={usuario} />
            ))
          ) : (
            <p className="sem-eventos-todos">
              Nenhum evento disponível no momento.
            </p>
          )}
        </section>
      )}
    </div>
  );
}

export default TodosEventos;
