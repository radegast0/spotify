/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Test(props) {
  const { nodes, materials } = useGLTF('./models/frei.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002_1.geometry}
        material={materials['Material.006']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002_2.geometry}
        material={materials.wall}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002_3.geometry}
        material={materials['wall.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002_4.geometry}
        material={materials.window}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002_5.geometry}
        material={materials.Texture}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002_6.geometry}
        material={materials['Material.009']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002_7.geometry}
        material={materials.Screen}
      />
    </group>
  )
}

useGLTF.preload('./models/frei.glb')