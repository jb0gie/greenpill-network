"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Billboard, Text, Box } from "@react-three/drei";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";
import locations from "../locations.json";

// Convert lat/long to 3D coordinates
const latLongToVector3 = (lat: number, long: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (long + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

interface Location {
  name: string;
  lat: number;
  long: number;
  link: string;
}

const LocationMarker = ({ onClick, onHover }: { onClick: () => void; onHover: (isHovered: boolean) => void }) => {
  const [hovered, setHovered] = useState(false);
  
  const { scale } = useSpring({
    scale: hovered ? 1.3 : 1,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  const handlePointerEnter = () => {
    setHovered(true);
    onHover(true);
  };

  const handlePointerLeave = () => {
    setHovered(false);
    onHover(false);
  };

  return (
    <Billboard>
      <animated.group scale={scale.to(s => [s, s, s])}>
        <Text
          fontSize={0.1}
          color="#00ff80"
          anchorX="center"
          anchorY="middle"
          onClick={onClick}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        >
          🥒
        </Text>
      </animated.group>
    </Billboard>
  );
};

const LocationTooltip = ({ location }: { location: Location }) => {
  const { scale } = useSpring({
    scale: [1, 1, 1],
    from: { scale: [0, 0, 0] },
    config: { mass: 1, tension: 280, friction: 60 }
  });

  return (
    <animated.group scale={scale as any}>
      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        {/* Background with rounded corners */}
        <group>
          {/* Main background */}
          <Box args={[0.8, 0.3, 0.01]} position={[0, 0, 0]}>
            <meshBasicMaterial color="#001810" transparent opacity={0.9} />
          </Box>
          {/* Rounded border glow */}
          <Box args={[0.82, 0.32, 0.005]} position={[0, 0, -0.001]}>
            <meshBasicMaterial color="#00ff80" transparent opacity={0.1} />
          </Box>
        </group>
        
        {/* Location name */}
        <Text
          position={[0, 0.02, 0.01]}
          fontSize={0.07}
          color="#00ff80"
          anchorX="center"
          anchorY="middle"
          maxWidth={0.7}
        >
          {location.name}
        </Text>
        
        {/* Call to action text */}
        <Text
          position={[0, -0.08, 0.01]}
          fontSize={0.04}
          color="#80ffa0"
          anchorX="center"
          anchorY="middle"
          maxWidth={0.7}
        >
          Click to visit →
        </Text>
      </Billboard>
    </animated.group>
  );
};

// Create emoji sprite texture
const createEmojiTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🥒', canvas.width / 2, canvas.height / 2);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

export default function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const markersRef = useRef<THREE.Group>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isAnyLocationHovered, setIsAnyLocationHovered] = useState(false);
  const [showMarkers, setShowMarkers] = useState(false);
  
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  texture.offset.set(0, 0);

  const emojiTexture = useMemo(() => createEmojiTexture(), []);
  const spriteMaterial = new THREE.SpriteMaterial({ map: emojiTexture, transparent: true });

  // Earth scale animation
  const { scale: earthScale } = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
    config: { mass: 1, tension: 280, friction: 60 },
    onRest: () => {
      setShowMarkers(true);
    }
  });

  // Markers group animation
  const { scale: markersScale } = useSpring({
    from: { scale: 0 },
    to: { scale: showMarkers ? 1 : 0 },
    config: { mass: 1, tension: 280, friction: 60 }
  });

  // Glow animation
  const { glowIntensity } = useSpring({
    glowIntensity: isAnyLocationHovered ? 1 : 0.3,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
    if (markersRef.current) {
      markersRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  const handleMarkerClick = (location: Location) => {
    if (selectedLocation?.name === location.name) {
      // If clicking the same location, open the link
      window.open(location.link, '_blank');
    } else {
      // If clicking a different location, show its tooltip
      setSelectedLocation(location);
    }
  };

  const atmosphereEffect = {
    uniforms: {
      glowColor: { value: new THREE.Color(0x00ff80) },
      viewVector: { value: new THREE.Vector3(0, 0, 1) },
      glowIntensity: { value: 0.3 }
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
      uniform float glowIntensity;
      void main() {
        float intensity = pow(0.4 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        gl_FragColor = vec4(glowColor, glowIntensity) * intensity;
      }
    `
  };

  return (
    <group>
      <animated.mesh scale={earthScale.to((s: number) => [s, s, s])}>
        <Sphere ref={earthRef} args={[1, 64, 64]}>
          <meshPhongMaterial
            map={texture}
            specular={new THREE.Color(0x00ff80)}
            shininess={10}
          />
        </Sphere>
      </animated.mesh>

      {/* Location Markers */}
      <animated.group ref={markersRef} scale={markersScale.to((s: number) => [s, s, s])}>
        {locations.map((location, index) => {
          const position = latLongToVector3(location.lat, location.long, 1.02);
          return (
            <group key={index} position={position}>
              <LocationMarker 
                onClick={() => handleMarkerClick(location)}
                onHover={setIsAnyLocationHovered}
              />
              {selectedLocation?.name === location.name && (
                <group position={[0, 0.2, 0]}>
                  <LocationTooltip location={location} />
                </group>
              )}
            </group>
          );
        })}
      </animated.group>
      
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