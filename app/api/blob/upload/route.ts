import { NextRequest, NextResponse } from 'next/server';
import { uploadBase64ToBlob } from '@/lib/blob';

export async function POST(request: NextRequest) {
  try {
    const { base64String, filename } = await request.json();

    if (!base64String || !filename) {
      return NextResponse.json({ error: 'Base64 string and filename are required' }, { status: 400 });
    }

    const url = await uploadBase64ToBlob(base64String, filename);
    
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Failed to upload blob:', error);
    return NextResponse.json({ error: 'Failed to upload blob' }, { status: 500 });
  }
}
