import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // This is just for debugging - in production you'd want to secure this
    return NextResponse.json({
      message: 'Debug endpoint - check browser localStorage for onboarding data',
      instructions: 'Open browser dev tools, go to Application > Local Storage, and check the "onboarding-storage" key'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Debug failed' }, { status: 500 });
  }
}
