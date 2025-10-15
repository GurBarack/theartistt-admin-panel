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
