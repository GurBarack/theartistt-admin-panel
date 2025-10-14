'use client';

import { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { SortableLinkItem } from './SortableLinkItem';
import { usePageStore } from '@/stores/pageStore';
import { Link } from '@/types';

const PLATFORMS = [
  { id: 'spotify', name: 'Spotify', icon: '/icons/spotify.svg' },
  { id: 'apple-music', name: 'Apple Music', icon: '/icons/apple-music.svg' },
  { id: 'soundcloud', name: 'SoundCloud', icon: '/icons/soundcloud.svg' },
  { id: 'beatport', name: 'Beatport', icon: '/icons/beatport.svg' },
  { id: 'youtube', name: 'YouTube', icon: '/icons/youtube.svg' },
  { id: 'youtube-music', name: 'YouTube Music', icon: '/icons/youtube-music.svg' },
] as const;

export function LinksSection() {
  const { links, setLinks, setIsDraft } = usePageStore();
  const [hasChanges, setHasChanges] = useState(false);

  // Create a list of all platforms with their current links
  const platformLinks = PLATFORMS.map((platform) => {
    const existingLink = links.find((link) => link.platform === platform.id);
    return {
      platform,
      link: existingLink || {
        id: `temp-${platform.id}-${Date.now()}`,
        pageId: '',
        platform: platform.id as 'spotify' | 'apple-music' | 'soundcloud' | 'beatport' | 'youtube' | 'youtube-music',
        url: '',
        isVisible: true,
        order: links.length + PLATFORMS.indexOf(platform),
      },
      isExisting: !!existingLink,
    };
  });

  // Sort by order for existing links, new links go to the end
  const sortedPlatformLinks = platformLinks.sort((a, b) => {
    if (a.isExisting && b.isExisting) {
      return a.link.order - b.link.order;
    }
    if (a.isExisting) return -1;
    if (b.isExisting) return 1;
    return 0;
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sortedPlatformLinks.findIndex((item) => item.link.id === active.id);
      const newIndex = sortedPlatformLinks.findIndex((item) => item.link.id === over.id);
      const newPlatformLinks = arrayMove(sortedPlatformLinks, oldIndex, newIndex);
      
      // Convert back to links array and update order values
      const updatedLinks = newPlatformLinks
        .filter(item => item.isExisting || item.link.url.trim() !== '')
        .map((item, index) => ({ ...item.link, order: index }));
      
      setLinks(updatedLinks);
      setHasChanges(true);
      setIsDraft(true);
    }
  };

  const handleUpdate = (id: string, updates: Partial<Link>) => {
    const existingLink = links.find((link) => link.id === id);
    let newLinks;
    
    if (existingLink) {
      // Update existing link
      newLinks = links.map((item) => (item.id === id ? { ...item, ...updates } : item));
    } else {
      // Create new link
      const platformLink = platformLinks.find((pl) => pl.link.id === id);
      if (platformLink) {
        const newLink = { ...platformLink.link, ...updates };
        newLinks = [...links, newLink];
      } else {
        newLinks = links;
      }
    }
    
    setLinks(newLinks);
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
      <AccordionItem value="links" className="bg-gray-800 rounded-lg border-0">
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <span className="text-lg font-semibold text-white">Links</span>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
          <div className="space-y-4">
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={sortedPlatformLinks.map((pl) => pl.link.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                  {sortedPlatformLinks.map((platformLink) => (
                    <SortableLinkItem 
                      key={platformLink.link.id} 
                      link={platformLink.link} 
                      onUpdate={handleUpdate} 
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

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
