import React from 'react';

export const CivicSVG = () => (
  <svg 
    className="w-full h-full absolute inset-0 opacity-10 group-hover:opacity-20 transition-all duration-500"
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      className="animate-draw" 
      d="M3 12h18M6 8h12c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2z"
      stroke="currentColor" 
      strokeWidth="1"
      strokeDasharray="100"
      strokeDashoffset="100"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="100"
        to="0"
        dur="2s"
        fill="freeze"
        repeatCount="indefinite"
      />
    </path>
    <circle 
      className="animate-spin-slow" 
      cx="7" 
      cy="16" 
      r="2" 
      stroke="currentColor"
    />
    <circle 
      className="animate-spin-slow" 
      cx="17" 
      cy="16" 
      r="2" 
      stroke="currentColor"
    />
  </svg>
);

export const CorollaSVG = () => (
  <svg 
    className="w-full h-full absolute inset-0 opacity-10 group-hover:opacity-20 transition-all duration-500"
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      className="animate-draw" 
      d="M4 10h16M4 14h16M7 7h10l2 3v4l-2 3H7l-2-3v-4l2-3z"
      stroke="currentColor" 
      strokeWidth="1"
      strokeDasharray="100"
      strokeDashoffset="100"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="100"
        to="0"
        dur="2s"
        fill="freeze"
        repeatCount="indefinite"
      />
    </path>
    <circle 
      className="animate-bounce-slow" 
      cx="8" 
      cy="17" 
      r="2" 
      stroke="currentColor"
    />
    <circle 
      className="animate-bounce-slow" 
      cx="16" 
      cy="17" 
      r="2" 
      stroke="currentColor"
    />
  </svg>
);

export const SwiftSVG = () => (
  <svg 
    className="w-full h-full absolute inset-0 opacity-10 group-hover:opacity-20 transition-all duration-500"
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      className="animate-draw" 
      d="M5 11h14M5 15h14M8 8h8l3 3v4l-3 3H8l-3-3v-4l3-3z"
      stroke="currentColor" 
      strokeWidth="1"
      strokeLinecap="round"
      strokeDasharray="100"
      strokeDashoffset="100"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="100"
        to="0"
        dur="2s"
        fill="freeze"
        repeatCount="indefinite"
      />
    </path>
    <circle 
      className="animate-pulse-slow" 
      cx="9" 
      cy="18" 
      r="2" 
      stroke="currentColor"
    />
    <circle 
      className="animate-pulse-slow" 
      cx="15" 
      cy="18" 
      r="2" 
      stroke="currentColor"
    />
  </svg>
); 