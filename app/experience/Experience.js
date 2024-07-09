"use client";
import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

const Experience = () => {
  return (
    <Canvas className="z-0">
      <OrbitControls />
      <Stage>
        <mesh>
          <meshBasicMaterial color="hotpink" />
          <boxGeometry />
        </mesh>
        <mesh>
          <meshBasicMaterial color="hotpink" />
          <boxGeometry />
        </mesh>
      </Stage>
    </Canvas>
  );
};

export default Experience;
