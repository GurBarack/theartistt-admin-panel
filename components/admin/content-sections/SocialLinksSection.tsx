'use client';

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePageStore } from '@/stores/pageStore';
import { SocialLink } from '@/types';

const SOCIAL_PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: '/icons/instagram.svg' },
  { id: 'facebook', name: 'Facebook', icon: '/icons/facebook.svg' },
  { id: 'tiktok', name: 'TikTok', icon: '/icons/tiktok.svg' },
] as const;

export function SocialLinksSection() {
  const { socialLinks, setSocialLinks, setIsDraft } = usePageStore();
  const [hasChanges, setHasChanges] = useState(false);

  const handleUpdate = (platform: string, url: string) => {
    const existing = socialLinks.find((item) => item.platform === platform);
    let newLinks;
    if (existing) {
      newLinks = socialLinks.map((item) =>
        item.platform === platform ? { ...item, url } : item
      );
    } else {
      newLinks = [
        ...socialLinks,
        {
          id: `temp-${Date.now()}`,
          pageId: '',
          platform: platform as 'instagram' | 'facebook' | 'tiktok',
          url,
        },
      ];
    }
    setSocialLinks(newLinks);
    setHasChanges(true);
    setIsDraft(true);
  };

  const handleDiscard = () => {
    // Reset to original state - for now just clear changes
    setHasChanges(false);
    setIsDraft(false);
  };

  const handleSave = async () => {
    // TODO: Save to backend
    setHasChanges(false);
    setIsDraft(false);
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="social" className="bg-gray-800 rounded-lg border-0">
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <span className="text-lg font-semibold text-white">Social</span>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
          <div className="space-y-4">
            {SOCIAL_PLATFORMS.map((platform) => {
              const link = socialLinks.find((l) => l.platform === platform.id);
              return (
                <div key={platform.id} className="flex items-center gap-3 bg-gray-700/50 rounded-lg p-3">
                  <img src={platform.icon} alt={platform.name} width={24} height={24} className="w-6 h-6" />
                  <span className="text-white font-medium w-24">{platform.name}</span>
                  <Input
                    value={link?.url ?? ''}
                    onChange={(e) => handleUpdate(platform.id, e.target.value)}
                    placeholder={`Enter ${platform.name} URL`}
                    className="flex-1 bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                  />
                </div>
              );
            })}

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={handleDiscard} disabled={!hasChanges}>
                Discard
              </Button>
              <Button onClick={handleSave} disabled={!hasChanges}>
                Done
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
