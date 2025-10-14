'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeaturedItem {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  ctaUrl?: string;
}

interface FeaturedSectionProps {
  items: FeaturedItem[];
  accentColor: string;
  onItemClick: (itemId: string) => void;
}

export function FeaturedSection({ items, accentColor, onItemClick }: FeaturedSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!items || items.length === 0) return null;

  const isSingleItem = items.length === 1;
  const isMultipleItems = items.length > 1;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-8 px-6 bg-gray-950">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Featured</h2>
        {isMultipleItems && (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll('left')}
              className="text-white hover:bg-gray-800"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll('right')}
              className="text-white hover:bg-gray-800"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>

      {/* Single Item - 100% Width */}
      {isSingleItem && (
        <div
          onClick={() => onItemClick(items[0].id)}
          className="relative h-[400px] w-full rounded-3xl overflow-hidden border border-gray-800 cursor-pointer hover:border-gray-700 transition-all group"
        >
          <Image
            src={items[0].imageUrl}
            alt={items[0].title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/95" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
            <div className="flex-1 pr-4">
              <h3 className="text-white text-3xl font-bold mb-2 leading-tight">
                {items[0].title}
              </h3>
              <p className="text-gray-300 text-base leading-relaxed">
                {items[0].subtitle}
              </p>
            </div>
            <div
              className={`w-16 h-16 rounded-full ${accentColor} flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}
            >
              <ArrowRight className="w-7 h-7 text-gray-900" />
            </div>
          </div>
        </div>
      )}

      {/* Multiple Items - Carousel with 70% Width Cards */}
      {isMultipleItems && (
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className="flex-shrink-0 w-[70%] h-[400px] rounded-3xl overflow-hidden relative cursor-pointer snap-start border border-gray-800 hover:border-gray-700 transition-all group"
              style={{
                marginLeft: index === 0 ? '0' : '0',
                marginRight: index === items.length - 1 ? '24px' : '0',
              }}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/95" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div className="flex-1 pr-4">
                  <h3 className="text-white text-2xl font-bold mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
                <div
                  className={`w-14 h-14 rounded-full ${accentColor} flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}
                >
                  <ArrowRight className="w-6 h-6 text-gray-900" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
