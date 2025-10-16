import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Create a test page in the database
    const page = await prisma.page.create({
      data: {
        slug: 'demo-artist',
        displayName: 'Test Artist',
        isPublished: true,
        themeMode: 'dark',
        themeColor: 'cyan',
        coverPhotoUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
        // Add some sample content
        links: {
          create: [
            {
              platform: 'spotify',
              url: 'https://open.spotify.com/artist/test',
              isVisible: true,
              order: 0,
            },
            {
              platform: 'apple-music',
              url: 'https://music.apple.com/artist/test',
              isVisible: true,
              order: 1,
            },
          ],
        },
        socialLinks: {
          create: [
            {
              platform: 'instagram',
              url: 'https://instagram.com/testartist',
            },
            {
              platform: 'tiktok',
              url: 'https://tiktok.com/@testartist',
            },
          ],
        },
        tracks: {
          create: [
            {
              name: 'Midnight Vibes',
              credits: 'Produced by Test Artist',
              artworkUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
              order: 0,
              spotifyUrl: 'https://open.spotify.com/track/test1',
              appleMusicUrl: 'https://music.apple.com/track/test1',
              soundcloudUrl: 'https://soundcloud.com/testartist/midnight-vibes',
            },
          ],
        },
        fullSets: {
          create: [
            {
              title: 'Summer Festival Set 2024',
              url: 'https://example.com/set1',
              thumbnailUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
              date: '2024-07-15',
              location: 'Coachella Valley',
              order: 0,
              spotifyUrl: 'https://open.spotify.com/playlist/summer-festival-2024',
              appleMusicUrl: 'https://music.apple.com/playlist/summer-festival-2024',
              beatportUrl: 'https://beatport.com/playlist/summer-festival-2024',
              youtubeUrl: 'https://youtube.com/watch?v=summer-festival-2024',
              soundcloudUrl: 'https://soundcloud.com/testartist/summer-festival-set-2024',
            },
            {
              title: 'Underground Club Mix',
              url: 'https://example.com/set2',
              thumbnailUrl: 'https://images.unsplash.com/photo-1571266028243-e4730b0b7a0b',
              date: '2024-08-20',
              location: 'Berlin',
              order: 1,
              spotifyUrl: 'https://open.spotify.com/playlist/underground-club-mix',
              youtubeUrl: 'https://youtube.com/watch?v=underground-club-mix',
              soundcloudUrl: 'https://soundcloud.com/testartist/underground-club-mix',
            },
          ],
        },
      },
    });

    return NextResponse.json({ 
      success: true, 
      page,
      url: `https://${page.slug}.theartistt.com`
    });
  } catch (error) {
    console.error('Error creating test page:', error);
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
  }
}
