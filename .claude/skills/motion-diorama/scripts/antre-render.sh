#!/usr/bin/env bash
# Antrean render versi sempit untuk skill motion-diorama.
#
# Merender FINAL proyek-proyek yang timeline-nya SUDAH lolos
# validator — tanpa tahap kreatif apa pun. Proyek yang timeline-nya
# gagal DILEWATI dan dicatat; satu proyek gagal tidak menghentikan
# sisanya. Di akhir tercetak ringkasan per proyek.
#
# Pakai: bash scripts/antre-render.sh <folder-proyek> [folder lain ...]
# Syarat per proyek (berbasis starter): docs/timeline.json,
# proyek.config.json, dan perintah resmi `npm run final`
# (menghasilkan out/final.mp4).
set -u

DIR_SKILL="$(cd "$(dirname "$0")" && pwd)"
[ $# -ge 1 ] || { echo "Pakai: bash antre-render.sh <folder-proyek> [...]"; exit 2; }

berhasil=()
gagal=()
dilewati=()

for proj in "$@"; do
  nama="$(basename "$proj")"
  echo "=== $proj ==="
  if [ ! -d "$proj" ]; then
    echo "LEWATI $nama — folder tidak ada"
    dilewati+=("$nama (folder tidak ada)")
    continue
  fi
  if [ ! -f "$proj/docs/timeline.json" ]; then
    echo "LEWATI $nama — docs/timeline.json tidak ada"
    dilewati+=("$nama (tanpa timeline)")
    continue
  fi
  if ! python3 "$DIR_SKILL/validate_timeline.py" "$proj/docs/timeline.json" > /dev/null 2>&1; then
    echo "LEWATI $nama — timeline TIDAK lolos validator"
    dilewati+=("$nama (timeline gagal validasi)")
    continue
  fi
  slug="$(python3 -c "import json;print(json.load(open('$proj/proyek.config.json')).get('slug',''))" 2>/dev/null)"
  [ -n "$slug" ] || slug="$nama"

  if ! ( cd "$proj" && npm run final > /dev/null 2>&1 ) || [ ! -f "$proj/out/final.mp4" ]; then
    echo "GAGAL $slug — npm run final gagal"
    gagal+=("$slug (render)")
    continue
  fi
  if ! bash "$DIR_SKILL/check_output.sh" "$proj/out/final.mp4" > /dev/null 2>&1; then
    echo "GAGAL $slug — check_output FAIL pada out/final.mp4"
    gagal+=("$slug (check_output)")
    continue
  fi
  if ! python3 "$DIR_SKILL/buat_srt.py" "$proj/docs/timeline.json" "$proj/out/subtitel.srt" > /dev/null 2>&1; then
    echo "GAGAL $slug — buat_srt gagal"
    gagal+=("$slug (srt)")
    continue
  fi
  echo "BERHASIL $slug — out/final.mp4 + out/subtitel.srt"
  berhasil+=("$slug")
done

echo
echo "=== RINGKASAN ANTREAN ==="
echo "Berhasil (${#berhasil[@]}): ${berhasil[*]:-—}"
echo "Gagal    (${#gagal[@]}): ${gagal[*]:-—}"
echo "Dilewati (${#dilewati[@]}): ${dilewati[*]:-—}"
[ ${#gagal[@]} -eq 0 ] && [ ${#dilewati[@]} -eq 0 ]
