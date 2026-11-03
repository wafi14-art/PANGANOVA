# PANGANOVA --- Product Requirements Document (PRD)

**Versi:** 1.0 --- Draft rekonstruksi untuk development\
**Status:** Baseline produk; perlu dicocokkan dengan PRD final
sebelumnya sebelum dianggap identik\
**Kategori:** Food Price & Economic Intelligence Platform\
**Tagline:** Understand Food Prices. Discover Economic Insights.

## 1. Ringkasan Produk

PANGANOVA adalah platform intelijen ekonomi berbasis web untuk memantau
pergerakan harga pangan, membandingkan perubahan harga antar-komoditas,
serta mengeksplorasi indikator konsumsi rumah tangga dan daya beli
masyarakat Indonesia.

PANGANOVA merupakan ruang kerja analitis, bukan website promosi atau
landing page. Platform menyajikan data, visualisasi, konteks periode,
sumber, dan interpretasi deskriptif. Angka contoh pada desain awal
bersifat ilustratif dan tidak boleh diperlakukan sebagai statistik
resmi.

## 2. Visi dan Tujuan

**Visi:** menyediakan platform analitis untuk memahami dinamika harga
pangan dan konteks ekonomi konsumsi masyarakat Indonesia melalui data
yang transparan dan dapat ditelusuri.

**Tujuan:** 1. Memantau tren harga komoditas pangan Indonesia. 2.
Membandingkan perubahan harga antar-komoditas dan antar-periode. 3.
Menyajikan indikator konsumsi rumah tangga dan daya beli dengan konteks
frekuensi serta tingkat agregasi yang tepat. 4. Menyediakan insight
deskriptif berbasis bukti. 5. Menampilkan sumber, periode observasi,
satuan, frekuensi, dan keterbatasan data. 6. Mendukung antarmuka Bahasa
Indonesia dan English.

## 3. Keputusan Produk

  -----------------------------------------------------------------------
  Aspek                               Keputusan
  ----------------------------------- -----------------------------------
  Tema visual                         Hybrid: permukaan terang hangat dan
                                      bagian analitis gelap

  Target audiens                      Mixed: peneliti, pengamat ekonomi,
                                      pembuat kebijakan, mahasiswa, dan
                                      masyarakat umum

  Bahasa UI                           Bilingual: Indonesia (ID) dan
                                      English (EN)

  Cakupan wilayah                     Nasional --- Indonesia

  Orientasi produk                    Dashboard analitis, bukan landing
                                      page promosi

  Desain tersedia                     Halaman 1--3

  Halaman 4--5                        Menyusul
  -----------------------------------------------------------------------

## 4. Target Pengguna

-   **Peneliti dan akademisi:** data terstruktur, periode observasi,
    metode perhitungan, dan keterbatasan data.
-   **Pengamat ekonomi dan analis:** pemantauan perubahan harga,
    perbandingan komoditas, dan ringkasan pergerakan.
-   **Pembuat kebijakan/pemangku kepentingan:** gambaran harga pangan
    dan indikator konsumsi.
-   **Masyarakat umum:** informasi yang mudah dipahami mengenai
    perkembangan harga pangan.

## 5. Ruang Lingkup

### Tahap awal

Fokus implementasi pada tiga halaman yang desainnya telah tersedia: 1.
Executive Summary 2. Price Trend Exploration 3. Commodity Comparison

Arsitektur harus memungkinkan penambahan: 4. Food Prices & Purchasing
Power 5. Insights & Methodology

### Di luar ruang lingkup awal

-   Sistem transaksi atau perdagangan pangan.
-   Prediksi harga yang diklaim akurat tanpa model dan evaluasi
    tervalidasi.
-   Rekomendasi kebijakan otomatis.
-   Klaim sebab-akibat harga pangan terhadap daya beli tanpa metode yang
    sesuai.
-   Data real-time jika sumber tidak menyediakan pembaruan real-time.
-   Autentikasi tingkat lanjut kecuali dibutuhkan kemudian.

## 6. Navigasi dan Layout Global

Navigasi: 1. Executive Summary / Ringkasan Eksekutif 2. Price Trend
Exploration / Eksplorasi Tren Harga 3. Commodity Comparison /
Perbandingan Komoditas 4. Food Prices & Purchasing Power / Harga Pangan
& Daya Beli 5. Insights & Methodology / Insight & Metodologi

Komponen global: - Sidebar dengan identitas PANGANOVA. - Header dengan
breadcrumb dan konteks halaman. - Pemilih bahasa ID / EN. - Indikator
periode dan pembaruan berdasarkan metadata aktual. - Indikator cakupan
wilayah.

## 7. Kebutuhan Fungsional

### 7.1 Executive Summary

**Tujuan:** ringkasan nasional pergerakan harga pangan dan indikator
ekonomi terkait.

Kebutuhan: - Judul, deskripsi, wilayah, periode observasi, dan waktu
pembaruan. - KPI dengan definisi dan rumus terdokumentasi. - Grafik tren
harga pangan. - Pemilihan komoditas dan periode. - Daftar komoditas
dengan kenaikan dan penurunan terbesar. - Highlight deskriptif berbasis
data. - Sumber, satuan, frekuensi, dan catatan keterbatasan.

Catatan: - Jangan menghitung rata-rata sederhana lintas komoditas yang
memiliki satuan/karakteristik berbeda kecuali metodologinya valid dan
dijelaskan. - Jika data belum terhubung, gunakan data ilustratif dengan
label yang jelas. - Jangan menampilkan angka ilustratif seolah statistik
resmi.

### 7.2 Price Trend Exploration

**Tujuan:** eksplorasi historis harga komoditas.

Kebutuhan: - Pemilihan satu atau beberapa komoditas. - Pemilihan rentang
tanggal/periode. - Penanda cakupan nasional. - Grafik time-series
sebagai elemen utama. - Pilihan harga aktual (misalnya Rp/kg) atau
indeks jika definisi indeks tersedia. - Tooltip berisi tanggal,
komoditas, nilai, dan satuan. - Tabel data historis. - Keterangan sumber
dan periode. - Loading, error, dan empty state. - Moving average hanya
jika metode dan jendela perhitungannya dijelaskan.

### 7.3 Commodity Comparison

**Tujuan:** membandingkan perubahan harga dan variasi antar-komoditas.

Kebutuhan: - Pemilihan komoditas/kelompok komoditas. - Pemilihan periode
pembanding. - Perbandingan perubahan absolut dan persentase. - Peringkat
kenaikan dan penurunan. - Grafik perbandingan dan tabel. - Indikator
variabilitas hanya jika jumlah observasi dan rumus memadai serta
dijelaskan.

Catatan: - Perubahan persentase dan nominal perlu dibaca bersama. -
Variabilitas harga tidak otomatis berarti risiko ekonomi. - Ambang
rendah/sedang/tinggi harus diberi label sebagai aturan analitis
internal, bukan klasifikasi resmi, kecuali ada sumber resmi.

### 7.4 Food Prices & Purchasing Power --- tahap berikutnya

Rencana kebutuhan: - Indikator pengeluaran konsumsi rumah tangga. -
Pangsa pengeluaran makanan jika tersedia. - Indikator inflasi/IHK yang
relevan. - Grafik historis dengan frekuensi dan periode jelas. - Catatan
interpretasi dan keterbatasan.

Data harga harian/bulanan dan data Susenas tidak boleh divisualisasikan
seolah memiliki frekuensi atau periode yang sama. Pisahkan bagian visual
jika frekuensi atau tingkat agregasinya berbeda. Jangan menyimpulkan
sebab-akibat tanpa metode yang sesuai.

### 7.5 Insights & Methodology --- tahap berikutnya

Setiap insight idealnya memuat: - Judul temuan dan temuan utama. -
Bukti/metrik pendukung. - Periode observasi. - Interpretasi ekonomi dan
konteks alternatif. - Sumber data. - Keterbatasan analisis.

Metodologi menjelaskan akuisisi, pembersihan, standardisasi, integrasi,
analisis deskriptif, rumus perubahan harga, metode indeks, serta
keterbatasan data.

## 8. Data dan Sumber

Sumber yang diprioritaskan untuk ditelusuri dan diverifikasi:

  -----------------------------------------------------------------------
  Institusi               Kandidat data           Potensi penggunaan
  ----------------------- ----------------------- -----------------------
  Badan Pangan Nasional   Harga pangan/komoditas  Tren dan perbandingan
  (Bapanas)               sesuai ketersediaan     harga

  Badan Pusat Statistik   IHK, inflasi, statistik Konteks perubahan harga
  (BPS)                   harga konsumen          konsumen

  BPS --- Susenas         Pengeluaran konsumsi    Analisis konsumsi dan
                          rumah tangga            daya beli

  Bank Indonesia (BI)     Indikator makroekonomi  Konteks makroekonomi
                          dan publikasi inflasi   
  -----------------------------------------------------------------------

Daftar tersebut adalah prioritas pencarian, bukan pernyataan bahwa
seluruh dataset sudah diperoleh atau terintegrasi.

Setiap dataset harus memiliki metadata: - Nama dataset dan
institusi/penerbit. - URL/lokasi sumber dan tanggal akses. - Periode
observasi dan frekuensi. - Cakupan wilayah. - Definisi variabel dan
satuan. - Lisensi/ketentuan penggunaan jika tersedia. - Catatan kualitas
dan keterbatasan.

Aturan integrasi: - Jangan menggabungkan frekuensi, satuan, atau tingkat
agregasi berbeda tanpa transformasi yang dijelaskan. - Pisahkan data
mentah dan data hasil pembersihan. - Catat proses transformasi agar
dapat direproduksi. - Pertahankan jejak sumber. - Tandai nilai hilang;
jangan mengisinya tanpa metode terdokumentasi.

## 9. Definisi Indikator

**Perubahan absolut:** `nilai periode akhir - nilai periode awal`

**Perubahan persentase:**
`((nilai akhir - nilai awal) / nilai awal) × 100`

Jika nilai awal nol/tidak tersedia, perubahan persentase ditandai tidak
dapat dihitung.

Untuk indeks harga: - Tetapkan periode dasar. - Dokumentasikan rumus dan
normalisasi. - Tampilkan label indeks dan periode dasar. - Jangan
menyebut nilai indeks sebagai harga Rupiah.

Untuk rata-rata: - Hitung hanya observasi yang sebanding. - Jelaskan
apakah rata-rata sederhana atau tertimbang. - Jelaskan unit, cakupan,
dan metode agregasi.

## 10. Kebutuhan Non-Fungsional

-   **Usability:** navigasi konsisten, filter dekat visualisasi,
    angka/satuan/periode mudah dibaca.
-   **Responsive:** desktop multi-kolom; tablet sidebar ringkas; mobile
    satu kolom dan kontrol ramah sentuhan.
-   **Performance:** hindari memuat seluruh data mentah jika tidak
    perlu; sediakan loading dan error state.
-   **Accessibility:** kontras memadai; jangan mengandalkan warna saja;
    label kontrol jelas.
-   **Maintainability:** komponen reusable; pemisahan UI, logika bisnis,
    dan akses data; tipe data terdokumentasi; uji fungsi perhitungan.
-   **Data integrity:** definisi metrik jelas, sumber dapat ditelusuri,
    data contoh diberi label, dan tidak ada klaim statistik resmi dari
    data belum diverifikasi.

## 11. Prinsip Desain

Arah visual: - Hybrid interface dengan warm ivory/putih dan area
analitis deep forest green/charcoal. - Tipografi editorial modern. -
Grafik berkualitas tinggi. - Whitespace terarah, border halus, shadow
terkendali.

Palet: \| Token \| Warna \| \|---\|---\| \| Deep Forest Green \|
`#123B32` \| \| Emerald Green \| `#1E8063` \| \| Harvest Gold \|
`#E8B65A` \| \| Warm Ivory \| `#F4F3ED` \| \| Charcoal \| `#202B29` \|
\| White \| `#FFFFFF` \|

Font yang disarankan: Inter, Manrope, atau Plus Jakarta Sans.

Hindari template SaaS generik, kartu membulat berlebihan,
gradien/neon/glow, glassmorphism berlebihan, ilustrasi 3D dekoratif,
grafik tanpa makna, landing page hero/CTA promosi, indikator live palsu,
dan klaim insight AI tanpa analisis.

## 12. Bilingual Experience

UI mendukung Indonesia (ID) dan English (EN). Struktur, urutan
informasi, dan fungsi harus konsisten.

  Indonesia                  English
  -------------------------- --------------------------------
  Ringkasan Eksekutif        Executive Summary
  Eksplorasi Tren Harga      Price Trend Exploration
  Perbandingan Komoditas     Commodity Comparison
  Harga Pangan & Daya Beli   Food Prices & Purchasing Power
  Insight & Metodologi       Insights & Methodology

## 13. Status Data dan Konten

Sebelum dataset resmi terhubung: - Gunakan mock/ilustrasi hanya untuk
pengembangan UI. - Beri label "Data ilustratif / Illustrative data". -
Jangan gunakan angka mock sebagai fakta atau temuan. - Jangan tampilkan
sumber, waktu pembaruan, atau status real-time palsu. - Siapkan data
layer agar mock data dapat diganti data terverifikasi.

## 14. Kriteria Penerimaan

**Global** - \[ \] Sidebar dan header reusable. - \[ \] Navigasi
konsisten. - \[ \] Bahasa ID/EN dapat dipilih. - \[ \] Responsif. - \[
\] Sumber, periode, satuan, dan status data jelas. - \[ \] Data
ilustratif dibedakan dari data resmi.

**Executive Summary** - \[ \] KPI memiliki definisi dan rumus jelas. -
\[ \] Grafik menampilkan unit dan periode. - \[ \] Perubahan komoditas
dihitung dari data sebanding. - \[ \] Highlight memiliki bukti dan
periode. - \[ \] Transparansi sumber terlihat.

**Price Trend** - \[ \] Filter komoditas/periode bekerja. - \[ \] Grafik
berubah sesuai filter. - \[ \] Tooltip menunjukkan nilai dan unit. - \[
\] Tabel konsisten dengan grafik. - \[ \] Loading, error, dan empty
state tersedia.

**Commodity Comparison** - \[ \] Periode pembanding dapat diubah. - \[
\] Perubahan absolut dan persentase benar. - \[ \] Ranking konsisten
dengan nilai. - \[ \] Metode variabilitas dijelaskan jika ditampilkan.

**Data** - \[ \] Dataset memiliki metadata. - \[ \] Pembersihan dapat
ditelusuri. - \[ \] Perhitungan diuji. - \[ \] Tidak ada angka mock yang
disajikan sebagai statistik resmi.

## 15. Roadmap Implementasi

  Milestone   Pekerjaan                                 Output
  ----------- ----------------------------------------- --------------------
  M1          Audit repository dan kebutuhan            Technical plan
  M2          Setup aplikasi dan design system          Fondasi aplikasi
  M3          Executive Summary                         Halaman 1
  M4          Price Trend Exploration                   Halaman 2
  M5          Commodity Comparison                      Halaman 3
  M6          Audit, pencarian, dan integrasi dataset   Data pipeline awal
  M7          Food Prices & Purchasing Power            Halaman 4
  M8          Insights & Methodology                    Halaman 5
  M9          Testing, dokumentasi, refinement          Kandidat rilis

## 16. Risiko dan Mitigasi

  -----------------------------------------------------------------------
  Risiko                              Mitigasi
  ----------------------------------- -----------------------------------
  Dataset berbeda frekuensi           Pisahkan visualisasi atau lakukan
                                      agregasi terdokumentasi

  Satuan komoditas tidak seragam      Standardisasi dan dokumentasikan
                                      konversi

  Data hilang/tidak lengkap           Tampilkan keterbatasan; jangan
                                      mengarang nilai

  Angka ilustratif dianggap resmi     Label jelas dan pisahkan
                                      mock/production data

  Klaim kausal tidak didukung         Gunakan bahasa deskriptif dan
                                      jelaskan faktor alternatif

  Perubahan desain                    Gunakan design tokens dan komponen
                                      reusable

  Sumber berubah/tidak tersedia       Simpan metadata, tanggal akses, dan
                                      salinan sesuai ketentuan sumber
  -----------------------------------------------------------------------

## 17. Asumsi dan Hal yang Perlu Dikonfirmasi

1.  Dataset pertama belum diaudit; skema dan kualitasnya perlu
    diperiksa.
2.  Dataset tambahan belum dianggap tersedia sampai URL, file, metadata,
    dan ketentuan penggunaannya diverifikasi.
3.  Definisi final KPI ditetapkan setelah struktur dataset diketahui.
4.  Periode historis bergantung pada cakupan data yang benar-benar
    tersedia.
5.  Backend, database, autentikasi, hosting, dan deployment ditentukan
    melalui technical planning.
6.  Halaman 4 dan 5 dikembangkan setelah kebutuhan data serta desainnya
    siap.

------------------------------------------------------------------------

**Catatan:** Dokumen ini adalah baseline PRD yang direkonstruksi dari
keputusan dan konteks PANGANOVA yang tersedia. Dokumen PRD final asli
tidak ditemukan di file yang saat ini dapat saya akses. Cocokkan dokumen
ini dengan versi asli jika tersedia sebelum menjadikannya spesifikasi
resmi.
