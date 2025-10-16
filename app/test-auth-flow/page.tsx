'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Shield, Check } from 'lucide-react';

export default function TestAuthFlowPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Check if user is already authenticated
  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading

    if (session) {
      // User is already authenticated, redirect to appropriate page
      router.push('/onboarding');
    }
  }, [session, status, router]);

  // Show loading while checking session
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Don't render if user is authenticated (will redirect)
  if (session) {
    return null;
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/test-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedOtp(data.otp);
        setIsNewUser(true);
        setIsEmailSent(true);
      } else {
        console.error('Failed to send OTP');
        alert('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Error sending OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) return;

    setIsLoading(true);
    try {
      // First verify the OTP
      const response = await fetch('/api/auth/test-verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        const data = await response.json();
        setOtpVerified(true);
        setIsNewUser(data.isNewUser);
        
        // Sign in with NextAuth using the OTP test provider
        const result = await signIn('otp-test', {
          email: email,
          otp: otp,
          redirect: false,
        });

        if (result?.ok) {
          alert('✅ Successfully signed in! You can now access protected pages.');
          // Redirect to onboarding
          window.location.href = '/onboarding';
        } else {
          console.error('Sign in failed:', result?.error);
          alert('Sign in failed. Please try again.');
        }
      } else {
        const errorData = await response.json();
        console.error('OTP verification failed:', errorData.error);
        alert(`OTP verification failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Error verifying OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (otpVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700 shadow-2xl text-center">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-3xl font-bold text-white mb-4">
              {isNewUser ? 'Welcome!' : 'Welcome Back!'}
            </h1>
            <p className="text-gray-400 mb-6">
              {isNewUser 
                ? 'Your account has been created and verified successfully'
                : 'You have been signed in successfully'
              }
            </p>
            <div className="flex items-center justify-center gap-2 text-green-400">
              <Check className="w-5 h-5" />
              <span>Redirecting you now...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🔐</div>
              <h1 className="text-3xl font-bold text-white mb-2">Verify Your Email</h1>
              <p className="text-gray-400">Enter the 6-digit code sent to</p>
              <p className="text-cyan-400 font-mono">{email}</p>
            </div>

            {/* Test Mode - Show OTP */}
            {generatedOtp && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                <p className="text-yellow-400 text-sm mb-2">
                  🧪 <strong>Test Mode:</strong> Use this OTP:
                </p>
                <div className="bg-gray-900 border border-yellow-500/50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-mono text-yellow-400 tracking-widest">
                    {generatedOtp}
                  </div>
                </div>
              </div>
            )}

            {/* OTP Input */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="otp" className="text-gray-300 text-base mb-2 block">
                  Verification Code *
                </Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="123456"
                    className="pl-12 text-2xl h-16 text-center font-mono bg-gray-900 border-gray-600 text-white placeholder:text-gray-500 tracking-widest"
                    maxLength={6}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {otp.length}/6 digits
                </p>
              </div>

              {/* Navigation */}
              <div className="flex justify-between gap-3 pt-4">
                <Button
                  onClick={() => {
                    setIsEmailSent(false);
                    setOtp('');
                    setGeneratedOtp('');
                  }}
                  variant="outline"
                  size="lg"
                >
                  ← Back
                </Button>
                <Button
                  onClick={handleVerifyOTP}
                  disabled={otp.length !== 6 || isLoading}
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
                >
                  {isLoading ? 'Verifying...' : 'Verify & Sign In →'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🧪</div>
            <h1 className="text-3xl font-bold text-white mb-2">Test Auth Flow</h1>
            <p className="text-gray-400">Test the seamless authentication flow</p>
          </div>

          <form onSubmit={handleSendOTP} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-gray-300 text-sm mb-2 block">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="test@example.com"
                  className="pl-12 bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                  required
                />
              </div>
              {email && !validateEmail(email) && (
                <p className="text-red-400 text-sm mt-1">
                  Please enter a valid email address
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading || !email || !validateEmail(email)}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
            >
              {isLoading ? 'Sending Code...' : 'Send Test OTP'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              This is a test page to verify the authentication flow works correctly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
