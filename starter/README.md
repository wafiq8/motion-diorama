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
- `proyek.config.json` + `src/config.ts` — pengaturan proyek sebagai
  data: mode, slug, `seed`, resolusi/fps, palette, seri/part.
  `Root.tsx` membaca resolusi/fps dari config; `Demo3D` menurunkan
  partikel bokehnya dari `seed` config lewat `random()` Remotion.

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

## Config proyek — `proyek.config.json`

Satu file JSON di root proyek, ditulis sesi di Tahap 0 dari lembar
data produksi. Mengganti kebiasaan menyalin angka ke kode:

- `mode` / `slug` / `seri` / `part` — identitas video (seri/part
  hanya untuk caption, tidak tampil di video).
- `seed` — sumber semua keacakan prosedural. Seed sama = render
  ulang identik. Bawaan: tanggal produksi (YYYYMMDD).
- `lebar` / `tinggi` / `fps` — bawaan terkunci 1080×1920 / 30.
- `palette` — NAMA varian terkunci milik mode-nya (mis.
  `mode-c-void`), bukan hex bebas; pilihan warnanya tetap diatur
  style lock di SKILL.md dan file references per mode.

## Perintah render

- `npm run preview` — render komposisi `Video` skala 0,5 ke
  `out/preview.mp4`. Ini bahan penilaian QC (Tahap 4 di SKILL.md):
  murah dan cepat, bukan hasil akhir.
- `npm run final` — render full-res 1080×1920 ke `out/final.mp4`
  (Tahap 5 — sekali saja, setelah QC hijau).

Di produksi sungguhan sesi merender per scene lalu menggabungkan
dengan FFmpeg (lihat SKILL.md), mengikuti pola yang sama: semua
render QC berskala 0,5; full-res hanya di ujung.

Kedua komposisi contoh sudah diverifikasi pembuat skill:
`npm install` bersih, `npm run typecheck` lolos tanpa error, dan
kedua still contoh berhasil dirender.
