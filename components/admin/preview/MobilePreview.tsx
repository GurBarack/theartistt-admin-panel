'use client';

import { usePageStore } from '@/stores/pageStore';
import { HeroSection } from '@/components/landing/HeroSection';
import { ContentTabs } from '@/components/landing/ContentTabs';
import { FeaturedSection } from '@/components/landing/FeaturedSection';
import { ReleasedSection } from '@/components/landing/ReleasedSection';
import { EventsSection } from '@/components/landing/EventsSection';
import { FullSetsSection } from '@/components/landing/FullSetsSection';
import { cn } from '@/lib/utils';
import type { FeaturedItem, Track, FullSet } from '@/types';

const THEME_COLORS = {
  cyan: 'bg-cyan-400',
  pink: 'bg-pink-400',
  purple: 'bg-purple-400',
  orange: 'bg-orange-400',
  green: 'bg-green-400',
};

export function MobilePreview() {
  const { page, links, socialLinks, customButtons, featuredItems, tracks, events, fullSets } = usePageStore();

  if (!page) return null;

  const accentColor = THEME_COLORS[page.themeColor || 'cyan'];

  return (
    <div className="relative w-full max-w-[375px] mx-auto">
      {/* iPhone Frame */}
      <div className="w-full aspect-[375/812] max-w-[375px] bg-black rounded-[30px] sm:rounded-[60px] border-[7px] sm:border-[14px] border-gray-800 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 sm:w-40 h-3.5 sm:h-7 bg-black rounded-b-xl sm:rounded-b-3xl z-50" />

        {/* Scrollable Content */}
        <div className="h-full overflow-y-auto">
          {/* LIVE PREVIEW - Updates in real-time */}
          <HeroSection
            coverPhotoUrl={page.coverPhotoUrl}
            displayName={page.displayName}
            links={links}
            socialLinks={socialLinks}
            customButtons={customButtons}
            themeColor={page.themeColor}
            themeMode={page.themeMode}
          />

          <ContentTabs themeMode={page.themeMode} accentColor={page.themeColor} />

          <div id="featured">
            <FeaturedSection
              items={featuredItems}
              accentColor={accentColor}
              onItemClick={() => {}}
            />
          </div>

          <div id="released">
            <ReleasedSection
              tracks={tracks}
              onSeeAll={() => {}}
              onTrackClick={() => {}}
            />
          </div>

          <div id="events">
            <EventsSection
              events={events}
              onSeeAll={() => {}}
              onEventClick={() => {}}
            />
          </div>

          <FullSetsSection
            sets={fullSets}
            onSeeAll={() => {}}
            onCardClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
