import React, { useRef, useState, Suspense } from 'react'
import Style from './styles/index.less'
import * as THREE from 'three'
import { MeshProps, useFrame, useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Box: React.FC<MeshProps> = (props) => {
  const gltf = useLoader(GLTFLoader, 'https://6etx1.csb.app/Poimandres.gltf')
  return (
    <>
      <primitive object={gltf.scene} scale={0.4} />
    </>
  )
  // const red = new THREE.MeshLambertMaterial({ color: 'red' })
  // const green = new THREE.MeshLambertMaterial({ color: 'green' })
  // // const sphere = new THREE.SphereGeometry(0, 0, 0)
  // // This reference will give us direct access to the mesh
  // const mesh = useRef<THREE.Mesh>(null!)
  // // // Set up state for the hovered and active state
  // const [hovered, setHover] = useState(false)
  // const [active, setActive] = useState(false)
  // // Rotate mesh every frame, this is outside of React without overhead
  // useFrame(() => {
  //   mesh.current.rotation.y += 0.01
  //   mesh.current.rotation.x += 0.01
  // })
  // const gltf = useLoader(GLTFLoader, 'https://6etx1.csb.app/Poimandres.gltf')
  // return (
  //   <Suspense fallback={null}>
  //     <primitive object={gltf.scene} />
  //   </Suspense>
  // )
  // // return (
  // //   <mesh
  // //     {...props}
  // //     ref={mesh}
  // //     scale={active ? 1.5 : 1}
  // //     onClick={(event) => setActive(!active)}
  // //     onPointerOver={(event) => setHover(true)}
  // //     onPointerOut={(event) => setHover(false)}
  // //   >
  // //     <boxGeometry args={[1, 2, 3]} />
  // //     <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
  // //   </mesh>
  // //   // <>
  // //   //   <mesh geometry={sphere} material={green} />
  // //   //   <mesh position={[3, 0, 0]} geometry={sphere} material={red} />
  // //   // </>
  // // )
  // // const obj = useLoader(OBJLoader, 'http://localhost:5000/last09.obj')
  // // return (
  // //   <mesh>
  // //     <primitive object={obj} />
  // //   </mesh>
  // // )
}

export default Box
