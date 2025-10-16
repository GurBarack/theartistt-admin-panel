'use client';

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';
import { usePageStore } from '@/stores/pageStore';
import { FeaturedItem } from '@/types';
import { FileUpload } from '../FileUpload';

export function FeaturedSection() {
  const { featuredItems, setFeaturedItems, setIsDraft } = usePageStore();
  const [hasChanges, setHasChanges] = useState(false);

  // Safety check for featuredItems
  const safeFeaturedItems = featuredItems || [];

  const handleAdd = () => {
    const newItem: FeaturedItem = {
      id: `temp-${Date.now()}`,
      pageId: '',
      title: '',
      subtitle: '',
      imageUrl: '',
      ctaUrl: '',
      order: safeFeaturedItems.length,
    };
    setFeaturedItems([...safeFeaturedItems, newItem]);
    setHasChanges(true);
    setIsDraft(true);
  };

  const handleUpdate = (id: string, field: keyof FeaturedItem, value: string) => {
    const newItems = safeFeaturedItems.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    setFeaturedItems(newItems);
    setHasChanges(true);
    setIsDraft(true);
  };

  const handleRemove = (id: string) => {
    const newItems = safeFeaturedItems.filter((item) => item.id !== id);
    setFeaturedItems(newItems);
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

  const handleFileUpload = async (itemId: string, file: File) => {
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
            filename: `featured-${itemId}-${Date.now()}.jpg`
          }),
        });
        
        if (response.ok) {
          const { url } = await response.json();
          handleUpdate(itemId, 'imageUrl', url);
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
      <AccordionItem value="featured" className="bg-gray-800 rounded-lg border-0">
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <span className="text-lg font-semibold text-white">Featured</span>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
          <div className="space-y-4">
            {safeFeaturedItems.map((item, index) => (
              <div key={item.id} className="space-y-3 bg-gray-700/50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Featured Item {index + 1}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(item.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <Input
                  value={item.title ?? ''}
                  onChange={(e) => handleUpdate(item.id, 'title', e.target.value)}
                  placeholder="Title"
                  className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                />
                <Input
                  value={item.subtitle ?? ''}
                  onChange={(e) => handleUpdate(item.id, 'subtitle', e.target.value)}
                  placeholder="Subtitle (optional)"
                  className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                />
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Image</label>
                  <FileUpload
                    onFileSelect={(file) => {
                      if (file === null) {
                        handleUpdate(item.id, 'imageUrl', '');
                      } else {
                        handleFileUpload(item.id, file);
                      }
                    }}
                    currentImageUrl={item.imageUrl || undefined}
                    placeholder="Upload image"
                    aspectRatio="aspect-video"
                    className="w-full h-48"
                  />
                </div>
                <Input
                  value={item.ctaUrl ?? ''}
                  onChange={(e) => handleUpdate(item.id, 'ctaUrl', e.target.value)}
                  placeholder="CTA URL (optional)"
                  className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                />
              </div>
            ))}

            <Button onClick={handleAdd} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Featured Item
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
