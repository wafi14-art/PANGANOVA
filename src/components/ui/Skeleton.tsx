import React from 'react';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded bg-ivory-dark/60 ${className}`}
      aria-hidden="true"
    />
  );
}

