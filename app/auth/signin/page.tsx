'use client';

import { signIn, getSession } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowRight } from 'lucide-react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('email', {
        email,
        redirect: false,
      });

      if (result?.ok) {
        setIsEmailSent(true);
      } else {
        console.error('Sign in failed:', result?.error);
      }
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700 shadow-2xl text-center">
            <div className="text-6xl mb-6">📧</div>
            <h1 className="text-3xl font-bold text-white mb-4">Check Your Email</h1>
            <p className="text-gray-400 mb-6">
              We&apos;ve sent a magic link to <strong className="text-cyan-400">{email}</strong>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Click the link in the email to sign in to your account.
            </p>
            <Button
              onClick={() => {
                setIsEmailSent(false);
                setEmail('');
              }}
              variant="outline"
              className="w-full"
            >
              Try Different Email
            </Button>
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
            <div className="text-6xl mb-4">🎵</div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your artist account</p>
          </div>

          <form onSubmit={handleEmailSignIn} className="space-y-6">
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
                  placeholder="your@email.com"
                  className="pl-12 bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !email}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
            >
              {isLoading ? (
                'Sending Magic Link...'
              ) : (
                <>
                  Send Magic Link
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              New to The Artist?{' '}
              <button
                onClick={() => window.location.href = '/onboarding'}
                className="text-cyan-400 hover:text-cyan-300 font-medium"
              >
                Create your account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
