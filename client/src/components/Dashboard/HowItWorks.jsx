import React from "react";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "./Icons";
import { motion, useScroll, useTransform } from "motion/react";
import { useTheme } from "@contexts/ThemeContext";

const features = [
  {
    icon: <MedalIcon />,
    title: "Accessibility",
    description: "Learnable interface for customization. Open Roads for Everyone.",
  },
  {
    icon: <MapIcon />,
    title: "Community Hub",
    description: "Join the CarFlex Community. Connecting Car Enthusiasts.",
  },
  {
    icon: <PlaneIcon />,
    title: "Scalability",
    description: "Built to Scale with Your Needs. Car Parts Overlay, 3D-Model customization.",
  },
  {
    icon: <GiftIcon />,
    title: "Gamification",
    description: "Turn Every customization into an Adventure. Unlock the Fun with CarFlex.",
  },
];

const HowItWorks = () => {
  const { isDarkMode } = useTheme();
  const { scrollY } = useScroll();
  
  // Smooth scroll animations
  const opacity = useTransform(
    scrollY, 
    [800, 1000, 1800, 2000], // Increased range for smoother transitions
    [0, 1, 1, 0]
  );
  
  const scale = useTransform(
    scrollY, 
    [800, 1000, 1800, 2000],
    [0.8, 1, 1, 0.8]
  );

  const theme = {
    light: {
      background: "bg-white/5 backdrop-blur-md",
      cardBg: "bg-gray-100/80 backdrop-blur-sm hover:bg-gray-200/80",
      text: "text-gray-800",
      secondaryText: "text-gray-600",
      gradientText: "from-[#03a3d7] to-[#61DAFB]",
      border: "border border-gray-200/50",
      icon: "text-blue-600",
      shadow: "shadow-lg shadow-gray-300/20",
    },
    dark: {
      background: "bg-black/5 backdrop-blur-md",
      cardBg: "bg-white/5 backdrop-blur-sm hover:bg-white/10",
      text: "text-gray-100",
      secondaryText: "text-gray-300",
      gradientText: "from-[#61DAFB] to-[#03a3d7]",
      border: "border border-white/10",
      icon: "text-blue-400",
      shadow: "shadow-lg shadow-black/10",
    }
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <motion.section 
      id="howItWorks" 
      className={`container text-center py-24 sm:py-32 ${currentTheme.background} rounded-2xl ${currentTheme.border} ${currentTheme.shadow}`}
      style={{ opacity, scale }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: false, margin: "-200px" }}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, margin: "-200px" }}
      >
        <h2 className={`text-3xl md:text-4xl font-bold ${currentTheme.text}`}>
          How It{" "}
          <span className={`bg-gradient-to-r ${currentTheme.gradientText} text-transparent bg-clip-text`}>
            Works{" "}
          </span>
          Step-by-Step Guide
        </h2>
        <p className={`md:w-3/4 mx-auto mt-4 mb-8 text-xl ${currentTheme.secondaryText}`}>
          Embark on Your Journey - Experience a Seamless Path to Personalized Car Customization
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }, index) => (
          <motion.div 
            key={title} 
            className={`${currentTheme.cardBg} rounded-xl ${currentTheme.border} transition-all duration-300 ${currentTheme.shadow}`}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ 
              duration: 0.8,
              delay: index * 0.2,
              type: "spring",
              stiffness: 50
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
            viewport={{ once: false, margin: "-100px" }}
          >
            <motion.div 
              className="flex flex-col items-center p-6 h-full"
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              transition={{ delay: 0.2 * index }}
            >
              <motion.div 
                className={`text-5xl mb-4 ${currentTheme.icon}`}
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
              >
                {icon}
              </motion.div>
              <h3 className={`font-semibold text-xl mb-2 ${currentTheme.text}`}>
                {title}
              </h3>
              <p className={`${currentTheme.secondaryText}`}>
                {description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default HowItWorks;