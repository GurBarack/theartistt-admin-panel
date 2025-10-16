'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  coverPhotoUrl?: string;
  displayName: string;
  links: Array<{ id: string; platform: string; url: string; isVisible: boolean }>;
  socialLinks: Array<{ id: string; platform: string; url: string }>;
  customButtons: Array<{ id: string; text: string; url: string; style: string }>;
  themeColor: string;
  themeMode: 'dark' | 'light';
}

const THEME_COLORS = {
  cyan: 'bg-cyan-400',
  pink: 'bg-pink-400',
  purple: 'bg-purple-400',
  orange: 'bg-orange-400',
  green: 'bg-green-400',
};

const PLATFORM_ICONS = {
  spotify: '/icons/spotify.svg',
  soundcloud: '/icons/soundcloud.svg',
  'apple-music': '/icons/apple-music.svg',
  beatport: '/icons/beatport.svg',
  'youtube-music': '/icons/youtube-music.svg',
  youtube: '/icons/youtube.svg',
  instagram: '/icons/instagram.svg',
  facebook: '/icons/facebook.svg',
  tiktok: '/icons/tiktok.svg',
};

// Define explicit order for platforms
const PLATFORM_ORDER_ROW1 = ['spotify', 'soundcloud', 'apple-music', 'beatport', 'youtube-music', 'youtube'];
const PLATFORM_ORDER_ROW2 = ['instagram', 'facebook', 'tiktok'];

export function HeroSection({
  coverPhotoUrl,
  displayName,
  links,
  socialLinks,
  customButtons,
  themeColor,
  themeMode,
}: HeroSectionProps) {
  const accentColor = THEME_COLORS[themeColor as keyof typeof THEME_COLORS] || THEME_COLORS.cyan;
  const isDark = themeMode === 'dark';

  // Filter and order platform links for Row 1
  const row1Links = PLATFORM_ORDER_ROW1
    .map(platform => links.find(l => l.platform === platform && l.isVisible))
    .filter((link): link is NonNullable<typeof link> => Boolean(link));

  // Filter and order social links for Row 2
  const row2Links = PLATFORM_ORDER_ROW2
    .map(platform => socialLinks.find(l => l.platform === platform))
    .filter((social): social is NonNullable<typeof social> => Boolean(social));

  return (
    <section className="relative min-h-screen flex items-end justify-center pb-12 sm:pb-16 lg:pb-20">
      {/* Background Image */}
      {coverPhotoUrl ? (
        <Image
          src={coverPhotoUrl}
          alt={displayName || 'Artist cover photo'}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700" />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/95" />

      {/* Content - MAX WIDTH 800PX */}
      <div className="relative z-10 w-full max-w-[800px] px-4 sm:px-6 text-center mx-auto">
        {/* Artist Name */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 drop-shadow-2xl">
          {displayName || 'Artist Name'}
        </h1>
        
        {/* Theme Color Indicator - For Testing */}
        <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
          themeColor === 'cyan' ? 'bg-cyan-400 text-gray-900' :
          themeColor === 'pink' ? 'bg-pink-400 text-gray-900' :
          themeColor === 'purple' ? 'bg-purple-400 text-gray-900' :
          themeColor === 'orange' ? 'bg-orange-400 text-gray-900' :
          themeColor === 'green' ? 'bg-green-400 text-gray-900' :
          'bg-gray-400 text-gray-900'
        }`}>
          Theme: {themeColor || 'default'}
        </div>

        {/* Platform Links - Row 1 */}
        {row1Links.length > 0 && (
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 flex-wrap">
            {row1Links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all"
              >
                <Image
                  src={PLATFORM_ICONS[link.platform as keyof typeof PLATFORM_ICONS]}
                  alt={link.platform}
                  width={18}
                  height={18}
                  className="opacity-90 sm:w-5 sm:h-5"
                />
              </a>
            ))}
          </div>
        )}

        {/* Social Links - Row 2 */}
        {row2Links.length > 0 && (
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 flex-wrap">
            {row2Links.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all"
              >
                <Image
                  src={PLATFORM_ICONS[social.platform as keyof typeof PLATFORM_ICONS]}
                  alt={social.platform}
                  width={18}
                  height={18}
                  className="opacity-90 sm:w-5 sm:h-5"
                />
              </a>
            ))}
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col gap-2 sm:gap-3 w-full max-w-sm sm:max-w-md mx-auto">
          {customButtons.map((button, index) => (
            <a
              key={button.id}
              href={button.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'w-full py-3 sm:py-4 px-4 sm:px-6 rounded-full font-semibold text-base sm:text-lg transition-all active:scale-95',
                index === 0 || button.style === 'primary'
                  ? `${accentColor} text-gray-900 shadow-lg hover:scale-102`
                  : 'bg-gray-800 text-white border-2 border-gray-700 hover:bg-gray-700'
              )}
            >
              {button.text || 'Button Text'}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
