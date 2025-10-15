import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      include: {
        pages: {
          select: {
            id: true,
            displayName: true,
            slug: true,
            createdAt: true,
          }
        }
      }
    });

    const allPages = await prisma.page.findMany({
      select: {
        id: true,
        displayName: true,
        slug: true,
        userId: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ 
      success: true, 
      users,
      allPages
    });
  } catch (error) {
    console.error('Error fetching debug data:', error);
    return NextResponse.json({ error: 'Failed to fetch debug data' }, { status: 500 });
  }
}
