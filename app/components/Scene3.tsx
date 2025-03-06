"use client";

import { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF, Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";

const BOOKS = [
    { 
        title: "Ethereum Localism",
        description: "A celebration of the web3 movement exploring how we can fund what matters locally.",
        file: "ethereum-localism.pdf"
    },
    { 
        title: "Grassroots Economics",
        description: "An exploration of capital allocation in Kenya, and how that could be translated to DAOs.",
        file: "grassroots-economics.pdf"
    },
    { 
        title: "Onchain Capital Allocation",
        description: "A practical journey from present mechanisms to future possibilities.",
        file: "onchain-capital-allocation-v2.pdf"
    },
    { 
        title: "Green Pill",
        description: "Exploring regenerative cryptoeconomic structures.",
        file: "green-pill.pdf"
    }
];

const Book = ({ title, description, file, isOpen }: { 
    title: string;
    description: string;
    file: string;
    isOpen: boolean;
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const { scene } = useGLTF("/models/book.glb");
    const bookModel = useMemo(() => scene.clone(), [scene]);

    const springs = useSpring({
        rotY: isOpen ? Math.PI/4 : 0,
        posZ: isOpen ? 0.8 : 0,
        posY: isOpen ? 0.1 : 0,
        rotX: isOpen ? -0.1 : 0,
        scale: isHovered ? (isOpen ? 1.15 : 1.1) : (isOpen ? 1.05 : 1),
        config: {
            mass: 1.5,
            tension: 280,
            friction: 30,
        }
    });

    const titleSpring = useSpring({
        scale: isOpen ? 1.1 : 1,
        posY: isOpen ? 1.8 : 1.5,
        opacity: isOpen ? 0.7 : 1,
        config: {
            tension: 280,
            friction: 30,
        }
    });

    const descriptionSpring = useSpring({
        opacity: isOpen ? 1 : 0,
        scale: isOpen ? 1 : 0.8,
        config: {
            tension: 280,
            friction: 30,
        }
    });

    return (
        <animated.group
            position-z={springs.posZ}
            position-y={springs.posY}
            rotation-y={springs.rotY}
            rotation-x={springs.rotX}
            scale={springs.scale}
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={() => setIsHovered(false)}
        >
            <primitive object={bookModel} />
            
            <animated.group 
                position-y={titleSpring.posY} 
                scale={titleSpring.scale}
            >
                <Text
                    fontSize={0.25}
                    color="#00ff90"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={2}
                    outlineWidth={0.02}
                    outlineColor="#001810"
                    material-opacity={titleSpring.opacity}
                    material-transparent
                >
                    {title}
                </Text>
            </animated.group>

            {isOpen && (
                <animated.group
                    position={[1.8, 0.3, 0.5]}
                    scale={descriptionSpring.scale}
                >
                    <Float
                        speed={1.5}
                        rotationIntensity={0.1}
                        floatIntensity={0.1}
                    >
                        <group>
                            <mesh position={[0, 0, -0.05]}>
                                <planeGeometry args={[3.2, 1.2]} />
                                <animated.meshBasicMaterial 
                                    color="#001810" 
                                    opacity={descriptionSpring.opacity} 
                                    transparent 
                                />
                            </mesh>
                            <Text
                                position={[0, 0.2, 0]}
                                fontSize={0.18}
                                color="#a0ffc0"
                                anchorX="center"
                                anchorY="middle"
                                maxWidth={3}
                                material-opacity={descriptionSpring.opacity}
                                material-transparent
                            >
                                {description}
                            </Text>
                            <Text
                                position={[0, -0.2, 0]}
                                fontSize={0.15}
                                color="#40ff90"
                                anchorX="center"
                                anchorY="middle"
                                onClick={() => window.open(`/keep/pdf/${file}`, '_blank')}
                                material-opacity={descriptionSpring.opacity}
                                material-transparent
                            >
                                Click to read →
                            </Text>
                        </group>
                    </Float>
                </animated.group>
            )}
        </animated.group>
    );
};

const NavigationArrow = ({ direction, onClick, disabled }: {
    direction: 'left' | 'right';
    onClick: () => void;
    disabled: boolean;
}) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const spring = useSpring({
        scale: isHovered && !disabled ? 1.2 : 1,
        glow: isHovered && !disabled ? 1 : 0,
        rotation: isHovered && !disabled ? (direction === 'left' ? -0.2 : 0.2) : 0,
        config: {
            tension: 400,
            friction: 30
        }
    });

    return (
        <animated.group
            position={[direction === 'left' ? -2.5 : 2.5, 0, 0]}
            rotation-z={direction === 'left' ? Math.PI : 0}
            scale={spring.scale}
            onClick={disabled ? undefined : onClick}
            onPointerEnter={() => setIsHovered(!disabled)}
            onPointerLeave={() => setIsHovered(false)}
        >
            {/* Glow effect */}
            <mesh scale={1.2}>
                <circleGeometry args={[0.3, 32]} />
                <animated.meshBasicMaterial 
                    color="#00ff90"
                    transparent
                    opacity={spring.glow.to(g => g * 0.3)}
                />
            </mesh>

            {/* Main circle */}
            <mesh>
                <circleGeometry args={[0.25, 32]} />
                <meshBasicMaterial 
                    color={disabled ? "#1a3326" : (isHovered ? "#00ff90" : "#00804d")}
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Arrow */}
            <group position={[0.05, 0, 0.1]}>
                <animated.mesh 
                    rotation-z={spring.rotation}
                    position={[-0.05, 0, 0]}
                >
                    <planeGeometry args={[0.2, 0.08]} />
                    <meshBasicMaterial 
                        color={disabled ? "#1a3326" : "#001810"}
                        transparent
                        opacity={0.95}
                    />
                </animated.mesh>
                <animated.mesh 
                    rotation-z={spring.rotation}
                    position={[0.02, 0.08, 0]}
                >
                    <planeGeometry args={[0.15, 0.08]} />
                    <meshBasicMaterial 
                        color={disabled ? "#1a3326" : "#001810"}
                        transparent
                        opacity={0.95}
                    />
                </animated.mesh>
                <animated.mesh 
                    rotation-z={spring.rotation}
                    position={[0.02, -0.08, 0]}
                >
                    <planeGeometry args={[0.15, 0.08]} />
                    <meshBasicMaterial 
                        color={disabled ? "#1a3326" : "#001810"}
                        transparent
                        opacity={0.95}
                    />
                </animated.mesh>
            </group>

            {/* Pulse effect */}
            {!disabled && (
                <Float
                    speed={2}
                    rotationIntensity={0}
                    floatIntensity={0.2}
                >
                    <mesh scale={1.4}>
                        <ringGeometry args={[0.2, 0.21, 32]} />
                        <meshBasicMaterial 
                            color="#00ff90"
                            transparent
                            opacity={0.2}
                        />
                    </mesh>
                </Float>
            )}
        </animated.group>
    );
};

const BookDisplay = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const switchBook = (direction: 'left' | 'right') => {
        if (isTransitioning) return;
        
        setIsTransitioning(true);
        setIsOpen(false);
        
        setTimeout(() => {
            setCurrentIndex((prev) => {
                if (direction === 'left') {
                    return (prev - 1 + BOOKS.length) % BOOKS.length;
                } else {
                    return (prev + 1) % BOOKS.length;
                }
            });
            setIsTransitioning(false);
        }, 300); // Wait for close animation to finish
    };

    const displaySpring = useSpring({
        scale: isTransitioning ? 0.8 : 1,
        opacity: isTransitioning ? 0 : 1,
        config: {
            tension: 400,
            friction: 35,
        }
    });

    return (
        <group position={[0, -0.5, 0]}>
            <animated.group 
                onClick={() => !isTransitioning && setIsOpen(!isOpen)}
                scale={displaySpring.scale}
                position-y={displaySpring.opacity.to(o => (1 - o) * -0.5)}
            >
                <Book
                    {...BOOKS[currentIndex]}
                    isOpen={isOpen}
                />
            </animated.group>

            <NavigationArrow
                direction="left"
                onClick={() => switchBook('left')}
                disabled={BOOKS.length <= 1 || isTransitioning}
            />
            <NavigationArrow
                direction="right"
                onClick={() => switchBook('right')}
                disabled={BOOKS.length <= 1 || isTransitioning}
            />

            <Text
                position={[0, -1, 0]}
                fontSize={0.15}
                color="#00804d"
                anchorX="center"
                anchorY="middle"
                material-opacity={displaySpring.opacity}
                material-transparent
            >
                {`${currentIndex + 1} / ${BOOKS.length}`}
            </Text>
        </group>
    );
};

export default function Scene3() {
    return (
        <div className="relative h-[60vh] md:h-[80vh] w-full">
            <Canvas>
                <PerspectiveCamera 
                    makeDefault 
                    position={[0, 1, 6]} 
                    fov={40}
                    rotation={[-0.1, 0, 0]}
                />
                
                <Suspense fallback={null}>
                    <BookDisplay />
                </Suspense>

                {/* Key light */}
                <spotLight
                    position={[2, 4, 4]}
                    angle={0.4}
                    penumbra={0.4}
                    intensity={0.8}
                    castShadow
                />

                {/* Fill light */}
                <ambientLight intensity={0.4} />
                
                {/* Rim light */}
                <pointLight
                    position={[0, 2, -3]}
                    intensity={0.3}
                    color="#80ffa0"
                />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={false}
                />
            </Canvas>
        </div>
    );
} 