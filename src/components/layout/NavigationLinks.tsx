import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationLinksProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({ setIsMenuOpen }) => {
  const location = useLocation();

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

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <ul className="navbar-nav d-flex flex-column flex-lg-row justify-content-center flex-grow-1 mb-2 mb-lg-0 w-100 w-lg-auto">
      {[
        { path: '/', label: 'Inicio' },
        { path: '/refugios', label: 'Refugios' },
        { path: '/adoptar', label: 'Adoptar' },
        { path: '/donar', label: 'Donar', isBold: true },
        { path: '/contacto', label: 'Contacto' }
      ].map(({ path, label, isBold }) => (
        <li key={path} className="nav-item mx-lg-2 my-2 my-lg-0">
          <Link 
            to={path}
            className={`nav-link ${isActive(path)} ${isBold ? 'fw-bold' : ''}`}
            style={navLinkStyle}
            onMouseOver={(e) => {
              Object.assign(e.currentTarget.style, navLinkHoverStyle);
            }}
            onMouseOut={(e) => {
              Object.assign(e.currentTarget.style, navLinkStyle);
            }}
            onClick={handleLinkClick}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavigationLinks; 