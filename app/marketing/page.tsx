import Link from 'next/link';

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 flex items-center justify-center">
      <div className="text-center text-white px-6">
        <h1 className="text-6xl font-bold mb-6">The Artist</h1>
        <p className="text-2xl mb-12">Your Music, Your Brand, One Link</p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="https://admin.theartistt.com/register"
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100"
          >
            Get Started Free
          </Link>
          <Link 
            href="https://admin.theartistt.com/login"
            className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
