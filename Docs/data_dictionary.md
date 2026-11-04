# PANGANOVA — Kamus Data & Spesifikasi Variabel (Data Dictionary)

**Versi:** 1.0  
**Tanggal:** 4 November 2026  
**Status:** Spesifikasi Data Baseline  

Dokumen ini mendefinisikan struktur data mentah (*raw*), data hasil pembersihan (*processed*), metadata, serta katalog lengkap 25 komoditas pangan yang dipantau dalam platform PANGANOVA.

---

## 1. Skema Dataset Mentah (`data/raw/1777262464.csv`)

| Nama Kolom | Tipe Data Mentah | Nullable | Contoh Nilai | Keterangan & Anomali |
| :--- | :--- | :--- | :--- | :--- |
| `Komoditas` | `string` | Tidak | `"Beras Premium"`, `" Beras Medium"` | Terdapat 19 komoditas dengan spasi di awal string (*leading space*). |
| `Tahun` | `string` / `int` | Tidak | `"2021"`, `"2025"` | Rentang 2021 hingga 2025 (5 tahun observasi). |
| `Bulan` | `string` | Tidak | `"Januari"`, `"Desember"` | Nama bulan dalam Bahasa Indonesia (12 bulan standar). |
| `Harga` | `string` | Ya (simbol) | `"Rp12,319"`, `"-"` | Format teks Rupiah lokal dengan prefix `Rp` dan pemisah ribuan `,`. Terdapat 16 entri bernilai `"-"` yang merepresentasikan data hilang (*missing value*). |

---

## 2. Skema Dataset Hasil Pembersihan (`data/processed/food_prices_clean.json`)

Format: Array of JSON Objects (1.119 elemen).

```json
{
  "id": "beras-premium-2021-01",
  "commodity": "Beras Premium",
  "commodity_id": "beras-premium",
  "year": 2021,
  "month": 1,
  "month_name": "Januari",
  "date": "2021-01-01",
  "period": "2021-01",
  "price": 12319,
  "is_missing": false
}
```

### Definisi Atribut:

| Atribut | Tipe Data TypeScript | Nullable | Deskripsi |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Tidak | ID unik gabungan slug komoditas dan periode (`YYYY-MM`). Contoh: `"bawang-merah-2023-08"`. |
| `commodity` | `string` | Tidak | Nama komoditas bersih setelah pembersihan spasi (`.strip()`). |
| `commodity_id` | `string` | Tidak | Slug URL-friendly dan konsisten untuk filter state/routing. Contoh: `"minyak-goreng-kemasan"`. |
| `year` | `number` | Tidak | Tahun observasi (integer 4 digit: 2021–2025). |
| `month` | `number` | Tidak | Nomor bulan dalam kalender Masehi (integer 1–12). |
| `month_name` | `string` | Tidak | Nama bulan resmi Bahasa Indonesia (`"Januari"` s/d `"Desember"`). |
| `date` | `string` | Tidak | Format tanggal standar ISO-8601 (`"YYYY-MM-01"`), memudahkan parsing pada pustaka charting. |
| `period` | `string` | Tidak | Label periode ringkas (`"YYYY-MM"`). |
| `price` | `number \| null` | Ya | Nilai harga nominal numerik (integer/float). Bernilai `null` jika data asli adalah `"-"`. |
| `is_missing` | `boolean` | Tidak | Flag penanda integritas data (`true` jika nilai asli `"-"`, `false` jika harga valid). |

---

## 3. Skema Metadata Komoditas (`data/processed/commodities_meta.json`)

Format: Array of JSON Objects (25 elemen).

| Atribut | Tipe Data | Deskripsi |
| :--- | :--- | :--- |
| `id` | `string` | Slug unik komoditas. |
| `name` | `string` | Nama komoditas bersih. |
| `raw_name_variations` | `string[]` | Daftar variasi penulisan spasi mentah pada file asli (untuk jejak audit). |
| `first_observed_date` | `string` | Tanggal ISO observasi pertama yang tercatat di dataset. |
| `latest_observed_date` | `string` | Tanggal ISO observasi terakhir yang tercatat di dataset. |
| `total_observations` | `number` | Total bulan di mana komoditas ini terdaftar di dataset. |
| `valid_observations` | `number` | Jumlah bulan dengan harga numerik valid. |
| `missing_observations` | `number` | Jumlah bulan dengan harga hilang (`null`). |
| `min_price` | `number \| null` | Harga terendah yang pernah tercatat sepanjang rentang observasi. |
| `max_price` | `number \| null` | Harga tertinggi yang pernah tercatat sepanjang rentang observasi. |
| `latest_price` | `number \| null` | Harga valid terakhir yang tercatat (observasi Desember 2025). |
| `has_full_history_60m` | `boolean` | `true` jika memiliki 60 bulan observasi penuh tanpa ada nilai hilang. |

---

## 4. Katalog Lengkap 25 Komoditas PANGANOVA

Berdasarkan hasil validasi data per 4 November 2026:

| No | Nama Komoditas | Slug ID | Observasi | Periode Aktif | Missing (`-`) | Harga Min | Harga Max | Harga Akhir (2025-12) | Status Satuan Fisik |
|---|---|---|---:|---|---:|---:|---:|---:|---|
| 1 | Bawang Merah | `bawang-merah` | 60 bln | 2021-01 s/d 2025-12 | 0 | Rp24.403 | Rp57.859 | Rp47.288 | *Dalam verifikasi* |
| 2 | Bawang Putih (Bonggol) | `bawang-putih-bonggol` | 60 bln | 2021-01 s/d 2025-12 | 0 | Rp25.701 | Rp44.750 | Rp38.031 | *Dalam verifikasi* |
| 3 | Beras Medium | `beras-medium` | 60 bln | 2021-01 s/d 2025-12 | 0 | Rp10.735 | Rp14.370 | Rp13.682 | *Dalam verifikasi* |
| 4 | Beras Premium | `beras-premium` | 60 bln | 2021-01 s/d 2025-12 | 0 | Rp12.183 | Rp16.517 | Rp15.688 | *Dalam verifikasi* |
| 5 | Beras SPHP | `beras-sphp` | 19 bln | 2024-06 s/d 2025-12 | 0 | Rp12.453 | Rp13.188 | Rp12.453 | *Dalam verifikasi* |
| 6 | Cabai Merah Besar | `cabai-merah-besar` | 11 bln | 2025-02 s/d 2025-12 | 0 | Rp42.821 | Rp54.278 | Rp48.790 | *Dalam verifikasi* |
| 7 | Cabai Merah Keriting | `cabai-merah-keriting` | 60 bln | 2021-01 s/d 2025-12 | 0 | Rp28.052 | Rp76.189 | Rp53.078 | *Dalam verifikasi* |
| 8 | Cabai Rawit Merah | `cabai-rawit-merah` | 60 bln | 2021-01 s/d 2025-12 | 0 | Rp35.465 | Rp92.656 | Rp51.492 | *Dalam verifikasi* |
| 9 | Daging Ayam Ras | `daging-ayam-ras` | 60 bln | 2021-01 s/d 2025-12 | 0 | Rp33.457 | Rp39.810 | Rp39.810 | *Dalam verifikasi* |
| 10 | Daging Kerbau Beku (Impor) | `daging-kerbau-beku-impor` | 11 bln | 2025-02 s/d 2025-12 | 0 | Rp105.220 | Rp107.514 | Rp106.182 | *Dalam verifikasi* |
| 11 | Daging Kerbau Segar (Lokal) | `daging-kerbau-segar-lokal` | 11 bln | 2025-02 s/d 2025-12 | 0 | Rp140.557 | Rp144.686 | Rp140.557 | *Dalam verifikasi* |
| 12 | Daging Sapi Murni | `daging-sapi-murni` | 60 bln | 2021-01 s/d 2025-12 | 0 | Rp121.836 | Rp137.824 | Rp135.269 | *Dalam verifikasi* |
| 13 | Garam konsumsi | `garam-konsumsi` | 36 bln | 2023-01 s/d 2025-12 | 3 | Rp11.503 | Rp12.690 | Rp11.503 | *Dalam verifikasi* |
| 14 | Gula Pasir Lokal/Curah | `gula-pasir-lokalcurah` | 60 bln | 2021-01 s/d 2025-12 | 0 | Rp13.277 | Rp18.547 | Rp17.971 | *Dalam verifikasi* |
| 15 | Ikan Bandeng | `ikan-bandeng` | 36 bln | 2023-01 s/d 2025-12 | 1 | Rp33.523 | Rp38.691 | Rp35.617 | *Dalam verifikasi* |
| 16 | Ikan Kembung | `ikan-kembung` | 36 bln | 2023-01 s/d 2025-12 | 1 | Rp38.235 | Rp43.216 | Rp43.216 | *Dalam verifikasi* |
| 17 | Ikan Tongkol | `ikan-tongkol` | 36 bln | 2023-01 s/d 2025-12 | 1 | Rp32.244 | Rp37.221 | Rp35.197 | *Dalam verifikasi* |
| 18 | Jagung Tk. Peternak | `jagung-tk-peternak` | 48 bln | 2022-01 s/d 2025-12 | 4 | Rp5.312 | Rp9.010 | Rp6.974 | *Dalam verifikasi* |
| 19 | Kedelai Biji Kering | `kedelai-biji-kering` | 60 bln | 2021-01 s/d 2025-12 | 0 | Rp10.361 | Rp14.969 | Rp10.741 | *Dalam verifikasi* |
| 20 | Minyak Goreng Curah | `minyak-goreng-curah` | 48 bln | 2022-01 s/d 2025-12 | 3 | Rp13.779 | Rp18.611 | Rp17.518 | *Dalam verifikasi* |
| 21 | Minyak Goreng Kemasan | `minyak-goreng-kemasan` | 60 bln | 2021-01 s/d 2025-12 | 0 | Rp12.577 | Rp25.062 | Rp20.970 | *Dalam verifikasi* |
| 22 | Minyak Kita | `minyak-kita` | 11 bln | 2025-02 s/d 2025-12 | 0 | Rp17.475 | Rp17.647 | Rp17.498 | *Dalam verifikasi* |
| 23 | Telur Ayam Ras | `telur-ayam-ras` | 60 bln | 2021-01 s/d 2025-12 | 0 | Rp22.611 | Rp31.923 | Rp31.923 | *Dalam verifikasi* |
| 24 | Tepung Terigu Curah | `tepung-terigu-curah` | 60 bln | 2021-01 s/d 2025-12 | 0 | Rp8.291 | Rp11.524 | Rp9.711 | *Dalam verifikasi* |
| 25 | Tepung Terigu Kemasan | `tepung-terigu-kemasan` | 36 bln | 2023-01 s/d 2025-12 | 3 | Rp12.854 | Rp14.446 | Rp12.986 | *Dalam verifikasi* |

---

## 5. Rincian 16 Observasi Nilai Hilang (`"-"` $\to$ `null`)

Berikut adalah daftar lengkap 16 baris dalam dataset mentah yang memiliki nilai hilang:

1. **Minyak Goreng Curah:**
   - 2022-01 (Januari 2022) — Baris CSV 171
   - 2022-02 (Februari 2022) — Baris CSV 186
   - 2022-03 (Maret 2022) — Baris CSV 201
2. **Jagung Tk. Peternak:**
   - 2022-01 (Januari 2022) — Baris CSV 172
   - 2022-02 (Februari 2022) — Baris CSV 187
   - 2022-03 (Maret 2022) — Baris CSV 202
   - 2022-04 (April 2022) — Baris CSV 217
3. **Tepung Terigu Kemasan:**
   - 2023-01 (Januari 2023) — Baris CSV 350
   - 2023-02 (Februari 2023) — Baris CSV 370
   - 2023-03 (Maret 2023) — Baris CSV 390
4. **Garam konsumsi:**
   - 2023-01 (Januari 2023) — Baris CSV 357
   - 2023-02 (Februari 2023) — Baris CSV 377
   - 2023-03 (Maret 2023) — Baris CSV 397
5. **Produk Ikan (Januari 2023):**
   - Ikan Kembung: 2023-01 — Baris CSV 354
   - Ikan Tongkol: 2023-01 — Baris CSV 355
   - Ikan Bandeng: 2023-01 — Baris CSV 356

