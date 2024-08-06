"use client";
import React, { Suspense, useEffect } from "react";
import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";

import Interior from "./Interior";
import Computers from "./Computers";
import Light from "./Light";
import VinylPlayer from "./VinylPlayer";
import Cover from "./Cover";
import VinylBox from "./VinylBox";
import { VinylDiskInner, VinylDiskOuter } from "./VinylDisk";

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
      <Environment preset="warehouse" environmentIntensity={0.3} />
      <Computers />
      <VinylPlayer />
      <Light />
      <Interior />
      <OrbitControls />

      <VinylBox />
      <VinylDiskOuter />

      <Suspense>
        <VinylDiskInner />
        <Cover />
      </Suspense>
    </Canvas>
  );
};

export default Experience;
