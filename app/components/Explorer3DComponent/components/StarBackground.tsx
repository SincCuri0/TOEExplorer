import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

interface RotatingStarLayerProps {
  rotationSpeed: number;
  radius?: number;
  depth?: number;
  count?: number;
  factor?: number;
  saturation?: number;
  fade?: boolean;
  speed?: number;
  children?: React.ReactNode;
}

const RotatingStarLayer: React.FC<RotatingStarLayerProps> = ({
  rotationSpeed,
  children,
  ...starsProps
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars {...starsProps} />
      {children}
    </group>
  );
};

export const StarBackground: React.FC = () => {
  return (
    <>
      {/* Layer 1: Most distant stars - very slow rotation */}
      <RotatingStarLayer
        rotationSpeed={0.002}
        radius={300}
        depth={80}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={0}
      />
      {/* Layer 2: Mid-distance stars - slow rotation */}
      <RotatingStarLayer
        rotationSpeed={0.005}
        radius={150}
        depth={60}
        count={3000}
        factor={5}
        saturation={0}
        fade
        speed={0}
      />
      {/* Layer 3: Closer stars - slightly faster rotation */}
      <RotatingStarLayer
        rotationSpeed={0.01}
        radius={70}
        depth={40}
        count={1000}
        factor={6}
        saturation={0}
        fade
        speed={0.1}
      />
    </>
  );
};
