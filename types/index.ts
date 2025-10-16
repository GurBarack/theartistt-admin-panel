export interface Page {
  id: string;
  slug: string;
  displayName: string;
  coverPhotoUrl?: string;
  themeColor: 'cyan' | 'pink' | 'purple' | 'orange' | 'green';
  themeMode: 'dark' | 'light';
  coverPhotoShape?: 'triangle' | 'starburst' | 'square';
  isPublished: boolean;
  isDraft: boolean;
}

export interface Section {
  id: string;
  name: string;
  order: number;
  isFixed: boolean;
}

export interface Link {
  id: string;
  pageId: string;
  platform: 'spotify' | 'apple-music' | 'soundcloud' | 'beatport' | 'youtube' | 'youtube-music';
  url: string;
  isVisible: boolean;
  order: number;
}

export interface SocialLink {
  id: string;
  pageId: string;
  platform: 'instagram' | 'facebook' | 'tiktok';
  url: string;
}

export interface CustomButton {
  id: string;
  pageId: string;
  text: string;
  url: string;
  style: 'primary' | 'secondary';
  order: number;
}

export interface FeaturedItem {
  id: string;
  pageId: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  ctaUrl?: string;
  order: number;
}

export interface Track {
  id: string;
  pageId: string;
  name: string;
  credits?: string;
  artworkUrl: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  beatportUrl?: string;
  youtubeUrl?: string;
  youtubeMusicUrl?: string;
  soundcloudUrl?: string;
  order: number;
}

export interface Event {
  id: string;
  pageId: string;
  title: string;
  date: string;
  location?: string;
  url?: string;
  order: number;
}

export interface FullSet {
  id: string;
  pageId: string;
  title: string;
  url: string;
  thumbnailUrl?: string;
  date?: string;
  location?: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  beatportUrl?: string;
  youtubeUrl?: string;
  youtubeMusicUrl?: string;
  soundcloudUrl?: string;
  order: number;
}
