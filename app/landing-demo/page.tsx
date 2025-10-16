'use client';

import { LandingPageContent } from '@/components/landing';
import { sampleLandingData } from '@/data/sampleLandingData';
import { ProtectedPage } from '@/components/auth/ProtectedPage';

export default function LandingDemoPage() {
  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gray-950">
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-white">Landing Page Components Demo</h1>
            <p className="text-gray-400 mt-1">Interactive preview of all landing page sections</p>
          </div>
        </header>

        {/* Landing Page Content */}
        <LandingPageContent 
          data={sampleLandingData} 
          themeColor="cyan" 
        />

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 px-6 py-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-400">Landing Page Components Demo</p>
          </div>
        </footer>
      </div>
    </ProtectedPage>
  );
}
