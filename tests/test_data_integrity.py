#!/usr/bin/env python3
"""
PANGANOVA — Automated Data Integrity Test Suite
==============================================
Test suite ini memastikan integritas data terpenuhi secara ketat:
1. Dataset mentah tidak termodifikasi / terhapus.
2. Record bersih memiliki panjang baris yang sama dengan data mentah (1.119 observasi).
3. Composite key (commodity + date) tidak memiliki duplikasi sama sekali.
4. Nilai hilang dipetakan secara ketat ke null (None), bukan 0.
5. Seluruh harga valid bernilai positif (> 0).
6. Tepat 25 komoditas unik tercatat.
7. Metadata agregat konsisten dengan data level observasi.
"""

import os
import json
import unittest

class TestDataIntegrity(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
        cls.raw_file_primary = os.path.join(cls.root, 'data', 'raw', '1777262464.csv')
        cls.raw_file_secondary = os.path.join(cls.root, 'data', 'raw', '1777263095.csv')
        cls.clean_json_file = os.path.join(cls.root, 'data', 'processed', 'food_prices_clean.json')
        cls.meta_json_file = os.path.join(cls.root, 'data', 'processed', 'commodities_meta.json')
        cls.manifest_file = os.path.join(cls.root, 'data', 'processed', 'dataset_manifest.json')

        with open(cls.clean_json_file, 'r', encoding='utf-8') as f:
            cls.clean_data = json.load(f)

        with open(cls.meta_json_file, 'r', encoding='utf-8') as f:
            cls.meta_data = json.load(f)

        with open(cls.manifest_file, 'r', encoding='utf-8') as f:
            cls.manifest = json.load(f)

    def test_raw_files_exist_and_unmodified(self):
        """Dataset mentah harus tetap utuh di data/raw/ dengan jumlah baris yang presisi."""
        self.assertTrue(os.path.isfile(self.raw_file_primary), "Dataset primer harus ada")
        self.assertTrue(os.path.isfile(self.raw_file_secondary), "Dataset sekunder harus ada")

        with open(self.raw_file_primary, 'r', encoding='utf-8') as f:
            primary_lines = f.readlines()
        self.assertEqual(len(primary_lines), 1120, "Dataset primer harus tepat memiliki 1120 baris (1 header + 1119 data)")

        with open(self.raw_file_secondary, 'r', encoding='utf-8') as f:
            secondary_lines = f.readlines()
        self.assertEqual(len(secondary_lines), 1095, "Dataset sekunder harus tepat memiliki 1095 baris (1 header + 1094 data)")

    def test_record_count_preservation(self):
        """Jumlah record bersih harus tepat sama dengan jumlah baris data mentah (1.119)."""
        self.assertEqual(len(self.clean_data), 1119)
        self.assertEqual(self.manifest['summary_statistics']['total_processed_records'], 1119)

    def test_zero_duplicate_composite_keys(self):
        """Kombinasi (komoditas, tanggal) harus 100% unik tanpa duplikasi."""
        keys = set()
        duplicates = []
        for r in self.clean_data:
            key = (r['commodity'], r['date'])
            if key in keys:
                duplicates.append(key)
            keys.add(key)
        self.assertEqual(len(duplicates), 0, f"Ditemukan duplikasi composite key: {duplicates}")

    def test_strict_null_mapping_for_missing_values(self):
        """Nilai '-' harus dikonversi ke null/None, BUKAN 0."""
        missing_records = [r for r in self.clean_data if r['is_missing']]
        self.assertEqual(len(missing_records), 16, "Harus ada tepat 16 missing records")

        for r in missing_records:
            self.assertIsNone(r['price'], f"Harga missing pada {r['commodity']} {r['date']} harus None, bukan angka")
            self.assertTrue(r['is_missing'])

        # Pastikan tidak ada satupun record yang memiliki price == 0
        zero_prices = [r for r in self.clean_data if r['price'] == 0]
        self.assertEqual(len(zero_prices), 0, "Dilarang keras ada harga bernilai 0")

    def test_valid_prices_are_strictly_positive(self):
        """Seluruh observasi valid harus memiliki harga numerik positif."""
        valid_records = [r for r in self.clean_data if not r['is_missing']]
        self.assertEqual(len(valid_records), 1103)

        for r in valid_records:
            self.assertIsInstance(r['price'], (int, float))
            self.assertGreater(r['price'], 0, f"Harga {r['commodity']} {r['date']} harus positif")

    def test_unique_commodities_count(self):
        """Harus ada tepat 25 komoditas unik setelah normalisasi whitespace."""
        unique_commodities = set(r['commodity'] for r in self.clean_data)
        self.assertEqual(len(unique_commodities), 25)
        self.assertEqual(len(self.meta_data), 25)

    def test_date_format_and_range(self):
        """Seluruh tanggal harus berformat YYYY-MM-01 antara 2021-01 s/d 2025-12."""
        for r in self.clean_data:
            self.assertTrue(r['date'].endswith('-01'))
            self.assertIn(r['year'], [2021, 2022, 2023, 2024, 2025])
            self.assertGreaterEqual(r['month'], 1)
            self.assertLessEqual(r['month'], 12)

    def test_metadata_consistency(self):
        """Metadata agregat per komoditas harus cocok dengan data observasi detail."""
        total_obs_from_meta = sum(c['total_observations'] for c in self.meta_data)
        self.assertEqual(total_obs_from_meta, 1119)

        total_valid_from_meta = sum(c['valid_observations'] for c in self.meta_data)
        self.assertEqual(total_valid_from_meta, 1103)

        total_missing_from_meta = sum(c['missing_observations'] for c in self.meta_data)
        self.assertEqual(total_missing_from_meta, 16)

    def test_manifest_sha256_matches_source_file(self):
        """Hash SHA-256 pada manifest harus presisi cocok dengan file mentah primer."""
        import hashlib
        sha = hashlib.sha256()
        with open(self.raw_file_primary, 'rb') as f:
            while chunk := f.read(65536):
                sha.update(chunk)
        calculated_hash = sha.hexdigest()
        self.assertEqual(calculated_hash, self.manifest['metadata']['source_sha256'])
        self.assertEqual(os.path.basename(self.raw_file_primary), self.manifest['metadata']['source_raw_file'])

    def test_analytical_null_return_and_volatility_handling(self):
        """Simulasi metodologi: return bulanan harus None jika data sebelumnya None, dan tidak disubstitusi 0."""
        # Ambil deret Garam konsumsi (memiliki null di Jan, Feb, Mar 2023)
        garam_series = [r for r in self.clean_data if r['commodity_id'] == 'garam-konsumsi']
        self.assertEqual(len(garam_series), 36)

        # Hitung return bulanan (MoM)
        returns = []
        for i in range(1, len(garam_series)):
            p_prev = garam_series[i-1]['price']
            p_curr = garam_series[i]['price']
            if p_prev is None or p_curr is None or p_prev == 0:
                ret = None
            else:
                ret = ((p_curr - p_prev) / p_prev) * 100
            returns.append(ret)

        # Periode 2023-01, 2023-02, 2023-03 adalah null
        # Return index 0 (Feb vs Jan): Jan null -> return harus None
        self.assertIsNone(returns[0])
        # Return index 1 (Mar vs Feb): Feb null -> return harus None
        self.assertIsNone(returns[1])
        # Return index 2 (Apr vs Mar): Mar null -> return harus None
        self.assertIsNone(returns[2])
        # Return index 3 (Mei vs Apr): Apr (valid) dan Mei (valid) -> return harus float valid
        self.assertIsNotNone(returns[3])
        self.assertIsInstance(returns[3], (int, float))

        # Pengukuran volatilitas bulanan hanya dari observasi return valid
        valid_returns = [r for r in returns if r is not None]
        self.assertEqual(len(valid_returns), 32) # Dari 35 transisi, 3 transisi bernilai None

    def test_rebased_index_baseline_requirement(self):
        """Indeks basis 100 hanya valid jika harga pada periode dasar non-null dan > 0."""
        def calculate_index(price, base_price):
            if base_price is None or base_price <= 0:
                return None
            if price is None:
                return None
            return (price / base_price) * 100

        self.assertIsNone(calculate_index(15000, None), "Jika baseline None, indeks harus None")
        self.assertIsNone(calculate_index(15000, 0), "Jika baseline 0, indeks harus None")
        self.assertIsNone(calculate_index(None, 12000), "Jika harga observasi None, indeks harus None")
        self.assertAlmostEqual(calculate_index(12000, 12000), 100.0, places=5, msg="Pada periode dasar, indeks harus tepat 100.0")
        self.assertAlmostEqual(calculate_index(13200, 12000), 110.0, places=5, msg="Kenaikan 10% harus bernilai 110.0")

if __name__ == '__main__':
    unittest.main()

