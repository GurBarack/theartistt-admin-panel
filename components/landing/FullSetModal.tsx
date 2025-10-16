'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Play, ArrowLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface FullSetModalProps {
  fullSet: {
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
  } | null;
  isOpen: boolean;
  onClose: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

const PLATFORM_CONFIG = [
  {
    key: 'spotifyUrl' as const,
    name: 'Spotify',
    icon: '/icons/spotify.svg',
  },
  {
    key: 'appleMusicUrl' as const,
    name: 'Apple Music',
    icon: '/icons/apple-music.svg',
  },
  {
    key: 'beatportUrl' as const,
    name: 'Beatport',
    icon: '/icons/beatport.svg',
  },
  {
    key: 'youtubeUrl' as const,
    name: 'YouTube',
    icon: '/icons/youtube.svg',
  },
  {
    key: 'youtubeMusicUrl' as const,
    name: 'YouTube Music',
    icon: '/icons/youtube-music.svg',
  },
  {
    key: 'soundcloudUrl' as const,
    name: 'SoundCloud',
    icon: '/icons/soundcloud.svg',
  },
];

export function FullSetModal({ fullSet, isOpen, onClose, showBackButton = false, onBack }: FullSetModalProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!fullSet) return null;

  // Filter platforms that have URLs configured
  const availablePlatforms = PLATFORM_CONFIG.filter(platform => {
    const url = fullSet[platform.key] as string;
    return url && url.trim() !== '';
  });

  const handlePlatformClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={`${
          isMobile 
            ? 'fixed bottom-0 left-0 right-0 top-auto h-[80vh] rounded-t-2xl border-0 transform-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom' 
            : 'max-w-md'
        } bg-gradient-to-b from-gray-900 to-gray-950 border-gray-800 text-white p-0 overflow-hidden`}
      >
        {/* Mobile Bottom Sheet Handle */}
        {isMobile && (
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1 bg-gray-600 rounded-full"></div>
          </div>
        )}

        <div className={`px-6 pb-6 ${isMobile ? 'h-full flex flex-col' : ''}`}>
          <DialogHeader className="relative mb-6">
            <DialogTitle className="sr-only">Full Set Details</DialogTitle>
            <DialogDescription className="sr-only">
              Platform links for {fullSet.title}
            </DialogDescription>
            {showBackButton && onBack && (
              <button
                onClick={onBack}
                className="absolute top-0 left-0 p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="absolute top-0 right-0 p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </DialogHeader>

          <div className={`space-y-6 ${isMobile ? 'flex-1 overflow-y-auto' : ''}`}>
            {/* Set Thumbnail and Info */}
            <div className="space-y-4">
              {/* Thumbnail */}
              <div className="relative w-full aspect-video max-w-sm mx-auto rounded-xl overflow-hidden">
                {fullSet.thumbnailUrl ? (
                  <Image
                    src={fullSet.thumbnailUrl}
                    alt={fullSet.title || 'Full set thumbnail'}
                    fill
                    sizes="(max-width: 768px) 320px, 400px"
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`w-full h-full bg-gray-800 flex items-center justify-center ${fullSet.thumbnailUrl ? 'hidden' : ''}`}>
                  <span className="text-gray-500 text-sm">No Image</span>
                </div>
                
              </div>

              {/* Set Info */}
              <div className="text-center space-y-1">
                <h3 className="text-xl font-bold text-white">{fullSet.title}</h3>
                <p className="text-gray-400 text-sm">{fullSet.date}</p>
                {fullSet.location && (
                  <p className="text-gray-400 text-sm">{fullSet.location}</p>
                )}
              </div>
            </div>

            {/* Platform Links */}
            <div className="space-y-2.5">
              {availablePlatforms.length > 0 ? (
                availablePlatforms.map((platform) => {
                  const url = fullSet[platform.key] as string;
                  return (
                    <button
                      key={platform.key}
                      onClick={() => handlePlatformClick(url)}
                      className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm text-white transition-all hover:bg-gray-700/50 hover:border-gray-600/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 flex-shrink-0">
                          <Image
                            src={platform.icon}
                            alt={platform.name}
                            width={24}
                            height={24}
                            className="w-6 h-6"
                          />
                        </div>
                        <span className="font-medium text-base">{platform.name}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-700/60 px-4 py-2 rounded-full">
                        <span className="text-sm font-medium">Play</span>
                        <Play className="w-4 h-4 fill-white" />
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p>No platform links configured for this set.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
