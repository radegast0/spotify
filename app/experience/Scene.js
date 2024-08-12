"use client";
import React, { Suspense, useEffect, useRef, useCallback } from "react";
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
import useStore from "../store";
import Walls from "./Walls";
import {
  initialCameraPosition,
  mobileCameraPosition,
} from "../_constants/cameraConfig";

const Scene = () => {
  const controlsRef = useRef();
  const monitorIndex = useStore((state) => state.monitorIndex);
  const isVinylSelected = useStore((state) => state.isVinylSelected);
  const prevX = useRef(0);
  const prevY = useRef(0);

  const updateCameraPosition = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    const { position, target } = isMobile
      ? mobileCameraPosition
      : initialCameraPosition;

    gsap.to(controlsRef.current.object.position, {
      duration: 2,
      x: position.x,
      y: position.y,
      z: position.z,
      ease: "power2.inOut",
    });

    gsap.to(controlsRef.current.target, {
      duration: 2,
      x: target.x,
      y: target.y,
      z: target.z,
      ease: "power2.inOut",
    });
  }, [controlsRef]);

  useEffect(() => {
    updateCameraPosition();
    window.addEventListener("resize", updateCameraPosition);

    return () => {
      window.removeEventListener("resize", updateCameraPosition);
    };
  }, [updateCameraPosition]);

  const handleMouseMove = useCallback(
    (event) => {
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
    },
    [monitorIndex],
  );

  useEffect(() => {
    if (monitorIndex === null && !isVinylSelected) {
      const timeout = setTimeout(() => {
        window.addEventListener("mousemove", handleMouseMove);
      }, 1000);

      return () => {
        clearTimeout(timeout);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [monitorIndex, isVinylSelected, handleMouseMove]);

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
