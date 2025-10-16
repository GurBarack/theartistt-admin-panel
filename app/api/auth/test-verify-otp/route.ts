import { NextRequest, NextResponse } from 'next/server';
import { testOTPs } from '../test-otp/route';

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    // Check if OTP exists and is valid
    const storedOTP = testOTPs.get(email);
    
    if (!storedOTP) {
      return NextResponse.json(
        { error: 'No OTP found for this email' },
        { status: 400 }
      );
    }

    if (storedOTP.otp !== otp) {
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 400 }
      );
    }

    if (storedOTP.expiresAt < new Date()) {
      testOTPs.delete(email);
      return NextResponse.json(
        { error: 'OTP has expired' },
        { status: 400 }
      );
    }

    // Remove OTP after successful verification
    testOTPs.delete(email);

    // For testing, we'll simulate user creation/verification
    const isNewUser = !email.includes('existing'); // Simple test logic

    return NextResponse.json({
      success: true,
      message: 'OTP verified successfully',
      user: {
        id: 'test-user-' + email,
        email: email,
        name: 'Test User',
        otpVerified: true,
        hasCompletedOnboarding: false, // Always false for testing
      },
      isNewUser,
      redirectPath: '/onboarding', // Redirect to onboarding after signin
    });
  } catch (error) {
    console.error('Test verify OTP error:', error);
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
}
