import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ hasCompletedOnboarding: false }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true } // Only select fields that exist
    });

    if (!user) {
      return NextResponse.json({ hasCompletedOnboarding: false }, { status: 404 });
    }

    // For now, always return false since we can't check the field
    return NextResponse.json({ hasCompletedOnboarding: false });
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return NextResponse.json({ hasCompletedOnboarding: false }, { status: 500 });
  }
}
