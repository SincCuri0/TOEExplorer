export interface TheoryNodeType {
  id: string;
  name: string;
  color: string;
  position: [number, number, number];
  // Add any other properties that your theory nodes might have
  [key: string]: any; // For any additional dynamic properties
}

export interface Band {
  type: 'high' | 'medium' | 'low' | 'other';
  label: string;
  color: string;
  yPosition: number;
  theories: TheoryNodeType[];
}

export interface CategoryOption {
  key: string;
  label: string;
}
