'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Mail, User, ArrowRight, Check } from 'lucide-react';

export function Step0Account() {
  const { data, updateData, nextStep } = useOnboardingStore();
  const { data: session } = useSession();
  const [email, setEmail] = useState(data.email || '');
  const [name, setName] = useState(data.name || '');
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Pre-fill email from session if available
  useEffect(() => {
    if (session?.user?.email && !email) {
      setEmail(session.user.email);
    }
  }, [session, email]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!email || !name || !validateEmail(email)) return;

    setIsLoading(true);
    try {
      // Update the onboarding data with user info
      updateData({ email, name });
      setIsCompleted(true);
      
      // Move to next step after a brief delay
      setTimeout(() => nextStep(), 1000);
    } catch (error) {
      console.error('Error saving account info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isEmailValid = validateEmail(email);
  const canSubmit = email && name && isEmailValid;

  if (isCompleted) {
    return (
      <div className="space-y-6 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-3xl font-bold text-white mb-2">Account Info Saved!</h2>
        <p className="text-gray-400">Your account information has been saved successfully</p>
        <div className="flex items-center justify-center gap-2 text-green-400">
          <Check className="w-5 h-5" />
          <span>Proceeding to next step...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="text-5xl mb-4">👤</div>
        <h2 className="text-3xl font-bold text-white mb-2">Complete Your Profile</h2>
        <p className="text-gray-400">Let&apos;s finish setting up your account</p>
      </div>

      {/* Email Input (Read-only since user is already authenticated) */}
      <div>
        <Label htmlFor="email" className="text-gray-300 text-base mb-2 block">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="email"
            type="email"
            value={email}
            className="pl-12 text-lg h-14 bg-gray-800 border-gray-600 text-gray-300 cursor-not-allowed"
            readOnly
          />
        </div>
        <p className="text-gray-500 text-sm mt-1">
          ✓ Email verified and authenticated
        </p>
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
      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
        <p className="text-green-400 text-sm">
          ✅ <strong>Already Authenticated:</strong> Your email has been verified. 
          Just add your name to continue!
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-end gap-3 pt-4">
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit || isLoading}
          size="lg"
          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
        >
          {isLoading ? 'Saving...' : 'Continue →'}
        </Button>
      </div>
    </div>
  );
}
