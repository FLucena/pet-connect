import React from 'react';

interface MobileMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isMenuOpen, toggleMenu }) => {
  return (
    <button
      className="navbar-toggler d-block d-lg-none border-0 hamburger-menu"
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
  );
};

export default MobileMenu; 