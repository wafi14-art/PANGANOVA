# PANGANOVA — Dataset Audit & Codex Handoff

**Tanggal audit:** 3 November 2026  
**Status:** Audit awal berdasarkan dua file CSV yang diunggah.  
**Catatan:** Audit ini memeriksa struktur dan konsistensi internal file, bukan memverifikasi asal dataset ke situs penerbit.

## 1. Ringkasan file

| File | Baris data | Kolom | Rentang periode |
|---|---:|---:|---|
| `1777263095(1).csv` | 1.094 | 4 | Januari 2021–November 2025 |
| `1777262464(1).csv` | 1.119 | 4 | Januari 2021–Desember 2025 |

Kolom pada kedua file: `Komoditas`, `Tahun`, `Bulan`, `Harga`.

File kedua memuat 25 baris tambahan untuk Desember 2025. Seluruh 1.094 observasi yang tumpang tindih identik pada nilai harga setelah parsing; tidak ditemukan perbedaan nilai pada periode yang sama. Karena itu, untuk prototipe awal file kedua adalah kandidat yang lebih lengkap. Simpan file pertama sebagai arsip pembanding, bukan gabungkan keduanya, agar tidak menggandakan data.

## 2. Temuan kualitas data

- Setelah spasi awal/akhir pada nama komoditas dibersihkan, terdapat **25 nama komoditas unik**.
- Tidak ditemukan duplikasi kunci `Komoditas + Tahun + Bulan` setelah nama komoditas di-trim.
- Tidak ditemukan nilai kosong pada kolom CSV.
- Terdapat **16 nilai `Harga` berisi tanda `-`**, bukan angka. Nilai ini harus diperlakukan sebagai missing/null, bukan nol.
- Nilai harga lain memiliki format teks `Rp` dan pemisah ribuan koma; parsing numerik diperlukan sebelum analisis.
- Jumlah komoditas yang tersedia berubah menurut periode. Dataset tidak berbentuk panel seimbang: beberapa komoditas baru muncul pada periode yang lebih baru.
- Nama komoditas memiliki inkonsistensi spasi awal pada sejumlah baris. Normalisasi whitespace diperlukan, tetapi nama asli sebaiknya tetap disimpan untuk audit.

## 3. Kesesuaian dengan PRD PANGANOVA

| Kebutuhan PRD | Kesesuaian dataset saat ini | Catatan |
|---|---|---|
| Executive Summary | Sebagian sesuai | Bisa menampilkan jumlah komoditas, tren dan perubahan harga, dengan periode yang dipilih secara eksplisit. Definisi KPI perlu disepakati. |
| Price Trend Exploration | Sesuai untuk prototipe | Memiliki dimensi komoditas, tahun, bulan, dan harga. |
| Commodity Comparison | Sesuai dengan batasan | Perbandingan harus memakai periode yang sama dan hanya komoditas dengan observasi valid. |
| Food Prices & Purchasing Power | Belum cukup | CSV ini tidak memuat data pengeluaran rumah tangga, Susenas, IHK, atau pendapatan. |
| Insights & Methodology | Sebagian sesuai | Dapat menjelaskan tren deskriptif; belum cukup untuk klaim kausal atau penjelasan faktor penyebab. |

## 4. Metadata yang belum tersedia dan wajib diverifikasi

File CSV yang diberikan tidak menyertakan metadata yang cukup untuk memastikan:

1. Institusi/penerbit dan URL sumber asli.
2. Definisi harga: harga konsumen, harga produsen, harga rata-rata nasional, atau definisi lainnya.
3. Satuan harga per komoditas (misalnya Rp/kg, Rp/liter, atau satuan lain).
4. Metode agregasi nasional dan apakah angka merupakan rata-rata sederhana atau tertimbang.
5. Waktu pengambilan/unduh data dan jadwal pembaruan.
6. Definisi tanda `-` dan alasan komoditas mulai tersedia pada periode tertentu.
7. Lisensi atau ketentuan penggunaan ulang.

**Jangan menganggap dataset berasal dari Bapanas hanya dari nama komoditas atau format harganya.** Verifikasi URL dan metadata sumber sebelum menampilkan atribusi Bapanas di website. Sampai terverifikasi, tampilkan label internal seperti `Sumber belum diverifikasi`.

## 5. Rekomendasi pemrosesan

Buat pipeline yang dapat diulang dengan langkah berikut:

1. Baca CSV mentah tanpa mengubah file sumber.
2. Trim whitespace pada `Komoditas`.
3. Ubah nama bulan Indonesia menjadi nomor bulan.
4. Buat kolom tanggal dengan format `YYYY-MM-01`.
5. Ubah `Harga` menjadi numerik dengan menghapus `Rp` dan pemisah ribuan.
6. Ubah tanda `-` menjadi `null`.
7. Validasi kunci unik `komoditas + tanggal`.
8. Urutkan berdasarkan komoditas dan tanggal.
9. Simpan data bersih terpisah dari raw data.
10. Simpan metadata sumber dan log validasi.

Jangan melakukan interpolasi atau mengisi nilai hilang secara otomatis. Jangan menganggap nilai hilang sama dengan nol.

## 6. Aturan analisis untuk dashboard

- Tren harga: tampilkan nilai harga aktual hanya setelah satuan dikonfirmasi.
- Perubahan bulanan: bandingkan bulan berurutan untuk komoditas yang sama.
- Perubahan tahunan: bandingkan bulan yang sama antar-tahun.
- Perubahan persentase: `((harga_akhir - harga_awal) / harga_awal) * 100`; jika harga awal nol/null, tampilkan `N/A`.
- Peringkat kenaikan/penurunan: gunakan periode awal dan akhir yang sama untuk seluruh komoditas yang dibandingkan.
- Hindari satu KPI “rata-rata harga pangan” lintas komoditas karena satuan dan karakteristik komoditas dapat berbeda.
- Jika membuat indeks perbandingan, jelaskan periode dasar dan rumus normalisasinya.
- Jangan membuat klaim sebab-akibat atau menyimpulkan daya beli hanya dari dataset harga ini.

## 7. Prioritas implementasi

**Tahap 1 — Fondasi data**
- Tetapkan file `1777262464(1).csv` sebagai kandidat data prototipe paling mutakhir.
- Buat pipeline cleaning dan validasi.
- Simpan raw dan cleaned dataset terpisah.
- Tambahkan metadata placeholder yang eksplisit belum diverifikasi.

**Tahap 2 — Halaman 1–3**
- Executive Summary.
- Price Trend Exploration.
- Commodity Comparison.

**Tahap 3 — Dataset tambahan**
- Verifikasi sumber dan definisi dataset harga.
- Cari dataset resmi tambahan untuk IHK/inflasi dan pengeluaran konsumsi rumah tangga.
- Baru setelah itu rancang halaman Food Prices & Purchasing Power.

## 8. Prompt awal untuk Agent Codex di VS Code

```text
Baca PRD.md dan dokumen DATASET_AUDIT.md terlebih dahulu. Audit seluruh repository sebelum mengubah file apa pun.

Konteks:
- Produk: PANGANOVA, dashboard intelijen ekonomi harga pangan Indonesia.
- Implementasi tahap awal hanya mencakup tiga halaman: Executive Summary, Price Trend Exploration, dan Commodity Comparison.
- Dua CSV tersedia. Gunakan 1777262464(1).csv sebagai kandidat prototipe karena mencakup Januari 2021–Desember 2025; jangan menggabungkan kedua CSV karena 1.094 baris overlap identik dan file kedua memiliki 25 baris tambahan Desember 2025.
- Sumber/penerbit dan satuan harga belum diverifikasi. Jangan mengarang atribusi sumber atau satuan.
- Tanda '-' pada Harga adalah missing/null, bukan nol.
- Ada whitespace di nama komoditas; trim untuk key analisis tetapi pertahankan raw value bila diperlukan untuk audit.
- Dataset berisi 25 komoditas unik setelah trim dan bukan panel seimbang.

Tugas pertama (jangan langsung membangun seluruh website):
1. Laporkan struktur repository, stack, dan cara menjalankan project.
2. Usulkan arsitektur implementasi yang sesuai dengan stack yang sudah ada.
3. Rancang data ingestion/cleaning/validation yang reproducible.
4. Buat definisi tipe data dan model data bersih.
5. Buat daftar komponen dan halaman untuk milestone pertama.
6. Identifikasi keputusan yang masih belum dapat dibuat karena metadata sumber/satuan belum ada.

Batasan:
- Jangan mengubah desain menjadi landing page promosi.
- Ikuti design direction PANGANOVA di PRD.
- Jangan menambahkan angka contoh seolah data resmi.
- Jangan mengarang sumber, unit, frekuensi, atau status live.
- Jangan membuat klaim kausal atau purchasing-power insight dari CSV harga saja.
- Jangan memasang dependency baru sebelum menjelaskan alasannya.
- Jangan menghapus atau menimpa file pengguna.
- Setelah audit, berikan implementation plan dan tunggu persetujuan sebelum melakukan perubahan besar.
```

## 9. Keputusan yang disarankan sekarang

1. Gunakan CSV Desember 2025 sebagai basis prototipe sementara.
2. Jangan dulu mengaktifkan label sumber Bapanas sampai URL sumber asli dikonfirmasi.
3. Jangan menampilkan unit `Rp/kg` sebelum satuan dikonfirmasi.
4. Mulai dari audit repository oleh Codex, bukan langsung meminta agent membuat semua halaman.
5. Halaman 4 (daya beli) ditunda sampai dataset konsumsi/IHK yang sesuai tersedia.
