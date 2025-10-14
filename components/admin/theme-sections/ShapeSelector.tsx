'use client';

import { usePageStore } from '@/stores/pageStore';
import { cn } from '@/lib/utils';

const SHAPES = [
  { id: 'triangle', name: 'Triangle', class: 'w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-600 transform rotate-45' },
  { id: 'starburst', name: 'Starburst', class: 'w-8 h-8 bg-gradient-to-br from-pink-400 to-orange-400 transform rotate-12' },
  { id: 'square', name: 'Square', class: 'w-8 h-8 bg-gradient-to-br from-green-400 to-cyan-400' },
] as const;

export function ShapeSelector() {
  const { page, setPage, setIsDraft } = usePageStore();

  const handleShapeChange = (shape: typeof SHAPES[number]['id']) => {
    if (page) {
      setPage({ ...page, coverPhotoShape: shape });
      setIsDraft(true);
    }
  };

  return (
    <div>
      <label className="text-white font-medium mb-3 block">Cover Photo Shape</label>
      <div className="flex gap-3">
        {SHAPES.map((shape) => (
          <button
            key={shape.id}
            onClick={() => handleShapeChange(shape.id)}
            className={cn(
              'flex items-center justify-center rounded-lg border-2 transition-colors',
              page?.coverPhotoShape === shape.id
                ? 'border-cyan-400 bg-cyan-400/10'
                : 'border-gray-600 hover:border-gray-500'
            )}
          >
            <div className={shape.class} />
          </button>
        ))}
      </div>
    </div>
  );
}
