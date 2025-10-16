'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/admin/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    const checkAuthAndOnboarding = async () => {
      if (status === 'loading') return;

      // If not authenticated, redirect to signin
      if (!session) {
        router.push('/auth/signin');
        return;
      }

      // Check if user has any published pages (indicates completed onboarding)
      try {
        console.log('🔍 Admin Layout - Checking pages for user:', session.user?.email);
        const response = await fetch('/api/pages/list');
        console.log('🔍 Admin Layout - Pages API response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('🔍 Admin Layout - Pages data:', data);
          const hasPages = data.pages && data.pages.length > 0;
          console.log('🔍 Admin Layout - Has pages:', hasPages);
          setHasCompletedOnboarding(hasPages);
          
          if (!hasPages) {
            console.log('🔍 Admin Layout - No pages found, redirecting to onboarding');
            router.push('/onboarding');
            return;
          } else {
            console.log('🔍 Admin Layout - Pages found, showing admin dashboard');
          }
        } else {
          console.log('🔍 Admin Layout - Pages API failed, redirecting to onboarding');
          // If API fails, assume user needs onboarding
          setHasCompletedOnboarding(false);
          router.push('/onboarding');
          return;
        }
      } catch (error) {
        console.error('🔍 Admin Layout - Error checking pages:', error);
        // If API fails, assume user needs onboarding
        setHasCompletedOnboarding(false);
        router.push('/onboarding');
        return;
      }

      setIsCheckingOnboarding(false);
    };

    checkAuthAndOnboarding();
  }, [session, status, router]);

  // Show loading while checking authentication and onboarding
  if (status === 'loading' || isCheckingOnboarding) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render anything (will redirect)
  if (!session) {
    return null;
  }

  // If not onboarded, don't render anything (will redirect)
  if (!hasCompletedOnboarding) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-950">
      <Sidebar />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
