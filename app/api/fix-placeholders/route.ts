import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Update all tracks that have placeholder-album.jpg to use placeholder-album.svg
    const updatedTracks = await prisma.track.updateMany({
      where: {
        artworkUrl: '/placeholder-album.jpg'
      },
      data: {
        artworkUrl: '/placeholder-album.svg'
      }
    });

    // Also update any other content that might reference the old placeholder
    const updatedFeaturedItems = await prisma.featuredItem.updateMany({
      where: {
        imageUrl: '/placeholder-album.jpg'
      },
      data: {
        imageUrl: '/placeholder-album.svg'
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: `Updated ${updatedTracks.count} tracks and ${updatedFeaturedItems.count} featured items`,
      updatedTracks: updatedTracks.count,
      updatedFeaturedItems: updatedFeaturedItems.count
    });
  } catch (error) {
    console.error('Error fixing placeholders:', error);
    return NextResponse.json({ error: 'Failed to fix placeholders' }, { status: 500 });
  }
}
