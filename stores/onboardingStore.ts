import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingData {
  // Step 1
  artistName: string;
  slug: string;
  
  // Step 2
  genre: string;
  bio: string;
  
  // Step 3
  connectedPlatforms: {
    spotify?: { connected: boolean; tracks: any[] };
    soundcloud?: { connected: boolean; tracks: any[] };
    youtube?: { connected: boolean; tracks: any[] };
  };
  
  // Step 4
  themeColor: string;
  themeMode: 'dark' | 'light';
  coverPhotoUrl?: string;
  
  // Step 5
  socialLinks: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
}

interface OnboardingState {
  currentStep: number;
  data: OnboardingData;
  isComplete: boolean;
  
  // Actions
  setCurrentStep: (step: number) => void;
  updateData: (data: Partial<OnboardingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  completeOnboarding: () => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      currentStep: 0,
      data: {
        artistName: '',
        slug: '',
        genre: '',
        bio: '',
        connectedPlatforms: {},
        themeColor: 'cyan',
        themeMode: 'dark',
        socialLinks: {},
      },
      isComplete: false,
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      updateData: (newData) =>
        set((state) => ({
          data: { ...state.data, ...newData },
        })),
      
      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, 5),
        })),
      
      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 0),
        })),
      
      completeOnboarding: () => set({ isComplete: true }),
      
      reset: () =>
        set({
          currentStep: 0,
          data: {
            artistName: '',
            slug: '',
            genre: '',
            bio: '',
            connectedPlatforms: {},
            themeColor: 'cyan',
            themeMode: 'dark',
            socialLinks: {},
          },
          isComplete: false,
        }),
    }),
    {
      name: 'onboarding-storage',
    }
  )
);
