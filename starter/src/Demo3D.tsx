import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {ThreeCanvas} from '@remotion/three';

// Komposisi CONTOH 3D: membuktikan jalur Three.js (@remotion/three)
// berjalan — satu objek prosedural berputar diturunkan murni dari
// nomor frame (deterministik, sesuai larangan skill: tanpa
// useFrame/Math.random/Date.now untuk animasi).
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
        <mesh rotation={[frame * 0.008, frame * 0.012, 0]}>
          <torusKnotGeometry args={[1.5, 0.48, 140, 20]} />
          <meshStandardMaterial color="#C14B5A" roughness={0.35} />
        </mesh>
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
