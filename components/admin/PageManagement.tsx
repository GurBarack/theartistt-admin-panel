'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, ExternalLink, Eye, EyeOff, Calendar, BarChart3, Link as LinkIcon, Music, Calendar as CalendarIcon, Play } from 'lucide-react';

interface Page {
  id: string;
  slug: string;
  displayName: string;
  url: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  themeColor: string;
  coverPhotoUrl?: string;
  stats: {
    links: number;
    socialLinks: number;
    tracks: number;
    events: number;
    fullSets: number;
  };
}

interface PageManagementProps {
  userEmail: string;
}

export function PageManagement({ userEmail }: PageManagementProps) {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchPages();
  }, [userEmail]);

  const fetchPages = async () => {
    try {
      const response = await fetch(`/api/pages/list?email=${encodeURIComponent(userEmail)}`);
      const data = await response.json();
      
      if (data.success) {
        setPages(data.pages);
      } else {
        console.error('Failed to fetch pages:', data.error);
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePage = async (pageId: string, pageName: string) => {
    if (!confirm(`Are you sure you want to delete "${pageName}"? This action cannot be undone.`)) {
      return;
    }

    setDeleting(pageId);
    try {
      const response = await fetch(`/api/pages/delete?pageId=${pageId}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPages(pages.filter(page => page.id !== pageId));
        alert(data.message);
      } else {
        alert(`Failed to delete page: ${data.error}`);
      }
    } catch (error) {
      console.error('Error deleting page:', error);
      alert('Failed to delete page. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getThemeColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      cyan: 'bg-cyan-500',
      pink: 'bg-pink-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      green: 'bg-green-500',
      blue: 'bg-blue-500',
      red: 'bg-red-500',
    };
    return colorMap[color] || 'bg-cyan-500';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-6">Your Pages</h2>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
        </div>
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-6">Your Pages</h2>
        <div className="text-center py-12 bg-gray-900/50 rounded-xl border border-gray-700">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-xl font-semibold text-white mb-2">No pages created yet</h3>
          <p className="text-gray-400 mb-6">Create your first artist page to get started</p>
          <Button 
            onClick={() => window.location.href = '/onboarding'}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
          >
            Create Your First Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Your Pages</h2>
        <Button 
          onClick={() => window.location.href = '/onboarding'}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
        >
          Create New Page
        </Button>
      </div>

      <div className="grid gap-6">
        {pages.map((page) => (
          <div
            key={page.id}
            className="bg-gray-900/50 rounded-xl border border-gray-700 p-6 hover:border-gray-600 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                {/* Cover Photo or Theme Color */}
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  {page.coverPhotoUrl ? (
                    <img
                      src={page.coverPhotoUrl}
                      alt={page.displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full ${getThemeColorClass(page.themeColor)} flex items-center justify-center text-white font-bold text-xl`}>
                      {page.displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Page Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-white">{page.displayName}</h3>
                    <div className="flex items-center gap-1">
                      {page.isPublished ? (
                        <span className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                          <Eye className="w-3 h-3" />
                          Published
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs">
                          <EyeOff className="w-3 h-3" />
                          Draft
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-cyan-400 font-mono text-sm mb-2">{page.url}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Created {formatDate(page.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart3 className="w-4 h-4" />
                      Updated {formatDate(page.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => window.open(page.url, '_blank')}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:border-gray-500"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button
                  onClick={() => handleDeletePage(page.id, page.displayName)}
                  variant="outline"
                  size="sm"
                  disabled={deleting === page.id}
                  className="border-red-600 text-red-400 hover:border-red-500 hover:bg-red-500/10"
                >
                  {deleting === page.id ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-400"></div>
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <LinkIcon className="w-4 h-4" />
                {page.stats.links} links
              </div>
              <div className="flex items-center gap-1">
                <Music className="w-4 h-4" />
                {page.stats.tracks} tracks
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                {page.stats.events} events
              </div>
              <div className="flex items-center gap-1">
                <Play className="w-4 h-4" />
                {page.stats.fullSets} sets
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-gray-500 text-sm">
        {pages.length} page{pages.length !== 1 ? 's' : ''} total
      </div>
    </div>
  );
}
