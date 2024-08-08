import React, { useState } from "react";
import { Edges, Outlines, useGLTF, useTexture } from "@react-three/drei";
import useRecentlyPlayed from "../_hooks/useRecentlyPlayed";
import useStore from "../store";

const TextureLoader = ({ url }) => {
  const texture = useTexture(url);
  texture.flipY = false;
  return <meshBasicMaterial map={texture} />;
};

export default function Screens(props) {
  const { nodes } = useGLTF("./models/screens.glb");
  const [hovered, setHovered] = useState(null);

  useRecentlyPlayed();
  const images = useStore((state) => state.images);

  // Ensure images are correctly ordered to match monitor indices
  const imageUrls = [
    images[0] || "/images/default-green.jpg",
    images[1] || "/images/default-green.jpg",
    images[2] || "/images/default-green.jpg",
    images[3] || "/images/default-green.jpg",
    images[4] || "/images/default-green.jpg",
    images[5] || "/images/default-green.jpg",
    images[6] || "/images/default-green.jpg",
    images[7] || "/images/default-green.jpg",
  ];

  const meshes = [
    {
      geometry: nodes.screen5.geometry,
      position: [-0.241, 0.693, 1.411],
      rotation: [Math.PI / 2, 0, -1.828],
      scale: [0.308, 0.774, 0.24],
      textureUrl: imageUrls[0],
    },
    {
      geometry: nodes.screen1.geometry,
      position: [-1.422, 2.547, 0.839],
      rotation: [Math.PI / 2, 0, -1.267],
      scale: [0.315, 0.71, 0.234],
      textureUrl: imageUrls[1],
    },
    {
      geometry: nodes.screen2.geometry,
      position: [-0.869, 2.711, -0.49],
      rotation: [Math.PI / 2, 0, -0.977],
      scale: [0.277, 0.324, 0.23],
      textureUrl: imageUrls[2],
    },
    {
      geometry: nodes.screen3.geometry,
      position: [-0.176, 1.633, 0.508],
      rotation: [Math.PI / 2, 0, -1.605],
      scale: [0.311, 0.264, 0.251],
      textureUrl: imageUrls[3],
    },
    {
      geometry: nodes.screen4.geometry,
      position: [0.255, 1.785, -1.093],
      rotation: [Math.PI / 2, 0, -0.623],
      scale: [0.311, 0.279, 0.24],
      textureUrl: imageUrls[4],
    },
    {
      geometry: nodes.screen6.geometry,
      position: [0.423, 0.587, -0.139],
      rotation: [Math.PI / 2, 0, -0.521],
      scale: [0.251, 0.249, 0.204],
      textureUrl: imageUrls[5],
    },
    {
      geometry: nodes.screen7.geometry,
      position: [1.218, 1.151, -0.793],
      rotation: [Math.PI / 2, 0, 0.019],
      scale: [0.312, 0.24, 0.24],
      textureUrl: imageUrls[6],
    },
    {
      geometry: nodes.screen8.geometry,
      position: [2.029, 1.432, -0.411],
      rotation: [Math.PI / 2, 0, 0.485],
      scale: [0.279, 0.251, 0.22],
      textureUrl: imageUrls[7],
    },
  ];

  return (
    <group {...props} dispose={null}>
      {meshes.map((meshProps, index) => (
        <mesh
          onPointerEnter={() => setHovered(index)}
          key={index}
          castShadow
          receiveShadow
          geometry={meshProps.geometry}
          position={meshProps.position}
          rotation={meshProps.rotation}
          scale={meshProps.scale}
        >
          <TextureLoader url={meshProps.textureUrl} />
        </mesh>
      ))}
    </group>
  );
}

useGLTF.preload("./models/screens.glb");
