'use client';

import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { SectionHeader } from '@/components/common/SectionHeader';
import { useLanguage } from '@/hooks/useLanguage';
import { Globe, Download, BarChart2 } from 'lucide-react';

export default function CommodityComparisonPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        overline={t('header.comparisonOverline')}
        title={t('nav.commodityComparison')}
        description={
          t('header.scope') === 'Scope: National · Indonesia'
            ? 'Compare price changes, rankings and variability across commodities for a chosen period. Figures reflect the verified national prototype dataset.'
            : 'Bandingkan perubahan harga, pemeringkatan, dan variabilitas antar-komoditas pangan untuk periode observasi yang dipilih.'
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
        {/* Row 1: Commodity Category Groups */}
        <div>
          <span className="block text-[10px] font-semibold tracking-wider text-charcoal-subtle uppercase mb-1.5">
            COMMODITIES (9 of 25 selected)
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <button className="rounded-full bg-forest-800 px-3 py-1 text-xs font-semibold text-white">All</button>
            <button className="rounded-full border border-ivory-border bg-ivory-warm px-3 py-1 text-xs text-charcoal hover:bg-ivory">Rice</button>
            <button className="rounded-full border border-ivory-border bg-ivory-warm px-3 py-1 text-xs text-charcoal hover:bg-ivory">Chili</button>
            <button className="rounded-full border border-ivory-border bg-ivory-warm px-3 py-1 text-xs text-charcoal hover:bg-ivory">Onion & garlic</button>
            <button className="rounded-full border border-ivory-border bg-ivory-warm px-3 py-1 text-xs text-charcoal hover:bg-ivory">Oil, sugar & eggs</button>
            <button className="rounded-full border border-dashed border-charcoal-muted px-3 py-1 text-xs text-charcoal-muted hover:border-charcoal hover:text-charcoal">
              Customize...
            </button>
          </div>
        </div>

        {/* Row 2: Compare To & Rank By */}
        <div className="flex flex-wrap items-center gap-8 border-t border-ivory-border pt-4">
          <div>
            <span className="block text-[10px] font-semibold tracking-wider text-charcoal-subtle uppercase mb-1.5">
              COMPARE TO
            </span>
            <div className="flex items-center rounded border border-ivory-border bg-ivory-warm p-0.5 text-xs">
              <button className="rounded bg-gold px-2.5 py-1 font-semibold text-charcoal shadow-xs">Prior month</button>
              <button className="rounded px-2.5 py-1 text-charcoal-muted hover:text-charcoal">1 Year Ago</button>
              <button className="rounded px-2.5 py-1 text-charcoal-muted hover:text-charcoal">Base (Jan 2021)</button>
            </div>
          </div>

          <div>
            <span className="block text-[10px] font-semibold tracking-wider text-charcoal-subtle uppercase mb-1.5">
              RANK BY
            </span>
            <div className="flex items-center rounded border border-ivory-border bg-ivory-warm p-0.5 text-xs">
              <button className="rounded bg-gold px-2.5 py-1 font-semibold text-charcoal shadow-xs">% change</button>
              <button className="rounded px-2.5 py-1 text-charcoal-muted hover:text-charcoal">Nominal change</button>
              <button className="rounded px-2.5 py-1 text-charcoal-muted hover:text-charcoal">Variability (CV)</button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Visualizations: Dual Bar Charts */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: Percentage Change Diverging Chart */}
        <div className="rounded border border-ivory-border bg-white p-5 shadow-editorial">
          <SectionHeader
            title="Percentage Change"
            subtitle="Sorted high to low · consistent comparison window"
          />

          <div className="mt-4 flex h-60 flex-col items-center justify-center rounded border border-dashed border-ivory-border bg-ivory-warm/40 p-4 text-center">
            <BarChart2 className="h-7 w-7 text-forest-700/60" />
            <h4 className="mt-2 text-xs font-semibold text-charcoal">
              Horizontal Diverging Bar Chart Canvas
            </h4>
            <p className="mt-1 max-w-xs text-[11px] text-charcoal-muted">
              Scheduled for activation in Milestone 5: Commodity Comparison with dual-bar comparative ranking.
            </p>
          </div>

          <p className="mt-3 text-[10px] text-charcoal-subtle border-t border-ivory-border pt-2">
            Green = price increase, red = price decrease. Direction only, not a judgment of economic impact.
          </p>
        </div>

        {/* Right: Absolute Change (Rp) Chart */}
        <div className="rounded border border-ivory-border bg-white p-5 shadow-editorial">
          <SectionHeader
            title="Absolute Change"
            subtitle="Nominal change (Rp) · same commodity order"
          />

          <div className="mt-4 flex h-60 flex-col items-center justify-center rounded border border-dashed border-ivory-border bg-ivory-warm/40 p-4 text-center">
            <BarChart2 className="h-7 w-7 text-forest-700/60" />
            <h4 className="mt-2 text-xs font-semibold text-charcoal">
              Nominal Absolute Change Canvas
            </h4>
            <p className="mt-1 max-w-xs text-[11px] text-charcoal-muted">
              Visualizes actual Rupiah impact alongside percentage shifts to provide balanced context.
            </p>
          </div>

          <p className="mt-3 text-[10px] text-charcoal-subtle border-t border-ivory-border pt-2">
            A small % change can be a large nominal change for high-priced items (e.g. Daging Sapi). Read both together.
          </p>
        </div>
      </section>

      {/* Price Variability & Reading Variability Section */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left (2/3): Price Variability Dark Card */}
        <div className="rounded border border-surface-border bg-surface p-5 text-white shadow-editorial lg:col-span-2">
          <SectionHeader
            title="Price Variability (Coefficient of Variation)"
            subtitle="Coefficient of variation of monthly prices · 60-month window"
            isDark={true}
          />

          <div className="mt-4 space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-200">Cabai Rawit Merah</span>
                <span className="font-mono text-gold font-bold">14,8% <span className="text-[10px] text-gray-400 font-normal">High</span></span>
              </div>
              <div className="h-2 w-full rounded bg-forest-900">
                <div className="h-2 rounded bg-gold" style={{ width: '85%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-200">Cabai Merah Keriting</span>
                <span className="font-mono text-gold font-bold">11,0% <span className="text-[10px] text-gray-400 font-normal">High</span></span>
              </div>
              <div className="h-2 w-full rounded bg-forest-900">
                <div className="h-2 rounded bg-gold" style={{ width: '65%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-200">Bawang Merah</span>
                <span className="font-mono text-gold font-bold">7,4% <span className="text-[10px] text-gray-400 font-normal">Moderate</span></span>
              </div>
              <div className="h-2 w-full rounded bg-forest-900">
                <div className="h-2 rounded bg-gold" style={{ width: '42%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-200">Beras Medium</span>
                <span className="font-mono text-emerald-light font-bold">1,1% <span className="text-[10px] text-gray-400 font-normal">Low</span></span>
              </div>
              <div className="h-2 w-full rounded bg-forest-900">
                <div className="h-2 rounded bg-emerald" style={{ width: '12%' }} />
              </div>
            </div>
          </div>

          <p className="mt-5 border-t border-forest-800 pt-3 text-[10px] text-gray-400">
            Bands: Low &lt; 3%, Moderate 3–8%, High &gt; 8%. Thresholds are descriptive analytical markers and not an official government classification.
          </p>
        </div>

        {/* Right (1/3): Reading Variability Card */}
        <div className="rounded border border-ivory-border bg-white p-5 shadow-editorial flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-charcoal">
              Reading variability
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-charcoal-muted">
              The coefficient of variation (CV) is the standard deviation of monthly prices divided by their average:
            </p>
            <div className="my-2 rounded bg-ivory-warm p-2 font-mono text-[11px] text-charcoal text-center border border-ivory-border">
              CV = (σ / μ) × 100%
            </div>
            <p className="text-xs leading-relaxed text-charcoal-muted">
              It describes how much a price moved around, in relative terms, regardless of its absolute price level.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-charcoal-muted">
              High variability does not by itself mean an economic crisis. Seasonal crops often swing widely during normal harvest cycles.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="rounded border border-ivory-border bg-white p-5 shadow-editorial">
        <SectionHeader
          title="Comparison Table"
          subtitle="Monthly observation changes and variability"
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
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">COMMODITY</th>
                <th className="py-2.5 px-3">DES 2025</th>
                <th className="py-2.5 px-3">NOV 2025</th>
                <th className="py-2.5 px-3">CHANGE (RP)</th>
                <th className="py-2.5 px-3">CHANGE (%)</th>
                <th className="py-2.5 px-3">VARIABILITY (CV)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-border font-mono">
              <tr>
                <td className="py-2 px-3 text-charcoal-muted">1</td>
                <td className="py-2 px-3 font-sans font-medium text-charcoal">Cabai Rawit Merah</td>
                <td className="py-2 px-3">Rp 51.492</td>
                <td className="py-2 px-3">Rp 41.694</td>
                <td className="py-2 px-3 text-emerald font-semibold">+Rp 9.798</td>
                <td className="py-2 px-3 text-emerald font-semibold">+23,5%</td>
                <td className="py-2 px-3">14,8% (High)</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-charcoal-muted">2</td>
                <td className="py-2 px-3 font-sans font-medium text-charcoal">Bawang Merah</td>
                <td className="py-2 px-3">Rp 47.288</td>
                <td className="py-2 px-3">Rp 39.873</td>
                <td className="py-2 px-3 text-emerald font-semibold">+Rp 7.415</td>
                <td className="py-2 px-3 text-emerald font-semibold">+18,6%</td>
                <td className="py-2 px-3">7,4% (Moderate)</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-charcoal-muted">3</td>
                <td className="py-2 px-3 font-sans font-medium text-charcoal">Beras Medium</td>
                <td className="py-2 px-3">Rp 13.682</td>
                <td className="py-2 px-3">Rp 13.564</td>
                <td className="py-2 px-3 text-emerald font-semibold">+Rp 118</td>
                <td className="py-2 px-3 text-emerald font-semibold">+0,9%</td>
                <td className="py-2 px-3">1,1% (Low)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
