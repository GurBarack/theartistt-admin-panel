'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { FullSetModal } from './FullSetModal';

interface FullSet {
  id: string;
  title: string;
  url: string;
  thumbnailUrl?: string;
  date?: string;
  location?: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  beatportUrl?: string;
  youtubeUrl?: string;
  youtubeMusicUrl?: string;
  soundcloudUrl?: string;
}

interface FullSetsSectionProps {
  sets: FullSet[];
  onSeeAll: () => void;
  onCardClick: (setId: string) => void;
}

export function FullSetsSection({ sets, onSeeAll, onCardClick }: FullSetsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedSet, setSelectedSet] = useState<FullSet | null>(null);

  const handleCardClick = (set: FullSet) => {
    setSelectedSet(set);
  };

  return (
    <section className="py-8 px-6 bg-gray-950">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">Full Sets</h2>
        <button
          onClick={onSeeAll}
          className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors"
        >
          See All <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {sets.slice(0, 4).map((set, index) => (
          <div
            key={set.id}
            onClick={() => handleCardClick(set)}
            className="flex-shrink-0 w-[280px] h-[400px] rounded-3xl overflow-hidden relative cursor-pointer snap-start border border-gray-800 hover:border-gray-700 transition-all"
            style={{
              marginLeft: index === 0 ? '0' : '0',
              marginRight: index === sets.length - 1 ? '24px' : '0',
            }}
          >
            {/* Background Image */}
            {set.thumbnailUrl ? (
              <Image
                src={set.thumbnailUrl}
                alt={set.title || 'Full set'}
                fill
                sizes="280px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <span className="text-gray-500 text-lg">No Image</span>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />


            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-white text-xl font-bold mb-1">{set.title}</h3>
              <p className="text-gray-400 text-sm">{set.date}</p>
              <p className="text-gray-400 text-sm">{set.location || ''}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Full Set Modal */}
      <FullSetModal
        fullSet={selectedSet}
        isOpen={!!selectedSet}
        onClose={() => setSelectedSet(null)}
      />

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
