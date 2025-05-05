import React from "react";

interface LogoProps {
  size?: 'small' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'small' }) => {
  const maxHeight = size === 'large' ? '500px' : '48px';

  return (
    <div className="position-relative">
      <img
        src="/petconnect.png"
        alt="PetConnect logo: a house with a heart and paw"
        aria-label="PetConnect Home Logo"
        className="img-fluid rounded shadow cursor-pointer transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
        style={{
          width: 'auto',
          height: 'auto',
          maxWidth: '100%',
          maxHeight
        }}
      />
    </div>
  );
};

export default Logo;