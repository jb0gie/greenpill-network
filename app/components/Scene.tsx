"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Earth from "./Earth";
import Stars from "./Stars";
import Particles from "./Particles";

export default function Scene() {
  return (
    <div className="h-[60vh] md:h-[80vh] w-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={45} />
        <color attach="background" args={["#000010"]} />
        
        <Suspense fallback={null}>
          <Stars />
          <Particles />
          <Earth />
        </Suspense>

        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minDistance={2.5}
          maxDistance={7}
        />
      </Canvas>
    </div>
  );
}