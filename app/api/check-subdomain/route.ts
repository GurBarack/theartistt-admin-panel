import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  // Validate slug format
  const slugRegex = /^[a-z0-9-]{3,30}$/;
  if (!slugRegex.test(slug)) {
    return NextResponse.json({ available: false, reason: 'Invalid format' });
  }

  try {
    // Check if slug exists
    const existingPage = await prisma.page.findUnique({
      where: { slug },
    });

    return NextResponse.json({
      available: !existingPage,
      slug,
    });
  } catch (error) {
    console.error('Error checking subdomain:', error);
    return NextResponse.json(
      { error: 'Failed to check availability' },
      { status: 500 }
    );
  }
}
