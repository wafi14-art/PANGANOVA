'use client';

import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Skeleton } from '@/components/ui/Skeleton';
import { useLanguage } from '@/hooks/useLanguage';
import { Globe, Download, LineChart } from 'lucide-react';

export default function PriceTrendsPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        overline={t('header.historicalOverline')}
        title={t('nav.priceTrends')}
        description={
          t('header.scope') === 'Scope: National · Indonesia'
            ? 'Explore historical food price movements and compare commodities on one chart. Figures reflect the verified national prototype dataset.'
            : 'Eksplorasi pergerakan historis harga pangan nasional dan bandingkan tren komoditas pada satu grafik.'
        }
        rightElement={
          <div className="flex items-center gap-1.5 rounded border border-ivory-border bg-white px-3 py-1.5 text-xs text-charcoal shadow-xs">
            <Globe className="h-3.5 w-3.5 text-forest-800" />
            <span className="font-medium">{t('header.scope')}</span>
          </div>
        }
      />

      {/* Filter Control Card */}
      <section className="rounded border border-ivory-border bg-white p-5 shadow-editorial space-y-4">
        {/* Row 1: Commodities Selection Pills */}
        <div>
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold tracking-wider text-charcoal-subtle uppercase">
              COMMODITIES <span className="font-normal text-charcoal-muted">(4 of 5 max selected)</span>
            </label>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
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
            <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-800 px-3 py-1 text-xs font-medium text-white">
              <span className="h-2 w-2 rounded-full bg-amber-600" />
              Bawang Merah
            </span>
            <button className="rounded-full border border-dashed border-charcoal-muted px-3 py-1 text-xs text-charcoal-muted hover:border-charcoal hover:text-charcoal transition-colors">
              + Add commodity
            </button>
          </div>
        </div>

        {/* Row 2: Range, Unit, and Overlay Controls */}
        <div className="flex flex-wrap items-center gap-6 border-t border-ivory-border pt-4">
          {/* Date Range */}
          <div>
            <span className="block text-[10px] font-semibold tracking-wider text-charcoal-subtle uppercase mb-1.5">
              DATE RANGE
            </span>
            <div className="flex items-center rounded border border-ivory-border bg-ivory-warm p-0.5 text-xs">
              <button className="rounded px-2.5 py-1 text-charcoal-muted hover:text-charcoal">6M</button>
              <button className="rounded px-2.5 py-1 text-charcoal-muted hover:text-charcoal">1Y</button>
              <button className="rounded px-2.5 py-1 text-charcoal-muted hover:text-charcoal">YTD</button>
              <button className="rounded bg-gold px-2.5 py-1 font-semibold text-charcoal shadow-xs">All (5Y)</button>
              <button className="rounded px-2.5 py-1 text-charcoal-muted hover:text-charcoal">Custom...</button>
            </div>
          </div>

          {/* Unit Switcher */}
          <div>
            <span className="block text-[10px] font-semibold tracking-wider text-charcoal-subtle uppercase mb-1.5">
              UNIT
            </span>
            <div className="flex items-center rounded border border-ivory-border bg-ivory-warm p-0.5 text-xs">
              <button className="rounded bg-gold px-2.5 py-1 font-semibold text-charcoal shadow-xs">Index (100)</button>
              <button className="rounded px-2.5 py-1 text-charcoal-muted hover:text-charcoal">Nominal (Rp)</button>
            </div>
          </div>

          {/* Overlay Checkbox */}
          <div className="pt-4 sm:pt-0">
            <span className="block text-[10px] font-semibold tracking-wider text-charcoal-subtle uppercase mb-1.5">
              OVERLAY
            </span>
            <label className="flex items-center gap-2 text-xs text-charcoal cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-ivory-border text-forest-800 focus:ring-forest-700"
              />
              <span>3-month moving average (first series)</span>
            </label>
          </div>
        </div>
      </section>

      {/* Main Analysis: Chart + Selection Summary */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Chart Canvas */}
        <div className="rounded border border-ivory-border bg-white p-5 shadow-editorial lg:col-span-2">
          <SectionHeader
            title="Price Index by Commodity"
            subtitle="Monthly, national average · Jan 2021 = 100"
          />

          <div className="mt-6 flex h-72 flex-col items-center justify-center rounded border border-dashed border-ivory-border bg-ivory-warm/40 p-6 text-center">
            <LineChart className="h-8 w-8 text-forest-700/60" />
            <h4 className="mt-2 text-sm font-semibold text-charcoal">
              Multi-Series Time-Series Canvas
            </h4>
            <p className="mt-1 max-w-md text-xs text-charcoal-muted">
              Ready for Milestone 4: Price Trend Exploration. Recharts rendering with missing-data gap preservation, moving average overlay, and custom tooltip.
            </p>
          </div>

          <p className="mt-4 text-[11px] text-charcoal-subtle border-t border-ivory-border pt-3">
            Unit: index points, not Rupiah. Indexing allows commodities with different price levels to be compared.
          </p>
        </div>

        {/* Right Dark Card: Selection Summary */}
        <div className="rounded border border-surface-border bg-surface p-5 text-white shadow-editorial">
          <SectionHeader
            title="Selection Summary"
            subtitle="Prices & range indicators"
            isDark={true}
          />

          <div className="mt-5 space-y-4">
            <div className="border-b border-forest-800 pb-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-200">Cabai Merah Keriting</span>
                <span className="font-mono text-emerald-light">+17,9%</span>
              </div>
              <p className="mt-1 font-mono text-sm font-bold text-white">Rp 53.078</p>
              <p className="text-[10px] text-gray-400">5Y Range: Rp 28.052 – Rp 76.189</p>
            </div>

            <div className="border-b border-forest-800 pb-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-200">Telur Ayam Ras</span>
                <span className="font-mono text-emerald-light">+14,9%</span>
              </div>
              <p className="mt-1 font-mono text-sm font-bold text-white">Rp 31.923</p>
              <p className="text-[10px] text-gray-400">5Y Range: Rp 22.611 – Rp 31.923</p>
            </div>

            <div className="border-b border-forest-800 pb-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-200">Beras Medium</span>
                <span className="font-mono text-emerald-light">+12,0%</span>
              </div>
              <p className="mt-1 font-mono text-sm font-bold text-white">Rp 13.682</p>
              <p className="text-[10px] text-gray-400">5Y Range: Rp 10.735 – Rp 14.370</p>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-200">Bawang Merah</span>
                <span className="font-mono text-emerald-light">+14,8%</span>
              </div>
              <p className="mt-1 font-mono text-sm font-bold text-white">Rp 47.288</p>
              <p className="text-[10px] text-gray-400">5Y Range: Rp 24.403 – Rp 57.859</p>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Price Data Table Section */}
      <section className="rounded border border-ivory-border bg-white p-5 shadow-editorial">
        <SectionHeader
          title="Historical Price Data"
          subtitle="Monthly observation series · verified records"
          rightElement={
            <button className="flex items-center gap-1.5 rounded border border-ivory-border bg-ivory-warm px-3 py-1.5 text-xs font-medium text-charcoal hover:bg-ivory transition-colors">
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </button>
          }
        />

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-ivory-border bg-ivory-warm/60 text-[11px] font-semibold tracking-wider text-charcoal-subtle uppercase">
              <tr>
                <th className="py-2.5 px-3">MONTH</th>
                <th className="py-2.5 px-3">CABAI MERAH KERITING</th>
                <th className="py-2.5 px-3">TELUR AYAM RAS</th>
                <th className="py-2.5 px-3">BERAS MEDIUM</th>
                <th className="py-2.5 px-3">BAWANG MERAH</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-border font-mono">
              <tr>
                <td className="py-2 px-3 font-sans font-medium text-charcoal">Desember 2025</td>
                <td className="py-2 px-3">Rp 53.078</td>
                <td className="py-2 px-3">Rp 31.923</td>
                <td className="py-2 px-3">Rp 13.682</td>
                <td className="py-2 px-3">Rp 47.288</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-sans font-medium text-charcoal">November 2025</td>
                <td className="py-2 px-3">Rp 53.794</td>
                <td className="py-2 px-3">Rp 30.525</td>
                <td className="py-2 px-3">Rp 13.564</td>
                <td className="py-2 px-3">Rp 39.873</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-sans font-medium text-charcoal">Oktober 2025</td>
                <td className="py-2 px-3">Rp 56.260</td>
                <td className="py-2 px-3">Rp 30.437</td>
                <td className="py-2 px-3">Rp 13.823</td>
                <td className="py-2 px-3">Rp 38.892</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* State Reference Section (Matching Design Specification) */}
      <section className="space-y-2 border-t border-ivory-border pt-4">
        <p className="text-[10px] font-bold tracking-wider text-charcoal-subtle uppercase">
          STATE REFERENCE (DESIGN SYSTEM DEMONSTRATION)
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Skeleton Example */}
          <div className="rounded border border-ivory-border bg-white p-4">
            <p className="text-xs font-semibold text-charcoal mb-2">Loading skeleton state</p>
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <p className="mt-2 text-[10px] text-charcoal-subtle">Loading skeleton shown while analytical data is queried.</p>
          </div>

          {/* Empty State Example */}
          <div className="rounded border border-dashed border-ivory-border bg-white/70 p-4 text-center">
            <p className="text-xs font-semibold text-charcoal">No commodity selected</p>
            <p className="mt-1 text-xs text-charcoal-muted">Select at least one commodity above to draw the chart and table.</p>
            <button className="mt-3 rounded border border-ivory-border bg-white px-3 py-1 text-xs font-medium text-charcoal shadow-xs">
              Select commodity
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
