import { NextRequest, NextResponse } from 'next/server';
import { generateOTP, sendOTPEmail, storeOTP, cleanupExpiredOTPs } from '@/lib/otp';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Clean up expired OTPs
    await cleanupExpiredOTPs();

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true } // Only select fields that exist
    });

    // Generate OTP
    const otp = generateOTP();

    // Send OTP email
    const emailSent = await sendOTPEmail(email, otp);
    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send OTP email' },
        { status: 500 }
      );
    }

    // Store OTP in database
    await storeOTP(email, otp);

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      isNewUser: !existingUser,
      hasCompletedOnboarding: false, // Default to false since field doesn't exist yet
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}
