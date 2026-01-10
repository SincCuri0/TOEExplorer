import { Theory } from "../theory-data";

export interface TheoryNode extends Theory {
  position: [number, number, number];
  band: 'high' | 'medium' | 'low';
}

export interface Band {
  type: 'high' | 'medium' | 'low' | 'other';
  label: string;
  color: string;
  yPosition: number;
  theories: TheoryNode[];
}

export interface CategoryOption {
  key: string;
  label: string;
}
