import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll, ScrollControls, Scroll, Html } from "@react-three/drei";
import Lamborghini from "./Scene";
import Effects from "./Effects";
import * as THREE from "three";

const Section = ({ children, ...props }) => {
  return <group {...props}>{children}</group>;
};

const AnimatedCar = () => {
  const ref = useRef();
  const scroll = useScroll();
  const { viewport } = useThree();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (ref.current) {
      setIsReady(true);
    }
  }, []);

  useFrame((state, delta) => {
    if (!isReady || !ref.current) {
      return;
    }

    const offset = scroll.offset;
    const section = Math.min(Math.floor(offset * 9), 8);
    const sectionOffset = offset * 9 - section;

    // Refined positions with better spacing and views
    const positions = [
      { 
        x: 0, y: -1.5, z: -2,         // Center - Further back
        rotationY: 0,                  // Front view
        scale: 1.2
      },
      { 
        x: 1.5, y: -1.5, z: -2,       // Right side - Further back
        rotationY: -Math.PI * 0.1,     // Slight angle
        scale: 1.2
      },
      { 
        x: -1.5, y: -1.5, z: -2,      // Left side - Further back
        rotationY: Math.PI * 0.1,      // Slight angle
        scale: 1.2
      },
      { 
        x: 1.5, y: -1.5, z: -2,       // Right side
        rotationY: Math.PI * 0.25,     // Quarter turn
        scale: 1.2
      },
      { 
        x: -1.5, y: -1.5, z: -2,      // Left side
        rotationY: -Math.PI * 0.25,    // Quarter turn
        scale: 1.2
      },
      { 
        x: 1.5, y: -1.5, z: -2,       // Right side
        rotationY: Math.PI * 0.5,      // Half turn
        scale: 1.2
      },
      { 
        x: -1.5, y: -1.5, z: -2,      // Left side
        rotationY: -Math.PI * 0.5,     // Half turn
        scale: 1.2
      },
      { 
        x: 0, y: -1.5, z: -2,         // Center
        rotationY: Math.PI * 0.75,     // Three-quarter turn
        scale: 1.2
      },
      { 
        x: 0, y: -1.5, z: -2,         // Back to center
        rotationY: Math.PI,            // Full turn
        scale: 1.2
      }
    ];

    const currentPos = positions[section];
    const nextPos = positions[Math.min(section + 1, positions.length - 1)];

    // Slower transitions with easing
    const ease = 0.05; // Reduced from 0.075 for smoother movement

    // Position transitions
    const targetX = (THREE.MathUtils.lerp(currentPos.x, nextPos.x, sectionOffset) * viewport.width) / 7; // Adjusted divisor
    const targetY = (THREE.MathUtils.lerp(currentPos.y, nextPos.y, sectionOffset) * viewport.height) / 7;
    const targetZ = THREE.MathUtils.lerp(currentPos.z, nextPos.z, sectionOffset);
    
    // Smoother rotation with less dramatic changes
    const targetRotationY = THREE.MathUtils.lerp(
      currentPos.rotationY,
      nextPos.rotationY,
      Math.pow(sectionOffset, 2) // Easing function for rotation
    );

    // Apply positions with smoother easing
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetX, ease);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, ease);
    ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, targetZ, ease);
    
    // Smoother rotation transition
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotationY, ease);

    // Subtle floating animation
    ref.current.position.y += Math.sin(state.clock.elapsedTime) * 0.01; // Reduced amplitude

    // Consistent scale with minimal variation
    const targetScale = THREE.MathUtils.lerp(currentPos.scale, nextPos.scale, sectionOffset);
    const currentScale = ref.current.scale.x;
    ref.current.scale.setScalar(
      THREE.MathUtils.lerp(currentScale, targetScale, ease)
    );
  });

  return <Lamborghini ref={ref} />;
};

const Sections = () => {
  const { viewport } = useThree();

  return (
    <Scroll html>
      {/* Hero Section - Center */}
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            width: "100%",
          }}
        >
          <h1
            style={{
              fontSize: "5em",
              color: "white",
              marginBottom: "0.5em",
            }}
          >
            Car<span style={{ color: "#4F46E5" }}>F</span>lex
          </h1>
          <p
            style={{
              fontSize: "1.5em",
              color: "white",
              maxWidth: "800px",
              margin: "0 auto",
              opacity: "0.9",
            }}
          >
            Your All-in-One Car Customization and Community Platform
          </p>
        </div>
      </div>

      {/* 3D Customization - Left */}
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "15%",
            transform: "translateY(-50%)",
            maxWidth: "600px",
          }}
        >
          <h2
            style={{
              fontSize: "3.5em",
              color: "white",
              marginBottom: "0.5em",
              background: "linear-gradient(to right, #4F46E5, #818CF8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Customize Your Dream Car
          </h2>
          <p
            style={{
              fontSize: "1.8em",
              color: "white",
              marginBottom: "1em",
              lineHeight: "1.4",
            }}
          >
            Experience real-time 3D visualization and part configuration for
            your perfect ride
          </p>
        </div>
      </div>

      {/* AI Journey Planning - Right */}
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "15%",
            transform: "translateY(-50%)",
            textAlign: "right",
            maxWidth: "600px",
          }}
        >
          <h2
            style={{
              fontSize: "3.5em",
              color: "white",
              marginBottom: "0.5em",
              background: "linear-gradient(to left, #4F46E5, #818CF8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Plan Your Journey
          </h2>
          <p
            style={{
              fontSize: "1.8em",
              color: "white",
              marginBottom: "1em",
              lineHeight: "1.4",
            }}
          >
            AI-powered route planning and travel recommendations tailored for
            car enthusiasts
          </p>
        </div>
      </div>

      {/* Blogs - Left */}
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "15%",
            transform: "translateY(-50%)",
            maxWidth: "600px",
          }}
        >
          <h2
            style={{
              fontSize: "3.5em",
              color: "white",
              marginBottom: "0.5em",
              background: "linear-gradient(to right, #4F46E5, #818CF8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Automotive Insights
          </h2>
          <p
            style={{
              fontSize: "1.8em",
              color: "white",
              marginBottom: "1em",
              lineHeight: "1.4",
            }}
          >
            Discover expert articles, reviews, and the latest trends in car
            customization
          </p>
        </div>
      </div>

      {/* Forums - Right */}
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "15%",
            transform: "translateY(-50%)",
            textAlign: "right",
            maxWidth: "600px",
          }}
        >
          <h2
            style={{
              fontSize: "3.5em",
              color: "white",
              marginBottom: "0.5em",
              background: "linear-gradient(to left, #4F46E5, #818CF8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Community Forums
          </h2>
          <p
            style={{
              fontSize: "1.8em",
              color: "white",
              marginBottom: "1em",
              lineHeight: "1.4",
            }}
          >
            Connect with fellow enthusiasts, share experiences, and get expert
            advice
          </p>
        </div>
      </div>

      {/* Subscriptions - Left */}
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "15%",
            transform: "translateY(-50%)",
            maxWidth: "600px",
          }}
        >
          <h2
            style={{
              fontSize: "3.5em",
              color: "white",
              marginBottom: "0.5em",
              background: "linear-gradient(to right, #4F46E5, #818CF8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Premium Features
          </h2>
          <p
            style={{
              fontSize: "1.8em",
              color: "white",
              marginBottom: "1em",
              lineHeight: "1.4",
            }}
          >
            Unlock advanced customization tools and exclusive community benefits
          </p>
        </div>
      </div>

      {/* Marketplace - Right */}
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "15%",
            transform: "translateY(-50%)",
            textAlign: "right",
            maxWidth: "600px",
          }}
        >
          <h2
            style={{
              fontSize: "3.5em",
              color: "white",
              marginBottom: "0.5em",
              background: "linear-gradient(to left, #4F46E5, #818CF8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Parts Marketplace
          </h2>
          <p
            style={{
              fontSize: "1.8em",
              color: "white",
              marginBottom: "1em",
              lineHeight: "1.4",
            }}
          >
            Buy and sell authentic car parts in our trusted community
            marketplace
          </p>
        </div>
      </div>

      {/* Feedback Support - Left */}
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "15%",
            transform: "translateY(-50%)",
            maxWidth: "600px",
          }}
        >
          <h2
            style={{
              fontSize: "3.5em",
              color: "white",
              marginBottom: "0.5em",
              background: "linear-gradient(to right, #4F46E5, #818CF8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            24/7 Support
          </h2>
          <p
            style={{
              fontSize: "1.8em",
              color: "white",
              marginBottom: "1em",
              lineHeight: "1.4",
            }}
          >
            Dedicated support team ready to assist you on your customization
            journey
          </p>
        </div>
      </div>
    </Scroll>
  );
};

const Experience = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ preserveDrawingBuffer: true }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <fog attach="fog" args={["#050505", 0, 15]} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <ScrollControls pages={9} damping={0.1}>
        <AnimatedCar />
        <Sections />
      </ScrollControls>
      <Effects />
    </Canvas>
  );
};

export default Experience;
