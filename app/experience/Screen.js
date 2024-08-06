import { useTexture } from "@react-three/drei";
import React from "react";
import useStore from "../store";

const Screen = () => {
  const texture = useTexture("./images/a.jpg");
  const images = useStore((state) => state.images);
  console.log(images);
  
  return (
    <mesh>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

export default Screen;
