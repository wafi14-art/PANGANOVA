# PANGANOVA — Dataset Validation & Ingestion Report

**Waktu Eksekusi Pipeline:** `2026-11-04T05:38:11.330144+00:00`  
**File Sumber:** `1777262464.csv` (`47,683` bytes)  
**SHA-256 Checksum:** `ec270d1f625e2c3fb80eb9648c1dccf822e3eb6092fa14267fcf5a39d706f9cd`  
**Status Verifikasi Sumber:** `PENDING_OFFICIAL_CONFIRMATION`  
**Status Satuan Fisik:** `UNVERIFIED (Displaying plain Rupiah format; no Rp/kg assumption)`  

---

## 1. Ringkasan Integritas Baris Data

| Metrik Validasi | Nilai | Status Evaluasi |
| :--- | :--- | :--- |
| Baris Mentah (tanpa header) | **1,119** | Terbaca lengkap |
| Record Bersih Tersimpan | **1,119** | 100% preservasi (tanpa data terbuang) |
| Observasi Harga Valid | **1,103** (98.57%) | Numerik terverifikasi |
| Observasi Harga Hilang (`-`) | **16** (1.43%) | Dikonversi menjadi `null` |
| Duplikasi Composite Key (`Komoditas + Tanggal`) | **0** | **Lolos Validasi Integritas** |
| Total Komoditas Unik | **25** | Normalisasi spasi berhasil |
| Rentang Waktu Observasi | **2021-01-01** s/d **2025-12-01** | 60 bulan (5 tahun penuh) |

---

## 2. Rincian Nilai Hilang (`-` $\to$ `null`)

Ditemukan tepat **16 nilai '-'** pada dataset mentah. Seluruhnya dipetakan menjadi `null`:

| No | Baris CSV | Komoditas | Periode | Nilai Mentah | Nilai Bersih |
|---|---|---|---|---|---|
| 1 | Baris 171 | Minyak Goreng Curah | 2022-01 | `"-"` | `null` |
| 2 | Baris 172 | Jagung Tk. Peternak | 2022-01 | `"-"` | `null` |
| 3 | Baris 186 | Minyak Goreng Curah | 2022-02 | `"-"` | `null` |
| 4 | Baris 187 | Jagung Tk. Peternak | 2022-02 | `"-"` | `null` |
| 5 | Baris 201 | Minyak Goreng Curah | 2022-03 | `"-"` | `null` |
| 6 | Baris 202 | Jagung Tk. Peternak | 2022-03 | `"-"` | `null` |
| 7 | Baris 217 | Jagung Tk. Peternak | 2022-04 | `"-"` | `null` |
| 8 | Baris 350 | Tepung Terigu Kemasan | 2023-01 | `"-"` | `null` |
| 9 | Baris 354 | Ikan Kembung | 2023-01 | `"-"` | `null` |
| 10 | Baris 355 | Ikan Tongkol | 2023-01 | `"-"` | `null` |
| 11 | Baris 356 | Ikan Bandeng | 2023-01 | `"-"` | `null` |
| 12 | Baris 357 | Garam konsumsi | 2023-01 | `"-"` | `null` |
| 13 | Baris 370 | Tepung Terigu Kemasan | 2023-02 | `"-"` | `null` |
| 14 | Baris 377 | Garam konsumsi | 2023-02 | `"-"` | `null` |
| 15 | Baris 390 | Tepung Terigu Kemasan | 2023-03 | `"-"` | `null` |
| 16 | Baris 397 | Garam konsumsi | 2023-03 | `"-"` | `null` |

---

## 3. Rincian Panel Komoditas (Unbalanced Panel Breakdown)

| No | Komoditas | Observasi | Periode Mulai | Periode Akhir | Missing | Harga Min | Harga Max | Harga Terakhir | Status Panel |
|---|---|---:|---|---|---:|---:|---:|---:|---|
| 1 | Bawang Merah | 60 | 2021-01 | 2025-12 | 0 | Rp24,403 | Rp57,859 | Rp47,236 | Lengkap (60 bln) |
| 2 | Bawang Putih (Bonggol) | 60 | 2021-01 | 2025-12 | 0 | Rp25,701 | Rp44,750 | Rp37,823 | Lengkap (60 bln) |
| 3 | Beras Medium | 60 | 2021-01 | 2025-12 | 0 | Rp10,735 | Rp14,370 | Rp13,540 | Lengkap (60 bln) |
| 4 | Beras Premium | 60 | 2021-01 | 2025-12 | 0 | Rp12,183 | Rp16,517 | Rp15,549 | Lengkap (60 bln) |
| 5 | Beras SPHP | 19 | 2024-06 | 2025-12 | 0 | Rp12,453 | Rp13,188 | Rp12,453 | Parsial (19 bln) |
| 6 | Cabai Merah Besar | 11 | 2025-02 | 2025-12 | 0 | Rp42,821 | Rp54,278 | Rp52,147 | Parsial (11 bln) |
| 7 | Cabai Merah Keriting | 60 | 2021-01 | 2025-12 | 0 | Rp28,052 | Rp76,189 | Rp57,503 | Lengkap (60 bln) |
| 8 | Cabai Rawit Merah | 60 | 2021-01 | 2025-12 | 0 | Rp35,465 | Rp92,656 | Rp67,666 | Lengkap (60 bln) |
| 9 | Daging Ayam Ras | 60 | 2021-01 | 2025-12 | 0 | Rp33,457 | Rp39,810 | Rp39,810 | Lengkap (60 bln) |
| 10 | Daging Kerbau Beku (Impor) | 11 | 2025-02 | 2025-12 | 0 | Rp105,220 | Rp107,514 | Rp106,764 | Parsial (11 bln) |
| 11 | Daging Kerbau Segar (Lokal) | 11 | 2025-02 | 2025-12 | 0 | Rp140,557 | Rp144,686 | Rp140,557 | Parsial (11 bln) |
| 12 | Daging Sapi Murni | 60 | 2021-01 | 2025-12 | 0 | Rp121,836 | Rp137,824 | Rp135,300 | Lengkap (60 bln) |
| 13 | Garam konsumsi | 36 | 2023-01 | 2025-12 | 3 | Rp11,503 | Rp12,690 | Rp11,503 | Parsial (36 bln) |
| 14 | Gula Pasir Lokal/Curah | 60 | 2021-01 | 2025-12 | 0 | Rp13,277 | Rp18,547 | Rp18,044 | Lengkap (60 bln) |
| 15 | Ikan Bandeng | 36 | 2023-01 | 2025-12 | 1 | Rp33,523 | Rp38,691 | Rp35,780 | Parsial (36 bln) |
| 16 | Ikan Kembung | 36 | 2023-01 | 2025-12 | 1 | Rp38,235 | Rp43,216 | Rp43,216 | Parsial (36 bln) |
| 17 | Ikan Tongkol | 36 | 2023-01 | 2025-12 | 1 | Rp32,244 | Rp37,221 | Rp35,536 | Parsial (36 bln) |
| 18 | Jagung Tk. Peternak | 48 | 2022-01 | 2025-12 | 4 | Rp5,312 | Rp9,010 | Rp6,937 | Parsial (48 bln) |
| 19 | Kedelai Biji Kering | 60 | 2021-01 | 2025-12 | 0 | Rp10,361 | Rp14,969 | Rp10,776 | Lengkap (60 bln) |
| 20 | Minyak Goreng Curah | 48 | 2022-01 | 2025-12 | 3 | Rp13,779 | Rp18,611 | Rp17,640 | Parsial (48 bln) |
| 21 | Minyak Goreng Kemasan | 60 | 2021-01 | 2025-12 | 0 | Rp12,577 | Rp25,062 | Rp20,957 | Lengkap (60 bln) |
| 22 | Minyak Kita | 11 | 2025-02 | 2025-12 | 0 | Rp17,475 | Rp17,647 | Rp17,571 | Parsial (11 bln) |
| 23 | Telur Ayam Ras | 60 | 2021-01 | 2025-12 | 0 | Rp22,611 | Rp31,923 | Rp31,390 | Lengkap (60 bln) |
| 24 | Tepung Terigu Curah | 60 | 2021-01 | 2025-12 | 0 | Rp8,291 | Rp11,524 | Rp9,722 | Lengkap (60 bln) |
| 25 | Tepung Terigu Kemasan | 36 | 2023-01 | 2025-12 | 3 | Rp12,854 | Rp14,446 | Rp12,924 | Parsial (36 bln) |

---

## 4. Normalisasi Whitespace Nama Komoditas

Terdapat 19 komoditas yang memiliki inkonsistensi spasi di awal string pada data mentah. Seluruhnya telah dinormalisasi menggunakan `.strip()`:

- **Bawang Merah**: Variasi mentah ditemukan: ["' Bawang Merah'", "'Bawang Merah'"]
- **Bawang Putih (Bonggol)**: Variasi mentah ditemukan: ["' Bawang Putih (Bonggol)'", "'Bawang Putih (Bonggol)'"]
- **Beras Medium**: Variasi mentah ditemukan: ["' Beras Medium'", "'Beras Medium'"]
- **Beras Premium**: Variasi mentah ditemukan: ["' Beras Premium'", "'Beras Premium'"]
- **Cabai Merah Keriting**: Variasi mentah ditemukan: ["' Cabai Merah Keriting'", "'Cabai Merah Keriting'"]
- **Daging Ayam Ras**: Variasi mentah ditemukan: ["' Daging Ayam Ras'", "'Daging Ayam Ras'"]
- **Daging Sapi Murni**: Variasi mentah ditemukan: ["' Daging Sapi Murni'", "'Daging Sapi Murni'"]
- **Garam konsumsi**: Variasi mentah ditemukan: ["' Garam konsumsi'", "'Garam konsumsi'"]
- **Gula Pasir Lokal/Curah**: Variasi mentah ditemukan: ["' Gula Pasir Lokal/Curah'", "'Gula Pasir Lokal/Curah'"]
- **Ikan Bandeng**: Variasi mentah ditemukan: ["' Ikan Bandeng'", "'Ikan Bandeng'"]
- **Ikan Kembung**: Variasi mentah ditemukan: ["' Ikan Kembung'", "'Ikan Kembung'"]
- **Ikan Tongkol**: Variasi mentah ditemukan: ["' Ikan Tongkol'", "'Ikan Tongkol'"]
- **Jagung Tk. Peternak**: Variasi mentah ditemukan: ["' Jagung Tk. Peternak'", "'Jagung Tk. Peternak'"]
- **Kedelai Biji Kering**: Variasi mentah ditemukan: ["' Kedelai Biji Kering'", "'Kedelai Biji Kering'"]
- **Minyak Goreng Curah**: Variasi mentah ditemukan: ["' Minyak Goreng Curah'", "'Minyak Goreng Curah'"]
- **Minyak Goreng Kemasan**: Variasi mentah ditemukan: ["' Minyak Goreng Kemasan'", "'Minyak Goreng Kemasan'"]
- **Telur Ayam Ras**: Variasi mentah ditemukan: ["' Telur Ayam Ras'", "'Telur Ayam Ras'"]
- **Tepung Terigu Curah**: Variasi mentah ditemukan: ["' Tepung Terigu Curah'", "'Tepung Terigu Curah'"]
- **Tepung Terigu Kemasan**: Variasi mentah ditemukan: ["' Tepung Terigu Kemasan'", "'Tepung Terigu Kemasan'"]

---

## 5. Kesimpulan Validasi untuk Milestone 1

- [x] Seluruh 1.119 baris data mentah diproses tanpa ada baris yang hilang atau diduplikasi.
- [x] Composite primary key `(commodity, date)` terbukti 100% unik.
- [x] Tidak ada harga bertanda `'-'` yang diubah menjadi `0` atau angka semu.
- [x] Struktur panel tidak seimbang (*unbalanced panel*) telah didokumentasikan untuk memandu perbandingan multi-komoditas.
- [x] File JSON bersih siap dikonsumsi oleh lapisan data aplikasi.
