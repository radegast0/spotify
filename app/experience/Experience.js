"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

const Experience = () => {
  return (
    <Canvas
      camera={{
        position: [-8, 0, 12],
        fov: 75,
        near: 0.1,
        far: 1000,
      }}
    >
      <Scene />
    </Canvas>
  );
};

export default Experience;
