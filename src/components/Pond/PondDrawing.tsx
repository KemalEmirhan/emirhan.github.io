import React from 'react';

// Static rings: shown before WebGL starts and as the fallback without it. Matches the shader's rest rings.
const RINGS = [
  { r: 0.04, opacity: 1, width: 1.25 },
  { r: 0.113, opacity: 0.85 },
  { r: 0.213, opacity: 0.65 },
  { r: 0.333, opacity: 0.45 },
  { r: 0.473, opacity: 0.3 },
  { r: 0.633, opacity: 0.2 },
  { r: 0.8, opacity: 0.12 },
];

const PondDrawing = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox='0 0 600 240'
    preserveAspectRatio='xMidYMid meet'
    aria-hidden='true'
    focusable='false'
  >
    <g fill='none' stroke='currentColor' vectorEffect='non-scaling-stroke'>
      {RINGS.map(({ r, opacity, width = 1 }) => (
        <ellipse
          key={r}
          cx='300'
          cy='120'
          rx={r * 300}
          ry={r * 300 * 0.4}
          strokeOpacity={opacity}
          strokeWidth={width}
          vectorEffect='non-scaling-stroke'
        />
      ))}
    </g>
    <circle cx='300' cy='120' r='2.5' fill='currentColor' />
  </svg>
);

export default PondDrawing;
