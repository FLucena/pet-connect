import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkStyle = {
    color: "#1E354B",
    fontSize: "18px",
    transition: "all 0.3s ease",
    transform: "translateY(0)",
    textDecoration: "none"
  };

  const navLinkHoverStyle = {
    color: "#4A90E2",
    textDecoration: "none",
    transform: "translateY(-1px)"
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-primary fw-semibold' : '';
  };

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transition: 'all 0.3s ease',
    backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 1)',
    backdropFilter: isScrolled ? 'blur(10px)' : 'none',
    WebkitBackdropFilter: isScrolled ? 'blur(10px)' : 'none',
    transform: `translateY(${isScrolled ? '0' : '0'})`,
    boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : '0 2px 5px rgba(0, 0, 0, 0.05)'
  } as React.CSSProperties;

  return (
    <>
      <header style={headerStyle}>
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <Link to="/" className="navbar-brand d-flex align-items-center">
              <div style={{ width: '48px', height: '48px' }}>
                <Logo />
              </div>
              <span className="ms-2 h4 mb-0" style={{color:"#1E354B"}}>Pet Connect</span>
            </Link>

            <button 
              className="navbar-toggler" 
              type="button" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-controls="navbarNav" 
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <Link 
                    to="/" 
                    className={`nav-link px-3 ${isActive('/')}`}
                    style={navLinkStyle}
                    onMouseOver={(e) => {
                      Object.assign(e.currentTarget.style, navLinkHoverStyle);
                    }}
                    onMouseOut={(e) => {
                      Object.assign(e.currentTarget.style, navLinkStyle);
                    }}
                  >
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    to="/refugios" 
                    className={`nav-link px-3 ${isActive('/refugios')}`}
                    style={navLinkStyle}
                    onMouseOver={(e) => {
                      Object.assign(e.currentTarget.style, navLinkHoverStyle);
                    }}
                    onMouseOut={(e) => {
                      Object.assign(e.currentTarget.style, navLinkStyle);
                    }}
                  >
                    Refugios
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    to="/adoptar" 
                    className={`nav-link px-3 ${isActive('/adoptar')}`}
                    style={navLinkStyle}
                    onMouseOver={(e) => {
                      Object.assign(e.currentTarget.style, navLinkHoverStyle);
                    }}
                    onMouseOut={(e) => {
                      Object.assign(e.currentTarget.style, navLinkStyle);
                    }}
                  >
                    Adoptar
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link 
                    to="/ubicacion" 
                    className={`nav-link px-3 ${isActive('/ubicacion')}`}
                    style={navLinkStyle}
                    onMouseOver={(e) => {
                      Object.assign(e.currentTarget.style, navLinkHoverStyle);
                    }}
                    onMouseOut={(e) => {
                      Object.assign(e.currentTarget.style, navLinkStyle);
                    }}
                  >
                    <i className="bi bi-geo-alt me-1"></i>
                    Ubicación
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link 
                    to="/quienes-somos" 
                    className={`nav-link px-3 ${isActive('/quienes-somos')}`}
                    style={navLinkStyle}
                    onMouseOver={(e) => {
                      Object.assign(e.currentTarget.style, navLinkHoverStyle);
                    }}
                    onMouseOut={(e) => {
                      Object.assign(e.currentTarget.style, navLinkStyle);
                    }}
                  >
                    Quiénes Somos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    to="/contacto" 
                    className={`nav-link px-3 ${isActive('/contacto')}`}
                    style={navLinkStyle}
                    onMouseOver={(e) => {
                      Object.assign(e.currentTarget.style, navLinkHoverStyle);
                    }}
                    onMouseOut={(e) => {
                      Object.assign(e.currentTarget.style, navLinkStyle);
                    }}
                  >
                    Contacto
                  </Link>
                </li>
              </ul>

              <div className="d-flex align-items-center gap-2">
                <Link 
                  to="/login" 
                  className="btn btn-primary"
                  style={{ transition: "all 0.3s ease", transform: "translateY(0)" }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-outline-primary"
                  style={{ transition: "all 0.3s ease", transform: "translateY(0)" }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Registrarse
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* Spacer to prevent content from going under fixed header */}
      <div style={{ height: '72px' }}></div>
    </>
  );
};

export default Header;
