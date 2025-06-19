'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function Rings() {
  const ringsRef = useRef<THREE.Group>(null)
  const ringRefs = Array(5).fill(0).map(() => useRef<THREE.Mesh>(null))

  useFrame((state) => {
    if (!ringsRef.current) return
    ringsRef.current.rotation.z += 0.001
    
    ringRefs.forEach((ref, i) => {
      if (!ref.current) return
      ref.current.rotation.z = state.clock.getElapsedTime() * (0.2 - i * 0.05)
      ref.current.scale.x = ref.current.scale.y = 1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2
    })
  })

  return (
    <group ref={ringsRef}>
      {ringRefs.map((ref, i) => (
        <mesh
          key={i}
          ref={ref}
          position={[0, 0, -i * 2]}
        >
          <ringGeometry args={[3 + i * 0.5, 3.2 + i * 0.5, 128]} />
          <meshBasicMaterial 
            color={new THREE.Color().setHSL(i * 0.1, 0.8, 0.5)}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function MusicVisualizer() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <color attach="background" args={['#0a0a0a']} />
        <Rings />
      </Canvas>
    </div>
  )
}
