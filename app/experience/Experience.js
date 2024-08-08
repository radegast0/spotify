"use client";
import React, { Suspense, useEffect, useRef } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import Scene from "./Scene";

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
      <Scene />
    </Canvas>
  );
};

export default Experience;
