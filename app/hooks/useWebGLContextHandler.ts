import { useCallback, useRef } from 'react';

interface WebGLContextHandlerReturn {
  forceContextLoss: () => void;
}

export const useWebGLContextHandler = (
  selectedTheoryId: string | null,
  setSelectedTheoryId: (id: string | null) => void
): WebGLContextHandlerReturn => {
  const forceContextLoss = useCallback(() => {
    if (selectedTheoryId) {
      const currentId = selectedTheoryId;
      setSelectedTheoryId(null);
      setTimeout(() => setSelectedTheoryId(currentId), 100);
    }
  }, [selectedTheoryId, setSelectedTheoryId]);

  return {
    forceContextLoss
  };
};