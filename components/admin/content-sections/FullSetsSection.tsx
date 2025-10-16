'use client';

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import { Plus, Trash2 } from 'lucide-react';
import { usePageStore } from '@/stores/pageStore';
import { FullSet } from '@/types';
import { FileUpload } from '../FileUpload';

export function FullSetsSection() {
  const { fullSets, setFullSets, setIsDraft } = usePageStore();
  const [hasChanges, setHasChanges] = useState(false);

  const handleAdd = () => {
    const newSet: FullSet = {
      id: `temp-${Date.now()}`,
      pageId: '',
      title: '',
      url: '',
      date: '',
      location: '',
      thumbnailUrl: '',
      spotifyUrl: '',
      appleMusicUrl: '',
      beatportUrl: '',
      youtubeUrl: '',
      youtubeMusicUrl: '',
      soundcloudUrl: '',
      order: fullSets.length,
    };
    setFullSets([...fullSets, newSet]);
    setHasChanges(true);
    setIsDraft(true);
  };

  const handleUpdate = (id: string, field: keyof FullSet, value: string) => {
    const newSets = fullSets.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    setFullSets(newSets);
    setHasChanges(true);
    setIsDraft(true);
  };

  const handleRemove = (id: string) => {
    const newSets = fullSets.filter((item) => item.id !== id);
    setFullSets(newSets);
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

  const handleFileUpload = async (setId: string, file: File | null) => {
    if (file === null) {
      // Handle deletion
      handleUpdate(setId, 'thumbnailUrl', '');
      return;
    }

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64String = reader.result as string;
        
        // Upload to Vercel Blob
        const response = await fetch('/api/blob/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            base64String,
            filename: `fullset-${setId}-${Date.now()}.jpg`
          }),
        });
        
        if (response.ok) {
          const { url } = await response.json();
          handleUpdate(setId, 'thumbnailUrl', url);
        } else {
          console.error('Failed to upload image');
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="fullsets" className="bg-gray-800 rounded-lg border-0">
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <span className="text-lg font-semibold text-white">Full Sets</span>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
          <div className="space-y-4">
            {fullSets.map((set, index) => (
              <div key={set.id} className="space-y-3 bg-gray-700/50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Set {index + 1}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(set.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <Input
                  value={set.title}
                  onChange={(e) => handleUpdate(set.id, 'title', e.target.value)}
                  placeholder="Set name"
                  className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                />
                <DatePicker
                  value={set.date || ''}
                  onChange={(value) => handleUpdate(set.id, 'date', value)}
                  placeholder="Select date"
                  className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                />
                <Input
                  value={set.location || ''}
                  onChange={(e) => handleUpdate(set.id, 'location', e.target.value)}
                  placeholder="Location (optional)"
                  className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                />
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Thumbnail</label>
                  <FileUpload
                    onFileSelect={(file) => handleFileUpload(set.id, file)}
                    currentImageUrl={set.thumbnailUrl || ''}
                    placeholder="Upload thumbnail"
                    aspectRatio="aspect-video"
                    className="w-full h-48"
                  />
                </div>
                <Input
                  value={set.url || ''}
                  onChange={(e) => handleUpdate(set.id, 'url', e.target.value)}
                  placeholder="Set URL (optional)"
                  className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                />
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Platform Links (Optional)</label>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Spotify</label>
                      <Input
                        value={set.spotifyUrl ?? ''}
                        onChange={(e) => handleUpdate(set.id, 'spotifyUrl', e.target.value)}
                        placeholder="Spotify URL"
                        className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Apple Music</label>
                      <Input
                        value={set.appleMusicUrl ?? ''}
                        onChange={(e) => handleUpdate(set.id, 'appleMusicUrl', e.target.value)}
                        placeholder="Apple Music URL"
                        className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Beatport</label>
                      <Input
                        value={set.beatportUrl ?? ''}
                        onChange={(e) => handleUpdate(set.id, 'beatportUrl', e.target.value)}
                        placeholder="Beatport URL"
                        className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">YouTube</label>
                      <Input
                        value={set.youtubeUrl ?? ''}
                        onChange={(e) => handleUpdate(set.id, 'youtubeUrl', e.target.value)}
                        placeholder="YouTube URL"
                        className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">YouTube Music</label>
                      <Input
                        value={set.youtubeMusicUrl ?? ''}
                        onChange={(e) => handleUpdate(set.id, 'youtubeMusicUrl', e.target.value)}
                        placeholder="YouTube Music URL"
                        className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">SoundCloud</label>
                      <Input
                        value={set.soundcloudUrl ?? ''}
                        onChange={(e) => handleUpdate(set.id, 'soundcloudUrl', e.target.value)}
                        placeholder="SoundCloud URL"
                        className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Button onClick={handleAdd} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Full Set
            </Button>

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
