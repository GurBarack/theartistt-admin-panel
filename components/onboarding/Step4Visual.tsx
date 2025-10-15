'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { FileUpload } from '@/components/admin/FileUpload';

const THEME_COLORS = [
  { id: 'cyan', name: 'Ocean', icon: '🌊', gradient: 'from-cyan-500 to-blue-600' },
  { id: 'pink', name: 'Sunset', icon: '🌸', gradient: 'from-pink-500 to-rose-600' },
  { id: 'purple', name: 'Night', icon: '🌌', gradient: 'from-purple-500 to-indigo-600' },
  { id: 'orange', name: 'Fire', icon: '🔥', gradient: 'from-orange-500 to-red-600' },
  { id: 'green', name: 'Earth', icon: '🌿', gradient: 'from-green-500 to-emerald-600' },
];

const THEME_MODES = [
  { id: 'dark', name: 'Dark Mode', icon: '🌙' },
  { id: 'light', name: 'Light Mode', icon: '☀️' },
];

export function Step4Visual() {
  const { data, updateData, nextStep, prevStep } = useOnboardingStore();
  const [themeColor, setThemeColor] = useState(data.themeColor);
  const [themeMode, setThemeMode] = useState(data.themeMode);
  const [coverPhotoUrl, setCoverPhotoUrl] = useState(data.coverPhotoUrl);

  const handleNext = () => {
    updateData({ themeColor, themeMode, coverPhotoUrl });
    nextStep();
  };

  const handleImageUpload = (url: string) => {
    setCoverPhotoUrl(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="text-5xl mb-4">🎨</div>
        <h2 className="text-3xl font-bold text-white mb-2">Let's design your page</h2>
        <p className="text-gray-400">Choose your vibe</p>
      </div>

      {/* Color Theme Selection */}
      <div>
        <h3 className="text-gray-300 text-base mb-4">Color Theme</h3>
        <div className="grid grid-cols-3 gap-3">
          {THEME_COLORS.map((color) => (
            <button
              key={color.id}
              onClick={() => setThemeColor(color.id)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                themeColor === color.id
                  ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                  : 'border-gray-700 bg-gray-900/50 text-gray-300 hover:border-gray-600'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">{color.icon}</span>
                <span className="font-medium text-sm">{color.name}</span>
                <div className={`w-8 h-2 rounded-full bg-gradient-to-r ${color.gradient}`} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Mode Selection */}
      <div>
        <h3 className="text-gray-300 text-base mb-4">Mode</h3>
        <div className="grid grid-cols-2 gap-3">
          {THEME_MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setThemeMode(mode.id as 'dark' | 'light')}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                themeMode === mode.id
                  ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                  : 'border-gray-700 bg-gray-900/50 text-gray-300 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{mode.icon}</span>
                <span className="font-medium">{mode.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Cover Photo Upload */}
      <div>
        <h3 className="text-gray-300 text-base mb-4">Cover Photo</h3>
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
          <FileUpload
            onFileSelect={(file) => {
              if (file === null) {
                // Handle deletion
                handleImageUpload('');
              } else {
                // Convert file to URL for now (in real app, upload to storage)
                const url = URL.createObjectURL(file);
                handleImageUpload(url);
              }
            }}
            currentImageUrl={coverPhotoUrl}
            className="w-full h-48"
            placeholder="📸 Upload your cover photo"
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Recommended: 1200x600px or similar aspect ratio
        </p>
      </div>

      {/* Live Preview */}
      <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
        <h4 className="text-gray-300 text-sm mb-3">Preview</h4>
        <div className={`w-full h-32 rounded-lg bg-gradient-to-r ${
          THEME_COLORS.find(c => c.id === themeColor)?.gradient || 'from-cyan-500 to-blue-600'
        } ${themeMode === 'dark' ? 'text-white' : 'text-gray-900'} flex items-center justify-center`}>
          <div className="text-center">
            <div className="text-2xl font-bold">{data.artistName || 'Your Name'}</div>
            <div className="text-sm opacity-80">Your music page preview</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-3 pt-4">
        <Button onClick={prevStep} variant="outline" size="lg">
          ← Back
        </Button>
        <Button
          onClick={handleNext}
          size="lg"
          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
        >
          Next: Review Page →
        </Button>
      </div>
    </div>
  );
}
