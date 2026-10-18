import React from 'react';

interface SanketLogoProps {
  className?: string;
  size?: number | string;
}

export const SanketLogo: React.FC<SanketLogoProps> = ({ 
  className = "w-7 h-7", 
  size 
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="Sanket Logo"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 71.8 19.2
           L 49.5 19.2
           C 33.2 19.2 23.5 30.5 23.5 45.0
           C 23.5 54.2 28.5 61.8 36.8 66.2
           L 36.8 66.2
           L 46.5 56.5
           C 41.5 53.8 38.5 49.2 38.5 43.5
           C 38.5 35.8 43.8 31.2 50.5 31.2
           L 59.8 31.2
           L 71.8 19.2 Z
           M 28.2 80.8
           L 50.5 80.8
           C 66.8 80.8 76.5 69.5 76.5 55.0
           C 76.5 45.8 71.5 38.2 63.2 33.8
           L 63.2 33.8
           L 53.5 43.5
           C 58.5 46.2 61.5 50.8 61.5 56.5
           C 61.5 64.2 56.2 68.8 49.5 68.8
           L 40.2 68.8
           L 28.2 80.8 Z
           M 43.2 37.8
           C 45.3 36.5 47.8 35.8 50.5 35.8
           C 57.2 35.8 62.5 41.0 62.5 47.8
           C 62.5 52.2 60.2 56.0 56.8 58.2
           L 43.2 44.6
           L 43.2 37.8 Z"
      />
    </svg>
  );
};

