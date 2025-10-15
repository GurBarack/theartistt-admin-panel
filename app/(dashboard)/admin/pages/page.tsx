'use client';

import { useState, useEffect } from 'react';
import { PageManagement } from '@/components/admin/PageManagement';
import { Sidebar } from '@/components/admin/Sidebar';

export default function PagesPage() {
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    // Get user email from localStorage or session
    // For now, we'll use a simple approach - in a real app, you'd get this from auth
    const email = localStorage.getItem('userEmail') || '';
    setUserEmail(email);
  }, []);

  if (!userEmail) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in</h1>
          <p className="text-gray-400 mb-6">You need to be signed in to manage your pages</p>
          <button
            onClick={() => window.location.href = '/onboarding'}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg"
          >
            Go to Onboarding
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <PageManagement userEmail={userEmail} />
          </div>
        </div>
      </div>
    </div>
  );
}
