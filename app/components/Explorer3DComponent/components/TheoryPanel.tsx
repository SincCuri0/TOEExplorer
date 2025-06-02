import React from 'react';
import { animated } from '@react-spring/web';
import { CRITERIA } from '../../theory-data';
import { ExpandableSection } from './ExpandableSection';

const AnimatedDiv = animated.div;

interface TheoryPanelProps {
  theory: any | null;
  onClose: () => void;
}

export const TheoryPanel: React.FC<TheoryPanelProps> = ({ theory, onClose }) => {
  if (!theory) return null;

  return (
    <AnimatedDiv
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 360,
        height: '100%',
        background: 'rgba(15, 15, 30, 0.97)',
        color: '#fff',
        padding: '1.5rem 1.5rem 1.5rem 1rem',
        boxShadow: '-2px 0 16px 0 #000a',
        zIndex: 10,
        overflowY: 'auto',
        borderLeft: '2px solid #222',
      }}
    >
      <button
        style={{
          position: 'absolute',
          top: 8,
          right: 12,
          background: '#222',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          padding: '4px 10px',
          cursor: 'pointer',
          fontSize: 18,
        }}
        onClick={onClose}
        title="Close"
      >
        ×
      </button>
      <h2
        style={{
          margin: '0 0 0.5rem 0',
          fontWeight: 700,
          fontSize: 24,
          color: theory.color,
        }}
      >
        {theory.name}
      </h2>
      {theory.subtitle && (
        <div style={{ color: '#aaa', fontSize: 16, marginBottom: 8 }}>
          {theory.subtitle}
        </div>
      )}
      <div style={{ marginBottom: 14, fontSize: 15 }}>{theory.description}</div>
      <div>
        {CRITERIA.map((crit) => (
          <ExpandableSection
            key={crit.key}
            title={crit.label}
            value={theory.criteria[crit.key]}
          />
        ))}
      </div>
    </AnimatedDiv>
  );
};
