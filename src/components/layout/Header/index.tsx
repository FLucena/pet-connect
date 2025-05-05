import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from '@/hooks/useAuth';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
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

  const handleLogout = () => {
    logout();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header style={headerStyle}>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container position-relative">
            <Link to="/" className="navbar-brand d-flex align-items-center" style={{ maxWidth: '200px' }}>
              <Logo />
            </Link>
            
            <button
              className="navbar-toggler border-0 hamburger-menu"
              type="button"
              onClick={toggleMenu}
              aria-label="Toggle navigation"
              aria-expanded={isMenuOpen}
            >
              <span className={`hamburger-menu__icon ${isMenuOpen ? 'active' : ''}`}>
                <span className="hamburger-menu__line"></span>
                <span className="hamburger-menu__line"></span>
                <span className="hamburger-menu__line"></span>
              </span>
            </button>

            <div 
              className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} 
              id="navbarNav"
              style={{
                transition: 'all 0.3s ease-in-out',
                maxHeight: isMenuOpen ? '1000px' : 'none',
                overflow: 'hidden',
                opacity: isMenuOpen ? '1' : '1',
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(0)',
                visibility: isMenuOpen ? 'visible' : 'visible'
              }}
            >
              <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center w-100">
                <ul className="navbar-nav position-absolute start-50 translate-middle-x mb-2 mb-lg-0">
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
                      onClick={() => setIsMenuOpen(false)}
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
                      onClick={() => setIsMenuOpen(false)}
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
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Adoptar
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
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contacto
                    </Link>
                  </li>
                </ul>

                <ul className="navbar-nav ms-auto">
                  {isAuthenticated ? (
                    <>
                      <li className="nav-item">
                        <Link 
                          to="/profile" 
                          className={`nav-link px-3 ${isActive('/profile')}`}
                          style={navLinkStyle}
                          onMouseOver={(e) => {
                            Object.assign(e.currentTarget.style, navLinkHoverStyle);
                          }}
                          onMouseOut={(e) => {
                            Object.assign(e.currentTarget.style, navLinkStyle);
                          }}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Perfil
                        </Link>
                      </li>
                      <li className="nav-item">
                        <button 
                          className="btn btn-outline-primary ms-2"
                          onClick={handleLogout}
                        >
                          Cerrar Sesión
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <Link 
                          to="/login" 
                          className={`nav-link px-3 ${isActive('/login')}`}
                          style={navLinkStyle}
                          onMouseOver={(e) => {
                            Object.assign(e.currentTarget.style, navLinkHoverStyle);
                          }}
                          onMouseOut={(e) => {
                            Object.assign(e.currentTarget.style, navLinkStyle);
                          }}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Iniciar Sesión
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link 
                          to="/register" 
                          className={`btn btn-primary ms-2`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Registrarse
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* Spacer to prevent content from going under fixed header */}
      <div className="header-spacer" style={{ 
        height: '72px',
        minHeight: '72px'
      }}></div>
    </>
  );
};

export default Header;
