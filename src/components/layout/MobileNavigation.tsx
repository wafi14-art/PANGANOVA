'use client';

import React from 'react';
import { X } from 'lucide-react';
import { AppSidebar } from './AppSidebar';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative flex w-full max-w-xs flex-1 flex-col bg-forest-900 shadow-xl">
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md bg-forest-800 text-gray-300 hover:text-white"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <AppSidebar isMobile={true} onCloseMobile={onClose} className="h-full w-full" />
      </div>
    </div>
  );
}

