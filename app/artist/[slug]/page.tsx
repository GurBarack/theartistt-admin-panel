import { notFound } from 'next/navigation';

// Mock function - replace with your actual database call
async function getPageBySlug(slug: string) {
  // TODO: Replace with actual database query
  // const page = await prisma.page.findUnique({ where: { slug } });
  
  // For testing, return mock data
  return {
    slug,
    displayName: 'Test Artist',
    isPublished: true,
    themeMode: 'dark',
    themeColor: 'cyan',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
  };
}

export default async function ArtistPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const page = await getPageBySlug(params.slug);

  if (!page || !page.isPublished) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">{page.displayName}</h1>
        <p className="text-gray-400 mb-8">Welcome to my page!</p>
        <p className="text-sm text-gray-600">
          Subdomain: {params.slug}.theartistt.com
        </p>
      </div>
    </div>
  );
}
