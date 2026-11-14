import React from 'react';
import {Composition} from 'remotion';
import {Video} from './Video';
import {Demo3D} from './Demo3D';
import {config} from './config';

// Komposisi contoh. Sesi produksi mendaftarkan komposisi video
// sungguhan di sini mengikuti timeline.json (lihat SKILL.md).
// Resolusi dan fps dibaca dari proyek.config.json — bukan angka
// yang ditulis ulang di kode.
export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="Video"
        component={Video}
        durationInFrames={450}
        fps={config.fps}
        width={config.lebar}
        height={config.tinggi}
      />
      <Composition
        id="Demo3D"
        component={Demo3D}
        durationInFrames={450}
        fps={config.fps}
        width={config.lebar}
        height={config.tinggi}
      />
    </>
  );
};
