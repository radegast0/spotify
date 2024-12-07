/* eslint-disable react/no-unknown-property */
import { useGLTF, useTexture } from "@react-three/drei";
import React from "react";

const Walls = () => {
  // Load models
  const { nodes: wallsNodes } = useGLTF("./models/walls.glb", true); // Preload the GLTF
  const { nodes: groundNodes } = useGLTF("./models/ground.glb", true); // Preload the GLTF

  // Load textures
  const wallsTexture = useTexture("./textures/walls.jpg");
  const groundTexture = useTexture("./textures/ground.jpg");

  // Flip textures if necessary
  wallsTexture.flipY = false;
  groundTexture.flipY = false;

  return (
    <>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[-5.5, 5.635, -6]}>
        <meshBasicMaterial color="white" />
        <planeGeometry args={[15, 15]} />
      </mesh>
      <mesh castShadow receiveShadow geometry={wallsNodes.junk.geometry}>
        <meshBasicMaterial map={wallsTexture} />
      </mesh>
      <mesh geometry={groundNodes.ground.geometry}>
        <meshBasicMaterial map={groundTexture} />
      </mesh>
    </>
  );
};

export default Walls;
/* eslint-enable react/no-unknown-property */
