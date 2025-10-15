'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function TestSubdomainPage() {
  const [testUrl, setTestUrl] = useState('demo-artist.localhost:3000');

  const testSubdomain = () => {
    // Open the subdomain in a new tab
    window.open(`http://${testUrl}`, '_blank');
  };

  const testDirectRoute = () => {
    // Test the direct route
    window.open(`http://localhost:3000/artist/demo-artist`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Subdomain Routing Test</h1>
        
        <div className="space-y-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">How Subdomain Routing Works</h2>
            <div className="space-y-4 text-gray-300">
              <p>1. <strong>Direct Route:</strong> <code className="bg-gray-700 px-2 py-1 rounded">/artist/demo-artist</code></p>
              <p>2. <strong>Subdomain Route:</strong> <code className="bg-gray-700 px-2 py-1 rounded">demo-artist.localhost:3000</code></p>
              <p>3. <strong>Production:</strong> <code className="bg-gray-700 px-2 py-1 rounded">demo-artist.theartistt.com</code></p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Test the Routing</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Test URL:</label>
                <input
                  type="text"
                  value={testUrl}
                  onChange={(e) => setTestUrl(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  placeholder="demo-artist.localhost:3000"
                />
              </div>
              
              <div className="flex gap-4">
                <Button
                  onClick={testSubdomain}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  Test Subdomain Route
                </Button>
                
                <Button
                  onClick={testDirectRoute}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Test Direct Route
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Current Pages in Database</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                <div>
                  <h3 className="font-semibold">Demo Artist</h3>
                  <p className="text-sm text-gray-400">demo-artist.theartistt.com</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => window.open('http://localhost:3000/artist/demo-artist', '_blank')}
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    View Page
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">For Production Testing</h2>
            <div className="space-y-2 text-gray-300">
              <p>To test subdomains in production, you'll need to:</p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Deploy to Vercel with your custom domain</li>
                <li>Set up DNS wildcard records: <code className="bg-gray-700 px-2 py-1 rounded">*.theartistt.com</code></li>
                <li>Visit <code className="bg-gray-700 px-2 py-1 rounded">demo-artist.theartistt.com</code></li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
