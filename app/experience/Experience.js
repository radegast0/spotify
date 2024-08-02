"use client";
import { Backdrop, OrbitControls, Plane, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Gramaphone from "./Gramaphone";
import Lights from "./lights/Lights";
import Chair from "./Chair";
import Computers from "./Computers";
import Indoor from "./Indoor";
import Scene from "./Scene";
import Test from "./Test";

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
      <ambientLight intensity={1} />
      <Test />
      <OrbitControls />
      {/* <Scene /> */}
      {/* <Computers /> */}
      {/* <Indoor /> */}
      {/* <Gramaphone /> */}
    </Canvas>
  );
};

export default Experience;
