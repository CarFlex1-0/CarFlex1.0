import Corolla from "./Corolla";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  ContactShadows,
  OrbitControls,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { Effects } from "./Effects";

const Experience = () => {
  return (
    <>
      <Canvas
        frameloop="demand"
      
        gl={{ logarithmicDepthBuffer: true, antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 25 }}
      >
        <color attach="background" args={["#232029"]} />
  <Corolla
    rotation={[0, Math.PI / 1.5, 0]}
    scale={1}
    position={[0, -1, 0]} // Center the corolla on the ring geometry
  />

  <hemisphereLight intensity={0.5} />
  <ContactShadows
    resolution={1024}
    frames={1}
    position={[0, -1, 0]} // Center the contact shadows on the ring geometry
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
          position={[0, -1.161, 0.3]} // Center the ring geometry
          rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
        >
          <ringGeometry args={[0.85, 1, 4, 1]} />
          <meshStandardMaterial color="white" roughness={0.75}
          
          
          />
        </mesh>
        <mesh
          scale={2}
          position={[0, -1.161, -0.3]} // Center the ring geometry
          rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
        >
          <ringGeometry args={[0.85, 1, 3, 1]} />
          <meshStandardMaterial color="white" roughness={0.75} />
        </mesh>
        {/* We're building a cube-mapped environment declaratively.
          Anything you put in here will be filmed (once) by a cubemap-camera
          and applied to the scenes environment, and optionally background. */}
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
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, -3]}
            scale={[10, 1, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, 0]}
            scale={[10, 1, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, 3]}
            scale={[10, 1, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, 6]}
            scale={[10, 1, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, 9]}
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
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </>
  );
};

export default Experience;
