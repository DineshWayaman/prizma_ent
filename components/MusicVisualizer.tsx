'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function Rings() {
  const ringsRef = useRef<THREE.Group>(null)
  // Create a single ref to hold all mesh references
  const ringRefs = useRef<(THREE.Mesh | null)[]>([])
  
  // Initialize the array if empty
  if (ringRefs.current.length === 0) {
    ringRefs.current = Array(5).fill(null)
  }

  useFrame((state) => {
    if (!ringsRef.current) return
    ringsRef.current.rotation.z += 0.001
    
    ringRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      mesh.rotation.z = state.clock.getElapsedTime() * (0.2 - i * 0.05)
      mesh.scale.x = mesh.scale.y = 1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2
    })
  })

  return (
    <group ref={ringsRef}>
      {Array(5).fill(0).map((_, i) => (
        <mesh
          key={i}
          ref={el => ringRefs.current[i] = el}
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
