import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { uploadBase64ToBlob } from '@/lib/blob';

export async function POST(req: NextRequest) {
  try {
    const { userEmail, pageData } = await req.json();

    console.log('💾 Save API - Received request:', { 
      userEmail, 
      pageDataId: pageData?.id,
      displayName: pageData?.displayName,
      themeColor: pageData?.themeColor,
      featuredItemsCount: pageData?.featuredItems?.length || 0
    });

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

    // Handle cover photo upload if it's a new base64 image
    let finalCoverPhotoUrl = pageData.coverPhotoUrl;
    if (pageData.coverPhotoUrl && pageData.coverPhotoUrl.startsWith('data:')) {
      try {
        console.log('📸 Uploading new cover photo to blob storage...');
        finalCoverPhotoUrl = await uploadBase64ToBlob(
          pageData.coverPhotoUrl, 
          `${pageData.slug}-cover-${Date.now()}.jpg`
        );
        console.log('✅ Cover photo uploaded:', finalCoverPhotoUrl);
      } catch (error) {
        console.error('❌ Failed to upload cover photo:', error);
        // Keep the existing cover photo if upload fails
      }
    }

    // Update the page
    const updatedPage = await prisma.page.update({
      where: { id: pageData.id },
      data: {
        displayName: pageData.displayName,
        slug: pageData.slug,
        themeColor: pageData.themeColor,
        themeMode: pageData.themeMode,
        coverPhotoUrl: finalCoverPhotoUrl,
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
          data: pageData.links.map((link: { platform: string; url: string; isVisible: boolean; order: number }) => ({
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
          data: pageData.socialLinks.map((social: { platform: string; url: string; isVisible: boolean; order: number }) => ({
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
          data: pageData.customButtons.map((button: { text: string; url: string; isVisible: boolean; order: number }) => ({
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
        const validTracks = pageData.tracks.filter((track: { title: string; url: string; artworkUrl?: string }) => 
          track.name && track.name.trim() !== ''
        );
        
        if (validTracks.length > 0) {
          await prisma.track.createMany({
            data: validTracks.map((track: { title: string; url: string; artworkUrl?: string }) => ({
              pageId: pageData.id,
              name: track.name,
              credits: track.credits,
              artworkUrl: track.artworkUrl,
              spotifyUrl: track.spotifyUrl || null,
              appleMusicUrl: track.appleMusicUrl || null,
              beatportUrl: track.beatportUrl || null,
              youtubeUrl: track.youtubeUrl || null,
              youtubeMusicUrl: track.youtubeMusicUrl || null,
              soundcloudUrl: track.soundcloudUrl || null,
              order: track.order,
            })),
          });
        }
      }
    }

    // Update featured items
    if (pageData.featuredItems) {
      // Delete existing featured items
      await prisma.featuredItem.deleteMany({
        where: { pageId: pageData.id },
      });

      // Create new featured items
      if (pageData.featuredItems.length > 0) {
        const validFeaturedItems = pageData.featuredItems.filter((item: { title: string; url: string; thumbnailUrl?: string }) => 
          item.title && item.title.trim() !== ''
        );
        
        if (validFeaturedItems.length > 0) {
          await prisma.featuredItem.createMany({
            data: validFeaturedItems.map((item: { title: string; url: string; thumbnailUrl?: string }) => ({
              pageId: pageData.id,
              title: item.title,
              subtitle: item.subtitle,
              imageUrl: item.imageUrl,
              ctaUrl: item.ctaUrl,
              order: item.order,
            })),
          });
        }
      }
    }

    // Update events
    if (pageData.events) {
      // Delete existing events
      await prisma.event.deleteMany({
        where: { pageId: pageData.id },
      });

      // Create new events
      if (pageData.events.length > 0) {
        const validEvents = pageData.events.filter((event: { title: string; date: string }) => 
          event.name && event.name.trim() !== '' && event.date
        );
        
        if (validEvents.length > 0) {
          await prisma.event.createMany({
            data: validEvents.map((event: { title: string; date: string; location?: string; url?: string }) => {
              // Parse date safely
              let eventDate;
              try {
                eventDate = new Date(event.date);
                // Check if date is valid and not in the far future (invalid dates)
                if (isNaN(eventDate.getTime()) || eventDate.getFullYear() > 2100) {
                  console.log('Invalid date for event:', event.date);
                  eventDate = new Date(); // Use current date as fallback
                }
              } catch (error) {
                console.log('Date parsing error for event:', event.date, error);
                eventDate = new Date(); // Use current date as fallback
              }
              
              return {
                pageId: pageData.id,
                title: event.name, // Map name to title for Prisma schema
                date: eventDate,
                location: event.location || '',
                url: event.ticketUrl || '',
                order: event.order,
              };
            }),
          });
        }
      }
    }

    // Update full sets
    if (pageData.fullSets) {
      // Delete existing full sets
      await prisma.fullSet.deleteMany({
        where: { pageId: pageData.id },
      });

      // Create new full sets
      if (pageData.fullSets.length > 0) {
        console.log('🎵 Full Sets - Processing:', pageData.fullSets.length, 'sets');
        const validFullSets = pageData.fullSets.filter((set: { title: string; url: string }) => 
          set.name && set.name.trim() !== ''
        );
        
        console.log('🎵 Full Sets - Valid sets:', validFullSets.length);
        
        if (validFullSets.length > 0) {
          const fullSetData = validFullSets.map((set: { title: string; url: string; thumbnailUrl?: string; date?: string; location?: string; spotifyUrl?: string; appleMusicUrl?: string; beatportUrl?: string; youtubeUrl?: string; youtubeMusicUrl?: string; soundcloudUrl?: string }) => ({
            pageId: pageData.id,
            title: set.name, // Map name to title for Prisma schema
            url: set.url || '',
            thumbnailUrl: set.thumbnailUrl || null,
            date: set.date || null,
            location: set.location || null,
            order: set.order,
            spotifyUrl: set.spotifyUrl || null,
            appleMusicUrl: set.appleMusicUrl || null,
            beatportUrl: set.beatportUrl || null,
            youtubeUrl: set.youtubeUrl || null,
            youtubeMusicUrl: set.youtubeMusicUrl || null,
            soundcloudUrl: set.soundcloudUrl || null,
          }));
          
          console.log('🎵 Full Sets - Data to save:', fullSetData);
          
          await prisma.fullSet.createMany({
            data: fullSetData,
          });
        }
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
