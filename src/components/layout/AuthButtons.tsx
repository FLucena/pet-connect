import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AuthButtonsProps {
  isAuthenticated: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ isAuthenticated, setIsMenuOpen }) => {
  const { logout } = useAuth();
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
    <ul className="navbar-nav d-flex flex-column flex-lg-row align-items-center mt-2 mt-lg-0">
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
              onClick={handleLinkClick}
            >
              Perfil
            </Link>
          </li>
          <li className="nav-item">
            <button 
              className="btn btn-outline-primary ms-2"
              onClick={() => { logout(); handleLinkClick(); }}
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
              onClick={handleLinkClick}
            >
              <div className="d-flex align-items-center">
                <LogIn size={20} className="me-2" />
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/register" 
              className={`nav-link px-3 ${isActive('/register')}`}
              onClick={handleLinkClick}
            >
              <div className="d-flex align-items-center">
                <UserPlus size={20} className="me-2" />
              </div>
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default AuthButtons; 