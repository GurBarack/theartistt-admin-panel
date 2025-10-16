'use client';

import { Button } from '@/components/ui/button';
import { useOnboardingStore } from '@/stores/onboardingStore';

export function WelcomeScreen() {
  const { setCurrentStep } = useOnboardingStore();

  const handleStart = () => {
    setCurrentStep(1);
  };

  return (
    <div className="text-center space-y-8">
      {/* Header */}
      <div>
        <div className="text-8xl mb-6">🎵</div>
        <h1 className="text-5xl font-bold text-white mb-4">
          Welcome to The Artist
        </h1>
        <p className="text-2xl text-gray-300 mb-2">
          Let&apos;s discover the artist you are
        </p>
        <p className="text-gray-400 text-lg">
          In just 5 minutes, we&apos;ll create your personalized music page that connects
          everything you do in one place.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <div className="text-4xl mb-3">🎨</div>
          <h3 className="text-white font-bold mb-2">Beautiful Design</h3>
          <p className="text-gray-400 text-sm">
            Customize colors, themes, and layouts to match your style
          </p>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <div className="text-4xl mb-3">🔗</div>
          <h3 className="text-white font-bold mb-2">Auto-Import</h3>
          <p className="text-gray-400 text-sm">
            Connect Spotify, SoundCloud, and YouTube to import your tracks
          </p>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <div className="text-4xl mb-3">📱</div>
          <h3 className="text-white font-bold mb-2">Mobile Ready</h3>
          <p className="text-gray-400 text-sm">
            Your page looks perfect on all devices and loads instantly
          </p>
        </div>
      </div>

      {/* CTA */}
      <div>
        <Button
          onClick={handleStart}
          size="lg"
          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white text-xl px-12 py-6 rounded-full"
        >
          Let&apos;s Begin →
        </Button>
        <p className="text-gray-500 text-sm mt-4">
          Takes about 5 minutes • No credit card required
        </p>
      </div>
    </div>
  );
}
