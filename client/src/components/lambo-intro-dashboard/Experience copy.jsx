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
      // console.log("Car model is ready");
    }
  }, []);

  useFrame((state, delta) => {
    if (!isReady || !ref.current) {
      // console.log("Car model is not ready yet");
      return;
    }

    const offset = scroll.offset;
    const section = Math.min(Math.floor(offset * 4), 3); // Clamp to 3 (0-3 for 4 sections)
    const sectionOffset = offset * 4 - section;

    // console.log(
    //   `Current section: ${section}, Section offset: ${sectionOffset}`
    // );

    const positions = [
      { x: 0, y: -1, z: -1, rotationY: 0 },
      { x: 0, y: -1, z: -1, rotationY: -Math.PI / 2 }, // Facing east
      { x: 0, y: 0, z: -1, rotationY: Math.PI / 2 }, // Facing west
      { x: 0, y: -1, z: -1, rotationY: Math.PI }, // Opposite to section 01
    ];

    const currentPos = positions[section];
    const nextPos = positions[Math.min(section + 1, positions.length - 1)];

    const targetX =
      (THREE.MathUtils.lerp(currentPos.x, nextPos.x, sectionOffset) *
        viewport.width) /
      5;
    const targetY =
      (THREE.MathUtils.lerp(currentPos.y, nextPos.y, sectionOffset) *
        viewport.height) /
      5;
    const targetZ = THREE.MathUtils.lerp(
      currentPos.z,
      nextPos.z,
      sectionOffset
    );
    const targetRotationY = THREE.MathUtils.lerp(
      currentPos.rotationY,
      nextPos.rotationY,
      sectionOffset
    );

    ref.current.position.x = THREE.MathUtils.lerp(
      ref.current.position.x,
      targetX,
      0.1
    );
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      targetY,
      0.1
    );
    ref.current.position.z = THREE.MathUtils.lerp(
      ref.current.position.z,
      targetZ,
      0.1
    );
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      targetRotationY,
      0.1
    );

    // Add a slight hover effect
    ref.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.02;

    // Make the Lamborghini bigger for all sections
    const baseScale = 1.5; // Adjust this value to make the car bigger or smaller
    const scale = baseScale + Math.sin(offset * Math.PI) * 0.1; // Small scale variation
    ref.current.scale.setScalar(scale);

    // console.log(
    //   `Car position: (${ref.current.position.x.toFixed(
    //     2
    //   )}, ${ref.current.position.y.toFixed(
    //     2
    //   )}, ${ref.current.position.z.toFixed(2)})`
    // );
    // console.log(`Car rotation: ${ref.current.rotation.y.toFixed(2)}`);
  });

  return <Lamborghini ref={ref} />;
};

const Sections = () => {
  const { viewport } = useThree();

  return (
    <Scroll html>
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <h1
          style={{
            fontSize: "5em",
            color: "white",
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Lamborghini Aventador
        </h1>
      </div>
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <h2
          style={{
            fontSize: "3em",
            color: "white",
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Unparalleled Performance
        </h2>
        <p
          style={{
            fontSize: "1.5em",
            color: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Experience the thrill of 0-60 mph in just 2.9 seconds
        </p>
      </div>
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <h2
          style={{
            fontSize: "3em",
            color: "white",
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Cutting-Edge Design
        </h2>
        <p
          style={{
            fontSize: "1.5em",
            color: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Aerodynamic perfection meets Italian craftsmanship
        </p>
      </div>
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <h2
          style={{
            fontSize: "3em",
            color: "white",
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          The Future of Supercars
        </h2>
        <p
          style={{
            fontSize: "1.5em",
            color: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Embrace the next generation of automotive excellence
        </p>
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
