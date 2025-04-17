import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row">
          {/* Brand/Description & Socials */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="mb-3">Pet Connect</h5>
            <p className="text-light">
              Conectando refugios de animales con personas que buscan adoptar y ayudar, facilitando el proceso de adopción responsable.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="https://facebook.com" className="text-light" aria-label="Facebook">
                <i className="bi bi-facebook" style={{ fontSize: 20 }}></i>
              </a>
              <a href="https://twitter.com" className="text-light" aria-label="Twitter">
                <i className="bi bi-twitter" style={{ fontSize: 20 }}></i>
              </a>
              <a href="https://instagram.com" className="text-light" aria-label="Instagram">
                <i className="bi bi-instagram" style={{ fontSize: 20 }}></i>
              </a>
              <a href="https://github.com" className="text-light" aria-label="GitHub">
                <i className="bi bi-github" style={{ fontSize: 20 }}></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4 mb-md-0">
            <h5 className="mb-3">Enlaces</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-light text-decoration-none">Inicio</Link>
              </li>
              <li className="mb-2">
                <Link to="/adoptar" className="text-light text-decoration-none">Adoptar</Link>
              </li>
              <li className="mb-2">
                <Link to="/refugios" className="text-light text-decoration-none">Refugios</Link>
              </li>
              <li className="mb-2">
                <Link to="/quienes-somos" className="text-light text-decoration-none">Quiénes Somos</Link>
              </li>
              <li className="mb-2">
                <Link to="/contacto" className="text-light text-decoration-none">Contacto</Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="col-md-2 mb-4 mb-md-0">
            <h5 className="mb-3">Recursos</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/preguntas-frecuentes" className="text-light text-decoration-none">Preguntas Frecuentes</Link>
              </li>
              <li className="mb-2">
                <Link to="/blog" className="text-light text-decoration-none">Blog</Link>
              </li>
              <li className="mb-2">
                <Link to="/terminos" className="text-light text-decoration-none">Términos</Link>
              </li>
              <li className="mb-2">
                <Link to="/privacidad" className="text-light text-decoration-none">Privacidad</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="col-md-4">
            <h5 className="mb-3">Contacto</h5>
            <ul className="list-unstyled text-light mb-3">
              <li className="mb-2">Email: info@petconnect.com</li>
              <li className="mb-2">Teléfono: +123 456 7890</li>
            </ul>
            <h5 className="mb-3">Suscríbete</h5>
            <p className="text-light">Recibe noticias sobre mascotas disponibles para adopción.</p>
            <form className="mt-3">
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Tu email"
                  aria-label="Tu email"
                  aria-describedby="button-addon2"
                />
                <button className="btn btn-primary" type="button" id="button-addon2">
                  Suscribirse
                </button>
              </div>
            </form>
          </div>
        </div>

        <hr className="my-4 bg-secondary" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0 text-light">&copy; {currentYear} Pet Connect. Todos los derechos reservados.</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="mb-0 text-light">
              Hecho con <i className="bi bi-heart-fill text-danger mx-1" style={{ fontSize: 16 }}></i> por el equipo de Pet Connect
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
