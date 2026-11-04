/**
 * PANGANOVA — Pure Analytical Calculations Library
 * =================================================
 * Sesuai dokumentasi metodologi resmi (docs/methodology.md):
 * 1. Tidak menghitung rata-rata gabungan nominal antar-komoditas dengan satuan berbeda.
 * 2. Penanganan nilai hilang: null tidak disubstitusi 0.
 * 3. Return bulanan bernilai null jika observasi bulan aktif atau sebelumnya null.
 * 4. Indeks basis 100 memerlukan baseline valid (> 0 dan non-null).
 */

export interface ChangeResult {
  absoluteChange: number | null;
  percentageChange: number | null;
}

/**
 * Menghitung perubahan nominal (Rp) dan persentase (%) antara dua titik observasi.
 */
export function calculateChange(
  pInitial: number | null | undefined,
  pFinal: number | null | undefined
): ChangeResult {
  if (
    pInitial === null ||
    pInitial === undefined ||
    pFinal === null ||
    pFinal === undefined ||
    pInitial <= 0
  ) {
    return {
      absoluteChange:
        pInitial !== null && pInitial !== undefined && pFinal !== null && pFinal !== undefined
          ? pFinal - pInitial
          : null,
      percentageChange: null,
    };
  }

  const absChange = pFinal - pInitial;
  const pctChange = ((pFinal - pInitial) / pInitial) * 100;

  return {
    absoluteChange: absChange,
    percentageChange: pctChange,
  };
}

/**
 * Menghitung indeks basis 100 untuk suatu harga relatif terhadap periode dasar.
 * Formula: (P_t / P_base) * 100
 */
export function calculateRebasedIndex(
  price: number | null | undefined,
  basePrice: number | null | undefined
): number | null {
  if (
    price === null ||
    price === undefined ||
    basePrice === null ||
    basePrice === undefined ||
    basePrice <= 0
  ) {
    return null;
  }
  return (price / basePrice) * 100;
}

export interface DispersionResult {
  cv: number | null; // Koefisien Variasi dalam %
  mean: number | null;
  stdDev: number | null;
  validObservations: number;
}

/**
 * Menghitung dispersi harga menggunakan Koefisien Variasi (CV = stdDev / mean * 100%).
 * Hanya menghitung observasi yang valid (non-null).
 */
export function calculateCoefficientOfVariation(
  prices: (number | null | undefined)[]
): DispersionResult {
  const validPrices = prices.filter(
    (p): p is number => p !== null && p !== undefined && !isNaN(p) && p > 0
  );

  if (validPrices.length < 2) {
    return {
      cv: null,
      mean: validPrices.length === 1 ? validPrices[0] : null,
      stdDev: null,
      validObservations: validPrices.length,
    };
  }

  const N = validPrices.length;
  const sum = validPrices.reduce((acc, val) => acc + val, 0);
  const mean = sum / N;

  const squaredDiffs = validPrices.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
  const stdDev = Math.sqrt(squaredDiffs / (N - 1));
  const cv = mean > 0 ? (stdDev / mean) * 100 : null;

  return {
    cv,
    mean,
    stdDev,
    validObservations: N,
  };
}

export interface MonthlyVolatilityResult {
  volatility: number | null; // Standar deviasi dari return bulanan
  meanMonthlyReturn: number | null;
  validTransitions: number;
}

/**
 * Menghitung volatilitas perubahan bulanan (stdDev dari MoM percentage changes).
 * Kaidah kritis: jika bulan aktif atau sebelumnya bernilai null, return bulanan adalah null (dilewati).
 */
export function calculateMonthlyVolatility(
  chronologicalPrices: (number | null | undefined)[]
): MonthlyVolatilityResult {
  const returns: number[] = [];

  for (let i = 1; i < chronologicalPrices.length; i++) {
    const prev = chronologicalPrices[i - 1];
    const curr = chronologicalPrices[i];

    if (
      prev !== null &&
      prev !== undefined &&
      curr !== null &&
      curr !== undefined &&
      prev > 0
    ) {
      const r = ((curr - prev) / prev) * 100;
      returns.push(r);
    }
  }

  if (returns.length < 2) {
    return {
      volatility: null,
      meanMonthlyReturn: returns.length === 1 ? returns[0] : null,
      validTransitions: returns.length,
    };
  }

  const M = returns.length;
  const sum = returns.reduce((acc, val) => acc + val, 0);
  const meanReturn = sum / M;

  const squaredDiffs = returns.reduce((acc, val) => acc + Math.pow(val - meanReturn, 2), 0);
  const volatility = Math.sqrt(squaredDiffs / (M - 1));

  return {
    volatility,
    meanMonthlyReturn: meanReturn,
    validTransitions: M,
  };
}

