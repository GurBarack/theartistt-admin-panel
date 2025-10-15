import speakeasy from 'speakeasy';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';

// Generate 6-digit OTP
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Create email transporter
function createTransporter() {
  return nodemailer.createTransporter({
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
    if (!process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD) {
      console.log(`📧 OTP for ${email}: ${otp}`);
      console.log('⚠️  Email credentials not configured. OTP logged to console only.');
      return true;
    }

    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@theartistt.com',
      to: email,
      subject: 'Your The Artist Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #06b6d4; font-size: 32px; margin: 0;">🎵 The Artist</h1>
            <p style="color: #6b7280; font-size: 18px; margin: 10px 0 0 0;">Your Music, Your Brand, One Link</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 16px; padding: 40px; text-align: center; margin-bottom: 30px;">
            <h2 style="color: white; font-size: 24px; margin: 0 0 20px 0;">Verify Your Account</h2>
            <p style="color: #94a3b8; font-size: 16px; margin: 0 0 30px 0;">
              Enter this 6-digit code to complete your account setup:
            </p>
            
            <div style="background: #1e293b; border: 2px solid #06b6d4; border-radius: 12px; padding: 20px; margin: 20px 0;">
              <div style="font-size: 36px; font-weight: bold; color: #06b6d4; letter-spacing: 8px; font-family: monospace;">
                ${otp}
              </div>
            </div>
            
            <p style="color: #94a3b8; font-size: 14px; margin: 20px 0 0 0;">
              This code expires in 10 minutes
            </p>
          </div>
          
          <div style="text-align: center; color: #6b7280; font-size: 14px;">
            <p>If you didn't request this code, you can safely ignore this email.</p>
            <p style="margin-top: 20px;">
              <a href="https://theartistt.com" style="color: #06b6d4; text-decoration: none;">Visit The Artist</a>
            </p>
          </div>
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
