import React, { useEffect, useState } from "react";
import { Outlines, useGLTF } from "@react-three/drei";
import useCameraRig from "../_hooks/useCameraRig";

const cameraPositions = [
  {
    position: {
      x: -0.49,
      y: 2.54,
      z: 1.16,
    },
    target: {
      x: -0.91,
      y: 2.52,
      z: 1.02,
    },
  },
  {
    position: { x: -0.15, y: 2.84, z: -0.08 },
    target: { x: -1.08, y: 2.46, z: -0.62 },
  },
];

export default function Computers({ controlsRef, ...props }) {
  const { nodes, materials } = useGLTF("./models/computers.glb");
  const [hovered, setHovered] = useState(null);
  const moveCamera = useCameraRig(controlsRef);

  const handleClick = (index) => {
    const cameraConfig = cameraPositions[index - 1];
    if (cameraConfig) {
      moveCamera(cameraConfig.position, cameraConfig.target);
      console.log(index);
    }
  };

  useEffect(() => {
    console.log("target: ", controlsRef?.current?.target);
  }, []);
  useEffect(() => {
    console.log("position: ", controlsRef?.current?.object?.position);
  }, []);

  console.log("position: ", controlsRef?.current?.object?.position);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.computers.geometry}
        material={materials.Texture}
        position={[-1.371, 1.267, -0.837]}
        rotation={[-0.624, 0.933, 0.374]}
        scale={0.457}
      />
      {Object.keys(nodes)
        .filter((node) => node.startsWith("monitor"))
        .map((monitor, index) => (
          <mesh
            onPointerEnter={() => setHovered(monitor)}
            onPointerLeave={() => setHovered(null)}
            onClick={() => handleClick(index)}
            key={index}
            castShadow
            receiveShadow
            geometry={nodes[monitor].geometry}
            material={materials.Texture}
            position={[-1.371, 1.267, -0.837]}
            rotation={[-0.624, 0.933, 0.374]}
            scale={0.457}
          >
            {hovered === monitor && <Outlines color={"white"} />}
          </mesh>
        ))}
    </group>
  );
}

useGLTF.preload("./models/computers.glb");
