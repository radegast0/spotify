import { useGLTF, useTexture } from "@react-three/drei";
import React from "react";

const Interior = () => {
  const { nodes } = useGLTF("./models/walls.glb");
  const bakedTexture = useTexture("./textures/new-baked.jpg");
  bakedTexture.flipY = false;

  return (
    <mesh geometry={nodes.Cube002.geometry}>
      <meshBasicMaterial map={bakedTexture} />
    </mesh>
  );
};

export default Interior;
