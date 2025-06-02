import React from 'react';
import { CRITERIA } from '../../theory-data';

interface CategorySelectorProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onCategoryChange,
}) => (
  <div style={{
    position: 'absolute',
    top: 18,
    left: 18,
    zIndex: 20,
    background: 'rgba(20,20,40,0.95)',
    borderRadius: 8,
    padding: '10px 16px',
    boxShadow: '0 2px 12px #000a',
    color: '#fff',
    fontSize: 16,
  }}>
    <label htmlFor="category-select" style={{ fontWeight: 600, marginRight: 8 }}>Sort by:</label>
    <select
      id="category-select"
      value={selectedCategory}
      onChange={e => onCategoryChange(e.target.value)}
      style={{
        background: '#181830',
        color: '#fff',
        border: '1px solid #333',
        borderRadius: 4,
        fontSize: 16,
        padding: '2px 8px',
      }}
    >
      {CRITERIA.map(crit => (
        <option key={crit.key} value={crit.key}>{crit.label}</option>
      ))}
    </select>
  </div>
);
