import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <span className="h2 mb-0 text-primary">Pet Connect</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={handleToggleMenu}
            aria-controls="navbarNav"
            aria-expanded={isMenuOpen ? 'true' : 'false'}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse${isMenuOpen ? ' show' : ''}`} id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/">
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/pets">
                  Mascotas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/shelters">
                  Refugios
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/about">
                  Acerca de
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/contact">
                  Contacto
                </NavLink>
              </li>
            </ul>

            <div className="d-flex align-items-center">
              <Link to="/login" className="btn btn-primary me-2">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="btn btn-outline-primary">
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
