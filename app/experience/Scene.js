"use client";
import React, { Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { Environment, OrbitControls } from "@react-three/drei";
import Computers from "./Computers";
import VinylPlayer from "./VinylPlayer";
import Light from "./Light";
import VinylBox from "./VinylBox";
import VinylDisk from "./VinylDisk";
import ScreensFallback from "./ScreensFallback";
import Screens from "./Screens";
import Cover from "./Cover";
import { initialCameraPosition } from "../_constants/cameraConfig";
import useStore from "../store";
import Walls from "./Walls";

const Scene = () => {
  const controlsRef = useRef();
  const monitorIndex = useStore((state) => state.monitorIndex);
  const isVinylSelected = useStore((state) => state.isVinylSelected);
  const prevX = useRef(0);
  const prevY = useRef(0);

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

  const handleMouseMove = (event) => {
    if (!monitorIndex) {
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
    if (monitorIndex === null && !isVinylSelected) {
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
  }, [monitorIndex, isVinylSelected]);

  return (
    <>
      <Environment preset="warehouse" environmentIntensity={0.3} />
      <Computers controlsRef={controlsRef} />
      <VinylPlayer />
      <Light />
      <Walls />
      <OrbitControls enableZoom={false} dampingFactor={0} ref={controlsRef} />
      <VinylBox controlsRef={controlsRef} />
      <Suspense fallback={<ScreensFallback />}>
        <Screens />
      </Suspense>
      <Suspense fallback={null}>
        <VinylDisk controlsRef={controlsRef} />
        <Cover />
      </Suspense>
    </>
  );
};

export default Scene;
