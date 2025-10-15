import { NextRequest, NextResponse } from 'next/server';
import { generateOTP, storeOTP } from '@/lib/otp';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Generate OTP
    const otp = generateOTP();

    // Store OTP in database
    await storeOTP(email, otp);

    // Return OTP for testing (in production, this would be sent via email)
    return NextResponse.json({
      success: true,
      message: 'OTP generated successfully',
      otp: otp, // Only for testing - remove in production
      note: 'In production, this OTP would be sent to your email'
    });
  } catch (error) {
    console.error('Test OTP error:', error);
    return NextResponse.json(
      { error: 'Failed to generate OTP' },
      { status: 500 }
    );
  }
}
