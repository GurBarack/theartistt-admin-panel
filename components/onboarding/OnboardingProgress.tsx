'use client';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function OnboardingProgress({ currentStep, totalSteps }: OnboardingProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between mt-4">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isComplete = stepNumber < currentStep;

          return (
            <div
              key={stepNumber}
              className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all ${
                isComplete
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                  : isActive
                  ? 'bg-white text-gray-900 ring-4 ring-cyan-400/50'
                  : 'bg-gray-700 text-gray-400'
              }`}
            >
              {isComplete ? '✓' : stepNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
}
