import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/Dashboard/Card";
import { useTheme } from "@contexts/ThemeContext";

const PopularPlanType = {
  NO: 0,
  YES: 1,
};

const pricingList = [
  {
    title: "Free",
    popular: 0,
    price: 0,
    description:
      "Get started for free. Limited functionality for casual car enthusiasts.",
    buttonText: "Get Started",
    benefitList: [
      "1 blog in 12 hours",
      "2 Car Parts Types for Overlay",
      "1 Team Member for Collaboration",
      "Limited Community support",
    ],
  },
  {
    title: "Premium",
    popular: 1,
    price: 1000,
    description: "Our most popular plan! Perfect for serious car enthusiasts.",
    buttonText: "Contact Us",
    benefitList: [
      "10 blogs in 12 hours",
      "Unlimited Car Parts Types for Overlay",
      "2 Team Member for Collaboration",
      "Unlimited Community support",
    ],
  },
  {
    title: "Enterprise",
    popular: 0,
    price: 1800,
    description: "Unlimited features for businesses and power users.",
    buttonText: "Contact Us",
    benefitList: [
      "Unlimited blogs in 12 hours",
      "Unlimited Car Parts Types for Overlay",
      "4 Team Members for Collaboration",
      "Unlimited Community support",
    ],
  },
];

export const Pricing = () => {
  const { isDarkMode } = useTheme();
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [1400, 1600, 2400, 2600], [0, 1, 1, 0]);

  const scale = useTransform(
    scrollY,
    [1400, 1600, 2400, 2600],
    [0.8, 1, 1, 0.8]
  );

  const theme = {
    light: {
      background: "bg-white/5 backdrop-blur-md",
      cardGlass: "bg-gray-50/80 backdrop-blur-md hover:bg-gray-100/80",
      popularCardGlass: "bg-blue-50/90 backdrop-blur-md hover:bg-blue-100/90",
      text: "text-gray-800",
      secondaryText: "text-gray-600",
      gradientText: "from-[#03a3d7] to-[#61DAFB]",
      border: "border border-gray-200/50",
      popularBorder: "border border-blue-200/50",
      button:
        "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      popularButton:
        "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
      checkmark: "text-green-500",
      shadow: "shadow-xl shadow-gray-200/20",
      popularShadow: "shadow-xl shadow-blue-200/30",
    },
    dark: {
      background: "bg-black/5 backdrop-blur-md",
      cardGlass: "bg-gray-900/50 backdrop-blur-md hover:bg-gray-800/50",
      popularCardGlass: "bg-blue-900/50 backdrop-blur-md hover:bg-blue-800/50",
      text: "text-gray-100",
      secondaryText: "text-gray-300",
      gradientText: "from-[#61DAFB] to-[#03a3d7]",
      border: "border border-gray-700/30",
      popularBorder: "border border-blue-500/30",
      button:
        "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
      popularButton:
        "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
      checkmark: "text-green-400",
      shadow: "shadow-xl shadow-black/20",
      popularShadow: "shadow-xl shadow-blue-900/30",
    },
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <motion.section
      id="pricing"
      className={`container py-24 sm:py-32 ${currentTheme.background} rounded-2xl ${currentTheme.border}`}
      style={{ opacity, scale }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: false, margin: "-200px" }}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className={`text-3xl md:text-4xl font-bold ${currentTheme.text}`}>
          Get
          <span
            className={`bg-gradient-to-r ${currentTheme.gradientText} text-transparent bg-clip-text`}
          >
            {" "}
            Unlimited{" "}
          </span>
          Access
        </h2>
        <h3 className={`text-xl ${currentTheme.secondaryText} pt-4 pb-8`}>
          Unleash Your Car Vision - emphasizes the creative freedom CarFlex
          offers.
        </h3>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingList.map((pricing, index) => (
          <motion.div
            key={pricing.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.2,
              type: "spring",
              stiffness: 50,
            }}
            viewport={{ once: false, margin: "-100px" }}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className={`h-full ${
                pricing.popular === PopularPlanType.YES
                  ? `${currentTheme.popularCardGlass} ${currentTheme.popularBorder} ${currentTheme.popularShadow}`
                  : `${currentTheme.cardGlass} ${currentTheme.border} ${currentTheme.shadow}`
              } rounded-2xl overflow-hidden`}
            >
              <CardHeader>
                <CardTitle
                  className={`flex items-center justify-between ${currentTheme.text}`}
                >
                  {pricing.title}
                  {pricing.popular === PopularPlanType.YES && (
                    <motion.div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-3 py-1 text-sm"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1,
                      }}
                    >
                      Most Popular
                    </motion.div>
                  )}
                </CardTitle>
                <div className={currentTheme.text}>
                  <span className="text-3xl font-bold">
                    PKR {pricing.price}
                  </span>
                  <span className={currentTheme.secondaryText}> /month</span>
                </div>
                <CardDescription className={currentTheme.secondaryText}>
                  {pricing.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-2 px-4 rounded-full text-white ${
                    pricing.popular === PopularPlanType.YES
                      ? currentTheme.popularButton
                      : currentTheme.button
                  } transition-all duration-300`}
                >
                  {pricing.buttonText}
                </motion.button>
              </CardContent>

              <hr className="w-4/5 m-auto mb-4 opacity-20" />

              <CardFooter className="flex">
                <div className="space-y-4">
                  {pricing.benefitList.map((benefit) => (
                    <motion.span
                      key={benefit}
                      className="flex items-center"
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className={currentTheme.checkmark}>✓</span>
                      <h3 className={`ml-2 ${currentTheme.secondaryText}`}>
                        {benefit}
                      </h3>
                    </motion.span>
                  ))}
                </div>
              </CardFooter>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
