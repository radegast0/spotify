import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Outlines, useGLTF, useTexture } from "@react-three/drei";

import useStore from "../store";
import useCameraRig from "../_hooks/useCameraRig";
import {
  initialCameraPosition,
  vinylPosition,
} from "../_constants/cameraConfig";

export function VinylDisk({ controlsRef, ...props }) {
  const { nodes, materials } = useGLTF("./models/vinyl-disk.glb");
  const currentImage = useStore((state) => state.currentImageLow);
  const texture = useTexture(currentImage || "/images/default.jpeg");

  const vinylDiskInner = useRef();
  const vinylDiskOuter = useRef();

  const isVinylSelected = useStore((state) => state.isVinylSelected);
  const setIsVinylSelected = useStore((state) => state.setIsVinylSelected);

  const moveCamera = useCameraRig(controlsRef);

  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (currentImage) {
      if (vinylDiskInner.current) {
        vinylDiskInner.current.rotation.y += 0.5 * delta;
      }
      if (vinylDiskOuter.current) {
        vinylDiskOuter.current.rotation.z += 0.5 * delta;
      }
    }
  });

  useEffect(() => {
    if (!isVinylSelected) {
      moveCamera(initialCameraPosition.position, initialCameraPosition.target);
    }
  }, [isVinylSelected]);

  const handleClick = () => {
    const cameraConfig = vinylPosition[0];
    moveCamera(cameraConfig.position, cameraConfig.target);
    setIsVinylSelected(true);
  };

  return (
    <group {...props}>
      <mesh
        ref={vinylDiskInner}
        castShadow
        receiveShadow
        geometry={nodes.vinyl_disk_inner.geometry}
        position={[1.224, 0.308, 1.134]}
        scale={0.124}
        rotation={[0, 0, 0]}
        onClick={handleClick}
      >
        <meshBasicMaterial map={texture} />
      </mesh>
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
        onClick={handleClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {hovered && <Outlines thickness={0.005} angle={10} color={"white"} />}
      </mesh>
    </group>
  );
}

useGLTF.preload("./models/vinyl-disk.glb");

export default VinylDisk;
