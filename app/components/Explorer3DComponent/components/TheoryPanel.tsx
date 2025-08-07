import React from 'react';
import { animated } from '@react-spring/web';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { CRITERIA } from '../../theory-data';
import { ExpandableSection } from './ExpandableSection';

interface TheoryPanelProps {
  theory: any | null;
  onClose: () => void;
}

const AnimatedCard = animated(Card);

export const TheoryPanel: React.FC<TheoryPanelProps> = ({ theory, onClose }) => {
  if (!theory) return null;

  return (
    <AnimatedCard
      className="absolute top-0 right-0 h-full w-96 bg-card/90 backdrop-blur-sm border-l border-border shadow-2xl z-10 flex flex-col"
    >
      <CardHeader className="flex flex-row items-start justify-between p-4">
        <div>
          <CardTitle className="text-2xl font-bold" style={{ color: theory.color }}>
            {theory.name}
          </CardTitle>
          {theory.subtitle && (
            <p className="text-sm text-muted-foreground">{theory.subtitle}</p>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto p-4 pt-0">
        <p className="mb-4 text-foreground/80">{theory.description}</p>
        <div className="space-y-2">
          {CRITERIA.map((crit) => (
            <ExpandableSection
              key={crit.key}
              title={crit.label}
              value={theory.criteria[crit.key]}
            />
          ))}
        </div>
      </CardContent>
    </AnimatedCard>
  );
};

