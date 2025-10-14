'use client';

export function DraftIndicator() {
  return (
    <div className="fixed top-6 right-6 bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-semibold shadow-lg z-50 flex items-center gap-2">
      <div className="w-2 h-2 bg-gray-900 rounded-full animate-pulse" />
      Draft - Unpublished Changes
    </div>
  );
}
