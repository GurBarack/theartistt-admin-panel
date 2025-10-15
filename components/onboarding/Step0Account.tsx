'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Mail, User, Shield, ArrowRight, Check } from 'lucide-react';

export function Step0Account() {
  const { data, updateData, nextStep } = useOnboardingStore();
  const [email, setEmail] = useState(data.email);
  const [name, setName] = useState(data.name);
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'info' | 'otp'>('info');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendOTP = async () => {
    if (!email || !name || !validateEmail(email)) return;

    setIsLoading(true);
    try {
      // Try real email first, fallback to test mode
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setOtpSent(true);
        setStep('otp');
      } else {
        // Fallback to test mode
        const testResponse = await fetch('/api/auth/test-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        if (testResponse.ok) {
          const data = await testResponse.json();
          setGeneratedOtp(data.otp);
          setOtpSent(true);
          setStep('otp');
        } else {
          console.error('Failed to generate OTP');
        }
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        setOtpVerified(true);
        updateData({ email, name });
        setTimeout(() => nextStep(), 1000);
      } else {
        console.error('Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isEmailValid = validateEmail(email);
  const canSendOTP = email && name && isEmailValid;
  const canVerifyOTP = otp.length === 6;

  if (otpVerified) {
    return (
      <div className="space-y-6 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-3xl font-bold text-white mb-2">Account Verified!</h2>
        <p className="text-gray-400">Your email has been verified successfully</p>
        <div className="flex items-center justify-center gap-2 text-green-400">
          <Check className="w-5 h-5" />
          <span>Proceeding to next step...</span>
        </div>
      </div>
    );
  }

  if (step === 'otp') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="text-5xl mb-4">🔐</div>
          <h2 className="text-3xl font-bold text-white mb-2">Verify Your Email</h2>
          <p className="text-gray-400">Enter the 6-digit code sent to</p>
          <p className="text-cyan-400 font-mono">{email}</p>
        </div>

        {/* Test Mode - Show OTP */}
        {generatedOtp && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
            <p className="text-yellow-400 text-sm mb-2">
              🧪 <strong>Test Mode:</strong> Email not configured. Use this OTP:
            </p>
            <div className="bg-gray-900 border border-yellow-500/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-mono text-yellow-400 tracking-widest">
                {generatedOtp}
              </div>
            </div>
          </div>
        )}

        {/* OTP Input */}
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

        {/* Info Box */}
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
          <p className="text-purple-400 text-sm">
            📧 <strong>Check your email:</strong> The code expires in 10 minutes
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-3 pt-4">
          <Button
            onClick={() => setStep('info')}
            variant="outline"
            size="lg"
          >
            ← Back
          </Button>
          <Button
            onClick={handleVerifyOTP}
            disabled={!canVerifyOTP || isLoading}
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
          >
            {isLoading ? 'Verifying...' : 'Verify & Continue →'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="text-5xl mb-4">👤</div>
        <h2 className="text-3xl font-bold text-white mb-2">Create Your Account</h2>
        <p className="text-gray-400">Let&apos;s start by setting up your account</p>
      </div>

      {/* Email Input */}
      <div>
        <Label htmlFor="email" className="text-gray-300 text-base mb-2 block">
          Email Address *
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="pl-12 text-lg h-14 bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
            required
          />
        </div>
        {email && !isEmailValid && (
          <p className="text-red-400 text-sm mt-1">
            Please enter a valid email address
          </p>
        )}
      </div>

      {/* Name Input */}
      <div>
        <Label htmlFor="name" className="text-gray-300 text-base mb-2 block">
          Full Name *
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className="pl-12 text-lg h-14 bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
            required
          />
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
        <p className="text-cyan-400 text-sm">
          🔐 <strong>Secure:</strong> We&apos;ll send you a 6-digit code to verify your email. 
          No passwords required!
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-end gap-3 pt-4">
        <Button
          onClick={handleSendOTP}
          disabled={!canSendOTP || isLoading}
          size="lg"
          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
        >
          {isLoading ? 'Sending Code...' : 'Send Verification Code →'}
        </Button>
      </div>
    </div>
  );
}
