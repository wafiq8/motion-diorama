# motion-diorama — Tool Produksi Video Edukasi (Mode A + B + C)

Skill Claude Code untuk membuat video edukasi vertikal 9:16 (30–60 detik)
bergaya 3D dari kode (Remotion + Three.js), dibangun dari
pengamatan pola kreator Motion Format, dalam tiga mode aktif: Mode A — diorama 3D semi-realistis
(lanskap/sejarah + varian peta hidup); Mode B — bongkar benda
(cara kerja benda/mesin); Mode C — ilustrasi anatomi 3D
glossy (Seri Tubuh Manusia). Tujuannya membangun audiens. Dirancang agar render final pertama
langsung lolos QC: timing diukur dari audio asli ke dalam satu
timeline.json yang divalidasi mesin, teks readout tidak bisa keluar
frame, ada gerbang still internal yang murah (Mode Tinggal: sesi menilai sendiri), dan sesi wajib QC mandiri
fail-closed sebelum menyerahkan hasil.

## Keputusan terkunci (user, 12 Nov 2026; daftar mode diperbarui 13 Nov 2026)

Mode A + B + C aktif · tujuan bangun audiens (penutup kesimpulan/callback, tanpa kartu seri & tanpa pill tahap;
CTV hanya sesekali bila diminta) · angka = readout layar (hybrid: maks.
satu angka hero 3D emas per video) · durasi 30–60 detik · suara agnostik (MP3 dari user) ·
musik dari user · fakta: sumber user utama, riset web boleh melengkapi
+ wajib cantumkan sumber · operator tunggal ·
target 1–2 video/hari · render cepat per-scene + concat (pola optimasi
Puppeteer/FFmpeg).

## Isi paket

- `SKILL.md` — inti (294 baris): keputusan terkunci, larangan keras,
  aturan timing/timeline.json, style lock ringkas tiga mode, aturan teks, audio,
  alur 5 tahap dengan gerbang internal (Mode Tinggal), pipeline render cepat, QC 10 poin.
- `references/mode-a.md` — detail Mode A: gaya visual + palet + rig
  cahaya, tipografi serif, bahasa kamera & tangga zoom, tiga struktur
  narasi, penutup CTV, dan Varian A2 Peta Hidup.
- `references/mode-b.md` — detail Mode B (bongkar benda): dua tahap
  konteks → lab, satu model objek untuk ledakan + belahan, label
  bagian dwibahasa berurutan narasi, belahan berjalan ikuti-satu-
  aliran, makro mekanisme, payoff label prinsip, tanpa HUD, QC khusus.
- `references/mode-c.md` — detail Mode C (anatomi): organ hero glossy
  di void ungu, kode warna aliran mutlak, struktur ikuti-satu-aliran,
  hook waktu-nyata + counter hidup, judul tunda, chip
  menyala, penutup callback, QC khusus Mode C.
- `templates/tabel-kalimat.md` — format baku tabel kalimat & pemetaan.
- `scripts/validate_timeline.py` — validator fail-closed untuk
  timeline.json (sudah diuji: PASS pada contoh valid).
- `scripts/check_output.sh` — pemeriksa file final via ffprobe/ffmpeg:
  resolusi, fps, durasi 30–60, keheningan, loudness (sudah diuji).
- `evals/evals.md` — 5 skenario uji (aliran, peta, bantahan mitos,
  anatomi Mode C, bongkar benda Mode B) +
  asersi lulus/gagal terukur; jalankan sebelum skill disebut selesai.
- `prompt-mulai-sesi-baru.txt` — prompt pendek yang ditempel user sebagai
  pesan pertama setiap produksi baru di sesi Claude Code cloud.

## Cara pasang

Salin folder `motion-diorama` ini ke dalam repo kerja, di lokasi:

```
<repo>/.claude/skills/motion-diorama/
```

## Cara pakai (alur user)

1. Siapkan: mode (A/B/C) + topik + sumber fakta, naskah (atau minta draf), MP3 narasi,
   dan file musik — upload MP3 + musik ke root repo.
2. Buka sesi baru Claude Code cloud pada repo itu, tempel isi
   `prompt-mulai-sesi-baru.txt` yang sudah dilengkapi — lembar data
   padat yang dibuka perintah `/motion-diorama`; aturan main
   seluruhnya ada di SKILL.md.
3. Tinggalkan sesi berjalan (Mode Tinggal bawaan): sesi memeriksa
   timeline + still sendiri dan lanjut sampai final; berhenti
   hanya untuk penghambat keras.
4. Unduh MP4 final + periksa laporan (contact sheet + keputusan
   otomatis terlampir); minta revisi bila perlu.

## Versi

- v4.0 · edisi publik (17 Nov 2026) — amendemen jalur sudutpeta,
  dibangun per item. Item 1: aturan aset diganti — larangan total
  model unduhan dan tekstur/data luar dicabut, diganti aturan
  berlisensi (CC BY/CC0/Polyfork saja; badge dicek per model; GLB
  di-vendor; kredit di laporan + caption; data peta S2Cloudless/
  GEBCO/OSM khusus panggung peta). Item 2: Varian A2 ditulis ulang
  jadi format peta penuh — terrain satelit + heightmap GEBCO, satu
  penerbangan kontinu (zoom ngebut ber-blur), hero 3D di atas peta
  (piktogram 2D dicabut, pengecualian jarak kamera), tahap bawah
  permukaan (penampang batimetri + segmen bawah air), layer data
  berlegenda, dua struktur narasi (mesin waktu / perjalanan bukti).
  Item 3–6 menyusul per persetujuan user; penulisan ulang klaim
  publik adalah Item 6.
- v3.2 · edisi publik (14 Nov 2026) — dibangun per item dari saran
  pembuat skill. Item 1: perintah render dibakukan di starter —
  `npm run preview` (skala 0,5, untuk QC Tahap 4) dan `npm run
  final` (full-res, Tahap 5). Aturan preview-nya tidak berubah;
  sekarang ia bernama dan bisa dipanggil langsung. Item 2:
  pengaturan proyek menjadi satu file `proyek.config.json` di root
  proyek (mode, slug, seed, resolusi/fps, palette = nama varian
  terkunci, seri/part), ditulis sesi di Tahap 0; semua keacakan
  prosedural wajib turun dari `seed` config dan QC memeriksa tidak
  ada `Math.random` tersisa — starter membuktikannya lewat
  `Root.tsx` yang membaca resolusi/fps dari config dan partikel
  bokeh `Demo3D` yang ber-seed dari config. Item 3: skrip baru
  `scripts/buat_srt.py` mengekspor subtitle SRT dari timeline.json
  (satu cue per kalimat, teks naskah resmi, fail-closed) di Tahap 5
  menjadi `out/subtitel.srt` — untuk caption YouTube/Shorts dan
  arsip; karaoke terbakar tetap subtitle utama IG/TikTok. Item 4:
  `scripts/antre-render.sh` — antrean render versi sempit: merender
  final beberapa proyek berbasis starter yang timeline-nya sudah
  lolos validator, berurutan tanpa dijaga (render → check_output →
  SRT per proyek; yang gagal dilewati/dicatat, antrean tidak
  berhenti), ditutup ringkasan per proyek. Bukan produksi massal —
  gerbang dan QC per video tetap berjalan seperti biasa. Item 5
  (versi sempit): README utama kini punya bagian “Contoh hasil” —
  frame produksi nyata pertama dijelaskan sebagai bukti, file-file
  `contoh/` dipetakan ke tahap skill-nya, dan tautan halaman
  skills.sh dicantumkan; proyek contoh berkode lengkap belum
  disertakan dan itu dinyatakan apa adanya di sana. **Dengan ini
  v3.2 TUNTAS** — kelima item yang dibahas dan disetujui satu per
  satu sudah terpasang.
- v3.1 · edisi publik (13 Nov 2026) — jalur pasang keempat: **plugin
  marketplace Claude Code** (`.claude-plugin/marketplace.json` +
  `plugin.json` di root repo; bidang `skills` di marketplace menunjuk
  `.claude/skills/motion-diorama`). Teruji 13 Nov 2026 dengan
  Claude Code 2.1.323: marketplace terdaftar, plugin terpasang,
  skill ditemukan sebagai komponen plugin; isi skill tidak berubah
  dari v3.0. Ditambah gambar
  bukti hasil produksi di README repo (`docs/bukti.jpg.webp`).
  Prompt mulai dipadatkan menjadi lembar data yang dibuka perintah
  `/motion-diorama` (pengulangan aturan dari SKILL.md dibuang;
  keputusan siap pakai tetap di SKILL.md). Contact sheet QC kini
  digambari garis panduan area aman (margin 5% + zona platform
  ±250/±310 px) supaya penilaian zona aman terlihat, bukan
  dibayangkan.
- v3.0 · edisi publik (13 Nov 2026) — **Mode Tinggal** menjadi bawaan
  edisi publik: sesi tidak lagi berhenti di Gerbang 1/2 — kedua
  gerbang dijalankan internal oleh sesi terhadap kriteria tertulis
  yang sama (validator + penilaian contact sheet, perbaikan mandiri
  maks. 2 percobaan per scene), keputusan mengikuti blok keputusan
  siap pakai di prompt (atempo narasi kepanjangan maks. 1,25×, dsb),
  dan sesi hanya berhenti untuk penghambat keras (bahan rusak,
  transkrip mustahil, durasi tetap di luar rentang). Laporan akhir
  wajib melampirkan contact sheet + daftar penilaian + keputusan
  otomatis sebagai bukti. "Mode Tinggal: TIDAK" di prompt
  mengembalikan gerbang persetujuan klasik. Edisi pribadi pembuat
  tidak berubah (tetap v2.9, gerbang klasik).
- v2.9 (13 Nov 2026) — user mengaktifkan Mode B (bongkar benda —
  cara kerja benda/mesin) dari status parkir: references/mode-b.md
  baru, dibangun dari bedah rice cooker + mesin jet @motionformat,
  dalam versi BERSIH — grammar konteks → zoom → dibongkar → dibelah
  → saat menyala → makro mekanisme → payoff prinsip dipakai, tetapi
  HUD permanen referensi (breadcrumb, counter zoom, minimap)
  DIBUANG sesuai putusan riset 12 Nov dan arah v2.8. SKILL.md
  membawa ringkasan Mode B + penyesuaian aturan jarak, eval
  bertambah skenario 5 (bongkar benda), prompt mulai kini memilih
  tiga mode. Paket publik DITUNDA atas keputusan user — Mode B
  dulu, urusan publik belakangan. Kunci lain tidak berubah.
- v2.8 (13 Nov 2026) — user menghapus dua elemen layar untuk SEMUA
  video ke depan setelah melihat hasil Part 2 (Usus Bocor): (1) pill
  tahap Mode C (nama tahap + penanda "pos n/N" + titik progres)
  ditiadakan sepenuhnya — posisi aliran dibaca dari kamera, chip,
  dan narasi; (2) kartu/label seri di dalam video ditiadakan di
  kedua mode — penutup cukup kesimpulan (A) / callback (C) + fade;
  identitas seri hanya hidup di caption Instagram. SKILL.md,
  references/mode-a.md, references/mode-c.md, evals, prompt mulai,
  dan PANDUAN-PAKAI diselaraskan. Kunci lain tidak berubah.
- v2.7 (13 Nov 2026) — user mengaktifkan Mode C (anatomi, Seri Tubuh
  Manusia) dari status parkir: file references/mode-c.md baru
  (organ hero glossy di void ungu, kode warna aliran mutlak, struktur
  ikuti-satu-aliran, hook waktu-nyata + counter hidup, judul tunda,
  pill tahap tunggal, chip menyala, penutup callback, QC khusus),
  SKILL.md membawa ringkasan + pengecualian aturan jarak untuk Mode C,
  eval bertambah skenario 4 (anatomi), prompt mulai kini memilih mode
  per video. Mode B tetap parkir. Kunci lain tidak berubah.
- v2.6 (13 Nov 2026) — target ritme dilunakkan user menjadi 1–2
  video/hari (dari kunci datar 2/hari).
- v2.5 (13 Nov 2026) — gerbang diputuskan user: tetap dua; Gerbang 2
  (still) boleh dilonggarkan bertahap demi efisiensi setelah
  berturut-turut lolos bersih (tangga pelonggaran di SKILL.md);
  Gerbang 1 tidak pernah dilonggarkan.
- v2.4 (13 Nov 2026) — sumber fakta dilonggarkan atas kata user
  ("slow aja"): sumber user tetap rujukan utama, sesi boleh riset web
  untuk melengkapi dengan kewajiban mencantumkan sumber + menandai
  klaim belum terverifikasi.
- v2.3 (13 Nov 2026) — durasi standar dilebarkan user menjadi 30–60
  detik (dari 31–55), termasuk konstanta di kedua skrip pemeriksa.
- v2.2 (13 Nov 2026) — gaya angka diubah user menjadi HYBRID: readout
  layar tetap sistem utama; maksimal satu angka hero 3D emas per video
  untuk angka puncak, selalu diduplikasi readout/caption.
- v2.1 (13 Nov 2026) — koreksi dari user soal penutup: CTV hanya
  sesekali bila diminta untuk video itu, bukan elemen wajib; penutup
  bawaan = kesimpulan + label seri.
- v2.0 (12 Nov 2026) — dibangun ulang dari hasil deep research + jawaban
  user atas 10 pertanyaan desain: struktur progressive disclosure
  (inti + referensi + skrip + eval), fokus Mode A, readout DOM,
  timeline.json tervalidasi, karaoke 2–4 kata, hook teks+suara+visual
  ≤1,5 detik, durasi 31–55 detik, penutup call to value.
- v1.5–v1.1 — fase bedah 5 video contoh @motionformat (Mode A/B/C +
  varian peta). Mode B dan C kini tersimpan sebagai referensi di memori,
  tidak di paket aktif.
- v1.0 — sistem sekali-render awal dari bedah forensik render Komodo.
