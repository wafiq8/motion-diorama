import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';

export type KaraokeWord = {
  text: string;
  start: number; // detik
  end: number; // detik
  keyword?: boolean;
};

// Subtitle karaoke sesuai aturan skill: halaman 2–4 kata dalam pill
// gelap, kata aktif tegas, kata kunci berwarna kuning aksen.
// Waktu kata berasal dari timeline.json produksi (di sini contoh).
export const Karaoke: React.FC<{words: KaraokeWord[]; bottom?: number}> = ({
  words,
  bottom = 340,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const idx = words.findIndex((w) => t >= w.start && t < w.end);
  if (idx === -1) {
    return null;
  }
  const from = Math.max(0, idx - 1);
  const page = words.slice(from, from + 4);
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(10,8,20,0.82)',
          borderRadius: 28,
          padding: '14px 28px',
          display: 'flex',
          gap: 14,
        }}
      >
        {page.map((w, i) => {
          const active = from + i === idx;
          return (
            <span
              key={i}
              style={{
                fontFamily: 'Inter, Arial, sans-serif',
                fontSize: 44,
                fontWeight: active ? 800 : 500,
                color: w.keyword
                  ? '#FFD84D'
                  : active
                    ? '#FFFFFF'
                    : 'rgba(255,255,255,0.55)',
              }}
            >
              {w.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};
