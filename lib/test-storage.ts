// In-memory storage for testing OTPs
// This is a simple solution for development/testing only
// In production, use a proper database or Redis

export const testOTPs = new Map<string, { otp: string; expiresAt: Date }>();

export function storeTestOTP(email: string, otp: string, expiresAt: Date) {
  testOTPs.set(email, { otp, expiresAt });
}

export function getTestOTP(email: string) {
  return testOTPs.get(email);
}

export function deleteTestOTP(email: string) {
  testOTPs.delete(email);
}

export function cleanupExpiredOTPs() {
  for (const [key, value] of testOTPs.entries()) {
    if (value.expiresAt < new Date()) {
      testOTPs.delete(key);
    }
  }
}
