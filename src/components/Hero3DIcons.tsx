import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Center } from '@react-three/drei';
import * as THREE from 'three';

// 1. 3D React Atom Icon
const ReactAtomIcon: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);
  const electronRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.rotation.x += delta * 0.2;
    }
    if (electronRef.current) {
      const time = state.clock.getElapsedTime() * 3;
      electronRef.current.position.x = Math.cos(time) * 0.9;
      electronRef.current.position.z = Math.sin(time) * 0.9;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5} position={position}>
      <group ref={groupRef}>
        {/* Nucleus */}
        <mesh>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshStandardMaterial
            color="#61dafb"
            emissive="#38bdf8"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Orbit Ring 1 */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.9, 0.025, 16, 64]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Orbit Ring 2 */}
        <mesh rotation={[-Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.9, 0.025, 16, 64]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Orbit Ring 3 */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.9, 0.025, 16, 64]} />
          <meshStandardMaterial color="#61dafb" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Orbiting Electron Particle */}
        <mesh ref={electronRef}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>

      {/* Label */}
      <Text
        position={[0, -1.25, 0]}
        fontSize={0.22}
        color="#38bdf8"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhRib2Atz8.woff"
      >
        React
      </Text>
    </Float>
  );
};

// 2. 3D Node.js Hexagon Icon
const NodeHexIcon: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.z = Math.sin(delta) * 0.1;
    }
  });

  return (
    <Float speed={2.2} rotationIntensity={1.4} floatIntensity={1.8} position={position}>
      <group ref={meshRef}>
        {/* Hexagonal Prism */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.35, 6]} />
          <meshStandardMaterial
            color="#22c55e"
            emissive="#15803d"
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>

        {/* Hexagonal Outer Wireframe Accent */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.76, 0.76, 0.38, 6]} />
          <meshBasicMaterial color="#4ade80" wireframe />
        </mesh>

        {/* Inner Node Core */}
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="#86efac" />
        </mesh>
      </group>

      {/* Label */}
      <Text
        position={[0, -1.25, 0]}
        fontSize={0.22}
        color="#4ade80"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhRib2Atz8.woff"
      >
        Node.js
      </Text>
    </Float>
  );
};

// 3. 3D Cloud Icon (AWS / Cloud Architecture)
const CloudIcon: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const cloudGroupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (cloudGroupRef.current) {
      cloudGroupRef.current.rotation.y += delta * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.8;
      ringRef.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <Float speed={1.9} rotationIntensity={1.0} floatIntensity={1.6} position={position}>
      <group ref={cloudGroupRef}>
        {/* Cloud Puff 1 (Center Base) */}
        <mesh position={[0, -0.1, 0]}>
          <sphereGeometry args={[0.42, 20, 20]} />
          <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.4} roughness={0.3} metalness={0.6} />
        </mesh>

        {/* Cloud Puff 2 (Left) */}
        <mesh position={[-0.32, -0.15, 0]}>
          <sphereGeometry args={[0.3, 18, 18]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.3} metalness={0.6} />
        </mesh>

        {/* Cloud Puff 3 (Right) */}
        <mesh position={[0.32, -0.15, 0]}>
          <sphereGeometry args={[0.32, 18, 18]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.3} metalness={0.6} />
        </mesh>

        {/* Cloud Puff 4 (Top) */}
        <mesh position={[0.08, 0.18, 0]}>
          <sphereGeometry args={[0.36, 18, 18]} />
          <meshStandardMaterial color="#f59e0b" emissive="#b45309" emissiveIntensity={0.3} roughness={0.3} metalness={0.6} />
        </mesh>

        {/* Orbiting Data Ring around Cloud */}
        <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[0.85, 0.018, 16, 64]} />
          <meshStandardMaterial color="#fef08a" emissive="#f59e0b" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* Label */}
      <Text
        position={[0, -1.25, 0]}
        fontSize={0.22}
        color="#f59e0b"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhRib2Atz8.woff"
      >
        AWS Cloud
      </Text>
    </Float>
  );
};

// Scene Wrapper handling Lights & Parallax Mouse Tilt
const SceneContent: React.FC = () => {
  const sceneRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (sceneRef.current) {
      // Gentle responsiveness to cursor position
      const targetX = (state.pointer.x * Math.PI) / 10;
      const targetY = (state.pointer.y * Math.PI) / 10;
      sceneRef.current.rotation.y += (targetX - sceneRef.current.rotation.y) * 0.05;
      sceneRef.current.rotation.x += (-targetY - sceneRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={sceneRef}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 8, 5]} intensity={1.8} color="#ffffff" />
      <pointLight position={[-4, -4, 2]} intensity={2.5} color="#38bdf8" />
      <pointLight position={[4, 4, 2]} intensity={2.5} color="#f59e0b" />

      {/* Floating 3D Tech Stack Icons */}
      <ReactAtomIcon position={[-2.4, 0.2, 0]} />
      <NodeHexIcon position={[0, -0.1, 0.3]} />
      <CloudIcon position={[2.4, 0.2, 0]} />
    </group>
  );
};

export const Hero3DIcons: React.FC<{ className?: string }> = ({
  className = 'w-full h-48 sm:h-56',
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
};
