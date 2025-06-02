import React, { useState, useRef } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useMeasure } from 'react-use'; // You'll need to install react-use if not already installed

interface ExpandableSectionProps {
  title: string;
  children?: React.ReactNode;
  value?: any;
  defaultExpanded?: boolean;
  className?: string;
}

export const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  title,
  children,
  value,
  defaultExpanded = true,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [contentRef, { height: contentHeight }] = useMeasure<HTMLDivElement>();
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const arrowAnimation = useSpring({
    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
    config: { tension: 300, friction: 20 },
  });

  // Animate height and opacity with a small buffer to prevent cutting off content
  const contentAnimation = useSpring({
    height: isExpanded ? (contentHeight > 0 ? contentHeight + 8 : 'auto') : 0,
    opacity: isExpanded ? 1 : 0,
    config: { tension: 300, friction: 20 },
  });

  return (
    <div className={`expandable-section ${className}`} style={{ marginBottom: '1rem' }}>
      <button
        onClick={toggleExpand}
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          textAlign: 'left',
          background: 'none',
          border: 'none',
          color: '#fff',
          padding: '0.5rem 0',
          fontSize: '1rem',
          cursor: 'pointer',
          borderBottom: '1px solid #333',
        }}
      >
        <animated.span 
          style={{
            display: 'inline-block',
            marginRight: '0.5rem',
            ...arrowAnimation,
          }}
        >
          ›
        </animated.span>
        <span style={{ fontWeight: 600 }}>{title}</span>
      </button>
      <animated.div
        style={{
          overflow: 'hidden',
          height: contentAnimation.height,
          opacity: contentAnimation.opacity,
        }}
      >
        <div 
          ref={contentRef}
          style={{
            padding: '0.5rem 1rem 0.75rem',
          }}
        >
          {children || (value !== undefined && (
            <div>
              {typeof value === 'object' ? JSON.stringify(value) : String(value)}
            </div>
          ))}
        </div>
      </animated.div>
    </div>
  );
};

export default ExpandableSection;
