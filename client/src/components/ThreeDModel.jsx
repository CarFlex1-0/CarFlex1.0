// 3D Model render
// TODO: Link with scrapper values and Render graphs
import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import {
  OrbitControls,
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  Lightformer,
  Float,
} from "@react-three/drei";
import { LayerMaterial, Color, Depth } from "lamina";

const Model = ({ onModelLoad }) => {
  const gltf = useLoader(GLTFLoader, "./assets/models/supra.glb");
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current && onModelLoad) {
      onModelLoad(modelRef.current);
    }
  }, [onModelLoad]);

  return <primitive object={gltf.scene} ref={modelRef} />;
};

const RotatingLightformer = () => {
  const lightRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    lightRef.current.position.set(20 * Math.cos(t), 10, 20 * Math.sin(t));
    lightRef.current.lookAt(0, 0, 0);
  });

  return (
    <Lightformer
      ref={lightRef}
      form="ring"
      color="red"
      intensity={3}
      scale={20}
      visible={false}
    />
  );
};

const RotatingLightformerAnti = () => {
  const lightRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    lightRef.current.position.set(-20 * Math.cos(t), -10, -20 * Math.sin(t));
    lightRef.current.lookAt(0, 0, 0);
  });

  return (
    <Lightformer
      ref={lightRef}
      form="ring"
      color="white"
      intensity={3}
      scale={10}
      visible={false}
    />
  );
};

const ThreeDModel = () => {
  const [model, setModel] = useState(null);
  const [color, setColor] = useState("green");
  const [loading, setLoading] = useState(true);

  const changeMaterialColor = (materialName, color) => {
    if (model) {
      let changed = false;
      model.traverse((child) => {
        if (child.isMesh) {
          const materials = Array.isArray(child.material)
            ? child.material
            : [child.material];
          materials.forEach((material) => {
            if (material.name === materialName) {
              material.color.set(color);
              changed = true;
            }
          });
        }
      });
      if (!changed) {
        console.warn(`Material "${materialName}" not found.`);
      }
    }
  };

  const handleChangeColor = () => {
    changeMaterialColor("Paint Black Matt", color);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <Canvas shadows camera={{ position: [5, 5, 15], fov: 60 }}>
          <spotLight
            position={[0, 15, 0]}
            angle={0.3}
            penumbra={1}
            castShadow
            intensity={2}
            shadow-bias={-0.0001}
          />
          <ambientLight intensity={0.5} />
          <AccumulativeShadows
            position={[0, -1.16, 0]}
            frames={100}
            alphaTest={0.9}
            scale={10}
          >
            <RandomizedLight
              amount={8}
              radius={10}
              ambient={0.5}
              position={[1, 5, -1]}
            />
          </AccumulativeShadows>
          <Environment frames={Infinity} resolution={256} background blur={1}>
            <Lightformers />
          </Environment>
          <Model onModelLoad={setModel} />
          <OrbitControls
            maxPolarAngle={Math.PI / 2}
            minDistance={30}
            maxDistance={100}
            enableZoom={true}
          />
          <RotatingLightformer />
          <RotatingLightformerAnti />
          <mesh scale={100}>
            <sphereGeometry args={[1, 64, 64]} />
            <LayerMaterial side={THREE.BackSide}>
              <Color color="#444" alpha={1} mode="normal" />
              <Depth
                colorA="blue"
                colorB="purple"
                alpha={0.5}
                mode="normal"
                near={0}
                far={300}
                origin={[100, 100, 100]}
              />
            </LayerMaterial>
          </mesh>
        </Canvas>

        {/* Loader outside the Canvas */}
        {loading && (
          <div className="flex justify-center items-center min-h-screen">
            <div className="spinner"></div>
          </div>
        )}

        <div className="flex m-auto w-full bg-slate-800 text-white p-4 items-center justify-center gap-2">
          <input type="color" value={color} onChange={handleColorChange} />
          <button
            className="rounded-full p-1 px-3 bg-slate-300 text-black"
            onClick={handleChangeColor}
          >
            Change Wheel Color
          </button>
        </div>
      </div>
    </>
  );
};

function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  const group = useRef();
  useFrame(
    (state, delta) =>
      (group.current.position.z += delta * 10) > 20 &&
      (group.current.position.z = -60)
  );
  return (
    <>
      <Lightformer
        intensity={0.95}
        rotation-x={Math.PI / 2}
        position={[0, 5, -9]}
        scale={[10, 10, 1]}
      />
      <group rotation={[0, 0.5, 0]}>
        <group ref={group}>
          {positions.map((x, i) => (
            <Lightformer
              key={i}
              form="circle"
              intensity={2}
              rotation={[Math.PI / 2, 0, 0]}
              position={[x, 4, i * 4]}
              scale={[3, 1, 1]}
            />
          ))}
        </group>
      </group>
      <Lightformer
        intensity={4}
        rotation-y={Math.PI / 2}
        position={[-5, 1, -1]}
        scale={[20, 0.1, 1]}
      />
      <Lightformer
        rotation-y={Math.PI / 2}
        position={[-5, -1, -1]}
        scale={[20, 0.5, 1]}
      />
      <Lightformer
        rotation-y={-Math.PI / 2}
        position={[10, 1, 0]}
        scale={[20, 1, 1]}
      />
      <Float speed={5} floatIntensity={2} rotationIntensity={2}>
        <Lightformer
          form="ring"
          color="red"
          intensity={1}
          scale={10}
          position={[-15, 4, -18]}
          target={[0, 0, 0]}
        />
      </Float>
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <LayerMaterial side={THREE.BackSide}>
          <Color color="#444" alpha={1} mode="normal" />
          <Depth
            colorA="blue"
            colorB="purple"
            alpha={0.5}
            mode="normal"
            near={0}
            far={300}
            origin={[100, 100, 100]}
          />
        </LayerMaterial>
      </mesh>
    </>
  );
}

export default ThreeDModel;
