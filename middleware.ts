import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    // Temporarily disable middleware to test onboarding
    // '/((?!api|_next/static|_next/image|favicon.ico|onboarding|admin|marketing).*)',
  ],
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';
  
  console.log('🔍 Middleware - Hostname:', hostname);
  
  // Extract subdomain
  const subdomain = getSubdomain(hostname);
  console.log('🌐 Subdomain detected:', subdomain);

  // Handle admin subdomain
  if (subdomain === 'admin') {
    console.log('📊 Routing to admin panel');
    // Already on correct path
    if (url.pathname.startsWith('/admin')) {
      return NextResponse.next();
    }
    // Redirect root to admin
    if (url.pathname === '/') {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
    return NextResponse.next();
  }

  // Handle www - redirect to root
  if (subdomain === 'www') {
    const newUrl = new URL(req.url);
    newUrl.hostname = hostname.replace('www.', '');
    return NextResponse.redirect(newUrl, 301);
  }

  // Handle root domain (yourdomain.com)
  if (!subdomain) {
    console.log('🏠 Routing to marketing page');
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL('/marketing', req.url));
    }
    return NextResponse.next();
  }

  // Handle artist subdomains
  console.log('🎵 Routing to artist page:', subdomain);
  return NextResponse.rewrite(new URL(`/artist/${subdomain}`, req.url));
}

function getSubdomain(hostname: string): string | null {
  // Remove port
  const host = hostname.split(':')[0];
  
  // For localhost/127.0.0.1
  if (host.includes('localhost') || host.includes('127.0.0.1')) {
    return null;
  }

  // Split by dots
  const parts = host.split('.');
  
  // theartistt.com → null
  // admin.theartistt.com → 'admin'
  // roiko-music.theartistt.com → 'roiko-music'
  
  if (parts.length >= 3) {
    return parts[0];
  }

  return null;
}
