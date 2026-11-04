export interface FoodPriceRecord {
  id: string;
  commodity: string;
  commodity_id: string;
  year: number;
  month: number;
  month_name: string;
  date: string; // ISO-8601 (YYYY-MM-01)
  period: string; // YYYY-MM
  price: number | null;
  is_missing: boolean;
}

export interface CommodityMeta {
  id: string;
  name: string;
  raw_name_variations: string[];
  first_observed_date: string;
  latest_observed_date: string;
  total_observations: number;
  valid_observations: number;
  missing_observations: number;
  min_price: number | null;
  max_price: number | null;
  latest_price: number | null;
  has_full_history_60m: boolean;
}

export interface DatasetManifest {
  metadata: {
    platform: string;
    dataset_name: string;
    source_raw_file: string;
    source_sha256: string;
    source_file_size_bytes: number;
    pipeline_execution_timestamp: string;
    data_verification_status: string;
    physical_unit_status: string;
    methodological_notes: string[];
  };
  summary_statistics: {
    total_raw_rows: number;
    total_processed_records: number;
    total_unique_commodities: number;
    total_valid_prices: number;
    total_missing_prices: number;
    duplicate_keys_detected: number;
    period_start: string;
    period_end: string;
    commodities_with_full_60m: number;
    commodities_with_partial_history: number;
  };
}

export type Language = 'id' | 'en';

export interface NavigationItem {
  id: string;
  titleKey: string;
  href: string;
  iconName: string;
  isAvailable: boolean;
  statusBadgeKey?: string;
}

