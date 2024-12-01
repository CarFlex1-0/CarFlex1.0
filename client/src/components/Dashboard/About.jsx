import React from 'react';
import { Typography } from '@mui/material';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTheme } from "@contexts/ThemeContext";

const About = () => {
  const { isDarkMode } = useTheme();
  const { scrollY } = useScroll();
  const opacity = useTransform(
    scrollY, 
    [0, 300, 800, 1100], 
    [0, 1, 1, 0]
  );
  
  const scale = useTransform(
    scrollY, 
    [0, 300, 800, 1100], 
    [0.8, 1, 1, 0.8]
  );
  
  const theme = {
    light: {
      glassEffect: "bg-white/10 backdrop-blur-md border border-white/20",
      cardGlass: "bg-white/5 backdrop-blur-sm border border-white/10",
      text: "text-gray-800",
      secondaryText: "text-gray-600",
      gradientText: "from-[#D247BF] to-[#F596D3]",
      statText: "text-gray-700",
    },
    dark: {
      glassEffect: "bg-black/10 backdrop-blur-md border border-white/10",
      cardGlass: "bg-white/5 backdrop-blur-sm border border-gray-800/50",
      text: "text-gray-100",
      secondaryText: "text-gray-300",
      gradientText: "from-[#F596D3] to-[#D247BF]",
      statText: "text-gray-200",
    }
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <motion.section 
      id="about" 
      className="container py-24 sm:py-32"
      style={{ opacity, scale }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: false, margin: "-200px" }}
    >
      <motion.div 
        className={`${currentTheme.glassEffect} rounded-2xl py-12 shadow-xl`}
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, margin: "-200px" }}
      >
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <motion.img
            src="../../../public/assets/images/test.png"
            alt="About CarFlex"
            className="w-[300px] object-contain rounded-lg"
            initial={{ scale: 0.8, opacity: 0, rotateY: -30 }}
            whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: 30 }}
            transition={{ 
              duration: 1,
              type: "spring",
              stiffness: 50
            }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            viewport={{ once: false, margin: "-200px" }}
          />
          <div className="flex flex-col justify-between">
            <motion.div 
              className="pb-6"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, margin: "-200px" }}
            >
              <Typography variant="h3" className={`font-bold ${currentTheme.text}`}>
                <span className={`bg-gradient-to-r ${currentTheme.gradientText} text-transparent bg-clip-text`}>
                  About{" "}
                </span>
                CarFlex
              </Typography>
              <Typography variant="body1" className={`text-xl ${currentTheme.secondaryText} mt-4`}>
                CarFlex aims to provide users with a user-friendly and personalized experience for visualizing and customizing their vehicles. With a focus on user-friendly interfaces, reliability, and security, CarFlex sets out to cater to the needs of automotive enthusiasts; new and seasoned. Overall, CarFlex aims to redefine the automotive modification landscape by setting new standards in innovation, user experience, and industry relevance.
              </Typography>
            </motion.div>

            <Statistics currentTheme={currentTheme} />
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

const Statistics = ({ currentTheme }) => {
  const stats = [
    {
      quantity: "2.7K+",
      description: "Users",
    },
    {
      quantity: "1.8K+",
      description: "Subscribers",
    },
    {
      quantity: "112",
      description: "Downloads",
    },
    {
      quantity: "4",
      description: "Products",
    },
  ];

  return (
    <motion.section 
      id="statistics"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      exit={{ y: 30, opacity: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, margin: "-200px" }}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ quantity, description }, index) => (
          <motion.div
            key={description}
            className={`${currentTheme.cardGlass} rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300`}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ 
              duration: 0.6,
              delay: 0.15 * index,
              type: "spring",
              stiffness: 50
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
            viewport={{ once: false, margin: "-200px" }}
          >
            <motion.div 
              className="space-y-2 text-center"
              initial={{ y: 10 }}
              whileInView={{ y: 0 }}
              transition={{ 
                delay: 0.2 * index,
                duration: 0.6
              }}
            >
              <Typography variant="h4" className={`font-bold ${currentTheme.text}`}>
                {quantity}
              </Typography>
              <Typography variant="body1" className={currentTheme.secondaryText}>
                {description}
              </Typography>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default About;
