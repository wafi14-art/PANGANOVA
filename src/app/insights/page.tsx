'use client';

import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/common/PageHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { Badge } from '@/components/ui/Badge';
import { useLanguage } from '@/hooks/useLanguage';
import { BookOpen, ArrowLeft, ExternalLink } from 'lucide-react';

export default function InsightsPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <PageHeader
        overline={t('header.insightsOverline')}
        title={t('nav.insights')}
        description={
          t('header.scope') === 'Scope: National · Indonesia'
            ? 'Evidence-based descriptive insights, seasonal pattern summaries, and formal methodological documentation.'
            : 'Insight deskriptif berbasis bukti, pola musiman komoditas, dan dokumentasi metodologi resmi.'
        }
        rightElement={
          <Badge variant="muted" size="md">
            Milestone 8 · Scheduled
          </Badge>
        }
      />

      <div className="rounded border border-ivory-border bg-white p-8 shadow-editorial">
        <EmptyState
          icon={BookOpen}
          title={t('common.inDevelopmentTitle')}
          description={
            t('header.scope') === 'Scope: National · Indonesia'
              ? 'This module will present evidence-based analytical briefs and methodology notes. Detailed computational rules and data dictionaries are currently documented in the repository docs.'
              : 'Modul ini akan menyajikan ringkasan analitis dan catatan metodologi berbasis bukti. Aturan komputasi dan kamus data saat ini telah didokumentasikan di folder docs repositori.'
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
              <a
                href="/docs/methodology.md"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded border border-ivory-border bg-ivory-warm px-4 py-2 text-xs font-medium text-charcoal hover:bg-ivory transition-colors"
              >
                <ExternalLink className="h-4 w-4 text-charcoal-muted" />
                <span>docs/methodology.md</span>
              </a>
            </div>
          }
        />
      </div>
    </div>
  );
}

