#!/usr/bin/env python3
"""Pembuat subtitle SRT dari timeline.json untuk skill motion-diorama.

Satu cue per kalimat, memakai teks naskah resmi dan timestamp yang
sudah divalidasi di timeline.json — tidak ada sumber timing kedua.
Fail-closed: exit 1 dan file TIDAK ditulis bila ada satu pun cek FAIL.
Pakai: python3 buat_srt.py docs/timeline.json out/subtitel.srt
"""
import json
import os
import sys

fails = []


def check(ok, label, detail=""):
    print(("PASS " if ok else "FAIL ") + label + (f" — {detail}" if detail else ""))
    if not ok:
        fails.append(label)


def cap(ms):
    ms = int(round(ms))
    jam, sisa = divmod(ms, 3_600_000)
    menit, sisa = divmod(sisa, 60_000)
    detik, mili = divmod(sisa, 1_000)
    return f"{jam:02d}:{menit:02d}:{detik:02d},{mili:03d}"


def main(src, dst):
    with open(src, encoding="utf-8") as f:
        t = json.load(f)

    sents = sorted(t.get("sentences", []), key=lambda s: s["id"])
    check(len(sents) > 0, "ada kalimat di timeline", f"{len(sents)} kalimat")
    if not sents:
        print("\nHASIL: GAGAL")
        sys.exit(1)

    check(all(s.get("text", "").strip() for s in sents),
          "semua kalimat punya teks naskah")
    check(all(float(s["end_s"]) > float(s["start_s"]) for s in sents),
          "setiap kalimat: end_s > start_s")
    overlap = any(float(sents[i]["start_s"]) < float(sents[i - 1]["end_s"]) - 0.05
                  for i in range(1, len(sents)))
    check(not overlap, "kalimat tidak tumpang tindih")
    total = float(t.get("total_duration_s", 0))
    check(float(sents[-1]["end_s"]) <= total + 0.05,
          "kalimat terakhir selesai sebelum video berakhir",
          f"akhir={float(sents[-1]['end_s']):.2f}s total={total:.2f}s")

    if fails:
        print(f"\nHASIL: GAGAL ({len(fails)} cek) — file tidak ditulis")
        sys.exit(1)

    blok = []
    for i, s in enumerate(sents, 1):
        blok.append(
            f"{i}\n{cap(float(s['start_s']) * 1000)} --> "
            f"{cap(float(s['end_s']) * 1000)}\n{s['text'].strip()}\n"
        )
    os.makedirs(os.path.dirname(dst) or ".", exist_ok=True)
    with open(dst, "w", encoding="utf-8") as f:
        f.write("\n".join(blok))

    print(f"\nHASIL: TERTULIS {dst} ({len(sents)} cue)")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "docs/timeline.json",
         sys.argv[2] if len(sys.argv) > 2 else "out/subtitel.srt")
