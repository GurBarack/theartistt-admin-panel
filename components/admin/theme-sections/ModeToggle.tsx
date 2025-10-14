'use client';

import { Moon, Sun } from 'lucide-react';
import { usePageStore } from '@/stores/pageStore';
import { cn } from '@/lib/utils';

export function ModeToggle() {
  const { page, setPage, setIsDraft } = usePageStore();

  const handleToggle = (mode: 'dark' | 'light') => {
    if (page) {
      setPage({ ...page, themeMode: mode });
      setIsDraft(true);
    }
  };

  return (
    <div>
      <label className="text-white font-medium mb-3 block">Mode</label>
      <div className="inline-flex rounded-lg bg-gray-700 p-1">
        <button
          onClick={() => handleToggle('dark')}
          className={cn(
            'px-6 py-2 rounded-md flex items-center gap-2 transition-colors',
            page?.themeMode === 'dark' ? 'bg-purple-600 text-white' : 'text-gray-300'
          )}
        >
          <Moon className="w-4 h-4" />
          Dark
        </button>
        <button
          onClick={() => handleToggle('light')}
          className={cn(
            'px-6 py-2 rounded-md flex items-center gap-2 transition-colors',
            page?.themeMode === 'light' ? 'bg-gray-200 text-gray-900' : 'text-gray-300'
          )}
        >
          <Sun className="w-4 h-4" />
          Light
        </button>
      </div>
    </div>
  );
}
