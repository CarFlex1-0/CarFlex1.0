// Simplistic Dashboard with Buttons
import React from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import { Typography } from '@mui/material';
import { useTheme } from "@contexts/ThemeContext";

const Hero = () => {
  const { isDarkMode } = useTheme();
  const { scrollY } = useScroll();
  
  const textY = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const imageRotate = useTransform(scrollY, [0, 300], [0, -10]);

  // Theme-specific styles
  const theme = {
    light: {
      text: "text-gray-800",
      secondaryText: "text-gray-600",
      gradientText1: "from-[#D247BF] to-[#F596D3]",
      gradientText2: "from-[#03a3d7] to-[#61DAFB]",
      buttonGradient1: "from-[#D247BF] to-[#F596D3]",
      buttonGradient2: "from-[#03a3d7] to-[#61DAFB]",
      background: "from-purple-200/20 to-blue-200/20",
    },
    dark: {
      text: "text-gray-100",
      secondaryText: "text-gray-300",
      gradientText1: "from-[#F596D3] to-[#D247BF]",
      gradientText2: "from-[#61DAFB] to-[#03a3d7]",
      buttonGradient1: "from-[#F596D3] to-[#D247BF]",
      buttonGradient2: "from-[#61DAFB] to-[#03a3d7]",
      background: "from-purple-900/20 to-blue-900/20",
    }
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <motion.section 
      style={{ opacity }}
      className="container grid lg:grid-cols-2 place-items-center py-12 md:py-12 gap-10 ps-20 min-h-screen"
    >
      {/* Text Section */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        style={{ y: textY, scale }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center lg:text-start space-y-8"
      >
        <main className="text-5xl md:text-6xl font-bold">
          <motion.h1 
            className="inline"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className={`inline bg-gradient-to-r ${currentTheme.gradientText1} text-transparent bg-clip-text transition-all duration-300`}>
              CarFlex
            </span>{" "}
            <span className={currentTheme.text}>change your</span>
          </motion.h1>{" "}
          <motion.h2 
            className="inline"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className={`inline bg-gradient-to-r ${currentTheme.gradientText2} text-transparent bg-clip-text transition-all duration-300`}>
              Imagination{" "}
            </span>{" "}
            <span className={currentTheme.text}>into Reality</span>
          </motion.h2>
        </main>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Typography className={`text-xl ${currentTheme.secondaryText} md:w-10/12 mx-auto lg:mx-0`}>
            Build your car effortlessly with CarFlex to save your time and money.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4 justify-center lg:justify-start"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/sign-in" 
              className={`btn btn-primary bg-gradient-to-r ${currentTheme.buttonGradient1} text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300`}
            >
              Login
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/sign-up"
              className={`btn btn-secondary bg-gradient-to-r ${currentTheme.buttonGradient2} text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300`}
            >
              Signup
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Hero Section */}
      <motion.div 
        className="z-10"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        style={{ 
          scale,
          rotate: imageRotate
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="hidden lg:flex relative w-[700px] h-[500px]">
          <motion.img
            src="public/assets/images/hero-car.png"
            className="w-full max-w-lg h-auto object-contain"
            alt="Hero Car"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>
      </motion.div>

      {/* Animated Background Gradient */}
      <motion.div 
        className={`absolute inset-0 -z-10 bg-gradient-to-br ${currentTheme.background} opacity-50`}
        animate={{
          background: [
            `radial-gradient(circle, ${isDarkMode ? 'rgba(purple, 0.1)' : 'rgba(purple, 0.05)'} 0%, ${isDarkMode ? 'rgba(blue, 0.1)' : 'rgba(blue, 0.05)'} 100%)`,
            `radial-gradient(circle, ${isDarkMode ? 'rgba(blue, 0.1)' : 'rgba(blue, 0.05)'} 0%, ${isDarkMode ? 'rgba(purple, 0.1)' : 'rgba(purple, 0.05)'} 100%)`
          ]
        }}
        style={{ opacity }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />
    </motion.section>
  );
};

export default Hero;
