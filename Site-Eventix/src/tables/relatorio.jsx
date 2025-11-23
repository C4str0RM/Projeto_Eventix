import React, { useMemo } from "react";
import "./relatorio.css";

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (Number.isNaN(d)) return dateStr;
  return d.toLocaleDateString();
}

export default function Relatorio({ usuarios = [], eventos = [] }) {
  const hoje = useMemo(() => {
    const d = new Date();
    // zero time to compare only dates
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const totalUsuarios = usuarios.length;
  const totalEventos = eventos.length;
  const totalVagas = eventos.reduce((sum, e) => sum + (Number(e.vagas) || 0), 0);

  const eventosComData = eventos
    .map((e) => ({ ...e, _dateObj: new Date(e.data) }))
    .filter((e) => !Number.isNaN(e._dateObj));

  const proximosEventos = eventosComData
    .filter((e) => e._dateObj >= hoje)
    .sort((a, b) => a._dateObj - b._dateObj)
    .slice(0, 5);

  const eventosPassados = eventosComData.filter((e) => e._dateObj < hoje).length;

  // agrupamento simples por local
  const eventosPorLocal = eventos.reduce((acc, ev) => {
    const loc = ev.local || "Sem local";
    acc[loc] = (acc[loc] || 0) + 1;
    return acc;
  }, {});

  const locaisOrdenados = Object.entries(eventosPorLocal).sort((a, b) => b[1] - a[1]);

  return (
    <main className="relatorio-page">
      <header className="relatorio-header">
        <h1>Relatório Geral</h1>
        <p>Visão rápida das informações agregadas de usuários e eventos.</p>
      </header>

      <section className="relatorio-cards">
        <div className="card">
          <div className="card-title">Usuários</div>
          <div className="card-value">{totalUsuarios}</div>
        </div>

        <div className="card">
          <div className="card-title">Eventos (totais)</div>
          <div className="card-value">{totalEventos}</div>
        </div>

        <div className="card">
          <div className="card-title">Vagas (soma)</div>
          <div className="card-value">{totalVagas}</div>
        </div>

        <div className="card">
          <div className="card-title">Eventos passados</div>
          <div className="card-value">{eventosPassados}</div>
        </div>
      </section>

      <section className="relatorio-sections">
        <div className="box">
          <h2>Próximos eventos</h2>
          {proximosEventos.length === 0 ? (
            <p className="muted">Nenhum evento futuro encontrado</p>
          ) : (
            <table className="summary-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Nome</th>
                  <th>Local</th>
                  <th>Vagas</th>
                </tr>
              </thead>
              <tbody>
                {proximosEventos.map((ev) => (
                  <tr key={ev.id}>
                    <td>{formatDate(ev.data)}</td>
                    <td>{ev.nome}</td>
                    <td>{ev.local || "-"}</td>
                    <td>{ev.vagas ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="box">
          <h2>Principais locais</h2>
          {locaisOrdenados.length === 0 ? (
            <p className="muted">Nenhum local registrado</p>
          ) : (
            <ul className="local-list">
              {locaisOrdenados.slice(0, 6).map(([local, qtd]) => (
                <li key={local}>
                  <span className="local-name">{local}</span>
                  <span className="local-count">{qtd}</span>
                </li>
              ))}
            </ul>
          )}

          <h3 style={{ marginTop: 18 }}>Usuários recentes</h3>
          <ul className="local-list">
            {usuarios.slice(-5).reverse().map((u) => (
              <li key={u.id}>
                <span className="local-name">{u.nome}</span>
                <span className="local-count">{u.email}</span>
              </li>
            ))}
            {usuarios.length === 0 && <p className="muted">Nenhum usuário</p>}
          </ul>
        </div>
      </section>
    </main>
  );
}