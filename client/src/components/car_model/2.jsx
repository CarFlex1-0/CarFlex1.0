import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useCustomization } from "@contexts/Customization";

import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

export default function Civic(props) {
  const rightTailLightRef = useRef(); // Ref for the right taillight
  const leftTailLightRef = useRef(); // Ref for the left taillight
  const rightHeadLightRef = useRef(); // Ref for the right taillight
  const leftHeadLightRef = useRef(); // Ref for the left taillight

  // Set a stronger red color
  const properRed = new THREE.Color(0xff0000); // Bright red

  // Use a frame loop to animate the emissive intensity for both lights
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const intensity = (Math.sin(time * 3) + 1) / 2; // Generates a value between 0 and 1

    // Right taillight animation
    if (rightTailLightRef.current) {
      const rightTailLightMaterial = rightTailLightRef.current.material;
      rightTailLightMaterial.emissiveIntensity = intensity * 5;
      rightTailLightMaterial.emissive = properRed
        .clone()
        .multiplyScalar(intensity);
    }

    // Left taillight animation (optional: modify if you want a different effect)
    if (leftTailLightRef.current) {
      const leftTailLightMaterial = leftTailLightRef.current.material;
      leftTailLightMaterial.emissiveIntensity = intensity * 5;
      leftTailLightMaterial.emissive = properRed
        .clone()
        .multiplyScalar(intensity);
    }
    if (rightHeadLightRef.current) {
      rightHeadLightRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.emissiveIntensity = intensity * 5; // Dynamic intensity
          child.material.emissive = properRed.clone().multiplyScalar(intensity);
        }
      });
    }
    if (leftHeadLightRef.current) {
      leftHeadLightRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.emissiveIntensity = intensity * 5; // Dynamic intensity
          child.material.emissive = properRed.clone().multiplyScalar(intensity);
        }
      });
    }
  });

  const {
    spoilerColors,
    doorColors,
    rimColors,
    windowColors,
    bonnetColors,
    lightColors,
    sideKitColors,
    bodyColors,
    bumperFrontColors,
    bumperBackColors,
    grillColors,
    fenderColors,
    diffuserColors,
    roofColors,
    trunkColors,
    // CarBody
    carBodyClick,
    setCarBodyClick,
    carBodyColor,
    setCarBodyColor,
    // Spoiler
    spoiler,
    setSpoiler,
    spoilerClick,
    setSpoilerClick,
    spoilerColor,
    setSpoilerColor,
    // Windows
    windowClick,
    setWindowClick,
    windowColor,
    setWindowColor,
    // Rims
    rimClick,
    setRimClick,
    rimColor,
    setRimColor,
    // Wheels
    wheels,
    setWheels,
    wheelsClick,
    setWheelsClick,
    // Bonnet
    bonnetClick,
    setBonnetClick,
    bonnetColor,
    setBonnetColor,
    bonnet,
    setBonnet,
    // Sidekits
    sideKit,
    setSideKit,
    sideKitClick,
    setSideKitClick,
    sideKitColor,
    setSideKitColor,
    // Lights
    lightClick,
    setLightClick,
    lightColor,
    setLightColor,
    // BumperFront
    bumperFrontClick,
    setBumperFrontClick,
    bumperFrontColor,
    setBumperFrontColor,
    // BumperBack
    bumperBack,
    setBumperBack,
    bumperBackClick,
    setBumperBackClick,
    bumperBackColor,
    setBumperBackColor,
    // Grill
    grillClick,
    setGrillClick,
    grillColor,
    setGrillColor,
    // Doors
    doorClick,
    setDoorClick,
    doorColor,
    setDoorColor,
    // Engine
    engine,
    setEngine,
    engineClick,
    setEngineClick,
    // Fender
    fenderClick,
    setFenderClick,
    fenderColor,
    setFenderColor,
    // Diffuser
    diffuser,
    setDiffuser,
    diffuserClick,
    setDiffuserClick,
    diffuserColor,
    setDiffuserColor,
    // Roof
    roofClick,
    setRoofClick,
    roofColor,
    setRoofColor,
    // Silencer
    silencer,
    setSilencer,
    silencerClick,
    setSilencerClick,
    // Trunk
    trunkClick,
    setTrunkClick,
    trunkColor,
    setTrunkColor,
  } = useCustomization();

  const { nodes, materials } = useGLTF("../../../public/assets/models/Civic_v1.2.gltf");
  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        {/* Spoilers (DOne) */}
        <group
          name="civic_spoiler001"
          position={[0, 0, 0.352]}
          rotation={[0, 1.571, 0]}
          scale={0.33}
          visible={spoiler === 1}
          // onClick={() => {
          //   setSpoilerClick(true);
          //   setRimClick(false);
          //   setWindowClick(false);
          //   setBonnetClick(false);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(false);
          //   setSideKitClick(false);
          //   setCarBodyClick(false);
          //   setWheelsClick(false);
          //   setBonnetClick(false);
          //   setSideKitClick(false);
          //   setLightClick(false);
          //   setBumperFrontClick(false);
          //   setBumperBackClick(false);
          //   setGrillClick(false);
          //   setEngineClick(false);
          //   setFenderClick(false);
          //   setDiffuserClick(false);
          //   setRoofClick(false);
          //   setSilencerClick(false);
          //   setTrunkClick(false);
          // }}
        >
          <mesh
            name="Plane008"
            geometry={nodes.Plane008.geometry}
            material={materials.PaletteMaterial001}
            // onClick={() => {
            //   setSpoilerClick(true);
            //   setRimClick(false);
            //   setWindowClick(false);
            //   setBonnetClick(false);
            //   setLightClick(false);
            //   setCarBodyClick(false);
            //   setDoorClick(false);
            //   setSideKitClick(false);
            //   setCarBodyClick(false);
            //   setWheelsClick(false);
            //   setBonnetClick(false);
            //   setSideKitClick(false);
            //   setLightClick(false);
            //   setBumperFrontClick(false);
            //   setBumperBackClick(false);
            //   setGrillClick(false);
            //   setEngineClick(false);
            //   setFenderClick(false);
            //   setDiffuserClick(false);
            //   setRoofClick(false);
            //   setSilencerClick(false);
            //   setTrunkClick(false);
            // }}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2}
              color={spoilerColor.color} // 2 corresponds to DoubleSide
            />
          </mesh>
          <mesh
            name="Plane008_1"
            geometry={nodes.Plane008_1.geometry}
            material={materials.PaletteMaterial001}
            // onClick={() => {
            //   setSpoilerClick(true);
            //   setRimClick(false);
            //   setWindowClick(false);
            //   setBonnetClick(false);
            //   setLightClick(false);
            //   setCarBodyClick(false);
            //   setDoorClick(false);
            //   setSideKitClick(false);
            //   setCarBodyClick(false);
            //   setWheelsClick(false);
            //   setBonnetClick(false);
            //   setSideKitClick(false);
            //   setLightClick(false);
            //   setBumperFrontClick(false);
            //   setBumperBackClick(false);
            //   setGrillClick(false);
            //   setEngineClick(false);
            //   setFenderClick(false);
            //   setDiffuserClick(false);
            //   setRoofClick(false);
            //   setSilencerClick(false);
            //   setTrunkClick(false);
            // }}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={spoilerColor.color} // 2 corresponds to DoubleSide
            />
          </mesh>
        </group>

        <group
          name="civic_spoiler002"
          rotation={[0, 1.571, 0]}
          scale={0.33}
          visible={spoiler === 2}
          // onClick={() => {
          //   setSpoilerClick(true);
          //   setRimClick(false);
          //   setWindowClick(false);
          //   setBonnetClick(false);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(false);
          //   setSideKitClick(false);
          //   setCarBodyClick(false);
          //   setWheelsClick(false);
          //   setBonnetClick(false);
          //   setSideKitClick(false);
          //   setLightClick(false);
          //   setBumperFrontClick(false);
          //   setBumperBackClick(false);
          //   setGrillClick(false);
          //   setEngineClick(false);
          //   setFenderClick(false);
          //   setDiffuserClick(false);
          //   setRoofClick(false);
          //   setSilencerClick(false);
          //   setTrunkClick(false);
          // }}
        >
          <mesh
            name="Plane033"
            geometry={nodes.Plane033.geometry}
            material={materials.PaletteMaterial001}
            // onClick={() => {
            //   setSpoilerClick(true);
            //   setRimClick(false);
            //   setWindowClick(false);
            //   setBonnetClick(false);
            //   setLightClick(false);
            //   setCarBodyClick(false);
            //   setDoorClick(false);
            //   setSideKitClick(false);
            //   setCarBodyClick(false);
            //   setWheelsClick(false);
            //   setBonnetClick(false);
            //   setSideKitClick(false);
            //   setLightClick(false);
            //   setBumperFrontClick(false);
            //   setBumperBackClick(false);
            //   setGrillClick(false);
            //   setEngineClick(false);
            //   setFenderClick(false);
            //   setDiffuserClick(false);
            //   setRoofClick(false);
            //   setSilencerClick(false);
            //   setTrunkClick(false);
            // }}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={spoilerColor.color}
            />
          </mesh>
          <mesh
            name="Plane033_1"
            geometry={nodes.Plane033_1.geometry}
            material={materials.PaletteMaterial001}
            // onClick={() => {
            //   setSpoilerClick(true);
            //   setRimClick(false);
            //   setWindowClick(false);
            //   setBonnetClick(false);
            //   setLightClick(false);
            //   setCarBodyClick(false);
            //   setDoorClick(false);
            //   setSideKitClick(false);
            //   setCarBodyClick(false);
            //   setWheelsClick(false);
            //   setBonnetClick(false);
            //   setSideKitClick(false);
            //   setLightClick(false);
            //   setBumperFrontClick(false);
            //   setBumperBackClick(false);
            //   setGrillClick(false);
            //   setEngineClick(false);
            //   setFenderClick(false);
            //   setDiffuserClick(false);
            //   setRoofClick(false);
            //   setSilencerClick(false);
            //   setTrunkClick(false);
            // }}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={spoilerColor.color}
            />
          </mesh>
        </group>

        <group
          name="civic_spoiler003"
          position={[0.003, 0.921, -2.576]}
          rotation={[0.212, Math.PI / 2, 0]}
          scale={0.33}
          visible={spoiler === 3}
          // onClick={() => {
          //   setSpoilerClick(true);
          //   setRimClick(false);
          //   setWindowClick(false);
          //   setBonnetClick(false);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(false);
          //   setSideKitClick(false);
          //   setCarBodyClick(false);
          //   setWheelsClick(false);
          //   setBonnetClick(false);
          //   setSideKitClick(false);
          //   setLightClick(false);
          //   setBumperFrontClick(false);
          //   setBumperBackClick(false);
          //   setGrillClick(false);
          //   setEngineClick(false);
          //   setFenderClick(false);
          //   setDiffuserClick(false);
          //   setRoofClick(false);
          //   setSilencerClick(false);
          //   setTrunkClick(false);
          // }}
        >
          <mesh
            name="Plane086"
            geometry={nodes.Plane086.geometry}
            material={materials.PaletteMaterial001}
            // onClick={() => {
            //   setSpoilerClick(true);
            //   setRimClick(false);
            //   setWindowClick(false);
            //   setBonnetClick(false);
            //   setLightClick(false);
            //   setCarBodyClick(false);
            //   setDoorClick(false);
            //   setSideKitClick(false);
            //   setCarBodyClick(false);
            //   setWheelsClick(false);
            //   setBonnetClick(false);
            //   setSideKitClick(false);
            //   setLightClick(false);
            //   setBumperFrontClick(false);
            //   setBumperBackClick(false);
            //   setGrillClick(false);
            //   setEngineClick(false);
            //   setFenderClick(false);
            //   setDiffuserClick(false);
            //   setRoofClick(false);
            //   setSilencerClick(false);
            //   setTrunkClick(false);
            // }}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={spoilerColor.color}
            />
          </mesh>

          <mesh
            name="Plane086_1"
            geometry={nodes.Plane086_1.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={spoilerColor.color}
            />
          </mesh>
        </group>

        {/* Bonnet CLosed */}
        <mesh
          name="civic_bonnet_plain_closed"
          geometry={nodes.civic_bonnet_plain_closed.geometry}
          material={materials.PaletteMaterial001}
          position={[0, 0, -1.001]}
          rotation={[0, 1.571, 0]}
          scale={0.33}
          visible={bonnet === 1}
          // onClick={() => {
          //   setSpoilerClick(false);
          //   setRimClick(false);
          //   setWindowClick(false);
          //   setBonnetClick(true);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(false);
          //   setSideKitClick(false);
          //   setWheelsClick(false);
          //   setBumperFrontClick(false);
          //   setBumperBackClick(false);
          //   setGrillClick(false);
          //   setEngineClick(false);
          //   setFenderClick(false);
          //   setDiffuserClick(false);
          //   setRoofClick(false);
          //   setSilencerClick(false);
          //   setTrunkClick(false);
          // }}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            color={bonnetColor.color} // 2 corresponds to DoubleSide
          />
        </mesh>

        <mesh
          name="civic_bonnet_original_closed"
          geometry={nodes.civic_bonnet_original_closed.geometry}
          material={materials.PaletteMaterial001}
          position={[0, 0.641, -0.332]}
          rotation={[0, 1.571, 0]}
          scale={0.33}
          // onClick={() => {
          //   setSpoilerClick(false);
          //   setRimClick(false);
          //   setWindowClick(false);
          //   setBonnetClick(true);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(false);
          //   setSideKitClick(false);
          //   setWheelsClick(false);
          //   setBumperFrontClick(false);
          //   setBumperBackClick(false);
          //   setGrillClick(false);
          //   setEngineClick(false);
          //   setFenderClick(false);
          //   setDiffuserClick(false);
          //   setRoofClick(false);
          //   setSilencerClick(false);
          //   setTrunkClick(false);
          // }}
          visible={bonnet === 2}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            color={bonnetColor.color} // 2 corresponds to DoubleSide
          />
        </mesh>

        {/* Bonnet Opened  */}
        <mesh
          name="civic_bonnet_plain_opened"
          geometry={nodes.civic_bonnet_plain_opened.geometry}
          material={materials.PaletteMaterial001}
          position={[-0.484, 0.656, -0.482]}
          rotation={[-1.134, Math.PI / 2, 0]}
          scale={0.33}
          visible={bonnet === 3}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            color={bonnetColor.color}
          />
        </mesh>

        <mesh
          name="civic_bonnet_original_opened"
          geometry={nodes.civic_bonnet_original_opened.geometry}
          material={materials.PaletteMaterial001}
          position={[-0.482, 0.662, -0.463]}
          rotation={[-1.134, Math.PI / 2, 0]}
          scale={0.33}
          visible={bonnet === 4}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            color={bonnetColor.color}
          />
        </mesh>

        {/* Engine */}
        {/* SideSkirt Grey */}
        <mesh
          name="civic_enginesheets"
          geometry={nodes.civic_enginesheets.geometry}
          material={nodes.civic_enginesheets.material}
          position={[0.005, 0.401, -0.338]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            color={0x808080}
          />
        </mesh>

        {/* Stock */}
        <group
          visible={engine === 1}
          name="engine002"
          position={[-0.001, 0.265, -0.285]}
          scale={[0.917, 0.705, 0.846]}
        >
          <mesh
            name="Car_2-Turbo_V6_Engine_Asembly_Designing"
            geometry={nodes["Car_2-Turbo_V6_Engine_Asembly_Designing"].geometry}
            material={materials.PaletteMaterial009}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={0xababab}
            />
          </mesh>
          <mesh
            name="Car_2-Turbo_V6_Engine_Asembly_Designing_1"
            geometry={
              nodes["Car_2-Turbo_V6_Engine_Asembly_Designing_1"].geometry
            }
            material={materials.PaletteMaterial010}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={0x808080}
            />
          </mesh>
          <mesh
            name="Car_2-Turbo_V6_Engine_Asembly_Designing_2"
            geometry={
              nodes["Car_2-Turbo_V6_Engine_Asembly_Designing_2"].geometry
            }
            material={materials.PaletteMaterial011}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={0x808080}
            />
          </mesh>
          <mesh
            name="Car_2-Turbo_V6_Engine_Asembly_Designing_3"
            geometry={
              nodes["Car_2-Turbo_V6_Engine_Asembly_Designing_3"].geometry
            }
            material={materials.PaletteMaterial012}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
            />
          </mesh>
          <mesh
            name="Car_2-Turbo_V6_Engine_Asembly_Designing_4"
            geometry={
              nodes["Car_2-Turbo_V6_Engine_Asembly_Designing_4"].geometry
            }
            material={materials.PaletteMaterial008}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={0x808080}
            />
          </mesh>
          <mesh
            name="Car_2-Turbo_V6_Engine_Asembly_Designing_5"
            geometry={
              nodes["Car_2-Turbo_V6_Engine_Asembly_Designing_5"].geometry
            }
            material={materials.PaletteMaterial013}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={0x808080}
            />
          </mesh>
          <mesh
            name="Car_2-Turbo_V6_Engine_Asembly_Designing_6"
            geometry={
              nodes["Car_2-Turbo_V6_Engine_Asembly_Designing_6"].geometry
            }
            material={materials.PaletteMaterial014}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={0x808080}
            />
          </mesh>
          <mesh
            name="Car_2-Turbo_V6_Engine_Asembly_Designing_7"
            geometry={
              nodes["Car_2-Turbo_V6_Engine_Asembly_Designing_7"].geometry
            }
            material={materials.PaletteMaterial012}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={0x808080}
            />
          </mesh>
          <mesh
            name="Car_2-Turbo_V6_Engine_Asembly_Designing_8"
            geometry={
              nodes["Car_2-Turbo_V6_Engine_Asembly_Designing_8"].geometry
            }
            material={materials.PaletteMaterial015}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={0x000000}
            />
          </mesh>
          <mesh
            name="Car_2-Turbo_V6_Engine_Asembly_Designing_9"
            geometry={
              nodes["Car_2-Turbo_V6_Engine_Asembly_Designing_9"].geometry
            }
            material={materials.PaletteMaterial016}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={0x000000}
            />
          </mesh>
        </group>
        {/* 2jz */}
        <group
          name="engine_2JZ003"
          visible={engine === 3}
          position={[0, 0.423, -0.188]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.527}
        >
          <mesh
            name="Toyota2JZ"
            geometry={nodes.Toyota2JZ.geometry}
            material={materials.PaletteMaterial008}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              metalness={0.97}
              color={0xe3e1e1}
            />
          </mesh>
          <mesh
            name="Toyota2JZ_1"
            geometry={nodes.Toyota2JZ_1.geometry}
            material={materials.PaletteMaterial008}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              metalness={0.97}
              color={0xe3e1e1}
            />
          </mesh>
          <mesh
            name="Toyota2JZ_2"
            geometry={nodes.Toyota2JZ_2.geometry}
            material={materials.PaletteMaterial008}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              metalness={0.97}
              color={0x000000}
            />
          </mesh>
          <mesh
            name="Toyota2JZ_3"
            geometry={nodes.Toyota2JZ_3.geometry}
            material={materials.PaletteMaterial008}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={0x000000}
            />
          </mesh>
          <mesh
            name="Toyota2JZ_4"
            geometry={nodes.Toyota2JZ_4.geometry}
            material={materials.PaletteMaterial008}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={0xababab}
            />
          </mesh>
          <mesh
            name="Toyota2JZ_5"
            geometry={nodes.Toyota2JZ_5.geometry}
            material={materials.PaletteMaterial008}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={0x3447ed}
            />
          </mesh>
        </group>
        {/* D16 */}
        {/* Engine 001 : 337 to 0.301 */}
        <mesh
          visible={engine === 2}
          name="engine001"
          geometry={nodes.engine001.geometry}
          material={nodes.engine001.material}
          position={[0.016, 0.301, -0.157]}
          rotation={[0, 1.571, 0]}
          scale={0.001}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            color={0xababab}
          />
        </mesh>

        {/* Fender */}

        <mesh
          name="civic_fender_b"
          geometry={nodes.civic_fender_b.geometry}
          material={materials.PaletteMaterial001}
          rotation={[0, 1.571, 0]}
          scale={0.33}
          // onClick={() => {
          //   setSpoilerClick(false);
          //   setRimClick(false);
          //   setWindowClick(false);
          //   setBonnetClick(false);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(false);
          //   setSideKitClick(false);
          //   setWheelsClick(false);
          //   setBumperFrontClick(false);
          //   setBumperBackClick(false);
          //   setGrillClick(false);
          //   setEngineClick(false);
          //   setFenderClick(true);
          //   setDiffuserClick(false);
          //   setRoofClick(false);
          //   setSilencerClick(false);
          //   setTrunkClick(false);
          // }}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            color={fenderColor.color} // 2 corresponds to DoubleSide
          />
        </mesh>

        <mesh
          name="civic_fender_fl"
          geometry={nodes.civic_fender_fl.geometry}
          material={materials.PaletteMaterial001}
          rotation={[0, 1.571, 0]}
          scale={0.33}
          // onClick={() => {
          //   setSpoilerClick(false);
          //   setRimClick(false);
          //   setWindowClick(false);
          //   setBonnetClick(false);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(false);
          //   setSideKitClick(false);
          //   setWheelsClick(false);
          //   setBumperFrontClick(false);
          //   setBumperBackClick(false);
          //   setGrillClick(false);
          //   setEngineClick(false);
          //   setFenderClick(true);
          //   setDiffuserClick(false);
          //   setRoofClick(false);
          //   setSilencerClick(false);
          //   setTrunkClick(false);
          // }}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            color={fenderColor.color} // 2 corresponds to DoubleSide
          />
        </mesh>

        <mesh
          name="civic_fender_fr"
          geometry={nodes.civic_fender_fr.geometry}
          material={materials.PaletteMaterial001}
          rotation={[0, 1.571, 0]}
          scale={0.33}
          // onClick={() => {
          //   setSpoilerClick(false);
          //   setRimClick(false);
          //   setWindowClick(false);
          //   setBonnetClick(false);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(false);
          //   setSideKitClick(false);
          //   setWheelsClick(false);
          //   setBumperFrontClick(false);
          //   setBumperBackClick(false);
          //   setGrillClick(false);
          //   setEngineClick(false);
          //   setFenderClick(true);
          //   setDiffuserClick(false);
          //   setRoofClick(false);
          //   setSilencerClick(false);
          //   setTrunkClick(false);
          // }}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            color={fenderColor.color} // 2 corresponds to DoubleSide
          />
        </mesh>

        {/* Windows */}

        <mesh
          name="civic_window_f"
          geometry={nodes.civic_window_f.geometry}
          material={materials.PaletteMaterial001}
          rotation={[0, 1.571, 0]}
          scale={0.33}
          // onClick={() => {
          //   setSpoilerClick(false);
          //   setRimClick(false);
          //   setWindowClick(true);
          //   setBonnetClick(false);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(false);
          //   setSideKitClick(false);
          //   setWheelsClick(false);
          //   setBumperFrontClick(false);
          //   setBumperBackClick(false);
          //   setGrillClick(false);
          //   setEngineClick(false);
          //   setFenderClick(false);
          //   setDiffuserClick(false);
          //   setRoofClick(false);
          //   setSilencerClick(false);
          //   setTrunkClick(false);
          // }}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            color={windowColor.color} // 2 corresponds to DoubleSide
          />
        </mesh>

        <mesh
          name="civic_window_fr"
          geometry={nodes.civic_window_fr.geometry}
          material={materials.PaletteMaterial001}
          rotation={[0, 1.571, 0]}
          scale={0.33}
          // onClick={() => {
          //   setSpoilerClick(false);
          //   setRimClick(false);
          //   setWindowClick(true);
          //   setBonnetClick(false);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(false);
          //   setSideKitClick(false);
          //   setWheelsClick(false);
          //   setBumperFrontClick(false);
          //   setBumperBackClick(false);
          //   setGrillClick(false);
          //   setEngineClick(false);
          //   setFenderClick(false);
          //   setDiffuserClick(false);
          //   setRoofClick(false);
          //   setSilencerClick(false);
          //   setTrunkClick(false);
          // }}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            color={windowColor.color} // 2 corresponds to DoubleSide
          />
        </mesh>
        <mesh
          name="civic_window_br"
          geometry={nodes.civic_window_br.geometry}
          material={materials.PaletteMaterial001}
          rotation={[0, 1.571, 0]}
          scale={0.33}
          // onClick={() => {
          //   setSpoilerClick(false);
          //   setRimClick(false);
          //   setWindowClick(true);
          //   setBonnetClick(false);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(false);
          //   setSideKitClick(false);
          //   setWheelsClick(false);
          //   setBumperFrontClick(false);
          //   setBumperBackClick(false);
          //   setGrillClick(false);
          //   setEngineClick(false);
          //   setFenderClick(false);
          //   setDiffuserClick(false);
          //   setRoofClick(false);
          //   setSilencerClick(false);
          //   setTrunkClick(false);
          // }}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            color={windowColor.color} // 2 corresponds to DoubleSide
          />
        </mesh>
        <mesh
          name="civic_window_bl"
          geometry={nodes.civic_window_bl.geometry}
          material={materials.PaletteMaterial001}
          rotation={[0, 1.571, 0]}
          scale={0.33}
          // onClick={() => {
          //   setSpoilerClick(false);
          //   setRimClick(false);
          //   setWindowClick(true);
          //   setBonnetClick(false);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(false);
          //   setSideKitClick(false);
          //   setWheelsClick(false);
          //   setBumperFrontClick(false);
          //   setBumperBackClick(false);
          //   setGrillClick(false);
          //   setEngineClick(false);
          //   setFenderClick(false);
          //   setDiffuserClick(false);
          //   setRoofClick(false);
          //   setSilencerClick(false);
          //   setTrunkClick(false);
          // }}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            color={windowColor.color} // 2 corresponds to DoubleSide
          />
        </mesh>
        <mesh
          name="civic_window_fl"
          geometry={nodes.civic_window_fl.geometry}
          material={materials.PaletteMaterial001}
          rotation={[0, 1.571, 0]}
          scale={0.33}
          // onClick={() => {
          //   setSpoilerClick(false);
          //   setRimClick(false);
          //   setWindowClick(true);
          //   setBonnetClick(false);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(false);
          //   setSideKitClick(false);
          //   setWheelsClick(false);
          //   setBumperFrontClick(false);
          //   setBumperBackClick(false);
          //   setGrillClick(false);
          //   setEngineClick(false);
          //   setFenderClick(false);
          //   setDiffuserClick(false);
          //   setRoofClick(false);
          //   setSilencerClick(false);
          //   setTrunkClick(false);
          // }}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            color={windowColor.color} // 2 corresponds to DoubleSide
          />
        </mesh>

        <group
          name="civic_window_b"
          rotation={[0, 1.571, 0]}
          scale={0.33}
          // onClick={() => {
          //   setSpoilerClick(false);
          //   setRimClick(false);
          //   setWindowClick(true);
          //   setBonnetClick(false);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(false);
          //   setSideKitClick(false);
          //   setWheelsClick(false);
          //   setBumperFrontClick(false);
          //   setBumperBackClick(false);
          //   setGrillClick(false);
          //   setEngineClick(false);
          //   setFenderClick(false);
          //   setDiffuserClick(false);
          //   setRoofClick(false);
          //   setSilencerClick(false);
          //   setTrunkClick(false);
          // }}
        >
          <mesh
            name="Plane035"
            geometry={nodes.Plane035.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={windowColor.color} // 2 corresponds to DoubleSide
            />
          </mesh>
          <mesh
            name="Plane035_1"
            geometry={nodes.Plane035_1.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={windowColor.color} // 2 corresponds to DoubleSide
            />
          </mesh>
        </group>

        {/* Lights Emissive Only */}
        {/* Right taillight */}
        <mesh
          ref={rightTailLightRef}
          name="civic_taillight_r"
          geometry={nodes.civic_taillight_r.geometry}
          material={materials.PaletteMaterial001}
          rotation={[0, 1.571, 0]}
          scale={0.33}
        >
          <meshStandardMaterial
            color={new THREE.Color(0xdd0000)} // Red color
            opacity={0.5} // Set transparency level (1 = fully opaque, 0 = fully transparent)
            roughness={0.78}
            emissive={new THREE.Color(0xff0000)} // Bright red emissive color
            emissiveIntensity={1}
            envMapIntensity={10}
            side={THREE.DoubleSide}
            metalness={0.5}
          />
        </mesh>

        {/* Left taillight */}
        <mesh
          ref={leftTailLightRef}
          name="civic_taillight_l"
          geometry={nodes.civic_taillight_l.geometry}
          material={materials.PaletteMaterial001}
          rotation={[0, 1.571, 0]}
          scale={0.33}
        >
          <meshStandardMaterial
            color={new THREE.Color(0xdd0000)} // Red color
            opacity={0.5} // Set transparency level (1 = fully opaque, 0 = fully transparent)
            roughness={0.78}
            emissive={new THREE.Color(0xff0000)} // Bright red emissive color
            emissiveIntensity={1}
            envMapIntensity={10}
            side={THREE.DoubleSide}
            metalness={0.5}
          />
        </mesh>
        {/* Head Lights */}
        <group
          name="civic_headlight_r"
          rotation={[0, 1.571, 0]}
          scale={0.33}
          ref={rightHeadLightRef} // Attach ref here
        >
          {[
            "Plane064",
            "Plane064_1",
            "Plane064_2",
            "Plane064_3",
            "Plane064_4",
          ].map((plane, index) => (
            <mesh
              key={index}
              name={plane}
              geometry={nodes[plane].geometry}
              material={materials[`PaletteMaterial00${index + 1}`]} // Dynamically select material
            >
              <meshStandardMaterial
                color={new THREE.Color(0xecf011)} // Yellow color for left headlight
                opacity={0.5} // Set transparency level
                roughness={0.78}
                emissive={new THREE.Color(0xecf011)} // Bright yellow emissive color
                emissiveIntensity={1}
                envMapIntensity={10}
                side={THREE.DoubleSide}
                metalness={0.5}
              />
            </mesh>
          ))}
        </group>

        <group
          name="civic_headlight_l"
          rotation={[0, 1.571, 0]}
          scale={0.33}
          ref={leftHeadLightRef} // Attach ref here
        >
          {[
            "Plane065",
            "Plane065_1",
            "Plane065_2",
            "Plane065_3",
            "Plane065_4",
          ].map((plane, index) => (
            <mesh
              key={index}
              name={plane}
              geometry={nodes[plane].geometry}
              material={materials[`PaletteMaterial00${index + 1}`]} // Dynamically select material
            >
              <meshStandardMaterial
                color={new THREE.Color(0xecf011)} // Yellow color for left headlight
                opacity={0.5} // Set transparency level
                roughness={0.78}
                emissive={new THREE.Color(0xecf011)} // Bright yellow emissive color
                emissiveIntensity={1}
                envMapIntensity={10}
                side={THREE.DoubleSide}
                metalness={0.5}
              />
            </mesh>
          ))}
        </group>

        <mesh
          name="civic_indicators_f"
          geometry={nodes.civic_indicators_f.geometry}
          material={materials.PaletteMaterial001}
          rotation={[0, 1.571, 0]}
          scale={0.33}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={new THREE.Color(0x000000)} // emissive color as black
            envMapIntensity={1}
            side={THREE.DoubleSide} // Double-sided material
            color={0xff0303}
          />
        </mesh>

        {/* Side Mirrors & Link with Doors */}

        <group
          name="civic_door_fr"
          rotation={[0, 1.571, 0]}
          scale={0.33}
          // onClick={() => {
          //   setSpoilerClick(false);
          //   setRimClick(false);
          //   setWindowClick(false);
          //   setBonnetClick(false);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(true);
          //   setSideKitClick(false);
          //   setWheelsClick(false);
          //   setBumperFrontClick(false);
          //   setBumperBackClick(false);
          //   setGrillClick(false);
          //   setEngineClick(false);
          //   setFenderClick(false);
          //   setDiffuserClick(false);
          //   setRoofClick(false);
          //   setSilencerClick(false);
          //   setTrunkClick(false);
          //   }}
        >
          <mesh
            name="Plane029"
            geometry={nodes.Plane029.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={doorColor.color} // 2 corresponds to DoubleSide
            />
          </mesh>
          <mesh
            name="Plane029_1"
            geometry={nodes.Plane029_1.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={doorColor.color} // 2 corresponds to DoubleSide
            />
          </mesh>
        </group>

        <group
          name="civic_door_br"
          rotation={[0, 1.571, 0]}
          scale={0.33}
          // onClick={() => {
          //   setSpoilerClick(false);
          //   setRimClick(false);
          //   setWindowClick(false);
          //   setBonnetClick(false);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(true);
          //   setSideKitClick(false);
          //   setWheelsClick(false);
          //   setBumperFrontClick(false);
          //   setBumperBackClick(false);
          //   setGrillClick(false);
          //   setEngineClick(false);
          //   setFenderClick(false);
          //   setDiffuserClick(false);
          //   setRoofClick(false);
          //   setSilencerClick(false);
          //   setTrunkClick(false);
          //   }}
        >
          <mesh
            name="Plane030"
            geometry={nodes.Plane030.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={doorColor.color} // 2 corresponds to DoubleSide
            />
          </mesh>
          <mesh
            name="Plane030_1"
            geometry={nodes.Plane030_1.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={doorColor.color} // 2 corresponds to DoubleSide
            />
          </mesh>
        </group>
        <group name="civic_door_fl" rotation={[0, 1.571, 0]} scale={0.33}>
          <mesh
            name="Plane031"
            geometry={nodes.Plane031.geometry}
            material={materials.PaletteMaterial001}
            // onClick={() => {
            //   setSpoilerClick(false);
            //   setRimClick(false);
            //   setWindowClick(false);
            //   setBonnetClick(false);
            //   setLightClick(false);
            //   setCarBodyClick(false);
            //   setDoorClick(true);
            //   setSideKitClick(false);
            //   setWheelsClick(false);
            //   setBumperFrontClick(false);
            //   setBumperBackClick(false);
            //   setGrillClick(false);
            //   setEngineClick(false);
            //   setFenderClick(false);
            //   setDiffuserClick(false);
            //   setRoofClick(false);
            //   setSilencerClick(false);
            //   setTrunkClick(false);
            // }}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={doorColor.color} // 2 corresponds to DoubleSide
            />
          </mesh>
          <mesh
            name="Plane031_1"
            geometry={nodes.Plane031_1.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={doorColor.color} // 2 corresponds to DoubleSide
            />
          </mesh>
        </group>
        <group
          name="civic_door_bl"
          rotation={[0, 1.571, 0]}
          scale={0.33}
          // onClick={() => {
          //   setSpoilerClick(false);
          //   setRimClick(false);
          //   setWindowClick(false);
          //   setBonnetClick(false);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(true);
          //   setSideKitClick(false);
          //   setWheelsClick(false);
          //   setBumperFrontClick(false);
          //   setBumperBackClick(false);
          //   setGrillClick(false);
          //   setEngineClick(false);
          //   setFenderClick(false);
          //   setDiffuserClick(false);
          //   setRoofClick(false);
          //   setSilencerClick(false);
          //   setTrunkClick(false);
          //   }}
        >
          <mesh
            name="Plane032"
            geometry={nodes.Plane032.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={doorColor.color} // 2 corresponds to DoubleSide
            />
          </mesh>
          <mesh
            name="Plane032_1"
            geometry={nodes.Plane032_1.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={doorColor.color} // 2 corresponds to DoubleSide
            />
          </mesh>
        </group>

        <group
          name="civic_sidemirror_l"
          rotation={[0, 1.571, 0]}
          scale={0.33}
          // onClick={() => {
          //   setSpoilerClick(false);
          //   setRimClick(false);
          //   setWindowClick(false);
          //   setBonnetClick(false);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(true);
          //   setSideKitClick(false);
          //   setWheelsClick(false);
          //   setBumperFrontClick(false);
          //   setBumperBackClick(false);
          //   setGrillClick(false);
          //   setEngineClick(false);
          //   setFenderClick(false);
          //   setDiffuserClick(false);
          //   setRoofClick(false);
          //   setSilencerClick(false);
          //   setTrunkClick(false);
          //   }}
        >
          <mesh
            name="Plane019"
            geometry={nodes.Plane019.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={doorColor.color} // 2 corresponds to DoubleSide
            />
          </mesh>

          <mesh
            name="Plane019_1"
            geometry={nodes.Plane019_1.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={doorColor.color} // 2 corresponds to DoubleSide
            />
          </mesh>

          <mesh
            name="Plane019_2"
            geometry={nodes.Plane019_2.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
            />
          </mesh>
        </group>

        <group
          name="civic_sidemirror_r"
          rotation={[0, 1.571, 0]}
          scale={0.33}
          //  onClick={() => {
          //   setSpoilerClick(false);
          //   setRimClick(false);
          //   setWindowClick(false);
          //   setBonnetClick(false);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(true);
          //   setSideKitClick(false);
          //   setWheelsClick(false);
          //   setBumperFrontClick(false);
          //   setBumperBackClick(false);
          //   setGrillClick(false);
          //   setEngineClick(false);
          //   setFenderClick(false);
          //   setDiffuserClick(false);
          //   setRoofClick(false);
          //   setSilencerClick(false);
          //   setTrunkClick(false);
          //   }}
        >
          <mesh
            name="Plane020"
            geometry={nodes.Plane020.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={doorColor.color}
            />
          </mesh>
          <mesh
            name="Plane020_1"
            geometry={nodes.Plane020_1.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={doorColor.color}
            />
          </mesh>
          <mesh
            name="Plane020_2"
            geometry={nodes.Plane020_2.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
            />
          </mesh>
        </group>

        {/* Roof */}
        <mesh
          name="civic_roof"
          geometry={nodes.civic_roof.geometry}
          material={materials.PaletteMaterial001}
          rotation={[0, 1.571, 0]}
          scale={0.33}
          // onClick={() => {
          //   setSpoilerClick(false);
          //   setRimClick(false);
          //   setWindowClick(false);
          //   setBonnetClick(false);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(false);
          //   setSideKitClick(false);
          //   setWheelsClick(false);
          //   setBumperFrontClick(false);
          //   setBumperBackClick(false);
          //   setGrillClick(false);
          //   setEngineClick(false);
          //   setFenderClick(false);
          //   setDiffuserClick(false);
          //   setRoofClick(true);
          //   setSilencerClick(false);
          //   setTrunkClick(false);
          // }}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            color={roofColor.color} // 2 corresponds to DoubleSide
          />
        </mesh>

        {/* Bumper Front + grill_f */}
        <mesh
          name="civic_grill_f"
          geometry={nodes.civic_grill_f.geometry}
          material={materials.PaletteMaterial001}
          rotation={[0, 1.571, 0]}
          scale={0.33}
          // onClick={() => {
          //   setSpoilerClick(false);
          //   setRimClick(false);
          //   setWindowClick(false);
          //   setBonnetClick(false);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(false);
          //   setSideKitClick(false);
          //   setWheelsClick(false);
          //   setBumperFrontClick(true);
          //   setBumperBackClick(false);
          //   setGrillClick(true);
          //   setEngineClick(false);
          //   setFenderClick(false);
          //   setDiffuserClick(false);
          //   setRoofClick(false);
          //   setSilencerClick(false);
          //   setTrunkClick(false);
          // }}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            color={bumperFrontColor.color} // 2 corresponds to DoubleSide
          />
        </mesh>

        <group
          name="civic_bumber_f"
          rotation={[0, 1.571, 0]}
          scale={0.33}
          //  onClick={() => {
          //   setSpoilerClick(false);
          //   setRimClick(false);
          //   setWindowClick(false);
          //   setBonnetClick(false);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(false);
          //   setSideKitClick(false);
          //   setWheelsClick(false);
          //   setBumperFrontClick(true);
          //   setBumperBackClick(false);
          //   setGrillClick(true);
          //   setEngineClick(false);
          //   setFenderClick(false);
          //   setDiffuserClick(false);
          //   setRoofClick(false);
          //   setSilencerClick(false);
          //   setTrunkClick(false);
          // }}
        >
          <mesh
            name="Plane021"
            geometry={nodes.Plane021.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={bumperFrontColor.color} // 2 corresponds to DoubleSide
            />
          </mesh>
          <mesh
            name="Plane021_1"
            geometry={nodes.Plane021_1.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={bonnetColor.color} // 2 corresponds to DoubleSide
            />
          </mesh>
          <mesh
            name="Plane021_2"
            geometry={nodes.Plane021_2.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={bumperFrontColor.color} // 2 corresponds to DoubleSide
            />
          </mesh>
          <mesh
            name="Plane021_3"
            geometry={nodes.Plane021_3.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={bumperFrontColor.color} // 2 corresponds to DoubleSide
            />
          </mesh>
        </group>

        <group
          name="civic_splitter"
          rotation={[0, 1.571, 0]}
          scale={0.33}
          // onClick={() => {
          //   setSpoilerClick(false);
          //   setRimClick(false);
          //   setWindowClick(false);
          //   setBonnetClick(false);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(false);
          //   setSideKitClick(false);
          //   setWheelsClick(false);
          //   setBumperFrontClick(true);
          //   setBumperBackClick(false);
          //   setGrillClick(true);
          //   setEngineClick(false);
          //   setFenderClick(false);
          //   setDiffuserClick(false);
          //   setRoofClick(false);
          //   setSilencerClick(false);
          //   setTrunkClick(false);
          // }}
        >
          <mesh
            name="Plane022"
            geometry={nodes.Plane022.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={bumperFrontColor.color}
            />
          </mesh>
          <mesh
            name="Plane022_1"
            geometry={nodes.Plane022_1.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
            />
          </mesh>
        </group>

        {/* Trunk */}
        <group
          name="civic_trunk"
          rotation={[0, 1.571, 0]}
          scale={0.33}
          //  onClick={() => {
          //   setSpoilerClick(false);
          //   setRimClick(false);
          //   setWindowClick(false);
          //   setBonnetClick(false);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(false);
          //   setSideKitClick(false);
          //   setWheelsClick(false);
          //   setBumperFrontClick(false);
          //   setBumperBackClick(false);
          //   setGrillClick(false);
          //   setEngineClick(false);
          //   setFenderClick(false);
          //   setDiffuserClick(false);
          //   setRoofClick(false);
          //   setSilencerClick(false);
          //   setTrunkClick(true);
          // }}
        >
          <mesh
            name="Plane051"
            geometry={nodes.Plane051.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={trunkColor.color} // 2 corresponds to DoubleSide
            />
          </mesh>
          <mesh
            name="Plane051_1"
            geometry={nodes.Plane051_1.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={trunkColor.color} // 2 corresponds to DoubleSide
            />
          </mesh>
          <mesh
            name="Plane051_2"
            geometry={nodes.Plane051_2.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={trunkColor.color} // 2 corresponds to DoubleSide
            />
          </mesh>
          <mesh
            name="Plane051_3"
            geometry={nodes.Plane051_3.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={trunkColor.color} // 2 corresponds to DoubleSide
            />
          </mesh>
          <mesh
            name="Plane051_4"
            geometry={nodes.Plane051_4.geometry}
            material={materials.PaletteMaterial002}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={trunkColor.color} // 2 corresponds to DoubleSide
            />
          </mesh>
        </group>

        {/* Radiator Grill */}
        <mesh
          name="civic_radiatorgrill"
          geometry={nodes.civic_radiatorgrill.geometry}
          material={materials.PaletteMaterial001}
          rotation={[0, 1.571, 0]}
          scale={0.33}
          // onClick={() => {
          //   setSpoilerClick(false);
          //   setRimClick(false);
          //   setWindowClick(false);
          //   setBonnetClick(false);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(false);
          //   setSideKitClick(false);
          //   setWheelsClick(false);
          //   setBumperFrontClick(true);
          //   setBumperBackClick(false);
          //   setGrillClick(true);
          //   setEngineClick(false);
          //   setFenderClick(false);
          //   setDiffuserClick(false);
          //   setRoofClick(false);
          //   setSilencerClick(false);
          //   setTrunkClick(false);
          // }}
        >
          <meshStandardMaterial
            metalness={0.1}
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            color={grillColor.color} // 2 corresponds to DoubleSide
          />
        </mesh>

        {/* SideSkirt and SideKits */}
        <mesh
          name="civic_sideskirt_l"
          geometry={nodes.civic_sideskirt_l.geometry}
          material={materials.PaletteMaterial001}
          rotation={[0, 1.571, 0]}
          scale={0.33}

          // onClick={() => {
          //   setSpoilerClick(false);
          //   setRimClick(false);
          //   setWindowClick(false);
          //   setBonnetClick(false);
          //   setLightClick(false);
          //   setCarBodyClick(false);
          //   setDoorClick(false);
          //   setSideKitClick(false);
          //   setWheelsClick(false);
          //   setBumperFrontClick(false);
          //   setBumperBackClick(false);
          //   setGrillClick(false);
          //   setEngineClick(false);
          //   setFenderClick(false);
          //   setDiffuserClick(false);
          //   setRoofClick(false);
          //   setSilencerClick(false);
          //   setTrunkClick(false);
          // }}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            color={sideKitColor.color} // 2 corresponds to DoubleSide
          />
        </mesh>

        <mesh
          name="civic_sidekit_r"
          geometry={nodes.civic_sidekit_r.geometry}
          material={materials.PaletteMaterial001}
          rotation={[0, 1.571, 0]}
          scale={0.33}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            color={sideKitColor.color}
          />
        </mesh>

        <group
          name="civic_sidekit_l"
          position={[0.028, 0, 0]}
          rotation={[0, 1.571, 0]}
          scale={0.33}
          visible={sideKit === 1}
        >
          <mesh
            name="Plane090"
            geometry={nodes.Plane090.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={sideKitColor.color}
            />
          </mesh>
          <mesh
            name="Plane090_1"
            geometry={nodes.Plane090_1.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={sideKitColor.color}
            />
          </mesh>
        </group>

        <group
          name="civic_sideskirt_r"
          position={[-0.027, 0, 0]}
          rotation={[0, 1.571, 0]}
          scale={0.33}
          visible={sideKit === 1}
        >
          <mesh
            name="Plane089"
            geometry={nodes.Plane089.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={sideKitColor.color}
            />
          </mesh>
          <mesh
            name="Plane089_1"
            geometry={nodes.Plane089_1.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={sideKitColor.color}
            />
          </mesh>
        </group>
        {/* Roof Spoiler + Teeth */}
        <mesh
          name="civic_roofspoiler"
          geometry={nodes.civic_roofspoiler.geometry}
          material={materials.PaletteMaterial001}
          rotation={[0, 1.571, 0]}
          scale={0.33}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            color={0x000000}
          />
        </mesh>
        <mesh
          name="civic_roofspoiler_teeth"
          geometry={nodes.civic_roofspoiler_teeth.geometry}
          material={materials.PaletteMaterial001}
          rotation={[0, 1.571, 0]}
          scale={0.33}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            color={0xe3e1e1}
          />
        </mesh>

        {/* Logo */}
        <mesh
          name="civic_honda_logo_f"
          geometry={nodes.civic_honda_logo_f.geometry}
          material={materials.PaletteMaterial001}
          rotation={[0, 1.571, 0]}
          scale={0.33}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            color={0x000000}
          />
        </mesh>

        <mesh
          name="civic_honda_logo_b"
          geometry={nodes.civic_honda_logo_b.geometry}
          material={materials.PaletteMaterial001}
          rotation={[0, 1.571, 0]}
          scale={0.33}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            color={0x000000}
          />
        </mesh>

        {/* Brake Lights TODO: Add Red Here*/}
        <group name="civic_brakelight_r" rotation={[0, 1.571, 0]} scale={0.33}>
          <mesh
            name="Plane059"
            geometry={nodes.Plane059.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
            />
          </mesh>
          <mesh
            name="Plane059_1"
            geometry={nodes.Plane059_1.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
            />
          </mesh>
          <mesh
            name="Plane059_2"
            geometry={nodes.Plane059_2.geometry}
            material={materials.PaletteMaterial002}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
            />
          </mesh>
          <mesh
            name="Plane059_3"
            geometry={nodes.Plane059_3.geometry}
            material={materials.PaletteMaterial005}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
            />
          </mesh>
          <mesh
            name="Plane059_4"
            geometry={nodes.Plane059_4.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
            />
          </mesh>
        </group>
        <group name="civic_brakelight_l" rotation={[0, 1.571, 0]} scale={0.33}>
          <mesh
            name="Plane060"
            geometry={nodes.Plane060.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
            />
          </mesh>
          <mesh
            name="Plane060_1"
            geometry={nodes.Plane060_1.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
            />
          </mesh>
          <mesh
            name="Plane060_2"
            geometry={nodes.Plane060_2.geometry}
            material={materials.PaletteMaterial002}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
            />
          </mesh>
          <mesh
            name="Plane060_3"
            geometry={nodes.Plane060_3.geometry}
            material={materials.PaletteMaterial005}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
            />
          </mesh>
          <mesh
            name="Plane060_4"
            geometry={nodes.Plane060_4.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
            />
          </mesh>
        </group>

        {/* Body Components */}
        <group name="civic_body" rotation={[0, 1.571, 0]} scale={0.33}>
          <mesh
            name="Plane041"
            geometry={nodes.Plane041.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={0x000000}
            />
          </mesh>
          <mesh
            name="Plane041_1"
            geometry={nodes.Plane041_1.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={0x000000}
            />
          </mesh>
          <mesh
            name="Plane041_2"
            geometry={nodes.Plane041_2.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={0x000000}
            />
          </mesh>
          <mesh
            name="Plane041_3"
            geometry={nodes.Plane041_3.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={0x000000}
            />
          </mesh>
          <mesh
            name="Plane041_4"
            geometry={nodes.Plane041_4.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={0x000000}
            />
          </mesh>
          <mesh
            name="Plane041_5"
            geometry={nodes.Plane041_5.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={0x000000}
            />
          </mesh>
          <mesh
            name="Plane041_6"
            geometry={nodes.Plane041_6.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={0x000000}
            />
          </mesh>
        </group>

        {/* Back Bumper */}

        <group name="civic_bumper_b" rotation={[0, 1.571, 0]} scale={0.33}>
          <mesh
            name="Plane048"
            geometry={nodes.Plane048.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={bumperBackColor.color}
            />
          </mesh>
          <mesh
            name="Plane048_1"
            geometry={nodes.Plane048_1.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={bumperBackColor.color}
            />
          </mesh>
          <mesh
            name="Plane048_2"
            geometry={nodes.Plane048_2.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={bumperBackColor.color}
            />
          </mesh>
        </group>

        {/* Silencer */}
        <mesh
          name="civic_silencer002"
          visible={silencer === 3}
          geometry={nodes.civic_silencer002.geometry}
          material={materials.PaletteMaterial001}
          rotation={[0, 1.571, 0]}
          scale={0.33}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            metalness={0.9}
            color={0x8e8e8e}
          />
        </mesh>

        <mesh
          name="civic_silencer003_lowered"
          visible={silencer === 4}
          geometry={nodes.civic_silencer003_lowered.geometry}
          material={materials.PaletteMaterial001}
          position={[0, -0.047, 0]}
          rotation={[0, 1.571, 0]}
          scale={0.33}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            metalness={0.9}
            color={0x8e8e8e}
          />
        </mesh>

        <mesh
          name="civic_silencer001"
          visible={silencer === 1}
          geometry={nodes.civic_silencer001.geometry}
          material={materials.PaletteMaterial001}
          position={[0.001, 0.197, -2.656]}
          rotation={[0, 1.571, 0]}
          scale={0.33}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            metalness={0.9}
            color={0x8e8e8e}
          />
        </mesh>

        <mesh
          name="civic_silencer001_lowered"
          visible={silencer === 2}
          geometry={nodes.civic_silencer001_lowered.geometry}
          material={materials.PaletteMaterial001}
          position={[0.001, 0.154, -2.656]}
          rotation={[0, 1.571, 0]}
          scale={0.33}
        >
          <meshStandardMaterial
            roughness={0.1}
            emissive={0x000000} // emissive color as black
            envMapIntensity={1}
            side={2} // 2 corresponds to DoubleSide
            metalness={0.9}
            color={0x8e8e8e}
          />
        </mesh>

        {/* Diffusers */}
        <group
          name="civic_reardiffuser002"
          position={[0, 0.018, 0]}
          rotation={[0, 1.571, 0]}
          scale={0.33}
          visible={diffuser === 2}
        >
          <mesh
            name="Plane005"
            geometry={nodes.Plane005.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={diffuserColor.color}
            />
          </mesh>
          <mesh
            name="Plane005_1"
            geometry={nodes.Plane005_1.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={diffuserColor.color}
            />
          </mesh>
        </group>

        <group
          name="civic_reardiffuser000"
          visible={diffuser === 0}
          rotation={[0, 1.571, 0]}
          scale={0.33}
        >
          <mesh
            name="Plane004"
            geometry={nodes.Plane004.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={diffuserColor.color}
            />
          </mesh>
          <mesh
            name="Plane004_1"
            geometry={nodes.Plane004_1.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={diffuserColor.color}
            />
          </mesh>
        </group>

        <group
          name="civic_reardiffuser001"
          visible={diffuser === 1}
          position={[0, 0.051, 0]}
          rotation={[0, 1.571, 0]}
          scale={0.33}
        >
          <mesh
            name="Plane049"
            geometry={nodes.Plane049.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={diffuserColor.color}
            />
          </mesh>
          <mesh
            name="Plane049_1"
            geometry={nodes.Plane049_1.geometry}
            material={materials.PaletteMaterial001}
          >
            <meshStandardMaterial
              roughness={0.1}
              emissive={0x000000} // emissive color as black
              envMapIntensity={1}
              side={2} // 2 corresponds to DoubleSide
              color={diffuserColor.color}
            />
          </mesh>
        </group>

        {/* Wheel */}
        <group name="0_wheel" visible={wheels === 0}>
          <group name="civic_tyre_0_bl" rotation={[0, 1.571, 0]} scale={0.33}>
            <mesh
              name="Plane054"
              geometry={nodes.Plane054.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={0x00000}
              />
            </mesh>
            <mesh
              name="Plane054_1"
              geometry={nodes.Plane054_1.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={rimColor.color}
              />
            </mesh>
            <mesh
              name="Plane054_2"
              geometry={nodes.Plane054_2.geometry}
              material={materials.PaletteMaterial003}
            >
              <meshStandardMaterial
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={0x00000}
              />
            </mesh>
            <mesh
              name="Plane054_3"
              geometry={nodes.Plane054_3.geometry}
              material={materials.PaletteMaterial004}
            >
              <meshStandardMaterial
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={0x000000}
              />
            </mesh>
            <mesh
              name="Plane054_4"
              geometry={nodes.Plane054_4.geometry}
              material={materials.caliper}
            >
              <meshStandardMaterial
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={0x000000}
              />
            </mesh>
            <mesh
              name="Plane054_5"
              geometry={nodes.Plane054_5.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={0x00000}
              />
            </mesh>
          </group>
          
          <group name="civic_tyre_0_fl" rotation={[0, 1.571, 0]} scale={0.33}>
            <mesh
              name="Plane056"
              geometry={nodes.Plane056.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={0x00000}
              />
            </mesh>
            <mesh
              name="Plane056_1"
              geometry={nodes.Plane056_1.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={rimColor.color}
              />
            </mesh>
            <mesh
              name="Plane056_2"
              geometry={nodes.Plane056_2.geometry}
              material={materials.PaletteMaterial003}
            >
              <meshStandardMaterial
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={0x00000}
              />
            </mesh>
            <mesh
              name="Plane056_3"
              geometry={nodes.Plane056_3.geometry}
              material={materials.PaletteMaterial004}
            >
              <meshStandardMaterial
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={0x00000}
              />
            </mesh>
            <mesh
              name="Plane056_4"
              geometry={nodes.Plane056_4.geometry}
              material={materials.caliper}
            >
              <meshStandardMaterial
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={0x00000}
              />
            </mesh>
            <mesh
              name="Plane056_5"
              geometry={nodes.Plane056_5.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={0x00000}
              />
            </mesh>
          </group>
          <group
            name="civic_tyre_0_fr"
            position={[-0.544, 0.235, -0.261]}
            rotation={[0, 1.571, 0]}
            scale={0.33}
          >
            <mesh
              name="Plane057"
              geometry={nodes.Plane057.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane057_1"
              geometry={nodes.Plane057_1.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial

                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={rimColor.color}
              />
            </mesh>
            <mesh
              name="Plane057_2"
              geometry={nodes.Plane057_2.geometry}
              material={materials.PaletteMaterial003}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane057_3"
              geometry={nodes.Plane057_3.geometry}
              material={materials.PaletteMaterial004}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane057_4"
              geometry={nodes.Plane057_4.geometry}
              material={materials.caliper}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane057_5"
              geometry={nodes.Plane057_5.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
          </group>
          <group name="civic_tyre_0_br" rotation={[0, 1.571, 0]} scale={0.33}>
            <mesh
              name="Plane058"
              geometry={nodes.Plane058.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane058_1"
              geometry={nodes.Plane058_1.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={rimColor.color}
              
              />
            </mesh>
            <mesh
              name="Plane058_2"
              geometry={nodes.Plane058_2.geometry}
              material={materials.PaletteMaterial003}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane058_3"
              geometry={nodes.Plane058_3.geometry}
              material={materials.PaletteMaterial004}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane058_4"
              geometry={nodes.Plane058_4.geometry}
              material={materials.caliper}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane058_5"
              geometry={nodes.Plane058_5.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
          </group>
        </group>

        <group name="5_wheel" visible={wheels === 1}>
          <group
            name="civic_tyre_5_fr"
            position={[-0.544, 0.235, -0.261]}
            rotation={[Math.PI / 2, 1.484, -Math.PI / 2]}
            scale={0.33}
          >
            <mesh
              name="Plane057"
              geometry={nodes.Plane057.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane057_1"
              geometry={nodes.Plane057_1.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={rimColor.color}
              />
            </mesh>
            <mesh
              name="Plane057_2"
              geometry={nodes.Plane057_2.geometry}
              material={materials.PaletteMaterial003}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane057_3"
              geometry={nodes.Plane057_3.geometry}
              material={materials.PaletteMaterial004}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane057_4"
              geometry={nodes.Plane057_4.geometry}
              material={materials.caliper}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane057_5"
              geometry={nodes.Plane057_5.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
          </group>
          <group
            name="civic_tyre_5_br"
            position={[-0.544, 0.235, -2.11]}
            rotation={[Math.PI / 2, 1.484, -Math.PI / 2]}
            scale={0.33}
          >
            <mesh
              name="Plane055"
              geometry={nodes.Plane055.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane055_1"
              geometry={nodes.Plane055_1.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial

                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={rimColor.color}
              />
            </mesh>
            <mesh
              name="Plane055_2"
              geometry={nodes.Plane055_2.geometry}
              material={materials.PaletteMaterial003}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane055_3"
              geometry={nodes.Plane055_3.geometry}
              material={materials.PaletteMaterial004}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane055_4"
              geometry={nodes.Plane055_4.geometry}
              material={materials.caliper}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane055_5"
              geometry={nodes.Plane055_5.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
          </group>
          <group
            name="civic_tyre_5_fl"
            position={[0.545, 0.235, -0.261]}
            rotation={[-Math.PI / 2, 1.484, Math.PI / 2]}
            scale={0.33}
          >
            <mesh
              name="Plane061"
              geometry={nodes.Plane061.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane061_1"
              geometry={nodes.Plane061_1.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial

                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={rimColor.color}
              />
            </mesh>
            <mesh
              name="Plane061_2"
              geometry={nodes.Plane061_2.geometry}
              material={materials.PaletteMaterial003}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane061_3"
              geometry={nodes.Plane061_3.geometry}
              material={materials.PaletteMaterial004}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane061_4"
              geometry={nodes.Plane061_4.geometry}
              material={materials.caliper}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane061_5"
              geometry={nodes.Plane061_5.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
          </group>
          <group
            name="civic_tyre_5_bl"
            position={[0.545, 0.235, -2.11]}
            rotation={[-Math.PI / 2, 1.484, Math.PI / 2]}
            scale={0.33}
          >
            <mesh
              name="Plane062"
              geometry={nodes.Plane062.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane062_1"
              geometry={nodes.Plane062_1.geometry}
              material={materials.PaletteMaterial001}
              
            >
              <meshStandardMaterial
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={rimColor.color}
              />
            </mesh>
            <mesh
              name="Plane062_2"
              geometry={nodes.Plane062_2.geometry}
              material={materials.PaletteMaterial003}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane062_3"
              geometry={nodes.Plane062_3.geometry}
              material={materials.PaletteMaterial004}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane062_4"
              geometry={nodes.Plane062_4.geometry}
              material={materials.caliper}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane062_5"
              geometry={nodes.Plane062_5.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
          </group>
        </group>

        <group name="10_wheel" visible={wheels === 2}>
          <group
            name="civic_tyre_10_fr"
            position={[-0.548, 0.235, -0.261]}
            rotation={[Math.PI / 2, 1.396, -Math.PI / 2]}
            scale={0.33}
          >
            <mesh
              name="Plane057"
              geometry={nodes.Plane057.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane057_1"
              geometry={nodes.Plane057_1.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial

                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={rimColor.color}
              />
            </mesh>
            <mesh
              name="Plane057_2"
              geometry={nodes.Plane057_2.geometry}
              material={materials.PaletteMaterial003}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane057_3"
              geometry={nodes.Plane057_3.geometry}
              material={materials.PaletteMaterial004}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane057_4"
              geometry={nodes.Plane057_4.geometry}
              material={materials.caliper}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane057_5"
              geometry={nodes.Plane057_5.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
          </group>
          <group
            name="civic_tyre_10_br"
            position={[-0.548, 0.235, -2.11]}
            rotation={[Math.PI / 2, 1.396, -Math.PI / 2]}
            scale={0.33}
          >
            <mesh
              name="Plane055"
              geometry={nodes.Plane055.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane055_1"
              geometry={nodes.Plane055_1.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={rimColor.color}
              />
            </mesh>
            <mesh
              name="Plane055_2"
              geometry={nodes.Plane055_2.geometry}
              material={materials.PaletteMaterial003}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane055_3"
              geometry={nodes.Plane055_3.geometry}
              material={materials.PaletteMaterial004}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane055_4"
              geometry={nodes.Plane055_4.geometry}
              material={materials.caliper}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane055_5"
              geometry={nodes.Plane055_5.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
          </group>
          <group
            name="civic_tyre_10_fl"
            position={[0.549, 0.235, -0.261]}
            rotation={[-Math.PI / 2, 1.396, Math.PI / 2]}
            scale={0.33}
          >
            <mesh
              name="Plane061"
              geometry={nodes.Plane061.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane061_1"
              geometry={nodes.Plane061_1.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial

                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={rimColor.color}
              />
            </mesh>
            <mesh
              name="Plane061_2"
              geometry={nodes.Plane061_2.geometry}
              material={materials.PaletteMaterial003}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane061_3"
              geometry={nodes.Plane061_3.geometry}
              material={materials.PaletteMaterial004}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane061_4"
              geometry={nodes.Plane061_4.geometry}
              material={materials.caliper}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane061_5"
              geometry={nodes.Plane061_5.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
          </group>
          <group
            name="civic_tyre_10_bl"
            position={[0.549, 0.235, -2.11]}
            rotation={[-Math.PI / 2, 1.396, Math.PI / 2]}
            scale={0.33}
          >
            <mesh
              name="Plane062"
              geometry={nodes.Plane062.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane062_1"
              geometry={nodes.Plane062_1.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={rimColor.color}
              />
            </mesh>
            <mesh
              name="Plane062_2"
              geometry={nodes.Plane062_2.geometry}
              material={materials.PaletteMaterial003}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane062_3"
              geometry={nodes.Plane062_3.geometry}
              material={materials.PaletteMaterial004}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane062_4"
              geometry={nodes.Plane062_4.geometry}
              material={materials.caliper}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane062_5"
              geometry={nodes.Plane062_5.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
          </group>
        </group>

        <group name="15_wheel" visible={wheels === 3}>
          <group
            name="civic_tyre_15_fr"
            position={[-0.561, 0.235, -0.261]}
            rotation={[Math.PI / 2, 1.309, -Math.PI / 2]}
            scale={0.33}
          >
            <mesh
              name="Plane057"
              geometry={nodes.Plane057.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane057_1"
              geometry={nodes.Plane057_1.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial

                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={rimColor.color}
              />
            </mesh>
            <mesh
              name="Plane057_2"
              geometry={nodes.Plane057_2.geometry}
              material={materials.PaletteMaterial003}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane057_3"
              geometry={nodes.Plane057_3.geometry}
              material={materials.PaletteMaterial004}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane057_4"
              geometry={nodes.Plane057_4.geometry}
              material={materials.caliper}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane057_5"
              geometry={nodes.Plane057_5.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
          </group>

          <group
            name="civic_tyre_15_br"
            position={[-0.561, 0.235, -2.11]}
            rotation={[Math.PI / 2, 1.309, -Math.PI / 2]}
            scale={0.33}
          >
            <mesh
              name="Plane055"
              geometry={nodes.Plane055.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane055_1"
              geometry={nodes.Plane055_1.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={rimColor.color}
              />
            </mesh>
            <mesh
              name="Plane055_2"
              geometry={nodes.Plane055_2.geometry}
              material={materials.PaletteMaterial003}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane055_3"
              geometry={nodes.Plane055_3.geometry}
              material={materials.PaletteMaterial004}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane055_4"
              geometry={nodes.Plane055_4.geometry}
              material={materials.caliper}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane055_5"
              geometry={nodes.Plane055_5.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
          </group>

          <group
            name="civic_tyre_15_fl"
            position={[0.561, 0.235, -0.261]}
            rotation={[-Math.PI / 2, 1.309, Math.PI / 2]}
            scale={0.33}
          >
            <mesh
              name="Plane061"
              geometry={nodes.Plane061.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane061_1"
              geometry={nodes.Plane061_1.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={rimColor.color}
              />
            </mesh>
            <mesh
              name="Plane061_2"
              geometry={nodes.Plane061_2.geometry}
              material={materials.PaletteMaterial003}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane061_3"
              geometry={nodes.Plane061_3.geometry}
              material={materials.PaletteMaterial004}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane061_4"
              geometry={nodes.Plane061_4.geometry}
              material={materials.caliper}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane061_5"
              geometry={nodes.Plane061_5.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
          </group>

          <group
            name="civic_tyre_15_bl"
            position={[0.561, 0.235, -2.11]}
            rotation={[-Math.PI / 2, 1.309, Math.PI / 2]}
            scale={0.33}
          >
            <mesh
              name="Plane062"
              geometry={nodes.Plane062.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane062_1"
              geometry={nodes.Plane062_1.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial

                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
                color={rimColor.color}
              />
            </mesh>
            <mesh
              name="Plane062_2"
              geometry={nodes.Plane062_2.geometry}
              material={materials.PaletteMaterial003}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane062_3"
              geometry={nodes.Plane062_3.geometry}
              material={materials.PaletteMaterial004}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane062_4"
              geometry={nodes.Plane062_4.geometry}
              material={materials.caliper}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
            <mesh
              name="Plane062_5"
              geometry={nodes.Plane062_5.geometry}
              material={materials.PaletteMaterial001}
            >
              <meshStandardMaterial
 color={0x00000}
                roughness={0.1}
                emissive={0x000000} // emissive color as black
                envMapIntensity={1}
                side={2} // 2 corresponds to DoubleSide
              />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("../../../public/assets/models/Civic_v1.2.gltf");
