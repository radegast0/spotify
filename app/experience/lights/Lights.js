import { Environment, SpotLight, useDepthBuffer } from "@react-three/drei";
import React from "react";
import { DirectionalLight } from "three";

const Lights = () => {
  const depthBuffer = useDepthBuffer();
  return (
    <>
      <ambientLight intensity={0.5} />
      
    
    </>
  );
};

export default Lights;
