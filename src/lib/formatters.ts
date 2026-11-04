import { Language } from '@/types';

/**
 * Memformat angka nominal Rupiah Indonesia secara konsisten.
 * Contoh: 12319 -> "Rp 12.319" atau "12.319"
 * Nilai null diformat sebagai "-"
 */
export function formatRupiah(
  value: number | null | undefined,
  options: { showPrefix?: boolean } = { showPrefix: true }
): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '—';
  }
  const formatted = new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
  }).format(value);

  return options.showPrefix ? `Rp ${formatted}` : formatted;
}

/**
 * Memformat persentase perubahan dengan tanda +/- dan koma desimal Indonesia/Inggris.
 * Contoh: 14.2 -> "+14,2%", -6.1 -> "-6,1%"
 * Nilai null diformat sebagai "N/A"
 */
export function formatPercentage(
  value: number | null | undefined,
  options: { showSign?: boolean; decimals?: number; lang?: Language } = {}
): string {
  if (value === null || value === undefined || isNaN(value)) {
    return 'N/A';
  }
  const { showSign = true, decimals = 1, lang = 'id' } = options;
  const locale = lang === 'en' ? 'en-US' : 'id-ID';

  const formattedNum = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Math.abs(value));

  const sign = value > 0 ? (showSign ? '+' : '') : value < 0 ? '-' : '';
  return `${sign}${formattedNum}%`;
}

const MONTH_NAMES_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const MONTH_SHORT_ID = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
  'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
];

const MONTH_NAMES_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_SHORT_EN = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

/**
 * Memformat string tanggal ISO-8601 (YYYY-MM-01) menjadi nama bulan dan tahun dwibahasa.
 */
export function formatPeriodLabel(
  dateIso: string,
  lang: Language = 'id',
  short: boolean = false
): string {
  if (!dateIso) return '';
  const parts = dateIso.split('-');
  if (parts.length < 2) return dateIso;

  const year = parts[0];
  const monthIdx = parseInt(parts[1], 10) - 1;

  if (monthIdx < 0 || monthIdx > 11) return dateIso;

  if (lang === 'en') {
    const monthName = short ? MONTH_SHORT_EN[monthIdx] : MONTH_NAMES_EN[monthIdx];
    return `${monthName} ${year}`;
  } else {
    const monthName = short ? MONTH_SHORT_ID[monthIdx] : MONTH_NAMES_ID[monthIdx];
    return `${monthName} ${year}`;
  }
}

