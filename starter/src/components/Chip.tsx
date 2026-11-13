import React from 'react';

// Chip label anatomi/bagian: menempel pada objek (posisi absolut
// diatur pemakai), menyala berwarna aksen saat bagiannya aktif
// menurut narasi (aturan Mode B & C di skill).
export const Chip: React.FC<{
  text: string;
  sub?: string;
  active?: boolean;
  accent?: string;
  style?: React.CSSProperties;
}> = ({text, sub, active = false, accent = '#FF5252', style}) => {
  return (
    <div
      style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        backgroundColor: 'rgba(10,8,20,0.78)',
        border: `2px solid ${active ? accent : 'rgba(255,255,255,0.25)'}`,
        borderRadius: 999,
        padding: '8px 18px',
        boxShadow: active ? `0 0 18px ${accent}` : 'none',
        ...style,
      }}
    >
      <span
        style={{
          width: 14,
          height: 14,
          borderRadius: 7,
          backgroundColor: active ? accent : 'rgba(255,255,255,0.4)',
        }}
      />
      <span
        style={{
          fontFamily: 'Inter, Arial, sans-serif',
          fontSize: 30,
          fontWeight: 700,
          color: '#FFFFFF',
        }}
      >
        {text}
      </span>
      {sub ? (
        <span
          style={{
            fontFamily: 'Inter, Arial, sans-serif',
            fontSize: 24,
            color: 'rgba(255,255,255,0.65)',
          }}
        >
          {sub}
        </span>
      ) : null}
    </div>
  );
};
