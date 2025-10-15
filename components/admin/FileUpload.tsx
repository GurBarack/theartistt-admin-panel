'use client';

import { useState, useCallback } from 'react';
import { Upload, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  currentImageUrl?: string;
  placeholder?: string;
  aspectRatio?: string;
  className?: string;
}

export function FileUpload({ 
  onFileSelect, 
  currentImageUrl, 
  placeholder = "Click or drag to upload",
  aspectRatio = "aspect-square",
  className = ""
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = useCallback((file: File | null) => {
    if (file === null) {
      onFileSelect(null);
    } else if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg overflow-hidden cursor-pointer transition-colors ${
        isDragOver ? 'border-cyan-400 bg-cyan-400/10' : 'border-gray-600 hover:border-gray-500'
      } ${className}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileInputChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      
      <div className={`${aspectRatio} w-full flex flex-col items-center justify-center p-8 text-center`}>
        {currentImageUrl ? (
          <div className="relative w-full h-full">
            <img
              src={currentImageUrl}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFileSelect(null);
              }}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-300 font-medium mb-2">{placeholder}</p>
            <p className="text-sm text-gray-500">JPEG, PNG or WebP (max 5MB)</p>
          </>
        )}
      </div>
    </div>
  );
}
