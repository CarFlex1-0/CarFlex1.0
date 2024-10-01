import React from "react";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon, TestIcon } from "./Icons";

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
  return (
    <section id="howItWorks" className="container text-center py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold">
        How It{" "}
        <span className="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Embark on Your Journey - Experience a Seamless Path to Personalized Car Customization
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }) => (
          <div key={title} className="card bg-muted shadow-md rounded-lg">
            <div className="card-body flex flex-col items-center p-6">
              <div className="text-5xl mb-2">{icon}</div>
              <h1 className="font-semibold  text-center">{title}</h1>
              <h3 className="text-muted-foreground">{description}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default HowItWorks;