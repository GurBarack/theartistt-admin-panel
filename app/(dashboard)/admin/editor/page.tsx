'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { HeroSection } from '@/components/admin/content-sections/HeroSection';
import { SectionReorder } from '@/components/admin/content-sections/SectionReorder';
import { CoverPhotoSection } from '@/components/admin/content-sections/CoverPhotoSection';
import { LinksSection } from '@/components/admin/content-sections/LinksSection';
import { SocialLinksSection } from '@/components/admin/content-sections/SocialLinksSection';
import { CustomButtonsSection } from '@/components/admin/content-sections/CustomButtonsSection';
import { FeaturedSection } from '@/components/admin/content-sections/FeaturedSection';
import { TracksSection } from '@/components/admin/content-sections/TracksSection';
import { EventsSection } from '@/components/admin/content-sections/EventsSection';
import { FullSetsSection } from '@/components/admin/content-sections/FullSetsSection';
import { ColorPicker } from '@/components/admin/theme-sections/ColorPicker';
import { ModeToggle } from '@/components/admin/theme-sections/ModeToggle';
import { ShapeSelector } from '@/components/admin/theme-sections/ShapeSelector';
import { MobilePreview } from '@/components/admin/preview/MobilePreview';
import { DraftIndicator } from '@/components/admin/DraftIndicator';
import { usePageStore } from '@/stores/pageStore';
import { Save, Loader2 } from 'lucide-react';

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState<'content' | 'theme'>('content');
  const { page, isDraft, isLoading, loadPageFromDatabase, savePageToDatabase } = usePageStore();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Load user email and page data on mount
  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    console.log('🔍 Admin Editor - User email from localStorage:', email);
    if (email) {
      setUserEmail(email);
      console.log('🔄 Admin Editor - Loading page data...');
      loadPageFromDatabase(email);
    } else {
      console.log('❌ Admin Editor - No user email found in localStorage');
      // For testing, set the email manually and load the gurba page
      const testEmail = 'gurrbb@gmail.com';
      const gurbaPageId = 'cmgsp1i35003buy4ynn9don6l';
      console.log('🧪 Admin Editor - Using test email:', testEmail);
      console.log('🧪 Admin Editor - Loading gurba page:', gurbaPageId);
      setUserEmail(testEmail);
      loadPageFromDatabase(testEmail, gurbaPageId);
    }
  }, [loadPageFromDatabase]);

  // Debug: Log current page state
  useEffect(() => {
    console.log('🔍 Admin Editor - Current page state:', page);
  }, [page]);

  const handleSave = async () => {
    if (!userEmail) return;
    
    const success = await savePageToDatabase(userEmail);
    if (success) {
      alert('Page saved successfully!');
    } else {
      alert('Failed to save page. Please try again.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Left Panel - Editor */}
      <div className="w-full lg:w-[60%] xl:w-[65%] overflow-y-auto bg-gray-900 p-4 lg:p-6">
        <div className="mb-4 lg:mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-white">Admin Panel</h1>
            {page ? (
              <p className="text-sm text-gray-400 mt-1">
                Editing: {page.displayName} ({page.slug})
              </p>
            ) : (
              <p className="text-sm text-gray-400 mt-1">
                {isLoading ? 'Loading page data...' : 'No page loaded'}
              </p>
            )}
          </div>
          <Button 
            onClick={handleSave}
            disabled={isLoading || !isDraft}
            className="bg-cyan-500 hover:bg-cyan-600 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'content' | 'theme')}>
          <TabsList className="grid w-full grid-cols-2 mb-4 lg:mb-6">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-3 lg:space-y-4">
            <HeroSection />
            <SectionReorder />
            <LinksSection />
            <SocialLinksSection />
            <CustomButtonsSection />
            <FeaturedSection />
            <TracksSection />
            <EventsSection />
            <FullSetsSection />
          </TabsContent>

          <TabsContent value="theme" className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4 lg:p-6">
              <h2 className="text-lg lg:text-xl font-semibold text-white mb-4 lg:mb-6">Theme</h2>
              <div className="space-y-4 lg:space-y-6">
                <ColorPicker />
                <ModeToggle />
                <ShapeSelector />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Right Panel - Preview */}
      <div className="w-full lg:w-[40%] xl:w-[35%] bg-gray-950 flex items-center justify-center p-4 lg:p-8 relative min-h-[400px] lg:min-h-0">
        <div className="text-center mb-4 absolute top-4 lg:top-6 left-0 right-0 flex justify-between items-center px-4">
          <h3 className="text-base lg:text-lg font-semibold text-white">Preview</h3>
          <a 
            href="/live-demo" 
            target="_blank"
            className="bg-cyan-400 text-gray-900 px-3 py-2 lg:px-4 rounded-full text-xs lg:text-sm font-semibold hover:bg-cyan-300 transition-colors"
          >
            View Live Demo
          </a>
        </div>
        <div className="scale-75 lg:scale-100 origin-center">
          <MobilePreview />
        </div>
      </div>

      {/* Draft Indicator */}
      {isDraft && <DraftIndicator />}
    </div>
  );
}
