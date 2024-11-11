import Corolla from "./Corolla";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  Environment,
  Lightformer,
  ContactShadows,
  MeshReflectorMaterial,
  OrbitControls,
  PerformanceMonitor,
} from "@react-three/drei";
import { Effects } from "./Effects";
import { useState, useEffect, useRef } from "react";
import { useCustomization } from "@contexts/Customization";
import { useSpring, animated } from "@react-spring/three";

// Separate animated component
const AnimatedGroup = animated(({ rotation, children }) => (
  <group rotation={rotation}>{children}</group>
));

const SceneContent = ({ targetRotation }) => {
  const groupRef = useRef();
  const stageRef = useRef();
  const orbitControlsRef = useRef();

  const { rotation } = useSpring({
    rotation: targetRotation,
    config: { mass: 1, tension: 180, friction: 12 },
  });

  return (
    <>
      <AnimatedGroup rotation={rotation}>
        <group ref={groupRef}>
          <Corolla scale={1} position={[0, -1, 0]} />
        </group>
      </AnimatedGroup>
      <AnimatedGroup rotation={rotation}>
        <group ref={stageRef}>
          <hemisphereLight intensity={0.5} />
          <ContactShadows
            resolution={1024}
            frames={1}
            position={[0, -1, 0]}
            scale={15}
            blur={0.5}
            opacity={1}
            far={20}
          />
          {/* Circular Reflector below the ring lights */}
          <mesh
            position={[0, -1.2, 0]}
            rotation-x={-Math.PI / 2}
            castShadow
            receiveShadow
          >
            <circleGeometry args={[3, 64]} />
            <MeshReflectorMaterial
              envMapIntensity={0.8}
              color={[0.015, 0.015, 0.015]}
              roughness={0.7}
              blur={[1000, 900]}
              mixBlur={20}
              mixStrength={80}
              mixContrast={1}
              resolution={1024}
              mirror={0.5}
              depthScale={0.001}
              minDepthThreshold={0.9}
              maxDepthThreshold={1}
              depthToBlurRatioBias={0.75}
              reflectorOffset={0}
            />
          </mesh>
          <mesh
            scale={2}
            position={[0, -1.161, 0.3]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
          >
            <ringGeometry args={[0.85, 1, 4, 1]} />
            <meshStandardMaterial color="white" roughness={0.75} />
          </mesh>
          <mesh
            scale={2}
            position={[0, -1.161, -0.3]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
          >
            <ringGeometry args={[0.85, 1, 3, 1]} />
            <meshStandardMaterial color="white" roughness={0.75} />
          </mesh>
        </group>
      </AnimatedGroup>
      <Environment resolution={512}>
        {/* Ceiling */}
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, -9]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, -6]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={4}
          rotation-x={Math.PI / 2}
          position={[0, 4, -3]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={4}
          rotation-x={Math.PI / 2}
          position={[0, 4, 0]}
          scale={[10, 1, 1]}
        />
        {/* Sides */}
        <Lightformer
          intensity={2}
          rotation-y={Math.PI / 2}
          position={[-50, 2, 0]}
          scale={[100, 2, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-y={-Math.PI / 2}
          position={[50, 2, 0]}
          scale={[100, 2, 1]}
        />
        {/* Key */}
        <Lightformer
          form="ring"
          color="red"
          intensity={10}
          scale={2}
          position={[10, 5, 10]}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />
      </Environment>
      <Effects />
      {/* <OrbitControls
        ref={orbitControlsRef}
        enablePan={false}
        enableZoom={true}
        minPolarAngle={Math.PI / 2.2}
        maxPolarAngle={Math.PI / 2.2}
      /> */}
    </>
  );
};

const Experience = () => {
  const {
    interiorClick,
    spoilerClick,
    windowClick,
    rimClick,
    wheelsClick,
    bonnetClick,
    sideKitClick,
    lightClick,
    bumperFrontClick,
    bumperBackClick,
    grillClick,
    doorClick,
    engineClick,
    fenderClick,
    diffuserClick,
    roofClick,
    SilencerClick,
    trunkClick,
  } = useCustomization();

  const [dpr, setDpr] = useState(0.7);
  const [targetRotation, setTargetRotation] = useState([0, 0, 0]);

  // Define static rotation states for different views
  const viewRotations = {
    front: [0, 0, 0],
    back: [0, Math.PI, 0],
    left: [0, Math.PI / 2, 0],
    right: [0, -Math.PI / 2, 0],
    frontQuarterLeft: [0, Math.PI / 4, 0],
    frontQuarterRight: [0, -Math.PI / 4, 0],
    backQuarterLeft: [0, (3 * Math.PI) / 4, 0],
    backQuarterRight: [0, (-3 * Math.PI) / 4, 0],
  };

  useEffect(() => {
    const clickedParts = [
      interiorClick,
      spoilerClick,
      windowClick,
      rimClick,
      wheelsClick,
      bonnetClick,
      sideKitClick,
      lightClick,
      bumperFrontClick,
      bumperBackClick,
      grillClick,
      doorClick,
      engineClick,
      fenderClick,
      diffuserClick,
      roofClick,
      SilencerClick,
      trunkClick,
    ];

    const partNames = [
      "interior",
      "spoiler",
      "window",
      "rim",
      "wheels",
      "bonnet",
      "sideKit",
      "light",
      "bumperFront",
      "bumperBack",
      "grill",
      "door",
      "engine",
      "fender",
      "diffuser",
      "roof",
      "Silencer",
      "trunk",
    ];

    const clickedPart = clickedParts.findIndex((part) => part);
    const partName = partNames[clickedPart];

    if (partName) {
      switch (partName) {
        case "interior":
        case "window":
        case "roof":
          setTargetRotation(viewRotations.frontQuarterRight);
          break;
        case "spoiler":
        case "trunk":
        case "bumperBack":
          setTargetRotation(viewRotations.back);
          break;
        case "rim":
        case "wheels":
        case "sideKit":
          setTargetRotation(viewRotations.left);
          break;
        case "bonnet":
        case "light":
        case "bumperFront":
        case "grill":
          setTargetRotation(viewRotations.front);
          break;
        case "door":
          setTargetRotation(viewRotations.right);
          break;
        case "engine":
          setTargetRotation(viewRotations.frontQuarterLeft);
          break;
        case "fender":
          setTargetRotation(viewRotations.frontQuarterLeft);
          break;
        case "diffuser":
          setTargetRotation(viewRotations.backQuarterLeft);
          break;
        case "Silencer":
          setTargetRotation(viewRotations.backQuarterLeft);
          break;
        default:
          setTargetRotation(viewRotations.front);
      }
    } else {
      setTargetRotation(viewRotations.front);
    }
  }, [
    interiorClick,
    spoilerClick,
    windowClick,
    rimClick,
    wheelsClick,
    bonnetClick,
    sideKitClick,
    lightClick,
    bumperFrontClick,
    bumperBackClick,
    grillClick,
    doorClick,
    engineClick,
    fenderClick,
    diffuserClick,
    roofClick,
    SilencerClick,
    trunkClick,
  ]);

  return (
    <>
      <Canvas
        frameloop="demand"
        gl={{ logarithmicDepthBuffer: true, antialias: false }}
        dpr={dpr}
        camera={{ position: [0, Math.PI / 2.2, 10], fov: 25 }}
        
        
        
      >
        <PerformanceMonitor
          onIncline={() => setDpr(2)}
          onDecline={() => setDpr(1)}
          onChange={({ factor }) => setDpr(Math.round(0.5 + 1.5 * factor))}
          flipflops={6}
          onFallback={() => setDpr(1)}
        >
          <color attach="background" args={["#232029"]} />
          <SceneContent targetRotation={targetRotation} />
        </PerformanceMonitor>
      </Canvas>
    </>
  );
};

export default Experience;
