import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      artistName, 
      slug, 
      genre, 
      bio, 
      themeColor, 
      themeMode, 
      coverPhotoUrl, 
      socialLinks, 
      tracks 
    } = body;

    // Validate required fields
    if (!artistName || !slug) {
      return NextResponse.json(
        { error: 'Artist name and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug is already taken
    const existingPage = await prisma.page.findUnique({
      where: { slug },
    });

    if (existingPage) {
      return NextResponse.json(
        { error: 'This subdomain is already taken' },
        { status: 400 }
      );
    }

    // Create the page
    const page = await prisma.page.create({
      data: {
        slug,
        displayName: artistName,
        genre: genre || '',
        bio: bio || '',
        themeColor: themeColor || 'cyan',
        themeMode: themeMode || 'dark',
        coverPhotoUrl: coverPhotoUrl || null,
        isPublished: true,
      },
    });

    // Create social links
    if (socialLinks) {
      for (const [platform, url] of Object.entries(socialLinks)) {
        if (url && typeof url === 'string' && url.trim()) {
          await prisma.socialLink.create({
            data: {
              pageId: page.id,
              platform: platform as 'instagram' | 'facebook' | 'tiktok',
              url: url.trim(),
            },
          });
        }
      }
    }

    // Import tracks
    if (tracks && Array.isArray(tracks) && tracks.length > 0) {
      for (const track of tracks) {
        await prisma.track.create({
          data: {
            pageId: page.id,
            name: track.name || 'Untitled Track',
            credits: track.credits || '',
            artworkUrl: track.artworkUrl || null,
            order: track.order || 0,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      page,
      url: `https://${slug}.theartistt.com`,
    });
  } catch (error) {
    console.error('Onboarding completion error:', error);
    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    );
  }
}
