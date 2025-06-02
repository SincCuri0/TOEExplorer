export const BAND_COLORS = {
  high: '#22c55e',    // green
  medium: '#eab308',  // yellow
  low: '#ef4444',    // red
} as const;

export const BAND_LABELS = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
} as const;

export type BandType = keyof typeof BAND_COLORS;

export const BAND_Y_POSITIONS: Record<BandType, number> = {
  high: 4,
  medium: 0,
  low: -4,
};

export const DEFAULT_CATEGORY = 'elegance';

export const valueToBand = (val: string): BandType => {
  if (!val) return 'medium'; // Default to medium if no value
  const v = val.toLowerCase();
  if (v.includes('high')) return 'high';
  if (v.includes('medium') || v.includes('moderate')) return 'medium';
  if (v.includes('low')) return 'low';
  return 'medium'; // Default to medium for any other case
};
