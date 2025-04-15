import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <h3 className="h5 mb-3">Pet Connect</h3>
            <p className="text-muted">
              Conectando refugios de animales con personas que buscan adoptar y ayudar.
            </p>
          </div>
          <div className="col-md-4 mb-4 mb-md-0">
            <h3 className="h5 mb-3">Enlaces Rápidos</h3>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none hover:text-white">Inicio</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none hover:text-white">Sobre Nosotros</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none hover:text-white">Contacto</a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h3 className="h5 mb-3">Contacto</h3>
            <ul className="list-unstyled text-muted">
              <li className="mb-2">Email: info@petconnect.com</li>
              <li className="mb-2">Teléfono: +123 456 7890</li>
            </ul>
          </div>
        </div>
        <hr className="my-4 border-secondary" />
        <div className="text-center text-muted">
          <p className="mb-0">&copy; {new Date().getFullYear()} Pet Connect. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 