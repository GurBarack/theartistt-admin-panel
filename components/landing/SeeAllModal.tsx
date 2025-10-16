'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Play, Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Track {
  id: string;
  name: string;
  credits?: string;
  artworkUrl: string;
  order: number;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  beatportUrl?: string;
  youtubeUrl?: string;
  youtubeMusicUrl?: string;
  soundcloudUrl?: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  location?: string;
  url?: string;
}

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

interface SeeAllModalProps {
  type: 'tracks' | 'events' | 'fullSets' | null;
  items: Track[] | Event[] | FullSet[];
  isOpen: boolean;
  onClose: () => void;
  onItemClick: (type: 'tracks' | 'events' | 'fullSets', item: Track | Event | FullSet) => void;
}

export function SeeAllModal({ type, items, isOpen, onClose, onItemClick }: SeeAllModalProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!type) return null;

  const getTitle = (): string => {
    const titles = {
      tracks: 'All Tracks',
      events: 'All Events',
      fullSets: 'All Full Sets'
    };
    return type ? titles[type] : '';
  };

  const cardBaseClasses = "rounded-3xl overflow-hidden relative cursor-pointer border border-gray-800 hover:border-gray-700 transition-all";

  const renderTracks = () => {
    const tracks = items as Track[];
    return (
      <div className="space-y-3">
        {tracks
          .sort((a, b) => a.order - b.order)
          .map((track) => (
          <div
            key={track.id}
            onClick={() => onItemClick('tracks', track)}
            className="bg-gray-900/50 backdrop-blur rounded-xl p-4 border border-gray-800 flex items-center gap-4 cursor-pointer hover:bg-gray-800/50 transition-all"
          >
            {/* Album Artwork */}
            <div className="relative w-20 h-20 flex-shrink-0">
              {track.artworkUrl ? (
                <Image
                  src={track.artworkUrl}
                  alt={track.name || 'Track artwork'}
                  fill
                  sizes="80px"
                  className="rounded-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`w-full h-full bg-gray-800 rounded-lg flex items-center justify-center ${track.artworkUrl ? 'hidden' : ''}`}>
                <span className="text-gray-500 text-xs">No Image</span>
              </div>
            </div>

            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white text-lg font-bold truncate">{track.name}</h3>
              <p className="text-gray-400 text-sm truncate">{track.credits || ''}</p>
            </div>

            {/* Play Button */}
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-full flex items-center gap-2 transition-colors text-sm">
              <Play className="w-4 h-4 fill-white" />
              <span className="font-medium">Play</span>
            </button>
          </div>
        ))}
      </div>
    );
  };

  const renderEvents = () => {
    const events = items as Event[];
    return (
      <div className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => onItemClick('events', event)}
            className="bg-gray-900 rounded-3xl p-5 border border-gray-800 flex items-center gap-6 cursor-pointer hover:bg-gray-800 transition-all"
          >
            {/* Date Section */}
            <div className="flex flex-col items-center justify-center w-[100px]">
              <Calendar className="w-8 h-8 text-white mb-2" />
              <span className="text-white font-bold text-sm">{event.date}</span>
            </div>

            {/* Event Details */}
            <div className="flex-1">
              <h3 className="text-white text-xl font-bold mb-2">{event.title}</h3>
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
            </div>

            {/* Arrow Button */}
            <div className="w-[60px] h-[60px] rounded-full bg-gray-800 flex items-center justify-center hover:scale-110 transition-transform">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderFullSets = () => {
    const sets = items as FullSet[];
    return (
      <div className={`${isMobile ? 'flex flex-col gap-4' : 'grid grid-cols-2 gap-4 justify-items-center'}`}>
        {sets.map((set) => (
          <div
            key={set.id}
            onClick={() => onItemClick('fullSets', set)}
            className={`${cardBaseClasses} ${
              isMobile 
                ? 'w-full h-[300px]' 
                : 'w-[280px] h-[400px]'
            }`}
          >
            {/* Background Image */}
            {set.thumbnailUrl ? (
              <Image
                src={set.thumbnailUrl}
                alt={set.title || 'Full set'}
                fill
                sizes={isMobile ? "100vw" : "280px"}
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
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={`bg-gradient-to-b from-gray-900 to-gray-950 border-gray-800 ${
          isMobile 
            ? 'fixed bottom-0 left-0 right-0 top-auto h-[80vh] rounded-t-2xl border-0 transform-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom' 
            : type === 'fullSets' ? 'w-[1000px] max-h-[80vh]' : 'max-w-4xl max-h-[80vh]'
        }`}
      >
        <DialogHeader className="relative mb-6">
          <DialogTitle className="text-2xl font-bold text-white text-center">
            {getTitle()} <span className="text-lg text-gray-400 font-normal ml-2">({items.length})</span>
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-0 top-0 w-8 h-8 rounded-full bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gray-700/50 hover:border-gray-600/50 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </DialogHeader>

        <div className={`px-6 pb-6 ${isMobile ? 'h-full flex flex-col' : ''}`}>
          <div className={`space-y-6 ${isMobile ? 'flex-1 overflow-y-auto' : 'max-h-[60vh] overflow-y-auto'}`}>
            {type === 'tracks' && renderTracks()}
            {type === 'events' && renderEvents()}
            {type === 'fullSets' && renderFullSets()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
