"use client";
import React from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Interior from "./Interior";
import Computers from "./Computers";
import Screen from "./Screen";



const Experience = () => {
  return (
    <Canvas
      camera={{
        position: [2, 3, 8],
        fov: 75,
        near: 0.1,
        far: 1000,
      }}
      shadows
    >
      <Screen />
      <Computers />
      <ambientLight intensity={1} />
      <Interior />
      <OrbitControls />
    </Canvas>
  );
};

export default Experience;
