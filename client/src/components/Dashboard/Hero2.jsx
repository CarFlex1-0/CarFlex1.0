// Simplistic Dashboard with Buttons
import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, AppBar, Toolbar } from '@mui/material';

const Hero = () => {

  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-12 md:py-12 gap-10 ps-20">
      {/* Text Section */}
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              CarFlex
            </span>{" "}
            change your
          </h1>{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              Imagination{" "}
            </span>{" "}
            into Reality
          </h2>
        </main>

        <Typography className="text-xl text-gray-600 md:w-10/12 mx-auto lg:mx-0">
          Let's Get Started.
        </Typography>

      </div>

      {/* Hero Section */}
      <div className="z-10">
        <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
          <img
            src={"./assets/images/hero-car.png"}
            className="w-full max-w-lg h-auto object-contain"
            alt="Hero Car"
          />
        </div>
      </div>

      {/* Shadow Effect */}
      <div className="shadow"></div>
    </section>
  );


};

export default Hero;
