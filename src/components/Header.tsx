import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <div className="navbar-brand">
            <span className="h2 mb-0 text-primary">Pet Connect</span>
          </div>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a href="#" className="nav-link">Inicio</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">Sobre Nosotros</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">Contacto</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 