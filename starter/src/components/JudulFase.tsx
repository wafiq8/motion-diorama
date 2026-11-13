import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

// Judul fase sesaat (Mode B): muncul ±1 detik di batas fase lalu
// hilang. Ini penanda bab, BUKAN HUD — dilarang tampil permanen.
export const JudulFase: React.FC<{text: string; startFrame: number}> = ({
  text,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 6, startFrame + 26, startFrame + 34],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  if (opacity <= 0) {
    return null;
  }
  return (
    <div
      style={{
        position: 'absolute',
        top: 150,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        opacity,
      }}
    >
      <div
        style={{
          fontFamily: 'Inter, Arial, sans-serif',
          fontSize: 36,
          fontWeight: 700,
          letterSpacing: 8,
          color: '#FFFFFF',
          backgroundColor: 'rgba(10,8,20,0.7)',
          borderRadius: 999,
          padding: '10px 26px',
        }}
      >
        {text}
      </div>
    </div>
  );
};
