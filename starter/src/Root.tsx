import React from 'react';
import {Composition} from 'remotion';
import {Video} from './Video';
import {Demo3D} from './Demo3D';

// Komposisi contoh. Sesi produksi mendaftarkan komposisi video
// sungguhan di sini mengikuti timeline.json (lihat SKILL.md).
export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="Video"
        component={Video}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Demo3D"
        component={Demo3D}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
