import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { TheoryNodeType } from '../types';
import { lightenColor } from '../utils/colorUtils';

interface TheoryNodeProps {
  node: TheoryNodeType;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (id: string | null) => void;
  onHover: (id: string | null) => void;
}

export const TheoryNode: React.FC<TheoryNodeProps> = ({
  node,
  isSelected,
  isHovered,
  onSelect,
  onHover,
}) => {
  // We'll use lookAt in useFrame to make the sphere face the camera
  
  const handlePointerOver = () => onHover(node.id);
  const handlePointerOut = () => onHover(null);
  const handleClick = () => onSelect(node.id);
  
  // Create a ref for the sphere group
  const sphereRef = useRef<THREE.Group>(null);
  
  // Update sphere rotation to face the camera on each frame
  useFrame(({ camera }) => {
    if (sphereRef.current) {
      // Make the sphere face the camera
      sphereRef.current.lookAt(camera.position);
    }
  });

  return (
    <group position={node.position} ref={sphereRef}>
      <mesh
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={isSelected || isHovered ? 1.25 : 1}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={isHovered ? lightenColor(node.color, 30) : node.color}
          roughness={0.3}
          metalness={0.1}
          emissive={isSelected ? node.color : undefined}
          emissiveIntensity={isSelected ? 0.3 : 0}
        />
        {/* Label on the front of the sphere */}
        <group position={[0, 0, 0.55]}>
          <Text
            position={[0, 0, 0]}
            textAlign="center"
            fontSize={0.18}
            color={isHovered ? '#38bdf8' : '#fff'}
            anchorX="center"
            anchorY="middle"
            outlineColor="#222"
            outlineWidth={0.03}
            fillOpacity={1}
            maxWidth={1.2}
          >
            {node.name}
          </Text>
        </group>
      </mesh>
    </group>
  );
};
