import { NextRequest, NextResponse } from 'next/server';
import { verifyOTP } from '@/lib/otp';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    // Verify OTP
    const isValid = await verifyOTP(email, otp);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid or expired OTP' },
        { status: 400 }
      );
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email },
    });

    const isNewUser = !user;

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          email,
          otpVerified: true,
        },
      });
    } else {
      // Update existing user as verified
      user = await prisma.user.update({
        where: { id: user.id },
        data: { otpVerified: true },
      });
    }

    // For now, always redirect to onboarding since we can't check hasCompletedOnboarding
    let redirectPath = '/onboarding';

    return NextResponse.json({
      success: true,
      message: 'OTP verified successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        otpVerified: user.otpVerified,
        hasCompletedOnboarding: false, // Default to false since field doesn't exist yet
      },
      isNewUser,
      redirectPath,
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
}
