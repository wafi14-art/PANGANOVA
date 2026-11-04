'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid,
  TrendingUp,
  SlidersHorizontal,
  Wallet,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { navigationItems } from '@/config/navigation';
import { useLanguage } from '@/hooks/useLanguage';

interface AppSidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

const iconMap = {
  LayoutGrid,
  TrendingUp,
  SlidersHorizontal,
  Wallet,
  BookOpen,
};

export function AppSidebar({
  collapsed = false,
  onToggleCollapse,
  className = '',
  isMobile = false,
  onCloseMobile,
}: AppSidebarProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <aside
      className={`flex flex-col justify-between bg-forest-900 text-white transition-all duration-200 select-none ${
        collapsed && !isMobile ? 'w-18' : 'w-64'
      } ${className}`}
    >
      {/* Top Branding Section */}
      <div>
        <div className="flex h-16 items-center justify-between border-b border-forest-800 px-4">
          <Link
            href="/dashboard"
            onClick={onCloseMobile}
            className="flex items-center gap-3 overflow-hidden"
          >
            {/* Logo Mark */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald text-white shadow-sm font-bold text-base tracking-tighter">
              <span>P</span>
            </div>

            {(!collapsed || isMobile) && (
              <div className="flex flex-col leading-tight">
                <span className="font-bold tracking-wider text-sm text-white">
                  {t('brand.name')}
                </span>
                <span className="text-[9px] font-semibold tracking-[0.2em] text-emerald-light uppercase">
                  {t('brand.descriptor')}
                </span>
              </div>
            )}
          </Link>

          {!isMobile && onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex h-7 w-7 items-center justify-center rounded text-forest-600 hover:bg-forest-800 hover:text-white transition-colors"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-label="Toggle sidebar"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="mt-4 px-2 space-y-1" aria-label="Main Navigation">
          {navigationItems.map((item) => {
            const Icon = iconMap[item.iconName];
            const isActive =
              pathname === item.href || (item.href === '/dashboard' && pathname === '/');
            const title = t(item.titleKey);

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={onCloseMobile}
                title={collapsed && !isMobile ? title : undefined}
                className={`group flex items-center rounded-md px-3 py-2.5 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-forest-700 text-white shadow-sm border border-emerald/30 font-semibold'
                    : 'text-gray-300 hover:bg-forest-800/80 hover:text-white'
                } ${!item.isAvailable ? 'opacity-70' : ''}`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 transition-colors ${
                    isActive ? 'text-white' : 'text-emerald-light/80 group-hover:text-white'
                  }`}
                />

                {(!collapsed || isMobile) && (
                  <div className="ml-3 flex flex-1 items-center justify-between overflow-hidden">
                    <span className="truncate">{title}</span>
                    {!item.isAvailable && (
                      <span className="ml-2 rounded bg-forest-800 px-1.5 py-0.5 text-[9px] font-mono text-gray-400 border border-forest-700">
                        {t('nav.comingSoon')}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Disclaimer Section */}
      <div className="border-t border-forest-800 p-4">
        {(!collapsed || isMobile) ? (
          <div className="flex items-start gap-2 text-[10px] leading-relaxed text-gray-400">
            <ShieldAlert className="h-3.5 w-3.5 shrink-0 text-gold-dark mt-0.5" />
            <span>{t('brand.disclaimerSidebar')}</span>
          </div>
        ) : (
          <div className="flex justify-center" title={t('brand.disclaimerSidebar')}>
            <ShieldAlert className="h-4 w-4 text-gold-dark" />
          </div>
        )}
      </div>
    </aside>
  );
}

