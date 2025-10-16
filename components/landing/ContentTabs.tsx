'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ContentTabsProps {
  themeMode: 'dark' | 'light';
  accentColor: string;
}

const TABS = [
  { id: 'featured', label: 'Featured' },
  { id: 'released', label: 'Released' },
  { id: 'events', label: 'Events' },
  { id: 'fullsets', label: 'Full Sets' },
];

const THEME_COLORS = {
  cyan: 'border-cyan-400',
  pink: 'border-pink-400',
  purple: 'border-purple-400',
  orange: 'border-orange-400',
  green: 'border-green-400',
};

export function ContentTabs({ themeMode, accentColor }: ContentTabsProps) {
  const [activeTab, setActiveTab] = useState('featured');
  const isDark = themeMode === 'dark';
  const borderColor = THEME_COLORS[accentColor as keyof typeof THEME_COLORS] || THEME_COLORS.cyan;

  // Scroll-based active tab detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['featured', 'released', 'events', 'fullsets'];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (tabId: string) => {
    const element = document.getElementById(tabId);
    if (element) {
      const offset = 80; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      className={cn(
        'sticky top-0 z-40 backdrop-blur-lg border-b',
        isDark
          ? 'bg-gray-950/90 border-gray-800'
          : 'bg-white/90 border-gray-200'
      )}
    >
      <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 py-3 sm:py-4">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              'pb-2 sm:pb-3 font-medium text-sm sm:text-base transition-all relative',
              activeTab === tab.id
                ? cn(
                    'font-semibold border-b-3',
                    isDark ? 'text-white' : 'text-gray-900',
                    borderColor
                  )
                : cn(
                    'text-gray-400',
                    isDark ? 'hover:text-white' : 'hover:text-gray-700'
                  )
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span
                className={cn(
                  'absolute bottom-0 left-0 right-0 h-0.5 rounded-full',
                  borderColor.replace('border-', 'bg-')
                )}
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
