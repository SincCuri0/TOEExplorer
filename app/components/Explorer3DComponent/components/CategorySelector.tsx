import React from 'react';
import { CRITERIA } from '../../theory-data';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CategorySelectorProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="absolute top-4 left-4 z-20 bg-card/80 backdrop-blur-md p-2 rounded-lg shadow-lg border border-border">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-muted-foreground px-2">Sort by:</span>
        {CRITERIA.map((crit) => (
          <Button
            key={crit.key}
            variant={selectedCategory === crit.key ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onCategoryChange(crit.key)}
            className={cn('transition-all', { 'text-primary-foreground': selectedCategory === crit.key })}
          >
            {crit.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

