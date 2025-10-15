'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Mail, User, ArrowRight } from 'lucide-react';

export function Step0Account() {
  const { data, updateData, nextStep } = useOnboardingStore();
  const [email, setEmail] = useState(data.email);
  const [name, setName] = useState(data.name);
  const [isValidating, setIsValidating] = useState(false);

  const handleNext = () => {
    if (email && name) {
      updateData({ email, name });
      nextStep();
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isEmailValid = validateEmail(email);
  const canProceed = email && name && isEmailValid;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="text-5xl mb-4">👤</div>
        <h2 className="text-3xl font-bold text-white mb-2">Create Your Account</h2>
        <p className="text-gray-400">Let's start by setting up your account</p>
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
          🔐 <strong>Secure:</strong> We'll send you a magic link to verify your email. 
          No passwords required!
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-end gap-3 pt-4">
        <Button
          onClick={handleNext}
          disabled={!canProceed}
          size="lg"
          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
        >
          Next: Artist Info →
        </Button>
      </div>
    </div>
  );
}
