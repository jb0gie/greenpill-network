"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";

export default function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=2000');
  const bumpMap = textureLoader.load('https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=2000');
  const specularMap = textureLoader.load('https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=2000');

  const { scale } = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
    config: { mass: 1, tension: 280, friction: 60 }
  });

  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  const atmosphereEffect = {
    uniforms: {
      glowColor: { value: new THREE.Color(0x00ff80) },
      viewVector: { value: new THREE.Vector3(0, 0, 1) }
    },
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      uniform vec3 glowColor;
      uniform vec3 viewVector;
      void main() {
        float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
        gl_FragColor = vec4(glowColor, 1.0) * intensity;
      }
    `
  };

  return (
    <group>
      <animated.mesh scale={scale.to(s => [s, s, s])}>
        <Sphere ref={earthRef} args={[1, 64, 64]}>
          <meshPhongMaterial
            map={texture}
            bumpMap={bumpMap}
            bumpScale={0.15}
            specularMap={specularMap}
            specular={new THREE.Color(0x00ff80)}
            shininess={40}
          />
        </Sphere>
      </animated.mesh>
      
      <Sphere args={[1.2, 64, 64]}>
        <shaderMaterial
          transparent
          side={THREE.BackSide}
          uniforms={atmosphereEffect.uniforms}
          vertexShader={atmosphereEffect.vertexShader}
          fragmentShader={atmosphereEffect.fragmentShader}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
    </group>
  );
}