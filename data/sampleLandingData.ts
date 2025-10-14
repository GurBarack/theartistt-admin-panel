export const sampleLandingData = {
  // Hero Section Data
  coverPhotoUrl: '/images/hero-cover.jpg',
  displayName: 'TheArtistt',
  links: [
    { id: 'link-1', platform: 'spotify', url: 'https://open.spotify.com/artist/example', isVisible: true },
    { id: 'link-2', platform: 'apple-music', url: 'https://music.apple.com/artist/example', isVisible: true },
    { id: 'link-3', platform: 'soundcloud', url: 'https://soundcloud.com/example', isVisible: true },
    { id: 'link-4', platform: 'youtube', url: 'https://youtube.com/@example', isVisible: true },
    { id: 'link-5', platform: 'beatport', url: 'https://beatport.com/artist/example', isVisible: true },
    { id: 'link-6', platform: 'website', url: 'https://example.com', isVisible: true },
  ],
  socialLinks: [
    { id: 'social-1', platform: 'instagram', url: 'https://instagram.com/example' },
    { id: 'social-2', platform: 'facebook', url: 'https://facebook.com/example' },
    { id: 'social-3', platform: 'tiktok', url: 'https://tiktok.com/@example' },
  ],
  customButtons: [
    { id: 'btn-1', text: 'For Booking ©', url: 'mailto:booking@example.com', style: 'primary' },
    { id: 'btn-2', text: 'Send Music', url: 'mailto:music@example.com', style: 'secondary' },
  ],
  themeMode: 'dark' as const,
  
  // Content Sections Data
  featuredItems: [
    {
      id: 'featured-1',
      title: 'Diamonds is OUT!',
      subtitle: 'My new track just released in Maccabi House. Yay',
      imageUrl: '/images/featured-diamonds.jpg',
      ctaUrl: 'https://example.com/diamonds'
    }
  ],
  tracks: [
    {
      id: 'track-1',
      name: 'Midnight Vibes',
      credits: 'Produced by TheArtistt • Mixed by StudioX',
      artworkUrl: '/images/album-midnight.jpg',
      order: 0
    },
    {
      id: 'track-2',
      name: 'Summer Nights',
      credits: 'Feat. Vocalist • Remix by DJ Producer',
      artworkUrl: '/images/album-summer.jpg',
      order: 1
    },
    {
      id: 'track-3',
      name: 'Deep House Sessions',
      credits: 'Live Recording • Club Mix',
      artworkUrl: '/images/album-deep.jpg',
      order: 2
    },
    {
      id: 'track-4',
      name: 'Electronic Dreams',
      credits: 'Original Mix • Released 2024',
      artworkUrl: '/images/album-dreams.jpg',
      order: 3
    }
  ],
  events: [
    {
      id: 'event-1',
      name: 'Discoteca',
      venue: 'Unknown Location',
      date: '16.02.2025',
      time: '22:00'
    },
    {
      id: 'event-2',
      name: 'Club Night',
      venue: 'The Underground',
      date: '23.02.2025',
      time: '21:00'
    },
    {
      id: 'event-3',
      name: 'Festival Set',
      venue: 'Music Festival Grounds',
      date: '01.03.2025',
      time: '20:00'
    }
  ],
  fullSets: [
    {
      id: 'set-1',
      name: 'Live at Club X',
      date: '15.01.2025',
      location: 'New York, NY',
      thumbnailUrl: '/images/set-club-x.jpg',
      badgeText: 'LIVE SET'
    },
    {
      id: 'set-2',
      name: 'Festival Performance',
      date: '10.01.2025',
      location: 'Miami, FL',
      thumbnailUrl: '/images/set-festival.jpg',
      badgeText: 'DISCOTECA'
    },
    {
      id: 'set-3',
      name: 'Studio Session',
      date: '05.01.2025',
      location: 'Los Angeles, CA',
      thumbnailUrl: '/images/set-studio.jpg',
      badgeText: 'LIVE SET'
    },
    {
      id: 'set-4',
      name: 'Radio Show',
      date: '01.01.2025',
      location: 'Online',
      thumbnailUrl: '/images/set-radio.jpg',
      badgeText: 'DISCOTECA'
    }
  ]
};
