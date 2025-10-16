'use client';

import { useOnboardingStore } from '@/stores/onboardingStore';

export default function TestOnboardingPage() {
  const { data, currentStep, isComplete } = useOnboardingStore();

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Onboarding Store Debug</h1>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Current State</h2>
          <div className="space-y-2 text-gray-300">
            <p><strong>Current Step:</strong> {currentStep}</p>
            <p><strong>Is Complete:</strong> {isComplete ? 'Yes' : 'No'}</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Stored Data</h2>
          <pre className="text-gray-300 text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
