import React from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import {
  Environment,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  Sky
} from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { Suspense } from 'react'
import Style from './styles/index.less'

const Model = () => {
  const gltf = useLoader(GLTFLoader, './head.gltf')
  return (
    <>
      <primitive object={gltf.scene} />
    </>
  )
}

export default function App() {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
  return (
    <div className={Style.App}>
      <Canvas
        shadows
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }}
      >
        <Suspense fallback={null}>
          <Model />
          <OrbitControls enableDamping />
          <primitive object={directionalLight} />
          <primitive object={light} />
        </Suspense>
      </Canvas>
    </div>
  )
}
