// import speakeasy from 'speakeasy';
import * as nodemailer from 'nodemailer';
import { prisma } from './prisma';

// Generate 6-digit OTP
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Create email transporter
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
}

// Send OTP via email
export async function sendOTPEmail(email: string, otp: string): Promise<boolean> {
  try {
    // If no email credentials are configured, fall back to console logging
    if (!process.env.EMAIL_SERVER_USER || 
        !process.env.EMAIL_SERVER_PASSWORD || 
        process.env.EMAIL_SERVER_USER === 'your-email@gmail.com' ||
        process.env.EMAIL_SERVER_PASSWORD === 'your-app-password') {
      console.log(`📧 OTP for ${email}: ${otp}`);
      console.log('⚠️  Email credentials not configured. OTP logged to console only.');
      return true;
    }

    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@theartistt.com',
      to: email,
      subject: 'Your Verification Code - The Artist',
      text: `Your verification code is: ${otp}\n\nThis code expires in 10 minutes.\n\nIf you didn't request this code, you can safely ignore this email.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Your Verification Code</h2>
          <p>Enter this 6-digit code to complete your account setup:</p>
          <div style="background: #f5f5f5; border: 2px solid #333; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
            <div style="font-size: 32px; font-weight: bold; color: #333; letter-spacing: 4px; font-family: monospace;">
              ${otp}
            </div>
          </div>
          <p style="color: #666; font-size: 14px;">This code expires in 10 minutes.</p>
          <p style="color: #666; font-size: 14px;">If you didn't request this code, you can safely ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent successfully to ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    // Fallback to console logging if email fails
    console.log(`📧 OTP for ${email}: ${otp}`);
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
