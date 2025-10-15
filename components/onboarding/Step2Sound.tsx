'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useOnboardingStore } from '@/stores/onboardingStore';

const GENRES = [
  { id: 'electronic', name: 'Electronic', icon: '🎧' },
  { id: 'hip-hop', name: 'Hip-Hop / Rap', icon: '🎤' },
  { id: 'rock', name: 'Rock', icon: '🎸' },
  { id: 'pop', name: 'Pop', icon: '🎹' },
  { id: 'jazz', name: 'Jazz', icon: '🎺' },
  { id: 'classical', name: 'Classical', icon: '🎻' },
  { id: 'country', name: 'Country', icon: '🪕' },
  { id: 'r&b', name: 'R&B / Soul', icon: '🥁' },
  { id: 'other', name: 'Other', icon: '🎵' },
];

export function Step2Sound() {
  const { data, updateData, nextStep, prevStep } = useOnboardingStore();
  const [genre, setGenre] = useState(data.genre);
  const [bio, setBio] = useState(data.bio);

  const handleNext = () => {
    updateData({ genre, bio });
    nextStep();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="text-5xl mb-4">🎸</div>
        <h2 className="text-3xl font-bold text-white mb-2">What kind of music do you make?</h2>
        <p className="text-gray-400">Help fans discover your vibe</p>
      </div>

      {/* Genre Selection */}
      <div>
        <Label className="text-gray-300 text-base mb-4 block">
          Primary Genre *
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {GENRES.map((genreOption) => (
            <button
              key={genreOption.id}
              onClick={() => setGenre(genreOption.id)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                genre === genreOption.id
                  ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                  : 'border-gray-700 bg-gray-900/50 text-gray-300 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{genreOption.icon}</span>
                <span className="font-medium">{genreOption.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bio Input */}
      <div>
        <Label htmlFor="bio" className="text-gray-300 text-base mb-2 block">
          Tell us your story (optional)
        </Label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="A few sentences about your music, style, or journey..."
          className="w-full h-24 px-4 py-3 bg-gray-900 border border-gray-600 rounded-xl text-white placeholder:text-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
          maxLength={200}
        />
        <p className="text-xs text-gray-500 mt-1">
          {bio.length}/200 characters
        </p>
        <p className="text-xs text-gray-400 mt-1">
          This will appear on your page
        </p>
      </div>

      {/* Example Bio */}
      {!bio && (
        <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">💡 <strong>Example:</strong></p>
          <p className="text-gray-300 text-sm italic">
            &ldquo;Electronic producer from Berlin crafting ambient soundscapes that blend 
            analog warmth with digital precision. Inspired by late-night city walks 
            and the intersection of technology and emotion.&rdquo;
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between gap-3 pt-4">
        <Button onClick={prevStep} variant="outline" size="lg">
          ← Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!genre}
          size="lg"
          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
        >
          Next: Connect Music →
        </Button>
      </div>
    </div>
  );
}
