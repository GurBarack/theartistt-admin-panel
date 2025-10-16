'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Copy, Share2, QrCode } from 'lucide-react';

export function Step5Review() {
  const { data, updateData, prevStep, completeOnboarding } = useOnboardingStore();
  const [socialLinks, setSocialLinks] = useState(data.socialLinks);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState('');

  const handleSocialLinkChange = (platform: string, url: string) => {
    setSocialLinks(prev => ({ ...prev, [platform]: url }));
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    
    try {
      // Update data with social links
      updateData({ socialLinks });
      
      // Call API to create page
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          name: data.name,
          artistName: data.artistName,
          subdomain: data.subdomain,
          genre: data.genre,
          bio: data.bio,
          themeColor: data.themeColor,
          themeMode: data.themeMode,
          coverPhotoUrl: data.coverPhotoUrl,
          socialLinks: socialLinks,
          tracks: Object.values(data.connectedPlatforms)
            .filter(platform => platform?.connected && platform.tracks)
            .flatMap(platform => platform.tracks)
            .map((track, index) => ({
              name: track.name,
              artworkUrl: track.artworkUrl,
              order: index,
            })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(`Failed to create page: ${errorData.error || 'Unknown error'}`);
      }

      const result = await response.json();
      setPublishedUrl(result.url);
      setIsPublished(true);
      
      // Store user email in localStorage for admin panel access
      localStorage.setItem('userEmail', data.email);
      
      completeOnboarding();
    } catch (error) {
      console.error('Publishing failed:', error);
      alert('Failed to publish page. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(publishedUrl);
  };

  if (isPublished) {
    return (
      <div className="space-y-6 text-center">
        {/* Success Header */}
        <div>
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-white mb-2">Your page is now live!</h2>
          <p className="text-cyan-400 text-xl font-mono">{publishedUrl}</p>
        </div>

        {/* QR Code Placeholder */}
        <div className="bg-white p-8 rounded-xl inline-block">
          <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
            <QrCode className="w-16 h-16 text-gray-400" />
          </div>
          <p className="text-gray-600 text-sm mt-2">QR Code</p>
        </div>

        {/* Share Options */}
        <div className="space-y-4">
          <p className="text-gray-400">Share it with your fans:</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={copyUrl} variant="outline" size="lg">
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
            <Button variant="outline" size="lg">
              <Share2 className="w-4 h-4 mr-2" />
              Share on Instagram
            </Button>
            <Button variant="outline" size="lg">
              <Share2 className="w-4 h-4 mr-2" />
              Share on Twitter
            </Button>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 text-left">
          <h3 className="text-white font-bold mb-3">What&apos;s next?</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>• Add upcoming shows and events</li>
            <li>• Upload more tracks manually</li>
            <li>• Customize your page further</li>
            <li>• Connect more music platforms</li>
          </ul>
        </div>

        {/* Final Actions */}
        <div className="flex gap-3 justify-center">
          <Button 
            onClick={() => window.open(publishedUrl, '_blank')} 
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
          >
            Go to My Page
          </Button>
          <Button 
            onClick={() => window.location.href = '/admin'} 
            variant="outline" 
            size="lg"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="text-5xl mb-4">🚀</div>
        <h2 className="text-3xl font-bold text-white mb-2">You&apos;re almost there!</h2>
        <p className="text-gray-400">Here&apos;s a preview of your page</p>
      </div>

      {/* Page Preview */}
      <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
        <h4 className="text-gray-300 text-sm mb-4">Preview</h4>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-4 mb-4">
            {data.coverPhotoUrl && (
              <img 
                src={data.coverPhotoUrl} 
                alt="Cover" 
                className="w-16 h-16 rounded-lg object-cover"
              />
            )}
            <div>
              <h3 className="text-white font-bold text-lg">{data.artistName}</h3>
              <p className="text-gray-400 text-sm">{data.genre}</p>
            </div>
          </div>
          {data.bio && (
            <p className="text-gray-300 text-sm mb-4">{data.bio}</p>
          )}
          <div className="flex gap-2">
            {Object.values(data.connectedPlatforms).map((platform, index) => 
              platform?.connected && (
                <div key={index} className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-xs">🎵</span>
                </div>
              )
            )}
          </div>
        </div>
        <p className="text-cyan-400 text-sm mt-2 font-mono">
          {data.subdomain}.theartistt.com
        </p>
      </div>

      {/* Social Links */}
      <div>
        <h3 className="text-gray-300 text-base mb-4">Add your social links (optional)</h3>
        <div className="space-y-3">
          <div>
            <Label htmlFor="instagram" className="text-gray-400 text-sm">📱 Instagram</Label>
            <Input
              id="instagram"
              value={socialLinks.instagram || ''}
              onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
              placeholder="https://instagram.com/yourusername"
              className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
            />
          </div>
          <div>
            <Label htmlFor="facebook" className="text-gray-400 text-sm">📘 Facebook</Label>
            <Input
              id="facebook"
              value={socialLinks.facebook || ''}
              onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
              placeholder="https://facebook.com/yourpage"
              className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
            />
          </div>
          <div>
            <Label htmlFor="tiktok" className="text-gray-400 text-sm">🎵 TikTok</Label>
            <Input
              id="tiktok"
              value={socialLinks.tiktok || ''}
              onChange={(e) => handleSocialLinkChange('tiktok', e.target.value)}
              placeholder="https://tiktok.com/@yourusername"
              className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-3 pt-4">
        <Button onClick={prevStep} variant="outline" size="lg">
          ← Back
        </Button>
        <Button
          onClick={handlePublish}
          disabled={isPublishing}
          size="lg"
          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
        >
          {isPublishing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Publishing...
            </>
          ) : (
            '🎉 Publish Page!'
          )}
        </Button>
      </div>
    </div>
  );
}
