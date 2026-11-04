import React, { ReactNode } from 'react';
import { LucideIcon, Info } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
  bordered?: boolean;
}

export function EmptyState({
  icon: Icon = Info,
  title,
  description,
  action,
  className = '',
  bordered = true,
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center ${
        bordered ? 'rounded border border-dashed border-ivory-border bg-white/60' : ''
      } ${className}`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory text-charcoal-muted">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-3 text-sm font-semibold text-charcoal">{title}</h3>
      <p className="mt-1 max-w-sm text-xs leading-relaxed text-charcoal-muted">
        {description}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

