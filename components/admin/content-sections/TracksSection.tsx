'use client';

import { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { usePageStore } from '@/stores/pageStore';
import { Track } from '@/types';
import { SortableTrackItem } from './SortableTrackItem';

export function TracksSection() {
  const { tracks, setTracks, setIsDraft } = usePageStore();
  const [hasChanges, setHasChanges] = useState(false);

  // Sort tracks by order
  const sortedTracks = [...tracks].sort((a, b) => a.order - b.order);

  const handleAdd = () => {
    const newTrack: Track = {
      id: `temp-${Date.now()}`,
      pageId: '',
      name: '',
      credits: '',
      artworkUrl: '',
      spotifyUrl: '',
      appleMusicUrl: '',
      beatportUrl: '',
      youtubeUrl: '',
      youtubeMusicUrl: '',
      soundcloudUrl: '',
      order: tracks.length,
    };
    setTracks([...tracks, newTrack]);
    setHasChanges(true);
    setIsDraft(true);
  };

  const handleUpdate = (id: string, field: keyof Track, value: string) => {
    const newTracks = tracks.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    setTracks(newTracks);
    setHasChanges(true);
    setIsDraft(true);
  };

  const handleRemove = (id: string) => {
    const newTracks = tracks.filter((item) => item.id !== id);
    setTracks(newTracks);
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

  const handleFileUpload = async (trackId: string, file: File | null) => {
    if (file === null) {
      // Handle deletion
      handleUpdate(trackId, 'artworkUrl', '');
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
            filename: `track-${trackId}-${Date.now()}.jpg`
          }),
        });
        
        if (response.ok) {
          const { url } = await response.json();
          handleUpdate(trackId, 'artworkUrl', url);
        } else {
          console.error('Failed to upload image');
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sortedTracks.findIndex((item) => item.id === active.id);
      const newIndex = sortedTracks.findIndex((item) => item.id === over.id);
      const newTracks = arrayMove(sortedTracks, oldIndex, newIndex);
      setTracks(newTracks);
      setHasChanges(true);
      setIsDraft(true);
    }
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="tracks" className="bg-gray-800 rounded-lg border-0">
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <span className="text-lg font-semibold text-white">Tracks</span>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
          <div className="space-y-4">
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={sortedTracks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                  {sortedTracks.map((track, index) => (
                    <SortableTrackItem
                      key={track.id}
                      track={track}
                      index={index}
                      onUpdate={handleUpdate}
                      onRemove={handleRemove}
                      onFileUpload={handleFileUpload}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            <Button onClick={handleAdd} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Track
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
