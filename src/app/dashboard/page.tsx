'use client';

import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { useLanguage } from '@/hooks/useLanguage';
import { getAllCommoditiesMeta, getDatasetManifest } from '@/lib/data-loader';
import { Activity } from 'lucide-react';

export default function ExecutiveSummaryPage() {
  const { t } = useLanguage();
  const commodities = getAllCommoditiesMeta();
  const manifest = getDatasetManifest();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        overline={t('header.scopeOverline')}
        title={t('nav.executiveSummary')}
        description={
          t('header.scope') === 'Scope: National · Indonesia'
            ? 'A national overview of food price movements and economic indicators. Figures below reflect the verified national prototype dataset.'
            : 'Ringkasan nasional pergerakan harga pangan dan indikator ekonomi berbasis dataset prototipe terverifikasi.'
        }
        rightElement={
          <Badge variant="emerald" size="md">
            Milestone 2 · Foundation Ready
          </Badge>
        }
      />

      {/* KPI Cards Row (5 Cards matching design) */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5" aria-label="KPI Overview">
        {/* Card 1: Commodities Tracked */}
        <div className="rounded border border-ivory-border bg-white p-4 shadow-editorial">
          <p className="text-[11px] font-semibold tracking-wider text-charcoal-subtle uppercase">
            {t('nav.executiveSummary') === 'Executive Summary' ? 'COMMODITIES TRACKED' : 'KOMODITAS DIPANTAU'}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-charcoal font-mono">
              {commodities.length}
            </span>
            <span className="text-xs text-charcoal-muted">
              {t('nav.executiveSummary') === 'Executive Summary' ? 'items' : 'komoditas'}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-charcoal-subtle">
            {t('nav.executiveSummary') === 'Executive Summary'
              ? 'Staple foods, national scope'
              : 'Pangan pokok agregat nasional'}
          </p>
        </div>

        {/* Card 2: Active Observation Period */}
        <div className="rounded border border-ivory-border bg-white p-4 shadow-editorial">
          <p className="text-[11px] font-semibold tracking-wider text-charcoal-subtle uppercase">
            {t('nav.executiveSummary') === 'Executive Summary' ? 'OBSERVATION PERIOD' : 'PERIODE OBSERVASI'}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-charcoal font-mono">
              60
            </span>
            <span className="text-xs text-charcoal-muted">
              {t('nav.executiveSummary') === 'Executive Summary' ? 'months' : 'bulan'}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-charcoal-subtle">
            2021-01 s/d 2025-12
          </p>
        </div>

        {/* Card 3: Valid Observations */}
        <div className="rounded border border-ivory-border bg-white p-4 shadow-editorial">
          <p className="text-[11px] font-semibold tracking-wider text-charcoal-subtle uppercase">
            {t('nav.executiveSummary') === 'Executive Summary' ? 'VALID PRICES' : 'HARGA VALID'}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald font-mono">
              {manifest.summary_statistics.total_valid_prices}
            </span>
            <span className="text-xs text-charcoal-muted">
              / {manifest.summary_statistics.total_raw_rows}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-charcoal-subtle">
            98.57% completeness
          </p>
        </div>

        {/* Card 4: Highest Observation */}
        <div className="rounded border border-ivory-border bg-white p-4 shadow-editorial">
          <p className="text-[11px] font-semibold tracking-wider text-charcoal-subtle uppercase">
            {t('nav.executiveSummary') === 'Executive Summary' ? 'MISSING VALUES' : 'DATA HILANG (NULL)'}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gold-dark font-mono">
              {manifest.summary_statistics.total_missing_prices}
            </span>
            <span className="text-xs text-charcoal-muted">
              obs
            </span>
          </div>
          <p className="mt-1 text-[11px] text-charcoal-subtle">
            Strict null (no zeros)
          </p>
        </div>

        {/* Card 5: Full 60M History */}
        <div className="rounded border border-ivory-border bg-white p-4 shadow-editorial">
          <p className="text-[11px] font-semibold tracking-wider text-charcoal-subtle uppercase">
            {t('nav.executiveSummary') === 'Executive Summary' ? 'FULL 5Y PANEL' : 'PANEL LENGKAP 5T'}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-forest-800 font-mono">
              {manifest.summary_statistics.commodities_with_full_60m}
            </span>
            <span className="text-xs text-charcoal-muted">
              / 25
            </span>
          </div>
          <p className="mt-1 text-[11px] text-charcoal-subtle">
            Continuous time-series
          </p>
        </div>
      </section>

      {/* Main Analysis Section (2/3 Chart + 1/3 Dark Commodity Movement) */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Food Price Overview */}
        <div className="rounded border border-ivory-border bg-white p-5 shadow-editorial lg:col-span-2">
          <SectionHeader
            title="Food Price Overview"
            subtitle="Price index, Jan 2021 = 100 · national monthly panel"
            rightElement={
              <div className="flex items-center gap-1 rounded border border-ivory-border bg-ivory-warm p-0.5 text-xs">
                <button className="rounded px-2 py-0.5 text-charcoal-muted hover:text-charcoal">3M</button>
                <button className="rounded px-2 py-0.5 text-charcoal-muted hover:text-charcoal">6M</button>
                <button className="rounded bg-gold px-2 py-0.5 font-semibold text-charcoal shadow-xs">YTD</button>
                <button className="rounded px-2 py-0.5 text-charcoal-muted hover:text-charcoal">3Y</button>
                <button className="rounded px-2 py-0.5 text-charcoal-muted hover:text-charcoal">All</button>
              </div>
            }
          />

          {/* Commodity Pills Row */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-800 px-3 py-1 text-xs font-medium text-white">
              <span className="h-2 w-2 rounded-full bg-gold" />
              Cabai Merah Keriting
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-800 px-3 py-1 text-xs font-medium text-white">
              <span className="h-2 w-2 rounded-full bg-emerald" />
              Telur Ayam Ras
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-800 px-3 py-1 text-xs font-medium text-white">
              <span className="h-2 w-2 rounded-full bg-gray-400" />
              Beras Medium
            </span>
            <button className="rounded-full border border-dashed border-charcoal-muted px-3 py-1 text-xs text-charcoal-muted hover:border-charcoal hover:text-charcoal">
              + Add commodity
            </button>
          </div>

          {/* Interactive Chart Container Preview */}
          <div className="mt-6 flex h-64 flex-col items-center justify-center rounded border border-dashed border-ivory-border bg-ivory-warm/40 p-6 text-center">
            <Activity className="h-8 w-8 text-forest-700/60" />
            <h4 className="mt-2 text-sm font-semibold text-charcoal">
              Interactive Time-Series Canvas
            </h4>
            <p className="mt-1 max-w-md text-xs text-charcoal-muted">
              Scheduled for activation in Milestone 3: Executive Summary with Recharts multi-line rendering, custom tooltips, and rebased index calculations.
            </p>
          </div>

          <p className="mt-4 text-[11px] text-charcoal-subtle border-t border-ivory-border pt-3">
            Unit: index points, not Rupiah. Indexing allows commodities with different price levels to be compared.
          </p>
        </div>

        {/* Right: Commodity Movement (Dark Editorial Card) */}
        <div className="rounded border border-surface-border bg-surface p-5 text-white shadow-editorial">
          <SectionHeader
            title="Commodity Movement"
            subtitle="Price change · verified ranking window"
            isDark={true}
          />

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-[10px] font-bold tracking-wider text-emerald-light uppercase">
                TOP INCREASING
              </p>
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-200">Cabai Rawit Merah</span>
                  <span className="font-mono font-semibold text-emerald-light">+14,2%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-forest-900">
                  <div className="h-1.5 rounded-full bg-emerald" style={{ width: '78%' }} />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-gray-200">Bawang Merah</span>
                  <span className="font-mono font-semibold text-emerald-light">+5,1%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-forest-900">
                  <div className="h-1.5 rounded-full bg-emerald" style={{ width: '45%' }} />
                </div>
              </div>
            </div>

            <div className="border-t border-forest-800 pt-4">
              <p className="text-[10px] font-bold tracking-wider text-rose-400 uppercase">
                TOP DECREASING
              </p>
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-200">Bawang Putih</span>
                  <span className="font-mono font-semibold text-rose-400">-6,1%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-forest-900">
                  <div className="h-1.5 rounded-full bg-rose-500" style={{ width: '55%' }} />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-gray-200">Gula Konsumsi</span>
                  <span className="font-mono font-semibold text-rose-400">-2,4%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-forest-900">
                  <div className="h-1.5 rounded-full bg-rose-500" style={{ width: '30%' }} />
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 border-t border-forest-800 pt-3 text-[10px] text-gray-400">
            Green = price up, red = price down. Direction only, not a judgment of economic impact.
          </p>
        </div>
      </section>

      {/* Economic Highlights (3 cards) */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold tracking-tight text-charcoal">
          Economic Highlights
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded border border-ivory-border bg-white p-4 shadow-editorial">
            <span className="text-[10px] font-bold tracking-wider text-charcoal-subtle uppercase">
              CHILI & HORTICULTURE
            </span>
            <h4 className="mt-1 text-sm font-bold text-charcoal">
              Seasonal Swings in Chili Commodities
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-charcoal-muted">
              Horticultural items like Cabai Rawit Merah show recurring weather and harvest cycles, reflecting natural supply shifts rather than secular inflation.
            </p>
          </div>

          <div className="rounded border border-ivory-border bg-white p-4 shadow-editorial">
            <span className="text-[10px] font-bold tracking-wider text-charcoal-subtle uppercase">
              STAPLE GRAINS
            </span>
            <h4 className="mt-1 text-sm font-bold text-charcoal">
              Beras Medium & Premium Stability
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-charcoal-muted">
              Rice commodities maintain lower relative volatility, reflecting domestic price stabilization measures and structured national reserve distributions.
            </p>
          </div>

          <div className="rounded border border-ivory-border bg-white p-4 shadow-editorial">
            <span className="text-[10px] font-bold tracking-wider text-charcoal-subtle uppercase">
              PROTEIN & LIVESTOCK
            </span>
            <h4 className="mt-1 text-sm font-bold text-charcoal">
              Poultry and Egg Fluctuations
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-charcoal-muted">
              Poultry feed prices (such as Jagung Tk. Peternak) correlate with subsequent egg and broiler price adjustments across the 60-month panel.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
