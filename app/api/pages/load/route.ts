import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get('userEmail');
    const pageId = searchParams.get('pageId');

    if (!userEmail) {
      return NextResponse.json({ error: 'User email is required' }, { status: 400 });
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // If pageId is provided, load that specific page
    if (pageId) {
      const page = await prisma.page.findFirst({
        where: { 
          id: pageId,
          userId: user.id 
        },
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

      if (!page) {
        return NextResponse.json({ error: 'Page not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, page });
    }

    // Otherwise, load the first page for the user
    const page = await prisma.page.findFirst({
      where: { userId: user.id },
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

    if (!page) {
      return NextResponse.json({ error: 'No pages found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, page });
  } catch (error) {
    console.error('Error loading page:', error);
    return NextResponse.json({ error: 'Failed to load page' }, { status: 500 });
  }
}
