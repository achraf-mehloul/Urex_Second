import { useState } from 'react';
import { LogIn } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
  onCancel: () => void;
}

export default function AdminLogin({ onLogin, onCancel }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username === 'Ash' && password === 'Ash2004') {
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="max-w-md w-full bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-8 backdrop-blur-xl">
        <div className="text-center mb-8">
          <img
            src="/552102244_1511459556843066_700200828006065403_n-removebg-preview.png"
            alt="Urex Logo"
            className="w-24 h-24 mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Admin Access
          </h2>
          <p className="text-gray-400 mt-2">Enter your credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-yellow-400 mb-2 font-semibold">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-yellow-400 mb-2 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-center">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg text-black font-bold transition-all hover:scale-105"
            >
              <LogIn className="w-5 h-5" />
              Login
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="w-full py-3 border border-yellow-500/30 rounded-lg text-yellow-400 font-bold transition-all hover:bg-yellow-500/10"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
