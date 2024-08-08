"use client";
import { Environment, OrbitControls } from "@react-three/drei";
import React, { Suspense, useEffect, useRef } from "react";
import Computers from "./Computers";
import VinylPlayer from "./VinylPlayer";
import Light from "./Light";
import Interior from "./Interior";
import VinylBox from "./VinylBox";
import { VinylDiskInner, VinylDiskOuter } from "./VinylDisk";
import ScreensFallback from "./ScreensFallback";
import Screens from "./Screens";
import Cover from "./Cover";
import gsap from "gsap";
import { initialCameraPosition } from "../_constants/cameraConfig";

const Scene = () => {
  const controlsRef = useRef();

  useEffect(() => {
    gsap.to(controlsRef.current.object.position, {
      duration: 2,
      x: initialCameraPosition.position.x,
      y: initialCameraPosition.position.y,
      z: initialCameraPosition.position.z,
      ease: "power2.inOut",
    });
    gsap.to(controlsRef.current.target, {
      duration: 2,
      x: initialCameraPosition.target.x,
      y: initialCameraPosition.target.y,
      z: initialCameraPosition.target.z,
      ease: "power2.inOut",
    });
  }, [controlsRef]);

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
