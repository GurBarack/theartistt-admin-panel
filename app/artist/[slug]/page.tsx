import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

// Get page data from database
async function getPageBySlug(slug: string) {
  const page = await prisma.page.findUnique({
    where: { slug },
    include: {
      links: { orderBy: { order: 'asc' } },
      socialLinks: true,
      customButtons: { orderBy: { order: 'asc' } },
      featuredItems: { orderBy: { order: 'asc' } },
      tracks: { orderBy: { order: 'asc' } },
      events: { orderBy: { order: 'asc' } },
      fullSets: { orderBy: { order: 'asc' } },
    },
  });
  
  return page;
}

export default async function ArtistPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page || !page.isPublished) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">{page.displayName}</h1>
        <p className="text-gray-400 mb-8">Welcome to my page!</p>
        <p className="text-sm text-gray-600">
          Subdomain: {slug}.theartistt.com
        </p>
      </div>
    </div>
  );
}
