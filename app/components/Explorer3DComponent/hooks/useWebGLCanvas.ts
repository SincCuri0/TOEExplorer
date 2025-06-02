import { useState, useRef, useCallback } from 'react';
import { useWebGLContextHandler } from '../../../hooks/useWebGLContextHandler';
import { RootState } from '@react-three/fiber';
import { DEFAULT_CATEGORY } from '../utils/bandUtils';

export const useWebGLCanvas = () => {
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [selectedTheoryId, setSelectedTheoryId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [renderKey, setRenderKey] = useState(0);
  const prevSelectedId = useRef<string | null>(null);

  // Handle WebGL context loss and restoration
  useWebGLContextHandler(selectedTheoryId, setSelectedTheoryId);

  // Force re-render the canvas
  const forceCanvasRerender = useCallback(() => {
    setRenderKey(prev => prev + 1);
  }, []);

  const handleCanvasCreated = useCallback((state: RootState) => {
    const { gl } = state;
    console.log('WebGL context created');
    
    // Access the canvas from the renderer's DOM element
    const canvas = gl.domElement;
    if (canvas) {
      // Mark the canvas as 3D for context management
      canvas.setAttribute('data-3d', 'true');
      
      // Disable context menu
      canvas.oncontextmenu = (e) => e.preventDefault();
      
      // Set up context restoration
      const handleContextLost = (event: Event) => {
        event.preventDefault();
        console.log('WebGL context lost, attempting to restore...');
        forceCanvasRerender();
      };
      
      canvas.addEventListener('webglcontextlost', handleContextLost, false);
      
      // Clean up function
      return () => {
        canvas.removeEventListener('webglcontextlost', handleContextLost, false);
      };
    }
  }, [forceCanvasRerender]);

  return {
    selectedCategory,
    setSelectedCategory,
    selectedTheoryId,
    setSelectedTheoryId,
    hoveredId,
    setHoveredId,
    renderKey,
    handleCanvasCreated,
  };
};
