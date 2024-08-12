import React, { useEffect, useState } from "react";
import { Outlines, useGLTF } from "@react-three/drei";
import useCameraRig from "../_hooks/useCameraRig";
import useStore from "../store";
import {
  cameraPositions,
  initialCameraPosition,
  mobileCameraPosition,
} from "../_constants/cameraConfig";

export default function Computers({ controlsRef, ...props }) {
  const { nodes, materials } = useGLTF("./models/computers.glb");
  const [hovered, setHovered] = useState(null);
  const moveCamera = useCameraRig(controlsRef);
  const setMonitorIndex = useStore((state) => state.setMonitorIndex);
  const monitorIndex = useStore((state) => state.monitorIndex);

  useEffect(() => {
    if (monitorIndex === null) {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        moveCamera(mobileCameraPosition.position, mobileCameraPosition.target);
      } else {
        moveCamera(
          initialCameraPosition.position,
          initialCameraPosition.target,
        );
      }
    }
  }, [monitorIndex]);

  const handleClick = (index) => {
    const cameraConfig = cameraPositions[index];
    if (cameraConfig) {
      moveCamera(cameraConfig.position, cameraConfig.target);
      setMonitorIndex(cameraConfig.index);
    }
  };

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
