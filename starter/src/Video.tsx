import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Karaoke, KaraokeWord} from './components/Karaoke';
import {Readout} from './components/Readout';
import {Chip} from './components/Chip';
import {JudulFase} from './components/JudulFase';

// Komposisi CONTOH: membuktikan lapisan teks/readout/chip berjalan.
// Sesi produksi mengganti isi komposisi ini (atau mendaftarkan
// komposisi baru) mengikuti timeline.json video yang diproduksi.
const words: KaraokeWord[] = [
  {text: 'Selama', start: 0.2, end: 0.7},
  {text: 'video', start: 0.7, end: 1.1},
  {text: 'ini', start: 1.1, end: 1.5},
  {text: 'berjalan,', start: 1.5, end: 2.1},
  {text: 'jantungmu', start: 2.1, end: 2.8, keyword: true},
  {text: 'sudah', start: 2.8, end: 3.2},
  {text: 'berdetak', start: 3.2, end: 3.9, keyword: true},
  {text: 'puluhan', start: 3.9, end: 4.5},
  {text: 'kali.', start: 4.5, end: 5.1},
];

export const Video: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#1E1033'}}>
      <div
        style={{
          position: 'absolute',
          top: 190,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 96,
          fontWeight: 700,
          letterSpacing: 4,
          color: '#FFFFFF',
        }}
      >
        JUDUL CONTOH
      </div>
      <Readout label="DETAK / HARI" target={100000} suffix="" startFrame={150} top={560} />
      <Chip text="Bilik kiri" sub="pompa utama" active style={{left: 90, top: 1080}} />
      <Chip text="Aorta" sub="jalan raya utama" style={{right: 90, top: 1220}} />
      <JudulFase text="DIBONGKAR" startFrame={60} />
      <Karaoke words={words} />
    </AbsoluteFill>
  );
};
