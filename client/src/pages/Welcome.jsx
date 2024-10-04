// Start Point
import React from "react";
import { Link } from "react-router-dom";
import Hero from "@components/Dashboard/Hero";
import About from "@components/Dashboard/About";
import  HowItWorks from "@components/Dashboard/HowItWorks";
import { Pricing } from "@components/Dashboard/Pricing";
const Welcome = () => {
  // Define button data
  const buttons = [
    { to: "/sign-in", label: "Login" },
    { to: "/sign-up", label: "Sign up" },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-950 to-indigo-950 bg-opacity-100w">
      <Hero />

      <div className="flex justify-center gap-4 items-center ">
        {buttons.map((button, index) => (
          <Link
            key={index}
            to={button.to}
            className="btn glass btn-accent text-white ml-10  px-4 py-2 rounded btn-wide"
          >
            {button.label}
          </Link>
        ))}
      </div>

      <About />
      <HowItWorks />
      <Pricing />
    </div>
  );
};

export default Welcome;
