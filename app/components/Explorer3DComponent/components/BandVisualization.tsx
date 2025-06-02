import React from 'react';
import { Text } from '@react-three/drei';
import { BAND_COLORS, BAND_LABELS, BandType } from '../utils/bandUtils';
import { getValidColor } from '../utils/colorUtils';
import * as THREE from 'three';

interface BandVisualizationProps {
  bandY: Record<BandType, number>;
  visible?: boolean;
}

export const BandVisualization: React.FC<BandVisualizationProps> = ({ bandY, visible = false }) => {
  if (!visible) return null;
  return (
    <>
      {(['high', 'medium', 'low'] as const).map((band) => (
        <group key={band}>
          {/* Band background circle */}
          <mesh position={[0, bandY[band], 0]} rotation={[-Math.PI/2, 0, 0]}>
            <ringGeometry args={[3, 6, 64]} />
            <meshBasicMaterial 
              color={BAND_COLORS[band]} 
              transparent 
              opacity={0.25} 
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Band label */}
          <Text
            position={[-7, bandY[band] + 0.1, 0]}
            fontSize={0.7}
            color={getValidColor(BAND_COLORS[band])}
            anchorX="left"
            anchorY="middle"
            outlineColor="#222"
            outlineWidth={0.03}
            fillOpacity={0.9}
          >
            {BAND_LABELS[band]}
          </Text>
        </group>
      ))}
    </>
  );
};
