"use client";
import { Environment, OrbitControls } from "@react-three/drei";
import React, { Suspense, useRef } from "react";
import Computers from "./Computers";
import VinylPlayer from "./VinylPlayer";
import Light from "./Light";
import Interior from "./Interior";
import VinylBox from "./VinylBox";
import { VinylDiskInner, VinylDiskOuter } from "./VinylDisk";
import ScreensFallback from "./ScreensFallback";
import Screens from "./Screens";
import Cover from "./Cover";

const Scene = () => {
  const controlsRef = useRef();

  return (
    <>
      <Environment preset="warehouse" environmentIntensity={0.3} />
      <Computers controlsRef={controlsRef} />
      <VinylPlayer />
      <Light />
      <Interior />
      <OrbitControls enableZoom={false} dampingFactor={0} ref={controlsRef} />

      <VinylBox />
      <VinylDiskOuter />

      <Suspense fallback={<ScreensFallback />}>
        <Screens />
      </Suspense>
      <Suspense>
        <VinylDiskInner />
        <Cover />
      </Suspense>
    </>
  );
};

export default Scene;
