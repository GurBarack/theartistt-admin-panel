import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { LandingPageContent } from '@/components/landing/LandingPageContent';

// Get page data from database
async function getPageBySlug(slug: string) {
  const page = await prisma.page.findUnique({
    where: { slug },
    include: {
      links: { orderBy: { order: 'asc' } },
      socialLinks: true,
      customButtons: { orderBy: { order: 'asc' } },
      featuredItems: { orderBy: { order: 'asc' } },
      tracks: { orderBy: { order: 'asc' } },
      events: { orderBy: { order: 'asc' } },
      fullSets: { orderBy: { order: 'asc' } },
    },
  });
  
  return page;
}

export default async function ArtistPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page || !page.isPublished) {
    notFound();
  }

  // Convert database data to landing page format
  const landingData = {
    artistName: page.displayName,
    coverPhotoUrl: page.coverPhotoUrl || '',
    themeColor: page.themeColor,
    themeMode: page.themeMode,
    links: page.links.map(link => ({
      id: link.id,
      platform: link.platform as 'spotify' | 'apple-music' | 'soundcloud' | 'beatport' | 'youtube' | 'youtube-music',
      url: link.url,
      isVisible: link.isVisible,
      order: link.order,
    })),
    socialLinks: page.socialLinks.map(social => ({
      id: social.id,
      platform: social.platform as 'instagram' | 'facebook' | 'tiktok',
      url: social.url,
    })),
    customButtons: page.customButtons.map(button => ({
      id: button.id,
      text: button.text,
      url: button.url,
      order: button.order,
    })),
    featuredItems: page.featuredItems.map(item => ({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle || '',
      imageUrl: item.imageUrl || '',
      ctaUrl: item.ctaUrl || '',
      order: item.order,
    })),
    tracks: page.tracks.map(track => ({
      id: track.id,
      name: track.name,
      credits: track.credits || '',
      artworkUrl: track.artworkUrl || '',
      order: track.order,
    })),
    events: page.events.map(event => ({
      id: event.id,
      title: event.title,
      date: event.date,
      location: event.location || '',
      url: event.url || '',
      order: event.order,
    })),
    fullSets: page.fullSets.map(set => ({
      id: set.id,
      title: set.title,
      url: set.url,
      order: set.order,
    })),
  };

  return (
    <div className={`min-h-screen ${page.themeMode === 'light' ? 'bg-white text-gray-900' : 'bg-gray-950 text-white'}`}>
      <LandingPageContent data={landingData} />
    </div>
  );
}
