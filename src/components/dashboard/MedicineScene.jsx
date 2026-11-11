
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'

function Capsule() {
  const capsuleRef = useRef()

  useFrame((state, delta) => {
    if (capsuleRef.current) {
      capsuleRef.current.rotation.y += delta * 0.45
      capsuleRef.current.rotation.x += delta * 0.12
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.12} floatIntensity={0.35}>
      <group ref={capsuleRef} rotation={[0, 0, Math.PI / 2]}>
        {/* Green half */}
        <mesh position={[0, 0.32, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.64, 48]} />
          <meshPhysicalMaterial
            color="#059669"
            roughness={0.2}
            metalness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.12}
          />
        </mesh>

        {/* Rounded green end */}
        <mesh position={[0, 0.64, 0]}>
          <sphereGeometry args={[0.38, 48, 32]} />
          <meshPhysicalMaterial color="#059669" roughness={0.2} clearcoat={1} />
        </mesh>

        {/* White half */}
        <mesh position={[0, -0.32, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.64, 48]} />
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0.18}
            metalness={0.02}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Rounded white end */}
        <mesh position={[0, -0.64, 0]}>
          <sphereGeometry args={[0.38, 48, 32]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.18} clearcoat={1} />
        </mesh>

        {/* Joining ring */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.386, 0.386, 0.025, 48]} />
          <meshStandardMaterial
            color="#d1fae5"
            metalness={0.25}
            roughness={0.25}
          />
        </mesh>
      </group>
    </Float>
  )
}

// Decorative orbit rings
function OrbitRings() {
  const ringRef = useRef()

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.12
      ringRef.current.rotation.x += delta * 0.08
    }
  })

  return (
    <group ref={ringRef}>
      <mesh rotation={[1.1, 0.2, 0.3]}>
        <torusGeometry args={[1.25, 0.012, 12, 100]} />
        <meshBasicMaterial color="#6ee7b7" transparent opacity={0.65} />
      </mesh>

      <mesh rotation={[1.1, 0.2, 0.3]}>
        <torusGeometry args={[1.42, 0.006, 8, 100]} />
        <meshBasicMaterial color="#a7f3d0" transparent opacity={0.4} />
      </mesh>

      {/* Floating decorative particles */}
      <mesh position={[1.35, 0.65, 0.2]}>
        <sphereGeometry args={[0.055, 20, 20]} />
        <meshBasicMaterial color="#34d399" />
      </mesh>

      <mesh position={[-1.35, -0.55, 0.2]}>
        <sphereGeometry args={[0.04, 20, 20]} />
        <meshBasicMaterial color="#a7f3d0" />
      </mesh>

      <mesh position={[0.15, 1.25, -0.2]}>
        <sphereGeometry args={[0.035, 20, 20]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}

function MedicineScene() {
  return (
    <div className="h-64 w-full">
      <Canvas camera={{ position: [0, 0, 4], fov: 40 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.8} />

        <directionalLight position={[3, 4, 5]} intensity={2} />

        <pointLight
          position={[-3, -2, 2]}
          intensity={1}
          color="#6ee7b7"
        />

        {/* Soft emerald glow behind the capsule */}
<mesh position={[0, 0, -0.8]}>
  <sphereGeometry args={[1.1, 32, 32]} />
  <meshBasicMaterial
    color="#34d399"
    transparent
    opacity={0.12}
  />
</mesh>

<OrbitRings />
<Capsule />

        <Environment preset="studio" />
      </Canvas>
    </div>
  )
}

export default MedicineScene
