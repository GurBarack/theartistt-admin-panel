export default function TestSubdomainPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Subdomain Testing Guide</h1>
        
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">How to Test Subdomains Locally</h2>
            <p className="text-gray-300 mb-4">
              To test subdomains on localhost, you need to modify your hosts file and use a different port setup.
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Option 1: Use ngrok (Recommended)</h3>
                <div className="bg-gray-700 p-4 rounded">
                  <code className="text-green-400">
                    1. Install ngrok: npm install -g ngrok<br/>
                    2. Run: ngrok http 3001<br/>
                    3. Use the ngrok URL: https://abc123.ngrok.io<br/>
                    4. Test: https://gurba.abc123.ngrok.io
                  </code>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Option 2: Modify hosts file</h3>
                <div className="bg-gray-700 p-4 rounded">
                  <code className="text-green-400">
                    1. Edit /etc/hosts (Mac/Linux) or C:\Windows\System32\drivers\etc\hosts (Windows)<br/>
                    2. Add: 127.0.0.1 gurba.localhost<br/>
                    3. Access: http://gurba.localhost:3001
                  </code>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Option 3: Direct URL (Current)</h3>
                <div className="bg-gray-700 p-4 rounded">
                  <code className="text-green-400">
                    Direct access: http://localhost:3001/artist/gurba<br/>
                    This works but doesn't test subdomain routing
                  </code>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Current Status</h2>
            <div className="space-y-2">
              <p>✅ Artist page exists: <a href="/artist/gurba" className="text-cyan-400 hover:underline">/artist/gurba</a></p>
              <p>✅ Admin panel works: <a href="/admin/editor" className="text-cyan-400 hover:underline">/admin/editor</a></p>
              <p>✅ Data loading correctly</p>
              <p>⚠️ Subdomain routing needs proper setup</p>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Test Your Pages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href="/artist/gurba" 
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg text-center transition-colors"
              >
                View Artist Page
              </a>
              <a 
                href="/admin/editor" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-center transition-colors"
              >
                Open Admin Panel
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}