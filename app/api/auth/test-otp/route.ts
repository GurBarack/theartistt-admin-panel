import { NextRequest, NextResponse } from 'next/server';
import { generateOTP } from '@/lib/otp';

// In-memory storage for testing (replace with database in production)
const testOTPs = new Map<string, { otp: string; expiresAt: Date }>();

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
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP in memory for testing
    testOTPs.set(email, { otp, expiresAt });

    // Clean up expired OTPs
    for (const [key, value] of testOTPs.entries()) {
      if (value.expiresAt < new Date()) {
        testOTPs.delete(key);
      }
    }

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

// Export the testOTPs map for verification
export { testOTPs };
