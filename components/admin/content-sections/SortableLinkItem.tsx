'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Link } from '@/types';

interface SortableLinkItemProps {
  link: Link;
  onUpdate: (id: string, updates: Partial<Link>) => void;
}

export function SortableLinkItem({ link, onUpdate }: SortableLinkItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: link.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 bg-gray-700/50 rounded-lg p-3"
    >
      {/* Drag Handle */}
      <button
        className="cursor-grab active:cursor-grabbing touch-none"
        {...listeners}
        {...attributes}
      >
        <GripVertical className="w-5 h-5 text-gray-400" />
      </button>

      {/* Platform Icon */}
      <div className="flex-shrink-0">
        <img
          src={`/icons/${link.platform}.svg`}
          alt={link.platform}
          width={24}
          height={24}
          className="w-6 h-6"
        />
      </div>

      {/* URL Input */}
      <Input
        value={link.url}
        onChange={(e) => onUpdate(link.id, { url: e.target.value })}
        placeholder={`Enter ${link.platform} URL`}
        className="flex-1 bg-gray-900 border-gray-600"
      />

      {/* Visibility Toggle */}
      <Switch
        checked={link.isVisible}
        onCheckedChange={(checked) => onUpdate(link.id, { isVisible: checked })}
      />
    </div>
  );
}