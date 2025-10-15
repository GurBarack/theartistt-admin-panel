'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Check, X, Loader2 } from 'lucide-react';

export function Step1Identity() {
  const { data, updateData, nextStep } = useOnboardingStore();
  const [artistName, setArtistName] = useState(data.artistName);
  const [subdomain, setSubdomain] = useState(data.subdomain);
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isArtistNameLocked, setIsArtistNameLocked] = useState(false);

  // Generate subdomain from artist name
  useEffect(() => {
    const newSubdomain = artistName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setSubdomain(newSubdomain);
  }, [artistName]);

  // Lock artist name after first input
  useEffect(() => {
    if (artistName && !isArtistNameLocked) {
      setIsArtistNameLocked(true);
    }
  }, [artistName, isArtistNameLocked]);

  // Check subdomain availability
  useEffect(() => {
    const checkAvailability = async () => {
      if (subdomain.length < 3) {
        setIsAvailable(null);
        return;
      }

      setIsChecking(true);
      
      try {
        const response = await fetch(`/api/check-subdomain?slug=${subdomain}`);
        const data = await response.json();
        setIsAvailable(data.available);
      } catch (error) {
        console.error('Error checking availability:', error);
      } finally {
        setIsChecking(false);
      }
    };

    const debounce = setTimeout(checkAvailability, 500);
    return () => clearTimeout(debounce);
  }, [subdomain]);

  const handleNext = () => {
    if (artistName.length >= 3 && isAvailable) {
      updateData({ artistName, subdomain });
      nextStep();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="text-5xl mb-4">👤</div>
        <h2 className="text-3xl font-bold text-white mb-2">Who Are You?</h2>
        <p className="text-gray-400">This is how your fans will find you</p>
      </div>

      {/* Artist Name Input */}
      <div>
        <Label htmlFor="artistName" className="text-gray-300 text-base mb-2 block">
          Artist Name *
        </Label>
        <Input
          id="artistName"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          placeholder="Enter your artist name"
          className="text-lg h-14 bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
          maxLength={30}
          disabled={isArtistNameLocked}
        />
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-500">
            {artistName.length}/30 characters
          </p>
          {isArtistNameLocked && (
            <p className="text-xs text-cyan-400 flex items-center gap-1">
              <Check className="w-3 h-3" />
              Locked
            </p>
          )}
        </div>
      </div>

      {/* Subdomain Preview */}
      {subdomain && (
        <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
          <p className="text-sm text-gray-400 mb-2">Your subdomain will be:</p>
          <div className="flex items-center gap-2">
            <p className="text-cyan-400 font-mono text-lg">
              {subdomain}.theartistt.com
            </p>
            {isChecking && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
            {!isChecking && isAvailable === true && (
              <Check className="w-5 h-5 text-green-400" />
            )}
            {!isChecking && isAvailable === false && (
              <X className="w-5 h-5 text-red-400" />
            )}
          </div>
          {!isChecking && isAvailable === false && (
            <p className="text-red-400 text-sm mt-2">
              This subdomain is already taken. Try another one.
            </p>
          )}
          {!isChecking && isAvailable === true && (
            <p className="text-green-400 text-sm mt-2">
              ✓ This subdomain is available!
            </p>
          )}
        </div>
      )}

      {/* Helpful Tip */}
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
        <p className="text-cyan-400 text-sm">
          💡 <strong>Tip:</strong> Most artists use their stage name. Keep it short,
          memorable, and easy to spell!
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-end gap-3 pt-4">
        <Button
          onClick={handleNext}
          disabled={!artistName || !isAvailable || isChecking}
          size="lg"
          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
        >
          Next: Your Sound →
        </Button>
      </div>
    </div>
  );
}
