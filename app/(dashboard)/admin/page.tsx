'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, FileText, Settings, Plus, ExternalLink } from 'lucide-react';

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [userPages, setUserPages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserPages = async () => {
      if (!session?.user?.email) return;
      
      try {
        const response = await fetch('/api/pages/list');
        if (response.ok) {
          const data = await response.json();
          setUserPages(data.pages || []);
        }
      } catch (error) {
        console.error('Error fetching pages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPages();
  }, [session]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {session?.user?.name || 'Artist'}!
        </h1>
        <p className="text-gray-400">
          Manage your music page and connect with your audience
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link href="/admin/editor">
          <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="flex items-center mb-4">
              <LayoutDashboard className="w-8 h-8 text-cyan-500 mr-3" />
              <h3 className="text-xl font-semibold text-white">Page Editor</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Customize your music page layout, content, and theme
            </p>
          </div>
        </Link>

        <Link href="/admin/pages">
          <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="flex items-center mb-4">
              <FileText className="w-8 h-8 text-purple-500 mr-3" />
              <h3 className="text-xl font-semibold text-white">Manage Pages</h3>
            </div>
            <p className="text-gray-400 text-sm">
              View and manage all your music pages
            </p>
          </div>
        </Link>

        <Link href="/admin/settings">
          <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="flex items-center mb-4">
              <Settings className="w-8 h-8 text-green-500 mr-3" />
              <h3 className="text-xl font-semibold text-white">Settings</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Account settings and platform connections
            </p>
          </div>
        </Link>
      </div>

      {/* Pages Overview */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Your Pages</h2>
          <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-white">
            <Link href="/admin/editor">
              <Plus className="w-4 h-4 mr-2" />
              Create New Page
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading your pages...</p>
          </div>
        ) : userPages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">You haven't created any pages yet</p>
            <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-white">
              <Link href="/admin/editor">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Page
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userPages.map((page) => (
              <div key={page.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">{page.displayName}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    page.isPublished 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {page.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3">/{page.slug}</p>
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline" className="text-xs">
                    <Link href={`/admin/editor?page=${page.id}`}>
                      Edit
                    </Link>
                  </Button>
                  {page.isPublished && (
                    <Button asChild size="sm" variant="outline" className="text-xs">
                      <a href={`https://${page.slug}.theartistt.com`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
