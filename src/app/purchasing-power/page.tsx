'use client';

import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/common/PageHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { Badge } from '@/components/ui/Badge';
import { useLanguage } from '@/hooks/useLanguage';
import { Wallet, ArrowLeft, FileText } from 'lucide-react';

export default function PurchasingPowerPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <PageHeader
        overline={t('header.purchasingPowerOverline')}
        title={t('nav.purchasingPower')}
        description={
          t('header.scope') === 'Scope: National · Indonesia'
            ? 'Household food expenditure and purchasing power dynamics across socio-economic quintiles.'
            : 'Dinamika pengeluaran pangan rumah tangga dan indikator daya beli masyarakat antar-kuintil sosio-ekonomi.'
        }
        rightElement={
          <Badge variant="muted" size="md">
            Milestone 7 · Scheduled
          </Badge>
        }
      />

      <div className="rounded border border-ivory-border bg-white p-8 shadow-editorial">
        <EmptyState
          icon={Wallet}
          title={t('common.inDevelopmentTitle')}
          description={
            t('header.scope') === 'Scope: National · Indonesia'
              ? 'This module is scheduled for development in future milestones. Official household expenditure data (Susenas) and Consumer Price Index (CPI) datasets must be formally validated before publication to prevent speculative conclusions.'
              : 'Modul ini dijadwalkan pada milestone mendatang. Dataset resmi pengeluaran konsumsi rumah tangga (Susenas) dan Indeks Harga Konsumen (IHK) harus diverifikasi terlebih dahulu untuk mencegah penarikan kesimpulan kausal yang spekulatif.'
          }
          action={
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded bg-forest-800 px-4 py-2 text-xs font-semibold text-white hover:bg-forest-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{t('common.returnToSummary')}</span>
              </Link>
              <Link
                href="/docs/methodology.md"
                target="_blank"
                className="inline-flex items-center gap-2 rounded border border-ivory-border bg-ivory-warm px-4 py-2 text-xs font-medium text-charcoal hover:bg-ivory transition-colors"
              >
                <FileText className="h-4 w-4 text-charcoal-muted" />
                <span>{t('common.viewMethodology')}</span>
              </Link>
            </div>
          }
        />
      </div>
    </div>
  );
}

