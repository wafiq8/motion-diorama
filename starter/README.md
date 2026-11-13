# Starter Scaffold — Proyek Remotion untuk Skill motion-diorama

Kerangka proyek Remotion + Three.js yang dipakai skill
`motion-diorama`. Versi dependensi di `package.json` adalah versi
persis yang terbukti jalan di produksi pembuat skill (Remotion
4.0.543, React Three Fiber 8.18.0, Three 0.170.0).

## Isi

- `src/Root.tsx` — mendaftarkan dua komposisi contoh: `Video`
  (lapisan teks/readout) dan `Demo3D` (jalur Three.js).
- `src/Video.tsx` — contoh lapisan DOM: judul serif, readout angka
  beranimasi, chip label, judul fase sesaat, subtitle karaoke.
- `src/Demo3D.tsx` — contoh jalur 3D: satu objek prosedural glossy
  berputar murni dari nomor frame (deterministik).
- `src/components/` — komponen yang dipakai ulang sesi produksi:
  `Karaoke` (subtitle 2–4 kata, kata kunci kuning), `Readout`
  (counter beranimasi + label), `Chip` (label menempel yang menyala
  saat aktif), `JudulFase` (penanda bab sesaat Mode B).

## Cara pakai

1. Salin ISI folder ini ke root repo kerjamu (folder yang sama
   dengan `.claude/skills/motion-diorama/`).
2. `npm install`
3. Cek contoh berjalan: `npx remotion still src/index.ts Video
   out/cek.png --frame=170` dan `npx remotion still src/index.ts
   Demo3D out/cek3d.png --frame=60`.
4. Mulai produksi lewat sesi Claude Code dengan prompt dari skill —
   sesi akan memakai scaffold ini di Tahap 0 dan membangun scene
   video di atasnya. File narasi ditaruh di `public/narasi.mp3`,
   musik di `public/musik.*` (oleh sesi, dari file yang kamu upload
   ke root repo).

Kedua komposisi contoh sudah diverifikasi pembuat skill:
`npm install` bersih, `npm run typecheck` lolos tanpa error, dan
kedua still contoh berhasil dirender.
