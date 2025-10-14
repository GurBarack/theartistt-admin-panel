'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Upload, X, Lock, Crop } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePageStore } from '@/stores/pageStore';
import ReactCrop, { Crop as CropType } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export function HeroSection() {
  const { page, setPage, setIsDraft } = usePageStore();
  const [artistName, setArtistName] = useState(page?.displayName || '');
  const [slug, setSlug] = useState(page?.slug || '');
  const [preview, setPreview] = useState<string | null>(page?.coverPhotoUrl || null);
  const [showCrop, setShowCrop] = useState(false);
  const [crop, setCrop] = useState<CropType>();
  const [hasChanges, setHasChanges] = useState(false);

  // Auto-generate slug from artist name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleArtistNameChange = (value: string) => {
    setArtistName(value);
    const newSlug = generateSlug(value);
    setSlug(newSlug);
    setHasChanges(true);
    setIsDraft(true);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
        setShowCrop(true);
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
    maxSize: 5 * 1024 * 1024,
    multiple: false,
  });

  const handleDiscard = () => {
    setArtistName(page?.displayName || '');
    setSlug(page?.slug || '');
    setPreview(page?.coverPhotoUrl || null);
    setShowCrop(false);
    setHasChanges(false);
  };

  const handleSave = async () => {
    if (page) {
      setPage({
        ...page,
        displayName: artistName,
        slug: slug,
        coverPhotoUrl: preview || undefined,
      });
    }
    setHasChanges(false);
    setIsDraft(false);
    setShowCrop(false);
  };

  const handleRemove = () => {
    setPreview(null);
    setShowCrop(false);
    setHasChanges(true);
    setIsDraft(true);
  };

  return (
    <Accordion type="single" collapsible defaultValue="hero">
      <AccordionItem value="hero" className="bg-gray-800 rounded-lg border-0">
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <span className="text-lg font-semibold text-white">Hero</span>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
          <div className="space-y-6">
            {/* Artist Name Field */}
            <div>
              <Label htmlFor="artistName" className="block text-sm font-medium text-gray-300 mb-2">
                Artist Name
              </Label>
              <Input
                id="artistName"
                value={artistName}
                onChange={(e) => handleArtistNameChange(e.target.value)}
                placeholder="Enter artist name"
                className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
              />
            </div>

            {/* Slug Field (Auto-generated, locked) */}
            <div>
              <Label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-2">
                Slug (Auto-generated)
              </Label>
              <div className="relative">
                <Input
                  id="slug"
                  value={slug}
                  readOnly
                  className="bg-gray-900 border-gray-600 text-gray-400 pr-10"
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Your page URL: yoursite.com/{slug || 'artist-name'}
              </p>
            </div>

            {/* Cover Photo Upload */}
            <div>
              <Label className="block text-sm font-medium text-gray-300 mb-2">
                Cover Photo
              </Label>
              
              {!showCrop ? (
                <div
                  {...getRootProps()}
                  className={`relative border-2 border-dashed rounded-lg overflow-hidden cursor-pointer transition-colors ${
                    isDragActive
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <input {...getInputProps()} />
                  {preview && !showCrop ? (
                    <div className="relative aspect-[1350/1080] w-full">
                      <Image src={preview} alt="Cover Photo" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowCrop(true);
                          }}
                        >
                          <Crop className="w-4 h-4 mr-2" />
                          Crop
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove();
                          }}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Remove
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
                      <p className="text-xs text-gray-600 mt-2">JPEG, PNG or WebP (max 5MB)</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gray-900 rounded-lg p-4">
                    <ReactCrop
                      crop={crop}
                      onChange={(c) => setCrop(c)}
                      aspect={1350 / 1080}
                    >
                      <img src={preview || ''} alt="Crop preview" className="max-w-full" />
                    </ReactCrop>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowCrop(false)}
                      className="flex-1"
                    >
                      Cancel Crop
                    </Button>
                    <Button
                      onClick={() => {
                        // TODO: Apply crop transformation
                        setShowCrop(false);
                      }}
                      className="flex-1"
                    >
                      Apply Crop
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
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
