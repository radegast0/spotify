import React, { useRef, useState } from "react";
import { Outlines, useGLTF } from "@react-three/drei";

export default function Computers(props) {
  const { nodes, materials } = useGLTF("./models/computers.glb");
  const [hovered, setHovered] = useState(null);

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