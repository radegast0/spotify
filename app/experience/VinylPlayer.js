import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import useStore from "../store";

export default function VinylPlayer(props) {
  const { nodes, materials } = useGLTF("./models/vinyl-player.glb");
  const currentSong = useStore((state) => state.currentImageLow);

  // useMemo to calculate rotation based on currentSong
  const rotation = useMemo(() => {
    return currentSong ? [0, -0.9, 0.06] : [0, -0.459, 0];
  }, [currentSong]);

  return (
    <group {...props} dispose={null}>
      <group
        position={[1.253, 0.336, 0.611]}
        rotation={rotation}
        scale={0.571}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube20_ditals_0_1.geometry}
          material={materials.ditals}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube20_ditals_0_2.geometry}
          material={materials.dit2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube20_ditals_0_3.geometry}
          material={materials.naconez}
        />
      </group>
      <group
        position={[1.224, 0.309, 1.135]}
        rotation={[0, -0.459, 0]}
        scale={0.006}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCylinder3_dit3_0_1.geometry}
          material={materials.dit3}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCylinder3_dit3_0_2.geometry}
          material={materials.dit2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCylinder3_dit3_0_3.geometry}
          material={materials.noska}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCylinder3_dit3_0_4.geometry}
          material={materials.ditals}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCylinder3_dit3_0_5.geometry}
          material={materials.vinil}
        />
      </group>
    </group>
  );
}

useGLTF.preload("./models/vinyl-player.glb");
