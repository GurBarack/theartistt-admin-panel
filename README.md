# Music Landing Page Admin Panel

A comprehensive admin panel for building music landing pages (link-in-bio platform for musicians). Users can manage content, customize themes, and preview changes in real-time on a mobile mockup.

## Features

- **Content Management**: Cover photos, links, social media, custom buttons, featured items, tracks, events, and full sets
- **Theme Customization**: Color schemes, dark/light mode, and cover photo shapes
- **Real-time Preview**: Mobile mockup that updates as you make changes
- **Drag & Drop**: Reorder links and content sections
- **Draft System**: Track unpublished changes with visual indicators

## Tech Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** for styling
- **Shadcn/ui + Radix UI** for components
- **Zustand** for state management
- **@dnd-kit** for drag and drop functionality
- **React Hook Form + Zod** for form handling
- **TanStack Query** for API calls
- **Lucide React** for icons

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
├── (dashboard)/
│   └── admin/
│       ├── layout.tsx
│       ├── page.tsx
│       └── editor/
│           └── page.tsx
├── layout.tsx
└── page.tsx

components/
├── ui/                           # Shadcn components
├── admin/
│   ├── Sidebar.tsx
│   ├── DraftIndicator.tsx
│   ├── content-sections/         # Content management sections
│   ├── theme-sections/           # Theme customization
│   └── preview/
│       └── MobilePreview.tsx

stores/
└── pageStore.ts                  # Zustand store

types/
└── index.ts                      # TypeScript definitions
```

## Usage

1. **Content Tab**: Manage all your content sections
   - Upload cover photos
   - Add and reorder platform links
   - Configure social media links
   - Create custom buttons
   - Add featured items, tracks, events, and full sets

2. **Theme Tab**: Customize the appearance
   - Choose color schemes
   - Toggle between dark and light modes
   - Select cover photo shapes

3. **Preview**: See real-time changes in the mobile mockup

## Development Notes

- All sections follow a consistent pattern with accordion layouts
- Draft state is managed globally and persists until changes are saved
- Drag and drop is implemented using @dnd-kit
- API integration points are marked with TODO comments
- The mobile preview updates automatically based on store changes

## Future Enhancements

- Backend API integration
- Image upload functionality
- User authentication
- Multiple page management
- Analytics dashboard
- Export functionality