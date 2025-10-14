'use client';

import Image from 'next/image';
import { Play, ChevronRight } from 'lucide-react';

interface Track {
  id: string;
  name: string;
  credits?: string;
  artworkUrl: string;
  order: number;
}

interface ReleasedSectionProps {
  tracks: Track[];
  onSeeAll: () => void;
  onTrackClick: (trackId: string) => void;
}

export function ReleasedSection({ tracks, onSeeAll, onTrackClick }: ReleasedSectionProps) {
  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 bg-gray-950">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Released</h2>
        <button
          onClick={onSeeAll}
          className="flex items-center gap-1 sm:gap-2 text-white hover:text-cyan-400 transition-colors text-sm sm:text-base"
        >
          See All <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Track List */}
      <div className="space-y-2 sm:space-y-3">
        {tracks
          .sort((a, b) => a.order - b.order)
          .slice(0, 4)
          .map((track) => (
          <div
            key={track.id}
            onClick={() => onTrackClick(track.id)}
            className="bg-gray-900/50 backdrop-blur rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-800 flex items-center gap-3 sm:gap-4 cursor-pointer hover:bg-gray-800/50 transition-all"
          >
            {/* Album Artwork */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
              {track.artworkUrl ? (
                <Image
                  src={track.artworkUrl}
                  alt={track.name}
                  fill
                  className="rounded-lg sm:rounded-xl object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <span className="text-gray-500 text-xs">No Image</span>
                </div>
              )}
            </div>

            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white text-base sm:text-lg font-bold truncate">{track.name}</h3>
              <p className="text-gray-400 text-xs sm:text-sm truncate">{track.credits || ''}</p>
            </div>

            {/* Play Button */}
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 sm:px-6 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 transition-colors text-xs sm:text-sm">
              <Play className="w-3 h-3 sm:w-4 sm:h-4 fill-white" />
              <span className="font-medium hidden sm:inline">Play</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
