# Landing Page Components

This directory contains reusable landing page components for the music admin panel. Each component is designed to be modular, customizable, and follows the design specifications provided.

## Components Overview

### 1. FeaturedSection
Large hero card showcasing featured content with background image and call-to-action button.

**Props:**
- `items: FeaturedItem[]` - Array of featured items
- `accentColor: string` - CSS class for accent color (e.g., 'bg-cyan-400')
- `onItemClick: (itemId: string) => void` - Click handler

### 2. ReleasedSection
Vertical list of released tracks with album artwork and play buttons.

**Props:**
- `tracks: Track[]` - Array of track objects
- `onSeeAll: () => void` - "See All" click handler
- `onTrackClick: (trackId: string) => void` - Track click handler

### 3. EventsSection
Vertical list of upcoming events with date, venue, and time information.

**Props:**
- `events: Event[]` - Array of event objects
- `onSeeAll: () => void` - "See All" click handler
- `onEventClick: (eventId: string) => void` - Event click handler

### 4. FullSetsSection
Horizontal scrollable carousel of full set cards with background images and badges.

**Props:**
- `sets: FullSet[]` - Array of full set objects
- `onSeeAll: () => void` - "See All" click handler
- `onCardClick: (setId: string) => void` - Card click handler

### 5. SeeAllLink
Reusable "See All" button component with chevron icon.

**Props:**
- `onClick: () => void` - Click handler
- `className?: string` - Additional CSS classes

### 6. LandingPageContent
Main component that integrates all sections with sample data and handlers.

**Props:**
- `data: LandingPageData` - Complete landing page data
- `themeColor: 'cyan' | 'pink' | 'purple' | 'orange' | 'green'` - Theme color

## Data Types

```typescript
interface FeaturedItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaUrl?: string;
}

interface Track {
  id: string;
  name: string;
  credits: string;
  artworkUrl: string;
}

interface Event {
  id: string;
  name: string;
  venue: string;
  date: string; // "16.02.2025"
  time: string; // "22:00"
}

interface FullSet {
  id: string;
  name: string;
  date: string;
  location: string;
  thumbnailUrl: string;
  badgeText: string;
}
```

## Usage Examples

### Basic Usage
```tsx
import { LandingPageContent } from '@/components/landing';
import { sampleLandingData } from '@/data/sampleLandingData';

export default function MyLandingPage() {
  return (
    <LandingPageContent 
      data={sampleLandingData} 
      themeColor="cyan" 
    />
  );
}
```

### Individual Components
```tsx
import { FeaturedSection, ReleasedSection } from '@/components/landing';

export default function CustomPage() {
  const handleFeaturedClick = (id: string) => {
    // Handle featured item click
  };

  return (
    <div>
      <FeaturedSection
        items={featuredItems}
        accentColor="bg-pink-400"
        onItemClick={handleFeaturedClick}
      />
      <ReleasedSection
        tracks={tracks}
        onSeeAll={() => console.log('See all tracks')}
        onTrackClick={(id) => console.log('Track clicked:', id)}
      />
    </div>
  );
}
```

## Styling Notes

### Horizontal Scroll
The FullSetsSection uses CSS scroll-snap for smooth carousel behavior:
- `scroll-snap-type: x mandatory` on container
- `scroll-snap-align: start` on cards
- Hidden scrollbar with custom CSS

### Responsive Design
All components are mobile-first and responsive:
- Cards stack vertically on mobile
- Horizontal scroll works with touch gestures
- Text truncates appropriately on small screens

### Theme Colors
Supported accent colors:
- `bg-cyan-400` (default)
- `bg-pink-400`
- `bg-purple-400`
- `bg-orange-400`
- `bg-green-400`

## Demo Page

Visit `/landing-demo` to see all components in action with sample data.

## Customization

### Adding New Sections
1. Create new component in this directory
2. Follow the same prop pattern (data, onSeeAll, onItemClick)
3. Export from `index.ts`
4. Add to `LandingPageContent` if needed

### Modifying Styles
All components use Tailwind CSS classes. Key classes to modify:
- Background: `bg-gray-950` (main), `bg-gray-900` (cards)
- Text: `text-white` (primary), `text-gray-400` (secondary)
- Borders: `border-gray-800`
- Accent: Use theme color classes

### Adding Interactions
Each component accepts click handlers for:
- Individual item clicks
- "See All" button clicks
- Custom interactions (hover, focus, etc.)

## Dependencies

- Next.js Image component
- Lucide React icons
- Tailwind CSS
- TypeScript

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Touch devices with scroll-snap support
- Mobile-first responsive design
