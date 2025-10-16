'use client';

import { useState } from 'react';
import { HeroSection } from './HeroSection';
import { ContentTabs } from './ContentTabs';
import { FeaturedSection } from './FeaturedSection';
import { ReleasedSection } from './ReleasedSection';
import { EventsSection } from './EventsSection';
import { FullSetsSection } from './FullSetsSection';
import { SeeAllModal } from './SeeAllModal';
import { TrackModal } from './TrackModal';
import { FullSetModal } from './FullSetModal';

interface LandingPageData {
  // Hero Section Data
  coverPhotoUrl?: string;
  displayName: string;
  links: Array<{ id: string; platform: string; url: string; isVisible: boolean }>;
  socialLinks: Array<{ id: string; platform: string; url: string }>;
  customButtons: Array<{ id: string; text: string; url: string; style: string }>;
  themeMode: 'dark' | 'light';
  
  // Content Sections Data
  featuredItems: Array<{
    id: string;
    title: string;
    subtitle?: string;
    imageUrl: string;
    ctaUrl?: string;
  }>;
  tracks: Array<{
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
  }>;
  events: Array<{
    id: string;
    title: string;
    date: string;
    location?: string;
    url?: string;
  }>;
  fullSets: Array<{
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
  }>;
}

interface LandingPageContentProps {
  data: LandingPageData;
  themeColor: 'cyan' | 'pink' | 'purple' | 'orange' | 'green';
}

const ACCENT_COLORS = {
  cyan: 'bg-cyan-400',
  pink: 'bg-pink-400',
  purple: 'bg-purple-400',
  orange: 'bg-orange-400',
  green: 'bg-green-400',
};

export function LandingPageContent({ data, themeColor }: LandingPageContentProps) {
  const accentColor = ACCENT_COLORS[themeColor];

  const handleFeaturedClick = (id: string) => {
    console.log('Featured clicked:', id);
    // TODO: Open featured item modal or navigate
  };


  const handleEventClick = (url?: string) => {
    if (url && url.trim() !== '') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSetClick = (id: string) => {
    console.log('Set clicked:', id);
    // TODO: Open full set modal or play set
  };

  // State for See All modals
  const [seeAllType, setSeeAllType] = useState<'tracks' | 'events' | 'fullSets' | null>(null);

  // State for detail modals opened from See All
  const [detailTrack, setDetailTrack] = useState<{
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
  } | null>(null);
  const [detailFullSet, setDetailFullSet] = useState<{
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
  } | null>(null);

  // Handlers for See All buttons
  const handleTracksSeeAll = () => setSeeAllType('tracks');
  const handleEventsSeeAll = () => setSeeAllType('events');
  const handleFullSetsSeeAll = () => setSeeAllType('fullSets');

  // Handler for clicking items in See All modal
  const handleSeeAllItemClick = (type: string, item: any) => {
    if (type === 'tracks') {
      setSeeAllType(null); // Close See All modal
      setDetailTrack(item); // Open track detail modal
    } else if (type === 'events') {
      if (item.url && item.url.trim() !== '') {
        window.open(item.url, '_blank', 'noopener,noreferrer');
        setSeeAllType(null); // Close modal after opening URL
      }
    } else if (type === 'fullSets') {
      setSeeAllType(null); // Close See All modal
      setDetailFullSet(item); // Open full set detail modal
    }
  };

  // Handler for back button in detail modals
  const handleBackToSeeAll = (type: 'tracks' | 'fullSets') => {
    if (type === 'tracks') {
      setDetailTrack(null);
      setSeeAllType('tracks');
    } else if (type === 'fullSets') {
      setDetailFullSet(null);
      setSeeAllType('fullSets');
    }
  };


  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundColor: data.themeMode === 'dark' ? '#0a0a0a' : '#ffffff',
        color: data.themeMode === 'dark' ? '#ffffff' : '#0a0a0a',
      }}
    >
      {/* Hero Section */}
      <HeroSection
        coverPhotoUrl={data.coverPhotoUrl}
        displayName={data.displayName}
        links={data.links}
        socialLinks={data.socialLinks}
        customButtons={data.customButtons}
        themeColor={themeColor}
        themeMode={data.themeMode}
      />

      {/* Navigation Tabs */}
      <ContentTabs themeMode={data.themeMode} accentColor={themeColor} />

      {/* Content Sections */}
      <div id="featured">
        <FeaturedSection
          items={data.featuredItems}
          accentColor={accentColor}
          onItemClick={handleFeaturedClick}
        />
      </div>

      <div id="released">
        <ReleasedSection
          tracks={data.tracks}
          onSeeAll={handleTracksSeeAll}
        />
      </div>

      <div id="events">
        <EventsSection
          events={data.events}
          onSeeAll={handleEventsSeeAll}
          onEventClick={handleEventClick}
        />
      </div>

      <div id="fullsets">
        <FullSetsSection
          sets={data.fullSets}
          onSeeAll={handleFullSetsSeeAll}
          onCardClick={handleSetClick}
        />
      </div>

      {/* See All Modal */}
      <SeeAllModal
        type={seeAllType}
        items={
          seeAllType === 'tracks' ? data.tracks :
          seeAllType === 'events' ? data.events :
          seeAllType === 'fullSets' ? data.fullSets : []
        }
        isOpen={!!seeAllType}
        onClose={() => setSeeAllType(null)}
        onItemClick={handleSeeAllItemClick}
      />

      {/* Detail modals opened from See All (with back button) */}
      <TrackModal
        track={detailTrack}
        isOpen={!!detailTrack}
        onClose={() => setDetailTrack(null)}
        showBackButton={true}
        onBack={() => handleBackToSeeAll('tracks')}
      />

      <FullSetModal
        fullSet={detailFullSet}
        isOpen={!!detailFullSet}
        onClose={() => setDetailFullSet(null)}
        showBackButton={true}
        onBack={() => handleBackToSeeAll('fullSets')}
      />
    </div>
  );
}
