import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { userEmail, pageData } = await req.json();

    if (!userEmail || !pageData) {
      return NextResponse.json({ error: 'User email and page data are required' }, { status: 400 });
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find the page
    const existingPage = await prisma.page.findFirst({
      where: { 
        id: pageData.id,
        userId: user.id 
      },
    });

    if (!existingPage) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    // Update the page
    const updatedPage = await prisma.page.update({
      where: { id: pageData.id },
      data: {
        displayName: pageData.displayName,
        slug: pageData.slug,
        themeColor: pageData.themeColor,
        themeMode: pageData.themeMode,
        coverPhotoUrl: pageData.coverPhotoUrl,
        isPublished: pageData.isPublished || false,
      },
    });

    // Update links
    if (pageData.links) {
      // Delete existing links
      await prisma.link.deleteMany({
        where: { pageId: pageData.id },
      });

      // Create new links
      if (pageData.links.length > 0) {
        await prisma.link.createMany({
          data: pageData.links.map((link: any) => ({
            pageId: pageData.id,
            platform: link.platform,
            url: link.url,
            isVisible: link.isVisible,
            order: link.order,
          })),
        });
      }
    }

    // Update social links
    if (pageData.socialLinks) {
      // Delete existing social links
      await prisma.socialLink.deleteMany({
        where: { pageId: pageData.id },
      });

      // Create new social links
      if (pageData.socialLinks.length > 0) {
        await prisma.socialLink.createMany({
          data: pageData.socialLinks.map((social: any) => ({
            pageId: pageData.id,
            platform: social.platform,
            url: social.url,
          })),
        });
      }
    }

    // Update custom buttons
    if (pageData.customButtons) {
      // Delete existing custom buttons
      await prisma.customButton.deleteMany({
        where: { pageId: pageData.id },
      });

      // Create new custom buttons
      if (pageData.customButtons.length > 0) {
        await prisma.customButton.createMany({
          data: pageData.customButtons.map((button: any) => ({
            pageId: pageData.id,
            text: button.text,
            url: button.url,
            order: button.order,
          })),
        });
      }
    }

    // Update tracks
    if (pageData.tracks) {
      // Delete existing tracks
      await prisma.track.deleteMany({
        where: { pageId: pageData.id },
      });

      // Create new tracks
      if (pageData.tracks.length > 0) {
        await prisma.track.createMany({
          data: pageData.tracks.map((track: any) => ({
            pageId: pageData.id,
            name: track.name,
            credits: track.credits,
            artworkUrl: track.artworkUrl,
            order: track.order,
          })),
        });
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Page saved successfully',
      page: updatedPage
    });
  } catch (error) {
    console.error('Error saving page:', error);
    return NextResponse.json({ error: 'Failed to save page' }, { status: 500 });
  }
}
