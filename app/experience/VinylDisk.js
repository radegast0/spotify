import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import useStore from "../store";

export function VinylDiskInner(props) {
  const { nodes } = useGLTF("./models/vinyl-disk.glb");
  const currentImage = useStore((state) => state.currentImageLow);
  const texture = useTexture(currentImage || "/images/default.jpeg");
  const vinylDiskInner = useRef();

  useFrame((state, delta) => {
    if (currentImage) {
      vinylDiskInner.current.rotation.y += 0.5 * delta;
    }
  });

  return (
    <mesh
      ref={vinylDiskInner}
      castShadow
      receiveShadow
      geometry={nodes.vinyl_disk_inner.geometry}
      position={[1.224, 0.308, 1.134]}
      scale={0.124}
      rotation={[0, 0, 0]}
      {...props}
    >
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

export function VinylDiskOuter(props) {
  const { nodes, materials } = useGLTF("./models/vinyl-disk.glb");
  const currentImage = useStore((state) => state.currentImageLow);
  const vinylDiskOuter = useRef();

  useFrame((state, delta) => {
    if (currentImage) {
      vinylDiskOuter.current.rotation.z += 0.5 * delta;
    }
  });

  return (
    <mesh
      ref={vinylDiskOuter}
      castShadow
      receiveShadow
      geometry={
        nodes["#REC0002_33_Highway_To_Hell_#REC0002_Textures_0"].geometry
      }
      material={materials.REC0002_Textures}
      position={[1.224, 0.306, 1.135]}
      rotation={[-1.571, 0, 0]}
      scale={2.462}
      {...props}
    />
  );
}

useGLTF.preload("./models/vinyl-disk.glb");
