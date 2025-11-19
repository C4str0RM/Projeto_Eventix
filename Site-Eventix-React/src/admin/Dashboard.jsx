import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Styles/adminstyle.css";

const Dashboard = ({ usuario }) => {
  useEffect(() => {
    document.title = "Dashboard | Eventix";
  }, []);
  const nome =
    usuario?.usuario || usuario?.nome || usuario?.email || "Administrador";

  return (
    <div className="dashboard-global">
      <section className="dashboard-container">
        <h2>Painel Administrativo</h2>
        <p>Bem-vindo(a), {nome}!</p>

        <div className="dashboard-grid">
          <Link to="/admin/eventos" className="card">
            📋 Gerenciar Eventos
          </Link>
          <Link to="/admin/usuarios" className="card">
            👥 Usuários
          </Link>
          <Link to="/admin/relatorios" className="card">
            📊 Relatórios
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
