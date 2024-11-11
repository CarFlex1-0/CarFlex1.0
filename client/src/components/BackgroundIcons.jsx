import React from 'react';
import { useTheme } from '@contexts/ThemeContext';

const BackgroundIcons = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Car Icon */}
      <img 
        src="https://cdn-icons-png.flaticon.com/512/2736/2736906.png"
        className="absolute -bottom-20 -left-20 w-96 h-96 opacity-5 rotate-12 transition-opacity duration-300"
        alt=""
      />
      
      {/* Speedometer Icon */}
      <img 
        src={isDarkMode 
          ? "https://cdn-icons-png.flaticon.com/512/11134/11134275.png"
          : "https://cdn-icons-png.flaticon.com/512/11133/11133557.png"
        }
        className="absolute top-10 right-10 w-64 h-64 opacity-5 transition-all duration-300"
        alt=""
      />

      {/* Wrench Icon */}
      <img 
        src={isDarkMode
          ? "https://cdn-icons-png.flaticon.com/512/7003/7003625.png" 
          : "https://cdn-icons-png.flaticon.com/512/7003/7003685.png"
        }
        className="absolute bottom-10 right-10 w-48 h-48 opacity-5 transition-all duration-300"
        alt=""
      />

      {/* Additional decorative elements */}
      <div className={`absolute top-1/4 left-1/4 w-32 h-32 rounded-full ${isDarkMode ? 'bg-blue-500' : 'bg-blue-300'} opacity-5 blur-3xl`}></div>
      <div className={`absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full ${isDarkMode ? 'bg-purple-500' : 'bg-purple-300'} opacity-5 blur-3xl`}></div>
    </div>
  );
};

export default BackgroundIcons;