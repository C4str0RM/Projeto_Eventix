import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../config/supabaseClient";
import "../Styles/menu.css";

const BarraDePesquisa = () => {
  const [termoBusca, setTermoBusca] = useState("");
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      buscarEventos(termoBusca);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [termoBusca]);

  const buscarEventos = async (texto) => {
    if (!texto.trim()) {
      setResultados([]);
      return;
    }

    const { data, error } = await supabase
      .from("eventos")
      .select("id, titulo")
      .ilike("titulo", `%${texto}%`)
      .order("titulo", { ascending: true })
      .limit(10);

    if (error) {
      console.error("Erro ao buscar eventos:", error.message);
      setResultados([]);
    } else {
      setResultados(data);
    }
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Pesquise por artista, evento ou local..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
        />

        {resultados.length > 0 && (
          <div className="search-result-box">
            {resultados.map((evento) => (
              <Link
                key={evento.id}
                to={`/eventoc?id=${evento.id}`}
                className="search-result-item"
                onClick={() => setResultados([])}
              >
                {evento.titulo}
              </Link>
            ))}
          </div>
        )}
      </div>

      <button className="search-btn">🔍</button>
    </div>
  );
};

export default BarraDePesquisa;
