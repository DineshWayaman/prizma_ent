'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function MusicNote({ position }: { position: [number, number, number] }) {
  const noteRef = useRef<THREE.Group>(null)
  
  return (
    <Float
      speed={1.5}
      rotationIntensity={1.5}
      floatIntensity={1.5}
    >
      <group ref={noteRef} position={position} scale={0.4}>
        {/* Note head */}
        <mesh rotation={[0, 0, Math.PI * 0.2]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial 
            color="#F9B104"
            emissive="#F9B104"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        {/* Note stem */}
        <mesh position={[0.4, 1.2, 0]}>
          <boxGeometry args={[0.1, 2, 0.1]} />
          <meshStandardMaterial 
            color="#F9B104"
            emissive="#F9B104"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        {/* Note flag */}
        <mesh position={[0.4, 2.2, 0]}>
          <torusGeometry args={[0.3, 0.1, 16, 32, Math.PI * 0.5]} />
          <meshStandardMaterial 
            color="#F9B104"
            emissive="#F9B104"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>
    </Float>
  )
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <Stars 
        radius={50}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      {[-2, 0, 2].map((x, i) => (
        <MusicNote key={i} position={[x, Math.sin(x) * 0.5, Math.cos(x) * 2]} />
      ))}
    </group>
  )
}

export default function MusicScene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#F9B104" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#F9B104" />
        <Scene />
      </Canvas>
    </div>
  )
}
