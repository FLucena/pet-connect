import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="position-relative w-100">
      <img
        src="/petconnect.png"
        alt="PetConnect logo: a house with a heart and paw"
        aria-label="PetConnect Home Logo"
        className="img-fluid rounded shadow cursor-pointer transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default Logo;