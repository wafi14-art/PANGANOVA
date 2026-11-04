'use client';

import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

interface DataDisclaimerProps {
  className?: string;
  variant?: 'banner' | 'card';
}

export function DataDisclaimer({ className = '', variant = 'banner' }: DataDisclaimerProps) {
  const { t } = useLanguage();

  if (variant === 'card') {
    return (
      <div className={`rounded border border-ivory-border bg-ivory-warm p-4 text-xs text-charcoal-muted ${className}`}>
        <p className="font-semibold text-charcoal">
          {t('footer.transparencyTitle')}{' '}
          <span className="font-normal">{t('footer.transparencyText')}</span>
        </p>
        <p className="mt-1 font-mono text-[11px] text-charcoal-subtle">
          {t('footer.metaInfo')}
        </p>
      </div>
    );
  }

  return (
    <footer className={`mt-8 border-t border-ivory-border/80 pt-4 pb-8 text-xs text-charcoal-muted ${className}`}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-bold text-charcoal">{t('footer.transparencyTitle')} </span>
          <span className="text-charcoal-muted">{t('footer.transparencyText')}</span>
        </div>
        <div className="shrink-0 font-mono text-[11px] text-charcoal-subtle">
          {t('footer.metaInfo')}
        </div>
      </div>
    </footer>
  );
}

