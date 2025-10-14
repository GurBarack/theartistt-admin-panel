import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Mock page creation - replace with actual database call
    const page = {
      slug: 'test-artist',
      subdomain: 'test-artist',
      displayName: 'Test Artist',
      userId: 'test-user-id',
      isPublished: true,
      themeColor: 'cyan',
      themeMode: 'dark',
    };

    return NextResponse.json({ 
      success: true, 
      page,
      url: `https://${page.slug}.theartistt.com`
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
  }
}
