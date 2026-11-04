'use client';

import React, { useState, ReactNode } from 'react';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { MobileNavigation } from './MobileNavigation';
import { DataDisclaimer } from '@/components/common/DataDisclaimer';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-ivory-warm font-sans text-charcoal antialiased">
      {/* Desktop Sidebar */}
      <AppSidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        className="hidden lg:flex lg:sticky lg:top-0 lg:h-screen lg:shrink-0"
      />

      {/* Mobile Drawer Navigation */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        <AppHeader onToggleMobileMenu={() => setMobileMenuOpen(true)} />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-[1600px] w-full mx-auto">
          {children}
          <DataDisclaimer />
        </main>
      </div>
    </div>
  );
}

