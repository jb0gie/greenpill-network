"use client";

import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";

export default function Stars({ count = 1000 }) {
  const [sphere] = useState(() => random.inSphere(new Float32Array(count * 3), { radius: 2.5 }));
  const starsRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.x += delta / 50;
      starsRef.current.rotation.y += delta / 75;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={starsRef} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#80ffa0"
          size={0.008}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}