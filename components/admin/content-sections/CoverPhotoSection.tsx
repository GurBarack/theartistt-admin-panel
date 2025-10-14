'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { usePageStore } from '@/stores/pageStore';

export function CoverPhotoSection() {
  const { page, setPage, setIsDraft } = usePageStore();
  const [preview, setPreview] = useState<string | null>(page?.coverPhotoUrl || null);
  const [hasChanges, setHasChanges] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
        setHasChanges(true);
        setIsDraft(true);
      };
      reader.readAsDataURL(file);
    }
  }, [setIsDraft]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  });

  const handleDiscard = () => {
    setPreview(page?.coverPhotoUrl || null);
    setHasChanges(false);
  };

  const handleSave = async () => {
    // TODO: Upload to backend and update page
    if (page && preview) {
      setPage({ ...page, coverPhotoUrl: preview });
    }
    setHasChanges(false);
    setIsDraft(false);
  };

  // Update store immediately when preview changes
  React.useEffect(() => {
    if (page && preview && preview !== page.coverPhotoUrl) {
      setPage({ ...page, coverPhotoUrl: preview });
      setIsDraft(true);
    }
  }, [preview, page, setPage, setIsDraft]);

  const handleRemove = () => {
    setPreview(null);
    setHasChanges(true);
    setIsDraft(true);
  };

  return (
    <Accordion type="single" collapsible defaultValue="cover-photo">
      <AccordionItem value="cover-photo" className="bg-gray-800 rounded-lg border-0">
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <span className="text-lg font-semibold text-white">Cover Photo</span>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
          <div className="space-y-4">
            {/* Upload Area */}
            <div
              {...getRootProps()}
              className={`relative border-2 border-dashed rounded-lg overflow-hidden cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-cyan-500 bg-cyan-500/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <input {...getInputProps()} />
              {preview ? (
                <div className="relative aspect-[1350/1080] w-full">
                  <Image src={preview} alt="Cover Photo" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove();
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="aspect-[1350/1080] w-full flex flex-col items-center justify-center p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-300 font-medium mb-2">
                    {isDragActive ? 'Drop image here' : 'Click or drag to upload'}
                  </p>
                  <p className="text-sm text-gray-500">1350x1080px recommended</p>
                  <p className="text-xs text-gray-500 mt-2">JPEG, PNG or WebP (max 5MB)</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={handleDiscard}
                disabled={!hasChanges}
              >
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
