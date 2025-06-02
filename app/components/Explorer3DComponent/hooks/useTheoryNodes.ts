import { useMemo } from 'react';
import { THEORIES } from '../../../components/theory-data';
import { BAND_Y_POSITIONS, valueToBand, BandType, DEFAULT_CATEGORY } from '../utils/bandUtils';

export const useTheoryNodes = (selectedCategory: string = DEFAULT_CATEGORY) => {
  const { nodes, bandY } = useMemo(() => {
    if (!THEORIES || THEORIES.length === 0) return { nodes: [], bandY: BAND_Y_POSITIONS };
    
    // Group theories by band
    const bands: Record<BandType, any[]> = { 
      high: [], 
      medium: [], 
      low: []
    };
    
    THEORIES.forEach((theory) => {
      const val = theory.criteria[selectedCategory] || '';
      const band = valueToBand(val);
      if (bands[band]) {
        bands[band].push({ ...theory, band });
      } else {
        // Default to medium if band doesn't exist (shouldn't happen with current setup)
        bands.medium.push({ ...theory, band: 'medium' });
      }
    });

    // Layout: arrange each band in a horizontal circle, with Y position by band
    const allNodes: any[] = [];
    
    // Sort bands: high -> medium -> low
    (['high', 'medium', 'low'] as BandType[]).forEach((band) => {
      const group = bands[band];
      if (!Array.isArray(group) || group.length === 0) return;
      
      const angleStep = (2 * Math.PI) / group.length;
      group.forEach((theory: any, i: number) => {
        const angle = i * angleStep;
        allNodes.push({
          ...theory,
          position: [
            Math.cos(angle) * 4, 
            BAND_Y_POSITIONS[band], 
            Math.sin(angle) * 4
          ],
        });
      });
    });

    return { 
      nodes: allNodes, 
      bandY: BAND_Y_POSITIONS 
    };
  }, [selectedCategory]);

  return { nodes, bandY };
};
