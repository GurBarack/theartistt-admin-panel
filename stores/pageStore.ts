import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Page, Link, SocialLink, CustomButton, FeaturedItem, Track, Event, FullSet, Section } from '@/types';

interface PageState {
  page: Page | null;
  links: Link[];
  socialLinks: SocialLink[];
  customButtons: CustomButton[];
  featuredItems: FeaturedItem[];
  tracks: Track[];
  events: Event[];
  fullSets: FullSet[];
  sectionOrder: Section[] | null;
  isDraft: boolean;
  
  // Actions
  setPage: (page: Page) => void;
  setLinks: (links: Link[]) => void;
  updateLink: (id: string, updates: Partial<Link>) => void;
  reorderLinks: (fromIndex: number, toIndex: number) => void;
  reorderTracks: (fromIndex: number, toIndex: number) => void;
  setSocialLinks: (socialLinks: SocialLink[]) => void;
  setCustomButtons: (buttons: CustomButton[]) => void;
  setFeaturedItems: (items: FeaturedItem[]) => void;
  setTracks: (tracks: Track[]) => void;
  setEvents: (events: Event[]) => void;
  setFullSets: (sets: FullSet[]) => void;
  setSectionOrder: (sections: Section[]) => void;
  setIsDraft: (isDraft: boolean) => void;
}

export const usePageStore = create<PageState>()(
  persist(
    (set) => ({
  page: {
    id: '1',
    slug: 'sample-artist',
    displayName: 'Sample Artist',
    themeColor: 'cyan',
    themeMode: 'dark',
    isPublished: false,
    isDraft: false,
  },
  links: [
    {
      id: '1',
      pageId: '1',
      platform: 'spotify',
      url: 'https://open.spotify.com/artist/sample',
      isVisible: true,
      order: 0,
    },
    {
      id: '2',
      pageId: '1',
      platform: 'soundcloud',
      url: 'https://soundcloud.com/sample',
      isVisible: true,
      order: 1,
    },
    {
      id: '3',
      pageId: '1',
      platform: 'apple-music',
      url: 'https://music.apple.com/artist/sample',
      isVisible: true,
      order: 2,
    },
    {
      id: '4',
      pageId: '1',
      platform: 'beatport',
      url: 'https://beatport.com/artist/sample',
      isVisible: true,
      order: 3,
    },
    {
      id: '5',
      pageId: '1',
      platform: 'youtube-music',
      url: 'https://music.youtube.com/channel/sample',
      isVisible: true,
      order: 4,
    },
    {
      id: '6',
      pageId: '1',
      platform: 'youtube',
      url: 'https://youtube.com/@sample',
      isVisible: true,
      order: 5,
    },
  ],
  socialLinks: [
    {
      id: '1',
      pageId: '1',
      platform: 'instagram',
      url: 'https://instagram.com/sample',
    },
    {
      id: '2',
      pageId: '1',
      platform: 'facebook',
      url: 'https://facebook.com/sample',
    },
    {
      id: '3',
      pageId: '1',
      platform: 'tiktok',
      url: 'https://tiktok.com/@sample',
    },
  ],
  customButtons: [
    {
      id: '1',
      pageId: '1',
      text: 'For Booking ©',
      url: 'mailto:booking@sample.com',
      style: 'primary',
      order: 0,
    },
    {
      id: '2',
      pageId: '1',
      text: 'Send Music',
      url: 'mailto:music@sample.com',
      style: 'secondary',
      order: 1,
    },
  ],
  featuredItems: [],
  tracks: [],
  events: [],
  fullSets: [],
  sectionOrder: null,
  isDraft: false,

  setPage: (page) => set({ page }),
  setLinks: (links) => set({ links, isDraft: true }),
  updateLink: (id, updates) =>
    set((state) => ({
      links: state.links.map((link) =>
        link.id === id ? { ...link, ...updates } : link
      ),
      isDraft: true,
    })),
  reorderLinks: (fromIndex, toIndex) =>
    set((state) => {
      const newLinks = [...state.links];
      const [removed] = newLinks.splice(fromIndex, 1);
      newLinks.splice(toIndex, 0, removed);
      // Update order values
      const updatedLinks = newLinks.map((link, index) => ({ ...link, order: index }));
      return { links: updatedLinks, isDraft: true };
    }),
  reorderTracks: (fromIndex, toIndex) =>
    set((state) => {
      const newTracks = [...state.tracks];
      const [removed] = newTracks.splice(fromIndex, 1);
      newTracks.splice(toIndex, 0, removed);
      // Update order values
      const updatedTracks = newTracks.map((track, index) => ({ ...track, order: index }));
      return { tracks: updatedTracks, isDraft: true };
    }),
  setSocialLinks: (socialLinks) => set({ socialLinks, isDraft: true }),
  setCustomButtons: (customButtons) => set({ customButtons, isDraft: true }),
  setFeaturedItems: (featuredItems) => set({ featuredItems, isDraft: true }),
  setTracks: (tracks) => set({ tracks, isDraft: true }),
  setEvents: (events) => set({ events, isDraft: true }),
  setFullSets: (fullSets) => set({ fullSets, isDraft: true }),
  setSectionOrder: (sections) => set({ sectionOrder: sections, isDraft: true }),
  setIsDraft: (isDraft) => set({ isDraft }),
    }),
    {
      name: 'music-admin-store', // unique name for localStorage key
      partialize: (state) => ({
        page: state.page,
        links: state.links,
        socialLinks: state.socialLinks,
        customButtons: state.customButtons,
        featuredItems: state.featuredItems,
        tracks: state.tracks,
        events: state.events,
        fullSets: state.fullSets,
        sectionOrder: state.sectionOrder,
        // Don't persist isDraft as it should reset on page load
      }),
    }
  )
);
