import React from "react";
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
            <li><a href="#">Sobre nós</a></li>
            <li><a href="#">Política de privacidade</a></li>
            <li><a href="#">Termos de uso</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Meu Perfil</h3>
          <ul>
            <li><a href="#">Login</a></li>
            <li><a href="#">Meus ingressos</a></li>
            <li><a href="#">Minha conta</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Fale Conosco</h3>
          <p>Tem alguma dúvida ou sugestão?</p>
          <a href="contato.html" className="btn-formulario">Ir para o formulário</a>
        </div>

        <div className="footer-col">
          <h3>Redes Sociais</h3>
          <a href="#">
            <img
              src="https://tse1.mm.bing.net/th/id/OIP.4KA9AEoeSvSLrOz1ovyNtQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="Facebook"
            />
          </a>
          <a href="#">
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
