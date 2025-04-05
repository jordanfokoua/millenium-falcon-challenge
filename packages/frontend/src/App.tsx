import { useEffect, useState } from 'react';

import { getHealth } from './services/api';

function App() {
  const [health, setHealth] = useState<{ status: string } | null>(null);

  useEffect(() => {
    getHealth().then(response => {
      if (!response.error) {
        setHealth(response.data);
      }
    });
  }, []);

  return (
    <main className="min-h-screen min-w-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full">
        <div className="text-center space-y-6">
          <img src="/assets/images/spaceship.png" alt="Millennium Falcon" className="w-24 h-24 mx-auto" />
          <h1 className="text-3xl font-bold text-gray-900">Millennium Falcon Challenge</h1>

          <div className="flex items-center justify-center space-x-2">
            <span className="text-gray-600">Millennium Falcon status:</span>
            <span className={`font-semibold ${health?.status === 'started' ? 'text-green-600' : 'text-yellow-600'}`}>{health?.status || 'checking...'}</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
