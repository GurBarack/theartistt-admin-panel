'use client';

import { HeroSection } from './HeroSection';
import { ContentTabs } from './ContentTabs';
import { FeaturedSection } from './FeaturedSection';
import { ReleasedSection } from './ReleasedSection';
import { EventsSection } from './EventsSection';
import { FullSetsSection } from './FullSetsSection';

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
  }>;
  events: Array<{
    id: string;
    name: string;
    venue: string;
    date: string;
    time: string;
  }>;
  fullSets: Array<{
    id: string;
    name: string;
    date: string;
    location?: string;
    thumbnailUrl: string;
    badgeText?: string;
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

  const handleTrackClick = (id: string) => {
    console.log('Track clicked:', id);
    // TODO: Open track modal or play track
  };

  const handleEventClick = (id: string) => {
    console.log('Event clicked:', id);
    // TODO: Open event detail modal
  };

  const handleSetClick = (id: string) => {
    console.log('Set clicked:', id);
    // TODO: Open full set modal or play set
  };

  const handleSeeAllTracks = () => {
    console.log('See all tracks');
    // TODO: Navigate to full tracks page
  };

  const handleSeeAllEvents = () => {
    console.log('See all events');
    // TODO: Navigate to full events page
  };

  const handleSeeAllSets = () => {
    console.log('See all sets');
    // TODO: Navigate to full sets page
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
          onSeeAll={handleSeeAllTracks}
          onTrackClick={handleTrackClick}
        />
      </div>

      <div id="events">
        <EventsSection
          events={data.events}
          onSeeAll={handleSeeAllEvents}
          onEventClick={handleEventClick}
        />
      </div>

      <FullSetsSection
        sets={data.fullSets}
        onSeeAll={handleSeeAllSets}
        onCardClick={handleSetClick}
      />
    </div>
  );
}
