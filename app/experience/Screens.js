import React, { useState } from "react";
import { Outlines, useGLTF, useTexture, Edges } from "@react-three/drei";
import useRecentlyPlayed from "../_hooks/useRecentlyPlayed";
import useStore from "../store";

export default function Screens(props) {
  const { nodes, materials } = useGLTF("./models/screens.glb");
  const [hovered, setHovered] = useState(null);

  useRecentlyPlayed();
  const images = useStore((state) => state.images);

  // Define image URLs
  const imageUrls = [
    images[7] || "/images/default-green.jpg",
    images[6] || "/images/default-green.jpg",
    images[5] || "/images/default-green.jpg",
    images[4] || "/images/default-green.jpg",
    images[3] || "/images/default-green.jpg",
    images[2] || "/images/default-green.jpg",
    images[1] || "/images/default-green.jpg",
    images[0] || "/images/default-green.jpg",
  ];

  const textures = imageUrls.map((url) => {
    const texture = useTexture(url);
    texture.flipY = false;
    return texture;
  });

  const [
    texture8,
    texture7,
    texture6,
    texture5,
    texture4,
    texture3,
    texture2,
    texture1,
  ] = textures;

  const meshes = [
    {
      geometry: nodes.screen5.geometry,
      position: [-0.241, 0.693, 1.411],
      rotation: [Math.PI / 2, 0, -1.828],
      scale: [0.308, 0.774, 0.24],
      texture: texture5,
    },
    {
      geometry: nodes.screen1.geometry,
      position: [-1.422, 2.547, 0.839],
      rotation: [Math.PI / 2, 0, -1.267],
      scale: [0.315, 0.71, 0.234],
      texture: texture1,
    },
    {
      geometry: nodes.screen2.geometry,
      position: [-0.869, 2.711, -0.49],
      rotation: [Math.PI / 2, 0, -0.977],
      scale: [0.277, 0.324, 0.23],
      texture: texture2,
    },
    {
      geometry: nodes.screen3.geometry,
      position: [-0.176, 1.633, 0.508],
      rotation: [Math.PI / 2, 0, -1.605],
      scale: [0.311, 0.264, 0.251],
      texture: texture3,
    },
    {
      geometry: nodes.screen4.geometry,
      position: [0.255, 1.785, -1.093],
      rotation: [Math.PI / 2, 0, -0.623],
      scale: [0.311, 0.279, 0.24],
      texture: texture4,
    },
    {
      geometry: nodes.screen6.geometry,
      position: [0.423, 0.587, -0.139],
      rotation: [Math.PI / 2, 0, -0.521],
      scale: [0.251, 0.249, 0.204],
      texture: texture6,
    },
    {
      geometry: nodes.screen7.geometry,
      position: [1.218, 1.151, -0.793],
      rotation: [Math.PI / 2, 0, 0.019],
      scale: [0.312, 0.24, 0.24],
      texture: texture7,
    },
    {
      geometry: nodes.screen8.geometry,
      position: [2.029, 1.432, -0.411],
      rotation: [Math.PI / 2, 0, 0.485],
      scale: [0.279, 0.251, 0.22],
      texture: texture8,
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
          <meshBasicMaterial map={meshProps.texture} />
          {hovered === index && (
            <Edges scale={1.1}>
              <Outlines color="white" thickness={0.03} angle={45} />
            </Edges>
          )}
        </mesh>
      ))}
    </group>
  );
}

useGLTF.preload("./models/screens.glb");
