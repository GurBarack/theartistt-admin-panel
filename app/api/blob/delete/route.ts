import { NextRequest, NextResponse } from 'next/server';
import { del } from '@vercel/blob';

export async function DELETE(req: NextRequest) {
  try {
    const { url } = await req.json();
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    await del(url);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blob:', error);
    return NextResponse.json(
      { error: 'Failed to delete blob' },
      { status: 500 }
    );
  }
}
