import React from "react";

const Logo: React.FC = () => {
  const handleLogoKeyDown = (event: React.KeyboardEvent<HTMLImageElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      // Add any action you want on keyboard interaction
    }
  };

  return (
    <img
      src="/petconnect.png"
      alt="PetConnect logo: a house with a heart and paw"
      aria-label="PetConnect Home Logo"
      tabIndex={0}
      onKeyDown={handleLogoKeyDown}
      className="w-32 h-32 mx-auto rounded-lg shadow-lg cursor-pointer transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
};

export default Logo;