'use client';

import { useOnboardingStore } from '@/stores/onboardingStore';
import { WelcomeScreen } from '@/components/onboarding/WelcomeScreen';
import { Step1Identity } from '@/components/onboarding/Step1Identity';
import { Step2Sound } from '@/components/onboarding/Step2Sound';
import { Step3Platforms } from '@/components/onboarding/Step3Platforms';
import { Step4Visual } from '@/components/onboarding/Step4Visual';
import { Step5Review } from '@/components/onboarding/Step5Review';
import { OnboardingProgress } from '@/components/onboarding/OnboardingProgress';

export default function OnboardingPage() {
  const { currentStep } = useOnboardingStore();

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
            <OnboardingProgress currentStep={currentStep} totalSteps={5} />

            {/* Step Content */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 mt-8 border border-gray-700 shadow-2xl">
              {currentStep === 1 && <Step1Identity />}
              {currentStep === 2 && <Step2Sound />}
              {currentStep === 3 && <Step3Platforms />}
              {currentStep === 4 && <Step4Visual />}
              {currentStep === 5 && <Step5Review />}
            </div>

            {/* Footer */}
            <p className="text-center text-gray-500 text-sm mt-6">
              Step {currentStep} of 5 • Takes about 5 minutes
            </p>
          </>
        )}
      </div>
    </div>
  );
}
