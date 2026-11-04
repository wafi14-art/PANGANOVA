'use client';

import React, { ReactNode } from 'react';

interface PageHeaderProps {
  overline?: string;
  title: string;
  description?: string;
  rightElement?: ReactNode;
  className?: string;
}

export function PageHeader({
  overline,
  title,
  description,
  rightElement,
  className = '',
}: PageHeaderProps) {
  return (
    <div className={`mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between ${className}`}>
      <div>
        {overline && (
          <p className="text-[11px] font-semibold tracking-wider text-charcoal-subtle uppercase">
            {overline}
          </p>
        )}
        <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-charcoal sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-charcoal-muted">
            {description}
          </p>
        )}
      </div>
      {rightElement && <div className="shrink-0">{rightElement}</div>}
    </div>
  );
}

