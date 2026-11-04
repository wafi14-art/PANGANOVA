import React, { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  rightElement?: ReactNode;
  className?: string;
  isDark?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  rightElement,
  className = '',
  isDark = false,
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between ${className}`}>
      <div>
        <h2
          className={`text-base font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-charcoal'
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`mt-0.5 text-xs ${
              isDark ? 'text-charcoal-subtle' : 'text-charcoal-muted'
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
      {rightElement && <div className="shrink-0">{rightElement}</div>}
    </div>
  );
}

