"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Environment, OrbitControls } from "@react-three/drei";
import Computers from "./Computers";
import VinylPlayer from "./VinylPlayer";
import Light from "./Light";
import Interior from "./Interior";
import VinylBox from "./VinylBox";
import { VinylDiskInner, VinylDiskOuter } from "./VinylDisk";
import ScreensFallback from "./ScreensFallback";
import Screens from "./Screens";
import Cover from "./Cover";
import { initialCameraPosition } from "../_constants/cameraConfig";
import useStore from "../store";

const Scene = () => {
  const controlsRef = useRef();
  const [isMoving, setIsMoving] = useState(false);
  const monitorIndex = useStore((state) => state.monitorIndex);
  const prevX = useRef(0);
  const prevY = useRef(0);

  useEffect(() => {
    gsap.to(controlsRef.current.object.position, {
      duration: 1,
      x: initialCameraPosition.position.x,
      y: initialCameraPosition.position.y,
      z: initialCameraPosition.position.z,
      ease: "power2.inOut",
      onStart: () => setIsMoving(true),
      onComplete: () => setIsMoving(false),
    });

    gsap.to(controlsRef.current.target, {
      duration: 1,
      x: initialCameraPosition.target.x,
      y: initialCameraPosition.target.y,
      z: initialCameraPosition.target.z,
      ease: "power2.inOut",
      onStart: () => setIsMoving(true),
      onComplete: () => setIsMoving(false),
    });
  }, [controlsRef]);

  const handleMouseMove = (event) => {
    if (!monitorIndex && !isMoving) {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      if (
        Math.abs(x - prevX.current) > 0.01 ||
        Math.abs(y - prevY.current) > 0.01
      ) {
        prevX.current = x;
        prevY.current = y;
        gsap.to(controlsRef.current.target, {
          x: x * 0.3,
          y: y * 0.3,
          ease: "power2.out",
          duration: 0.5,
        });
      }
    }
  };

  useEffect(() => {
    let timeout;
    if (monitorIndex === null) {
      timeout = setTimeout(() => {
        window.addEventListener("mousemove", handleMouseMove);
      }, 1000);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
    }

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [monitorIndex]);

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
