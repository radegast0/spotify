"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

import Interior from "./Interior";
import Computers from "./Computers";

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
      {/* <Test /> */}
      {/* <Test2 /> */}
      <Computers />
      <ambientLight intensity={1} />
      {/* <spotLight castShadow position={[1, 7, 1]} intensity={15} /> */}
      <Interior />
      <OrbitControls />
    </Canvas>
  );
};

export default Experience;
