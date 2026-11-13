import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

// Readout angka beranimasi: menghitung dari 0 ke target selama
// durasi yang diberikan, mulai pada startFrame. Semua angka di
// video tampil sebagai readout DOM seperti ini (aturan skill).
export const Readout: React.FC<{
  label: string;
  target: number;
  suffix?: string;
  startFrame: number;
  durationInFrames?: number;
  top?: number;
}> = ({label, target, suffix = '', startFrame, durationInFrames = 45, top = 300}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [startFrame, startFrame + durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const eased = 1 - Math.pow(1 - progress, 3);
  const value = Math.round(target * eased);
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
      }}
    >
      <div
        style={{
          fontFamily: 'Inter, Arial, sans-serif',
          fontSize: 92,
          fontWeight: 800,
          color: '#FFFFFF',
        }}
      >
        {value.toLocaleString('id-ID')}
        {suffix}
      </div>
      <div
        style={{
          fontFamily: 'Inter, Arial, sans-serif',
          fontSize: 34,
          letterSpacing: 3,
          color: '#FFD84D',
        }}
      >
        {label}
      </div>
    </div>
  );
};
