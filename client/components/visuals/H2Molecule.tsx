import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Molecule() {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.4;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <group ref={ref}>
      {/* Hydrogen atoms */}
      <mesh position={[-0.7, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#34d399" metalness={0.2} roughness={0.2} />
      </mesh>
      <mesh position={[0.7, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#34d399" metalness={0.2} roughness={0.2} />
      </mesh>
      {/* Bond */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.07, 0.07, 1.4, 32]} />
        <meshStandardMaterial color="#06b6d4" metalness={0.3} roughness={0.3} />
      </mesh>
    </group>
  );
}

export default function H2Molecule({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 2.2], fov: 50 }} shadows>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={0.9} castShadow color={new THREE.Color("#a7f3d0")} />
        <Suspense fallback={null}>
          <Molecule />
        </Suspense>
      </Canvas>
    </div>
  );
}
