import React from "react";
import { Link } from 'react-router-dom';
import "../Styles/footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h2>Eventix</h2>
          <p>Conectando você aos melhores eventos.</p>
        </div>

        <div className="footer-col">
          <h3>Institucional</h3>
          <ul>
            <li><Link to="/sobre">Sobre nós</Link></li>
            <li><Link to="/privacidade">Política de privacidade</Link></li>
            <li><Link to="/termos">Termos de uso</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Meu Perfil</h3>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/carrinho">Meus ingressos</Link></li>
            <li><Link to="/painel">Minha conta</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Fale Conosco</h3>
          <p>Tem alguma dúvida ou sugestão?</p>
          <Link to="/contato" className="btn-formulario">Ir para o formulário</Link>
        </div>

        <div className="footer-col">
          <h3>Redes Sociais</h3>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://tse1.mm.bing.net/th/id/OIP.4KA9AEoeSvSLrOz1ovyNtQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="Facebook"
            />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://tse3.mm.bing.net/th/id/OIP.zIajNTOFBjzFWyZ1Jh-H2AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="Instagram"
            />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Eventix. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
