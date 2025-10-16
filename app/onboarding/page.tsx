'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { WelcomeScreen } from '@/components/onboarding/WelcomeScreen';
import { Step0Account } from '@/components/onboarding/Step0Account';
import { Step1Identity } from '@/components/onboarding/Step1Identity';
import { Step2Sound } from '@/components/onboarding/Step2Sound';
import { Step3Platforms } from '@/components/onboarding/Step3Platforms';
import { Step4Visual } from '@/components/onboarding/Step4Visual';
import { Step5Review } from '@/components/onboarding/Step5Review';
import { OnboardingProgress } from '@/components/onboarding/OnboardingProgress';

export default function OnboardingPage() {
  const { currentStep } = useOnboardingStore();
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to signin if not authenticated
  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading

    if (!session) {
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  // Show loading while checking session
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Welcome Screen */}
        {currentStep === 0 && (
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-12 border border-gray-700 shadow-2xl">
            <WelcomeScreen />
          </div>
        )}

        {/* Onboarding Steps */}
        {currentStep > 0 && (
          <>
            {/* Progress Bar */}
            <OnboardingProgress currentStep={currentStep} totalSteps={6} />

            {/* Step Content */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 mt-8 border border-gray-700 shadow-2xl">
              {currentStep === 1 && <Step0Account />}
              {currentStep === 2 && <Step1Identity />}
              {currentStep === 3 && <Step2Sound />}
              {currentStep === 4 && <Step3Platforms />}
              {currentStep === 5 && <Step4Visual />}
              {currentStep === 6 && <Step5Review />}
            </div>

            {/* Footer */}
            <p className="text-center text-gray-500 text-sm mt-6">
              Step {currentStep} of 6 • Takes about 5 minutes
            </p>
          </>
        )}
      </div>
    </div>
  );
}
