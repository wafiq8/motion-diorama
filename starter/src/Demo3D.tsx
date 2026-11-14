import React from 'react';
import {AbsoluteFill, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {config} from './config';

// Komposisi CONTOH 3D: membuktikan jalur Three.js (@remotion/three)
// berjalan — satu objek prosedural berputar diturunkan murni dari
// nomor frame. Partikel bokeh di latar diturunkan dari `seed` di
// proyek.config.json lewat random() bawaan Remotion: deterministik
// dan bisa diulang persis di render berikutnya (sesuai larangan
// skill: tanpa useFrame dan tanpa fungsi acak/waktu bawaan JS).
const bokeh = new Array(24).fill(0).map((_, i) => ({
  posisi: [
    (random(`bokeh-x-${config.seed}-${i}`) - 0.5) * 10,
    (random(`bokeh-y-${config.seed}-${i}`) - 0.5) * 16,
    -2 - random(`bokeh-z-${config.seed}-${i}`) * 3,
  ] as [number, number, number],
  ukuran: 0.04 + random(`bokeh-s-${config.seed}-${i}`) * 0.09,
}));

export const Demo3D: React.FC = () => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  return (
    <AbsoluteFill style={{backgroundColor: '#1E1033'}}>
      <ThreeCanvas
        width={width}
        height={height}
        camera={{fov: 40, position: [0, 0, 9]}}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 6, 5]} intensity={1.4} />
        <directionalLight position={[-6, 2, -4]} intensity={0.9} color="#8A6CFF" />
        {bokeh.map((b, i) => (
          <mesh key={i} position={b.posisi}>
            <sphereGeometry args={[b.ukuran, 12, 12]} />
            <meshStandardMaterial color="#8A6CFF" roughness={0.6} />
          </mesh>
        ))}
        <mesh rotation={[frame * 0.008, frame * 0.012, 0]}>
          <torusKnotGeometry args={[1.5, 0.48, 140, 20]} />
          <meshStandardMaterial color="#C14B5A" roughness={0.35} />
        </mesh>
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
