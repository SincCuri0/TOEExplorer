import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useWebGLCanvas } from './hooks/useWebGLCanvas';
import { useTheoryNodes } from './hooks/useTheoryNodes';
import { CategorySelector } from './components/CategorySelector';
import { BandVisualization } from './components/BandVisualization';
import { TheoryNode } from './components/TheoryNode';
import { TheoryPanel } from './components/TheoryPanel';
import { StarBackground } from './components/StarBackground';

export const Explorer3D: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedTheoryId,
    setSelectedTheoryId,
    hoveredId,
    setHoveredId,
    renderKey,
    handleCanvasCreated,
  } = useWebGLCanvas();

  const { nodes, bandY } = useTheoryNodes(selectedCategory);
  const selectedTheory = nodes.find((n) => n.id === selectedTheoryId) || null;
  
  // Show bands only when a category is explicitly selected
  const showBands = selectedCategory !== 'elegance'; // Assuming 'elegance' is the default category

  return (
    <div style={{
      position: 'relative',
      width: "100vw",
      height: "80vh",
      overflow: 'hidden',
    }}>
      <CategorySelector 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory} 
      />
      
      <Canvas
        key={`canvas-${renderKey}`}
        camera={{
          position: [0, 2, 12],
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        style={{ background: '#000005' }}
        gl={{
          powerPreference: 'high-performance',
          antialias: true,
          stencil: false,
          depth: true,
          alpha: false,
          preserveDrawingBuffer: true,
          failIfMajorPerformanceCaveat: false
        } as any}
        dpr={[1, 2]}
        onCreated={handleCanvasCreated}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-5, 5, 5]} intensity={0.5} />
        
        <StarBackground />
        <BandVisualization bandY={bandY} visible={showBands} />
        
        {nodes.map((node) => (
          <TheoryNode
            key={node.id}
            node={node}
            isSelected={selectedTheoryId === node.id}
            isHovered={hoveredId === node.id}
            onSelect={setSelectedTheoryId}
            onHover={setHoveredId}
          />
        ))}
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          zoomSpeed={0.5} // Slower zoom
          minDistance={5}  // Minimum zoom distance
          maxDistance={30} // Maximum zoom distance
          rotateSpeed={0.5} // Slower rotation
          panSpeed={0.5}   // Slower panning
          target={[0, 0, 0]}
          enableDamping={true} // Adds smooth deceleration
          dampingFactor={0.05} // Controls deceleration speed
          screenSpacePanning={true} // Better for 2D panning
          maxPolarAngle={Math.PI / 1.5} // Limit vertical rotation
          minPolarAngle={Math.PI / 6}   // Limit vertical rotation
        />
      </Canvas>

      <TheoryPanel 
        theory={selectedTheory} 
        onClose={() => setSelectedTheoryId(null)} 
      />
    </div>
  );
};

export default Explorer3D;
