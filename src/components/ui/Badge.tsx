import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'emerald' | 'gold' | 'muted' | 'outline' | 'dark';
  className?: string;
  size?: 'sm' | 'md';
}

export function Badge({
  children,
  variant = 'default',
  className = '',
  size = 'md',
}: BadgeProps) {
  const sizeClasses = size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs';

  const variantClasses = {
    default: 'bg-ivory text-charcoal border border-ivory-border',
    emerald: 'bg-emerald-subtle text-emerald-dark font-medium border border-emerald/20',
    gold: 'bg-gold-subtle text-gold-dark font-medium border border-gold/30',
    muted: 'bg-gray-100 text-charcoal-muted border border-gray-200',
    outline: 'border border-ivory-border text-charcoal-muted bg-transparent',
    dark: 'bg-surface text-gray-200 border border-surface-border',
  }[variant];

  return (
    <span
      className={`inline-flex items-center rounded font-sans tracking-wide ${sizeClasses} ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
}

