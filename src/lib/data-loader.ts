import cleanPricesData from '../../data/processed/food_prices_clean.json';
import commoditiesMetaData from '../../data/processed/commodities_meta.json';
import datasetManifestData from '../../data/processed/dataset_manifest.json';
import { FoodPriceRecord, CommodityMeta, DatasetManifest } from '@/types';

// Cast data ke tipe terverifikasi
const foodPrices: FoodPriceRecord[] = cleanPricesData as FoodPriceRecord[];
const commoditiesMeta: CommodityMeta[] = commoditiesMetaData as CommodityMeta[];
const datasetManifest: DatasetManifest = datasetManifestData as DatasetManifest;

/**
 * Mengambil seluruh observasi harga pangan bersih (1.119 records).
 */
export function getAllFoodPrices(): FoodPriceRecord[] {
  return foodPrices;
}

/**
 * Mengambil metadata 25 komoditas.
 */
export function getAllCommoditiesMeta(): CommodityMeta[] {
  return commoditiesMeta;
}

/**
 * Mengambil manifes dataset (SHA-256, tanggal eksekusi, status verifikasi).
 */
export function getDatasetManifest(): DatasetManifest {
  return datasetManifest;
}

/**
 * Mengambil metadata komoditas berdasarkan slug ID.
 */
export function getCommodityById(id: string): CommodityMeta | undefined {
  return commoditiesMeta.find((c) => c.id === id);
}

/**
 * Mengambil seluruh riwayat harga suatu komoditas secara berurutan.
 */
export function getPricesByCommodity(commodityId: string): FoodPriceRecord[] {
  return foodPrices.filter((p) => p.commodity_id === commodityId);
}

/**
 * Mengambil observasi harga untuk beberapa komoditas dalam rentang tanggal tertentu.
 */
export function getPricesForCommoditiesInRange(
  commodityIds: string[],
  startDate: string,
  endDate: string
): FoodPriceRecord[] {
  const commSet = new Set(commodityIds);
  return foodPrices.filter(
    (p) => commSet.has(p.commodity_id) && p.date >= startDate && p.date <= endDate
  );
}

/**
 * Mengambil daftar tanggal unik berurutan yang ada dalam dataset.
 */
export function getAvailableDates(): string[] {
  const dates = Array.from(new Set(foodPrices.map((p) => p.date)));
  return dates.sort();
}

/**
 * Mengambil observasi harga untuk seluruh komoditas pada suatu tanggal spesifik.
 */
export function getPricesByDate(date: string): FoodPriceRecord[] {
  return foodPrices.filter((p) => p.date === date);
}

