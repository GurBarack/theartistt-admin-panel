import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        pages: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            slug: true,
            displayName: true,
            isPublished: true,
            createdAt: true,
            updatedAt: true,
            themeColor: true,
            coverPhotoUrl: true,
            _count: {
              select: {
                links: true,
                socialLinks: true,
                tracks: true,
                events: true,
                fullSets: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Format the pages data
    const pages = user.pages.map(page => ({
      id: page.id,
      slug: page.slug,
      displayName: page.displayName,
      url: `https://${page.slug}.theartistt.com`,
      isPublished: page.isPublished,
      createdAt: page.createdAt,
      updatedAt: page.updatedAt,
      themeColor: page.themeColor,
      coverPhotoUrl: page.coverPhotoUrl,
      stats: {
        links: page._count.links,
        socialLinks: page._count.socialLinks,
        tracks: page._count.tracks,
        events: page._count.events,
        fullSets: page._count.fullSets,
      },
    }));

    return NextResponse.json({ 
      success: true, 
      pages,
      total: pages.length,
    });
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}
