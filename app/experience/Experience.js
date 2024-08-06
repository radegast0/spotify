"use client";
import React, { Suspense, useEffect } from "react";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";

import Interior from "./Interior";
import Computers from "./Computers";
import Light from "./Light";
import VinylPlayer from "./VinylPlayer";
import Cover from "./Cover";
import VinylBox from "./VinylBox";

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
      {/* <VinylBox /> */}
      <Computers />
      <ambientLight intensity={1} />
      <VinylPlayer />
      <Light />
      <Interior />
      <OrbitControls />

      <VinylBox />
      <Suspense>
        <Cover />
      </Suspense>
    </Canvas>
  );
};

export default Experience;
