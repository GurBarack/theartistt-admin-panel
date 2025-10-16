'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if we're on the app subdomain
    const hostname = window.location.hostname;
    const isAppSubdomain = hostname.startsWith('app.') || hostname === 'app.localhost';
    
    if (isAppSubdomain) {
      // On app subdomain, redirect to admin
      router.push('/admin');
    } else {
      // On root domain, redirect to marketing (handled by middleware)
      router.push('/marketing');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-4">The Artist</h1>
        <p className="text-gray-400">Redirecting...</p>
      </div>
    </div>
  );
}