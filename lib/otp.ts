import speakeasy from 'speakeasy';
import { prisma } from './prisma';

// Generate 6-digit OTP
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via email (simplified - in production use proper email service)
export async function sendOTPEmail(email: string, otp: string): Promise<boolean> {
  try {
    // In production, integrate with email service like SendGrid, Resend, etc.
    console.log(`📧 OTP for ${email}: ${otp}`);
    
    // For now, just log to console
    // In production, replace with actual email sending
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return false;
  }
}

// Store OTP in database
export async function storeOTP(email: string, otp: string): Promise<void> {
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
  
  await prisma.otpVerification.create({
    data: {
      email,
      otpCode: otp,
      expiresAt,
    },
  });
}

// Verify OTP
export async function verifyOTP(email: string, otp: string): Promise<boolean> {
  const otpRecord = await prisma.otpVerification.findFirst({
    where: {
      email,
      otpCode: otp,
      verified: false,
      expiresAt: {
        gt: new Date(), // Not expired
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!otpRecord) {
    return false;
  }

  // Mark as verified
  await prisma.otpVerification.update({
    where: { id: otpRecord.id },
    data: { verified: true },
  });

  return true;
}

// Clean up expired OTPs
export async function cleanupExpiredOTPs(): Promise<void> {
  await prisma.otpVerification.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });
}
