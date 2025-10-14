import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Artist page not found</p>
        <Link 
          href="https://admin.theartistt.com"
          className="bg-cyan-500 text-white px-6 py-3 rounded-full hover:bg-cyan-600"
        >
          Go to Admin Panel
        </Link>
      </div>
    </div>
  );
}
