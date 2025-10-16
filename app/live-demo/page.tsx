'use client';

import { usePageStore } from '@/stores/pageStore';
import { LandingPageContent } from '@/components/landing';
import { ProtectedPage } from '@/components/auth/ProtectedPage';

export default function LiveDemoPage() {
  const { 
    page, 
    links, 
    socialLinks, 
    customButtons, 
    featuredItems, 
    tracks, 
    events, 
    fullSets 
  } = usePageStore();

  // If no page data, show a message
  if (!page) {
    return (
      <ProtectedPage>
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">No Page Data</h1>
            <p className="text-gray-400 mb-6">
              Please go to the admin panel to create and configure your page.
            </p>
            <a 
              href="/admin" 
              className="bg-cyan-400 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-cyan-300 transition-colors"
            >
              Go to Admin Panel
            </a>
          </div>
        </div>
      </ProtectedPage>
    );
  }

  // Convert store data to landing page format
  const landingPageData = {
    coverPhotoUrl: page.coverPhotoUrl,
    displayName: page.displayName,
    links: links,
    socialLinks: socialLinks,
    customButtons: customButtons,
    themeMode: page.themeMode,
    featuredItems: featuredItems,
    tracks: tracks,
    events: events,
    fullSets: fullSets,
  };

  return (
    <ProtectedPage>
      <div className="min-h-screen">
        <LandingPageContent 
          data={landingPageData} 
          themeColor={page.themeColor} 
        />
      </div>
    </ProtectedPage>
  );
}
