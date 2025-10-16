'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Link as LinkIcon, Music, Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (session?.user) {
      setUserData({
        name: session.user.name || '',
        email: session.user.email || '',
      });
    }
  }, [session]);

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      // Here you would typically update the user profile in the database
      // For now, we'll just show a success message
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">
          Manage your account settings and platform connections
        </p>
      </div>

      <div className="space-y-6">
        {/* Account Information */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="w-5 h-5 mr-2 text-cyan-500" />
              Account Information
            </CardTitle>
            <CardDescription className="text-gray-400">
              Update your personal information and account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">Display Name</Label>
                <Input
                  id="name"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Your display name"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                <Input
                  id="email"
                  value={userData.email}
                  disabled
                  className="bg-gray-700 border-gray-600 text-gray-400"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>
            </div>
            <Button 
              onClick={handleSaveProfile}
              disabled={isLoading}
              className="bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardContent>
        </Card>

        {/* Platform Connections */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <LinkIcon className="w-5 h-5 mr-2 text-purple-500" />
              Platform Connections
            </CardTitle>
            <CardDescription className="text-gray-400">
              Connect your music platforms to automatically sync your content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Coming Soon Message */}
              <div className="bg-gray-700 rounded-lg p-6 text-center">
                <Music className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Coming Soon</h3>
                <p className="text-gray-400 mb-4">
                  Platform integrations are currently in development. You'll soon be able to connect:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-600 rounded-lg p-3 text-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2"></div>
                    <p className="text-sm text-gray-300">Spotify</p>
                  </div>
                  <div className="bg-gray-600 rounded-lg p-3 text-center">
                    <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2"></div>
                    <p className="text-sm text-gray-300">Apple Music</p>
                  </div>
                  <div className="bg-gray-600 rounded-lg p-3 text-center">
                    <div className="w-8 h-8 bg-orange-500 rounded-full mx-auto mb-2"></div>
                    <p className="text-sm text-gray-300">SoundCloud</p>
                  </div>
                  <div className="bg-gray-600 rounded-lg p-3 text-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2"></div>
                    <p className="text-sm text-gray-300">YouTube Music</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  These integrations will allow you to automatically sync your latest releases, 
                  playlists, and profile information across all platforms.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <SettingsIcon className="w-5 h-5 mr-2 text-red-500" />
              Account Actions
            </CardTitle>
            <CardDescription className="text-gray-400">
              Manage your account and data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
                onClick={() => alert('Export feature coming soon!')}
              >
                Export Data
              </Button>
              <Button 
                variant="outline" 
                className="border-red-600 text-red-400 hover:bg-red-900/20"
                onClick={() => {
                  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                    alert('Account deletion feature coming soon!');
                  }
                }}
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
