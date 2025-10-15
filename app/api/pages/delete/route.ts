import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pageId = searchParams.get('pageId');

    if (!pageId) {
      return NextResponse.json({ error: 'Page ID is required' }, { status: 400 });
    }

    // Find the page first to check if it exists
    const page = await prisma.page.findUnique({
      where: { id: pageId },
      include: { user: true },
    });

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    // Delete the page (this will cascade delete all related data due to onDelete: Cascade)
    await prisma.page.delete({
      where: { id: pageId },
    });

    return NextResponse.json({ 
      success: true, 
      message: `Page "${page.displayName}" (${page.slug}.theartistt.com) has been deleted successfully` 
    });
  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
  }
}
