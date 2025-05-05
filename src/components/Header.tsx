import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { useAuth } from '@/hooks/useAuth';
import NavigationLinks from './layout/NavigationLinks';
import AuthButtons from './layout/AuthButtons';
import MobileMenu from './layout/MobileMenu';

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const toggleMenu = () => setIsMenuOpen((open) => !open);

  return (
    <>
      <header style={headerStyle}>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container position-relative">
            <Logo />
            <MobileMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
            <div className={`collapse navbar-collapse d-lg-flex${isMenuOpen ? ' show' : ''}`} id="navbarNav">
              <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center w-100">
                <NavigationLinks setIsMenuOpen={setIsMenuOpen} />
                <AuthButtons isAuthenticated={isAuthenticated} setIsMenuOpen={setIsMenuOpen} />
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="header-spacer" style={{ 
        height: '72px',
        minHeight: '72px'
      }}></div>
    </>
  );
};

export default Header;
