'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { navigationItems } from '@/config/navigation';

interface AppHeaderProps {
  onToggleMobileMenu?: () => void;
  className?: string;
}

export function AppHeader({ onToggleMobileMenu, className = '' }: AppHeaderProps) {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  // Dapatkan nama halaman aktif untuk breadcrumb
  const currentNav = navigationItems.find(
    (item) => item.href === pathname || (item.href === '/dashboard' && pathname === '/')
  );
  const pageTitle = currentNav ? t(currentNav.titleKey) : t('nav.executiveSummary');

  return (
    <header
      className={`sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-ivory-border bg-white px-4 lg:px-6 ${className}`}
    >
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-ivory-border text-charcoal-muted hover:bg-ivory hover:text-charcoal lg:hidden"
            aria-label="Toggle mobile menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs">
          <span className="text-charcoal-subtle">{t('nav.breadcrumbDashboard')}</span>
          <span className="text-charcoal-subtle">/</span>
          <span className="font-semibold text-charcoal">{pageTitle}</span>
        </nav>
      </div>

      {/* Right: Date Pill, Freshness, and Language Switcher */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Date Scope Pill (Hidden on smallest screens) */}
        <div className="hidden md:flex items-center gap-1.5 rounded border border-ivory-border bg-ivory-warm px-2.5 py-1 text-xs text-charcoal-muted font-mono">
          <Calendar className="h-3.5 w-3.5 text-charcoal-subtle" />
          <span>{t('header.dateRange')}</span>
        </div>

        {/* Freshness Status Pill */}
        <div className="hidden xl:flex items-center gap-1.5 rounded border border-ivory-border bg-ivory-warm px-2.5 py-1 text-xs text-charcoal-muted font-mono">
          <Clock className="h-3.5 w-3.5 text-charcoal-subtle" />
          <span>{t('header.updated')}</span>
        </div>

        {/* Language Switcher Pill (ID | EN) */}
        <div className="flex items-center rounded border border-ivory-border bg-white p-0.5 text-xs font-medium">
          <button
            onClick={() => setLanguage('id')}
            className={`rounded px-2 py-0.5 transition-all text-xs ${
              language === 'id'
                ? 'bg-forest-800 text-white font-bold shadow-xs'
                : 'text-charcoal-muted hover:text-charcoal'
            }`}
            title="Bahasa Indonesia"
            aria-label="Ganti Bahasa ke Indonesia"
          >
            ID
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`rounded px-2 py-0.5 transition-all text-xs ${
              language === 'en'
                ? 'bg-forest-800 text-white font-bold shadow-xs'
                : 'text-charcoal-muted hover:text-charcoal'
            }`}
            title="English"
            aria-label="Switch Language to English"
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
