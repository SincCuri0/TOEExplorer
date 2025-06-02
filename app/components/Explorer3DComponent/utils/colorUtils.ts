export const getValidColor = (color: string, fallback: string = '#ffffff'): string => {
  // If it's already a valid 3 or 6 digit hex color, return it
  if (/^#([A-Fa-f0-9]{3}){1,2}$/i.test(color)) {
    return color.length === 4 
      ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
      : color;
  }
  console.warn(`Invalid color: ${color}, falling back to ${fallback}`);
  return fallback;
};

/**
 * Lightens a hex color by a given percentage
 * @param color - The hex color to lighten (e.g., '#ff0000' or '#f00')
 * @param percent - The percentage to lighten (0-100)
 * @returns The lightened hex color
 */
export const lightenColor = (color: string, percent: number): string => {
  // Ensure the color is valid and in 6-digit format
  const hex = getValidColor(color).replace('#', '');
  
  // Convert to RGB
  const num = parseInt(hex, 16);
  let r = (num >> 16) + Math.round(2.55 * percent);
  let g = (num >> 8 & 0x00FF) + Math.round(2.55 * percent);
  let b = (num & 0x0000FF) + Math.round(2.55 * percent);
  
  // Clamp values between 0-255
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  
  // Convert back to hex
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
};
