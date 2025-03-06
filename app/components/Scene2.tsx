"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AsciiRenderer, OrbitControls, PerspectiveCamera, Text, Billboard } from "@react-three/drei";
import Earth from "./Earth";
import Stars from "./Stars";
import Particles from "./Particles";
import { Model } from './Pill'
import { useSpring, animated } from "@react-spring/three";
import { Vector3 } from "three";

interface AnimatedTextProps {
    children: React.ReactNode;
    position: [number, number, number];
    fontSize: number;
    color: string;
}

const AnimatedText = ({ children, position, fontSize, color }: AnimatedTextProps) => {
    const { scale } = useSpring({
        from: { scale: 0 },
        to: { scale: 1 },
        config: { mass: 1, tension: 280, friction: 60 }
    });

    return (
        <Billboard position={position}>
            <animated.group scale={scale.to(s => [s, s, s])}>
                <Text fontSize={fontSize} color={color} anchorX="center" anchorY="middle" maxWidth={4} textAlign="center">
                    {children}
                </Text>
            </animated.group>
        </Billboard>
    );
};

export default function Scene() {
    return (
        <div className="h-[60vh] md:h-[80vh] w-full">
            <Canvas>
                {/* <AsciiRenderer /> */}
                <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={45} />
                {/* <color attach="background" args={["#000010"]} /> */}
                <Suspense fallback={null}>
                    <Stars />
                    <Earth />
                </Suspense>

                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}

                    autoRotateSpeed={0.2}
                    minDistance={2.5}
                    maxDistance={7}
                />
            </Canvas>
        </div>
    );
}