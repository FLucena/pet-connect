import React from 'react';

const Header: React.FC = () => {
  const navLinkStyle = {
    color: "#1E354B", 
    fontSize: "18px",
    transition: "all 0.3s ease"
  }; // Estilo para el enlace de navegación
  
  const navLinkHoverStyle = {
    color: "#4A90E2", 
    textDecoration: "none",
    transform: "translateY(-1px)"
  }; // Estilo para el enlace de navegación al pasar el ratón por encima
  return (
    <header className="bg-white shadow-sm py-2">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <div className="navbar-brand">
            <span className="h2 mb-0" style={{color:"#1E354B"}}>Pet Connect</span>
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
          <div className="collapse navbar-collapse" id="navbarNav" style={{fontFamily:"sans-serif"}}>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a 
                  href="#" 
                  className="nav-link" 
                  style={navLinkStyle} 
                  onMouseOver={(e) => { 
                    Object.assign(e.currentTarget.style,
                    navLinkHoverStyle);
                  }}
                  onMouseOut={(e) =>{
                    e.currentTarget.style.color = navLinkStyle.color;
                    e.currentTarget.style.textDecoration = "none";
                    e.currentTarget.style.transform = "none";
                  }}>Inicio</a>
              </li>
              <li className="nav-item">
                <a 
                  href="#" 
                  className="nav-link" 
                  style={navLinkStyle} 
                  onMouseOver={(e) => {
                    Object.assign(e.currentTarget.style,
                    navLinkHoverStyle);
                  }}
                  onMouseOut={(e) =>{
                    e.currentTarget.style.color = navLinkStyle.color;
                    e.currentTarget.style.textDecoration = "none";
                    e.currentTarget.style.transform = "none";
                  }}>Sobre Nosotros</a>
              </li>
              <li className="nav-item">
                <a 
                  href="#" 
                  className="nav-link" 
                  style={navLinkStyle} 
                  onMouseOver={(e) => {
                    Object.assign(e.currentTarget.style,
                    navLinkHoverStyle);
                  }}
                  onMouseOut={(e) =>{
                    e.currentTarget.style.color = navLinkStyle.color;
                    e.currentTarget.style.textDecoration = "none";
                    e.currentTarget.style.transform = "none";
                  }}>Contacto</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 