'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileUpload } from '../FileUpload';
import { Track } from '@/types';

interface SortableTrackItemProps {
  track: Track;
  index: number;
  onUpdate: (id: string, field: keyof Track, value: string) => void;
  onRemove: (id: string) => void;
  onFileUpload: (trackId: string, file: File | null) => void;
}

export function SortableTrackItem({ 
  track, 
  index, 
  onUpdate, 
  onRemove, 
  onFileUpload 
}: SortableTrackItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: track.id,
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
      className="space-y-3 bg-gray-700/50 rounded-lg p-4"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Drag Handle */}
          <button
            className="cursor-grab active:cursor-grabbing touch-none"
            {...listeners}
            {...attributes}
          >
            <GripVertical className="w-5 h-5 text-gray-400 hover:text-gray-300" />
          </button>
          <span className="text-sm text-gray-300">Track {index + 1}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(track.id)}
          className="text-red-400 hover:text-red-300"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <Input
        value={track.name}
        onChange={(e) => onUpdate(track.id, 'name', e.target.value)}
        placeholder="Track name"
        className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
      />

      <Input
        value={track.credits || ''}
        onChange={(e) => onUpdate(track.id, 'credits', e.target.value)}
        placeholder="Credits (optional)"
        className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
      />

      <div className="space-y-2">
        <label className="text-sm text-gray-300">Artwork</label>
        <FileUpload
          onFileSelect={(file) => onFileUpload(track.id, file)}
          currentImageUrl={track.artworkUrl}
          placeholder="Upload artwork"
          aspectRatio="aspect-square"
          className="w-32 h-32"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-300">Platform Links (Optional)</label>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Spotify</label>
            <Input
              value={track.spotifyUrl ?? ''}
              onChange={(e) => onUpdate(track.id, 'spotifyUrl', e.target.value)}
              placeholder="Spotify URL"
              className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Apple Music</label>
            <Input
              value={track.appleMusicUrl ?? ''}
              onChange={(e) => onUpdate(track.id, 'appleMusicUrl', e.target.value)}
              placeholder="Apple Music URL"
              className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Beatport</label>
            <Input
              value={track.beatportUrl ?? ''}
              onChange={(e) => onUpdate(track.id, 'beatportUrl', e.target.value)}
              placeholder="Beatport URL"
              className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">YouTube</label>
            <Input
              value={track.youtubeUrl ?? ''}
              onChange={(e) => onUpdate(track.id, 'youtubeUrl', e.target.value)}
              placeholder="YouTube URL"
              className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">YouTube Music</label>
            <Input
              value={track.youtubeMusicUrl ?? ''}
              onChange={(e) => onUpdate(track.id, 'youtubeMusicUrl', e.target.value)}
              placeholder="YouTube Music URL"
              className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">SoundCloud</label>
            <Input
              value={track.soundcloudUrl ?? ''}
              onChange={(e) => onUpdate(track.id, 'soundcloudUrl', e.target.value)}
              placeholder="SoundCloud URL"
              className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
