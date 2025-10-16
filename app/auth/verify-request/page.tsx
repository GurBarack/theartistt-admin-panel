'use client';

import { Button } from '@/components/ui/button';
import { Mail, ArrowLeft } from 'lucide-react';

export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700 shadow-2xl text-center">
          <div className="text-6xl mb-6">📧</div>
          <h1 className="text-3xl font-bold text-white mb-4">Check Your Email</h1>
          <p className="text-gray-400 mb-6">
            We&apos;ve sent you a magic link to sign in to your account.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Click the link in the email to continue. The link will expire in 24 hours.
          </p>
          
          <div className="space-y-4">
            <Button
              onClick={() => window.location.href = '/auth/signin'}
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </Button>
            
            <Button
              onClick={() => window.location.href = '/onboarding'}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
            >
              <Mail className="w-4 h-4 mr-2" />
              Create New Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
