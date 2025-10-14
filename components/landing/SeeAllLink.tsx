'use client';

import { ChevronRight } from 'lucide-react';

interface SeeAllLinkProps {
  onClick: () => void;
  className?: string;
}

export function SeeAllLink({ onClick, className = '' }: SeeAllLinkProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 text-white text-base font-medium hover:text-cyan-400 transition-colors ${className}`}
    >
      See All
      <ChevronRight className="w-5 h-5" />
    </button>
  );
}
