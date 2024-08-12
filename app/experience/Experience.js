"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { Loader } from "@react-three/drei";

const Experience = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Canvas
          camera={{
            position: [-6, 0.5, 6],
            fov: 75,
            near: 0.1,
            far: 100,
          }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </>
  );
};

export default Experience;
