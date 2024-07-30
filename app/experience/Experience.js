"use client";
import { Backdrop, OrbitControls, Plane, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Gramaphone from "./Gramaphone";
import { Scene } from "three";
import Lights from "./lights/Lights";

const Experience = () => {
  return (
    <Canvas
      camera={{
        position: [2, 3, 8],
        fov: 70,
        near: 0.1,
        far: 1000,
      }}
      shadows
    >
      <Lights />
      <OrbitControls />
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial attach="material" color="white" />
        <planeGeometry attach="geometry" args={[100, 100]} />
      </mesh>
      <Gramaphone />
    </Canvas>
  );
};

export default Experience;
