# PANGANOVA — Metodologi Analisis Ekonomi & Pengolahan Data

**Versi:** 1.0  
**Tanggal:** 4 November 2026  
**Status:** Metodologi Baseline untuk Analisis Harga Pangan Nasional  

---

## 1. Prinsip Dasar Integritas Analisis

PANGANOVA dirancang sebagai platform intelijen ekonomi (*economic intelligence platform*) yang menyajikan data apa adanya dengan interpretasi deskriptif berbasis bukti (*evidence-based descriptive analysis*). Platform ini menolak generalisasi yang keliru atau komputasi statistik semu (*pseudo-statistics*).

Tiga aturan fundamental:
1. **Dilarang Menghitung Rata-Rata Nominal Gabungan Lintas Komoditas:**  
   Menghitung satu angka rata-rata (misalnya: rata-rata harga pangan Indonesia = Rp52.000) dengan menjumlahkan harga Daging Sapi, Garam, Cabai Rawit, dan Beras lalu membaginya dengan jumlah komoditas adalah **cacat metodologis**. Setiap komoditas memiliki skala nilai, karakteristik ekonomi, dan kemungkinan satuan fisik yang berbeda.
2. **Analisis Berorientasi Komoditas Tunggal & Komparasi Relatif:**  
   Analisis tren harga nominal hanya valid dilakukan pada komoditas yang sama antar-waktu. Untuk membandingkan dua atau lebih komoditas berbeda, platform menggunakan metrik perubahan persentase atau indeks terstandarisasi.
3. **Transparansi Keterbatasan Satuan & Sumber:**  
   Selama satuan fisik resmi (`kg`, `liter`, `butir`, dsb.) dan atribusi penerbit belum terkonfirmasi melalui dokumen resmi, harga disajikan dalam format nominal Rupiah (`Rp XX.XXX`) tanpa imbuhan satuan spekulatif.

---

## 2. Metodologi Komputasi & Rumus Matematis

### 2.1 Perubahan Harga Nominal (Absolute Price Change)
Perubahan nominal mengukur selisih nilai rupiah suatu komoditas $i$ antara periode akhir ($T_1$) dan periode awal ($T_0$):

$$\Delta P_{i} = P_{i, T_1} - P_{i, T_0}$$

**Ketentuan:**
- Berlaku hanya jika $P_{i, T_1} \neq \text{null}$ dan $P_{i, T_0} \neq \text{null}$.
- Jika salah satu nilai berstatus `null`, hasil perubahan nominal ditandai sebagai `N/A` (Tidak Tersedia).

### 2.2 Perubahan Harga Persentase (Percentage Change)
Perubahan persentase mengukur laju pertumbuhan atau penurunan harga relatif terhadap periode basis:

$$\Delta\% P_{i} = \left( \frac{P_{i, T_1} - P_{i, T_0}}{P_{i, T_0}} \right) \times 100\%$$

**Ketentuan & Penanganan Kasus Khusus:**
- **Harga Awal Nol atau Hilang:** Jika $P_{i, T_0} = 0$ atau $P_{i, T_0} = \text{null}$, persentase ditandai `N/A` (bukan error pembagian dengan nol).
- **Jenis Jendela Pembanding Standar:**
  - **Month-over-Month (MoM):** $T_1 = \text{Bulan } m, \text{Tahun } y$; $T_0 = \text{Bulan } m-1, \text{Tahun } y$.
  - **Year-on-Year (YoY):** $T_1 = \text{Bulan } m, \text{Tahun } y$; $T_0 = \text{Bulan } m, \text{Tahun } y-1$.
  - **Year-to-Date (YTD):** $T_1 = \text{Bulan aktif}$; $T_0 = \text{Desember tahun sebelumnya}$ atau $\text{Januari tahun aktif}$.

### 2.3 Indeks Relatif Berbasis 100 (Rebased Price Index)
Untuk membandingkan pergerakan harga komoditas yang memiliki skala nominal sangat jomplang (contoh: Daging Sapi $\sim\text{Rp}135.000$ vs Garam $\sim\text{Rp}11.500$) pada satu kanvas visual yang sama, PANGANOVA menggunakan metode **Normalisasi Indeks Basis 100**:

$$I_{i, t} = \left( \frac{P_{i, t}}{P_{i, T_{\text{base}}}} \right) \times 100$$

**Aturan Penentuan Periode Dasar ($T_{\text{base}}$):**
1. Periode dasar harus dipilih secara eksplisit oleh pengguna atau disetel ke periode awal jendela waktu analisis (misal: Januari 2021 = 100 atau Januari 2023 = 100).
2. **Kesesuaian Baseline:** Harga dasar $P_{i, T_{\text{base}}}$ **wajib bernilai valid (bukan null dan $>0$)**. Jika suatu komoditas tidak memiliki observasi valid pada $T_{\text{base}}$ (misalnya komoditas yang baru dipantau tahun 2023 ketika basis ditetapkan Januari 2021), komoditas tersebut **tidak boleh diikutsertakan** dalam grafik indeks gabungan tanpa peringatan visual eksplisit atau opsi re-basing mandiri ke observasi valid pertamanya.
3. Nilai indeks **tidak boleh disajikan dengan simbol Rupiah (Rp)**. Label sumbu grafik wajib bertuliskan `Indeks (Periode Basis = 100)`.

### 2.4 Dispersi Harga: Koefisien Variasi (Price Dispersion via CV)
Koefisien Variasi (*Coefficient of Variation* - $CV$) digunakan sebagai **ukuran dispersi (sebaran) harga relatif** sepanjang suatu rentang observasi. Metrik ini mengukur seberapa jauh harga suatu komoditas berfluktuasi dari nilai rata-ratanya sendiri:

$$CV_i = \left( \frac{\sigma_{P, i}}{\mu_{P, i}} \right) \times 100\%$$

Di mana:
- $\mu_{P, i} = \frac{1}{N} \sum_{t=1}^{N} P_{i, t}$ (Rata-rata harga nominal komoditas $i$ selama periode jendela $N$)
- $\sigma_{P, i} = \sqrt{\frac{1}{N-1} \sum_{t=1}^{N} (P_{i, t} - \mu_{P, i})^2}$ (Standar deviasi sampel harga nominal)
- $N$ = Jumlah observasi valid ($P_{i,t} \neq \text{null}$; minimal $N \ge 6$ untuk signifikansi statistik).

### 2.5 Volatilitas Harga Bulanan (Monthly Return Volatility)
Berbeda dari dispersi tingkat harga ($CV$), **Volatilitas Harga Bulanan** mengukur **intensitas kejutan laju perubahan harga antar-bulan** (*rate of change shocks*). Metrik ini mencerminkan stabilitas pasar komoditas dari waktu ke waktu:

Laju perubahan bulanan (*monthly return / percentage change*) didefinisikan sebagai:
$$r_{i, t} = \left( \frac{P_{i, t} - P_{i, t-1}}{P_{i, t-1}} \right) \times 100\%$$

Volatilitas bulanan ($\sigma_{r, i}$) dihitung sebagai standar deviasi dari deret laju perubahan bulanan:
$$\sigma_{r, i} = \sqrt{\frac{1}{M-1} \sum_{k=1}^{M} (r_{i, k} - \bar{r}_i)^2}$$

Di mana:
- $\bar{r}_i = \frac{1}{M} \sum_{k=1}^{M} r_{i, k}$ (Rata-rata perubahan bulanan)
- $M$ = Jumlah pasangan bulan berurutan di mana **kedua** observasi $P_{i, t}$ dan $P_{i, t-1}$ valid (non-null).

**Kaidah Kritis Penanganan Nilai Hilang (`null`):**
- Jika observasi bulan aktif $P_{i, t} = \text{null}$ **ATAU** observasi bulan sebelumnya $P_{i, t-1} = \text{null}$, maka $r_{i, t}$ berstatus **`null` (dilewati)**.
- **Dilarang keras menganggap perubahan bernilai $0\%$ ketika data sebelumnya hilang**, karena asumsi tersebut akan merusak (*understate*) perhitungan volatilitas aktual.
- Jika $P_{i, t-1} = 0$, $r_{i, t}$ ditandai tidak terdefinisi (`null`).

### 2.6 Metodologi Pemeringkatan (Top Gainers & Decliners)
Penentuan komoditas dengan kenaikan terbesar (*Top Gainers*) dan penurunan terbesar (*Top Decliners*) wajib memenuhi prinsip keadilan observasi (*fair comparison window*):
1. **Jendela Periode Konsisten:** Seluruh komoditas yang diranking harus dievaluasi pada rentang awal ($T_0$) dan rentang akhir ($T_1$) yang persis sama.
2. **Kriteria Kelayakan:** Komoditas hanya masuk dalam daftar peringkat jika memiliki observasi valid (non-null) pada kedua titik $T_0$ dan $T_1$. Komoditas yang baru muncul di tengah periode atau memiliki nilai hilang di salah satu titik dieksklusikan dari kalkulasi ranking periode tersebut.
3. **Penyajian Ganda:** Dashboard menyajikan persentase perubahan ($\Delta\%$) bersama nominal perubahan ($\Delta P$) agar pengguna memperoleh konteks proporsional sekaligus bobot rupiah riil.

### 2.7 Penegasan Interpretasi Metrik
- Metrik $CV$ dan $\sigma_r$ adalah ukuran statistik deskriptif internal, bukan parameter risiko resmi pemerintah.
- Nilai dispersi atau volatilitas tinggi tidak serta-merta mencerminkan krisis pangan; pada komoditas hortikultura (Cabai Rawit Merah dan Bawang Merah), volatilitas tinggi merupakan fenomena musim panen dan cuaca alamiah yang berulang.

---

## 3. Penanganan Struktur Data & Keterbatasan

### 3.1 Unbalanced Panel (Panel Tidak Seimbang)
Dataset historis 2021–2025 memuat 25 komoditas, namun tidak seluruh komoditas dipantau sejak Januari 2021:
- **13 Komoditas:** Memiliki riwayat penuh 60 bulan (Januari 2021 – Desember 2025).
- **12 Komoditas:** Baru diperkenalkan bertahap pada 2022, 2023, 2024, atau 2025.

**Aturan Penanganan di Antarmuka:**
- Ketika pengguna memilih rentang "5 Tahun Penuh (2021–2025)", komoditas yang baru muncul di tahun 2023 akan menampilkan garis visual yang dimulai pada titik observasi pertamanya, tanpa garis ditarik mundur ke titik 0.
- Pada tabel perbandingan, komoditas yang belum ada pada periode awal diberi tanda `Belum dipantau` (*Not yet observed*).

### 3.2 Nilai Hilang (`null`)
- Tidak ada nilai hilang yang diisi melalui interpolasi linier, forward-fill, backward-fill, atau rata-rata bergerak, kecuali jika fitur spesifik secara eksplisit diaktifkan oleh pengguna dengan label jelas (*Smoothed / Interpolated Series*).
- Pada grafik garis time-series, observasi `null` disajikan dengan celah putus (*visual gap*) atau garis putus-putus (*dashed connecting line*) agar peneliti mengetahui secara visual adanya ketiadaan data.

---

## 4. Rangkuman Metodologi vs Kesalahan Umum

| Praktik yang Dilarang (Bad Practice) | Pendekatan Resmi PANGANOVA (Standard) |
| :--- | :--- |
| Merata-ratakan harga nominal seluruh komoditas menjadi 1 angka indeks semu | Menampilkan harga nominal per komoditas; menggunakan Indeks Basis 100 untuk komparasi |
| Mengubah tanda `"-"` menjadi angka `0` | Memetakan `"-"` secara ketat ke `null` |
| Memberikan label satuan `Rp/kg` tanpa verifikasi sumber resmi | Menampilkan format `Rp [Nominal]` dengan catatan disclaimer verifikasi satuan |
| Membandingkan persentase kenaikan pada periode waktu yang berbeda-beda antar komoditas | Menstandarkan periode $T_0$ dan $T_1$ yang identik untuk seluruh ranking |
| Mengklaim data berasal dari Bapanas/BPS tanpa verifikasi URL/lisensi resmi | Menampilkan atribusi netral: *Agregat Nasional (Dalam proses verifikasi)* |

