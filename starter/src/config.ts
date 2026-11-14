import raw from '../proyek.config.json';

// Pengaturan proyek adalah DATA, bukan kode: satu file
// proyek.config.json di root proyek (ditulis sesi di Tahap 0 dari
// lembar data produksi). Komposisi membaca resolusi/fps dari sini,
// dan semua keacakan prosedural diturunkan dari `seed` di sini —
// jangan menulis ulang nilai-nilai ini di dalam kode scene.
export interface ProyekConfig {
  mode: string;
  slug: string;
  seed: number;
  lebar: number;
  tinggi: number;
  fps: number;
  palette: string;
  seri: string;
  part: number;
}

export const config: ProyekConfig = raw;
