'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Check, ExternalLink, Loader2 } from 'lucide-react';

const PLATFORMS = [
  {
    id: 'spotify',
    name: 'Spotify',
    icon: '🟢',
    description: 'The most popular way to share music',
    authUrl: '/api/auth/spotify',
  },
  {
    id: 'soundcloud',
    name: 'SoundCloud',
    icon: '🟠',
    description: 'Perfect for unreleased tracks & mixes',
    authUrl: '/api/auth/soundcloud',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: '🔴',
    description: 'Music videos & live performances',
    authUrl: '/api/auth/youtube',
  },
];

export function Step3Platforms() {
  const { data, updateData, nextStep, prevStep } = useOnboardingStore();
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleConnect = async (platformId: string, _authUrl: string) => {
    setConnecting(platformId);
    
    // For now, simulate connection (replace with real OAuth later)
    setTimeout(() => {
      updateData({
        connectedPlatforms: {
          ...data.connectedPlatforms,
          [platformId]: { 
            connected: true, 
            tracks: [
              { name: 'Sample Track 1', artworkUrl: '/placeholder-album.svg' },
              { name: 'Sample Track 2', artworkUrl: '/placeholder-album.svg' },
            ]
          },
        },
      });
      setConnecting(null);
    }, 2000);
  };

  const isPlatformConnected = (platformId: string) => {
    return data.connectedPlatforms[platformId as keyof typeof data.connectedPlatforms]?.connected;
  };

  const hasAnyConnection = Object.values(data.connectedPlatforms).some(
    (platform) => platform?.connected
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="text-5xl mb-4">🔗</div>
        <h2 className="text-3xl font-bold text-white mb-2">Where&apos;s Your Music?</h2>
        <p className="text-gray-400">
          We&apos;ll automatically import your tracks and keep them synced
        </p>
      </div>

      {/* Platform Cards */}
      <div className="space-y-4">
        {PLATFORMS.map((platform) => {
          const isConnected = isPlatformConnected(platform.id);
          const isConnecting = connecting === platform.id;

          return (
            <div
              key={platform.id}
              className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{platform.icon}</span>
                    <h3 className="text-xl font-bold text-white">{platform.name}</h3>
                    {isConnected && (
                      <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                        <Check className="w-4 h-4" />
                        Connected
                      </div>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{platform.description}</p>
                </div>

                <Button
                  onClick={() => handleConnect(platform.id, platform.authUrl)}
                  disabled={isConnected || isConnecting}
                  variant={isConnected ? 'outline' : 'default'}
                  className={
                    isConnected
                      ? 'border-green-500 text-green-400'
                      : 'bg-gradient-to-r from-cyan-500 to-purple-500'
                  }
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : isConnected ? (
                    'Connected'
                  ) : (
                    <>
                      Connect <ExternalLink className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>

              {/* Show imported tracks */}
              {isConnected && data.connectedPlatforms[platform.id as keyof typeof data.connectedPlatforms]?.tracks && (data.connectedPlatforms[platform.id as keyof typeof data.connectedPlatforms]?.tracks?.length || 0) > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-sm text-gray-400 mb-2">
                    ✓ Imported {data.connectedPlatforms[platform.id as keyof typeof data.connectedPlatforms]?.tracks?.length || 0} tracks
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
        <p className="text-purple-400 text-sm">
          ⚡ <strong>Pro tip:</strong> Connect at least one platform now. We&apos;ll automatically
          import your latest tracks and you can manage them later.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-3 pt-4">
        <Button onClick={prevStep} variant="outline" size="lg">
          ← Back
        </Button>
        <div className="flex gap-3">
          <Button onClick={nextStep} variant="ghost" size="lg">
            Skip for Now
          </Button>
          <Button
            onClick={nextStep}
            disabled={!hasAnyConnection}
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
          >
            Next: Visual Identity →
          </Button>
        </div>
      </div>
    </div>
  );
}
