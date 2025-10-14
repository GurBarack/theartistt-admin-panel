'use client';

import { usePageStore } from '@/stores/pageStore';

const COLORS = [
  { id: 'cyan', name: 'Cyan', class: 'bg-cyan-400' },
  { id: 'pink', name: 'Pink', class: 'bg-pink-400' },
  { id: 'purple', name: 'Purple', class: 'bg-purple-400' },
  { id: 'orange', name: 'Orange', class: 'bg-orange-400' },
  { id: 'green', name: 'Green', class: 'bg-green-400' },
] as const;

export function ColorPicker() {
  const { page, setPage, setIsDraft } = usePageStore();

  const handleColorChange = (color: typeof COLORS[number]['id']) => {
    if (page) {
      setPage({ ...page, themeColor: color });
      setIsDraft(true);
    }
  };

  return (
    <div>
      <label className="text-white font-medium mb-3 block">Color</label>
      <div className="flex gap-3">
        {COLORS.map((color) => (
          <button
            key={color.id}
            onClick={() => handleColorChange(color.id)}
            className={`w-12 h-12 rounded-full ${color.class} ${
              page?.themeColor === color.id ? 'ring-4 ring-white ring-offset-2 ring-offset-gray-800' : ''
            }`}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
}
