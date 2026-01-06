'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => {
        setApiResponse(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('API Error:', err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          🐳 Next.js Docker Demo
        </h1>
        
        <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            Docker Concepts Demonstrated:
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Multi-stage Dockerfile for optimization</li>
            <li>Non-root user for security</li>
            <li>Environment variables configuration</li>
            <li>Port mapping and container networking</li>
            <li>Production-ready build process</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            API Response from Container:
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            {loading ? (
              <p className="text-gray-600">Loading API response...</p>
            ) : (
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">Build Image</h3>
            <code className="text-sm bg-gray-100 p-2 rounded block">
              docker build -t nextjs-app .
            </code>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">Run Container</h3>
            <code className="text-sm bg-gray-100 p-2 rounded block">
              docker run -p 3000:3000 nextjs-app
            </code>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">See Running</h3>
            <code className="text-sm bg-gray-100 p-2 rounded block">
              docker ps
            </code>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t">
          <h3 className="text-lg font-semibold mb-2">Docker Commands Used:</h3>
          <div className="space-y-2 text-sm">
            <p><strong>docker --version</strong> - Check Docker installation</p>
            <p><strong>docker images</strong> - List all images</p>
            <p><strong>docker ps -a</strong> - List all containers</p>
            <p><strong>docker logs [container_id]</strong> - View container logs</p>
            <p><strong>docker exec -it [container_id] sh</strong> - Enter container shell</p>
          </div>
        </div>
      </div>
    </main>
  );
}