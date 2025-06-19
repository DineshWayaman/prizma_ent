'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Sample credentials - in production, use proper authentication
    if (credentials.username === 'prizma' && credentials.password === 'Ty54Fwsc#4560@3') {
      localStorage.setItem('adminAuth', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-black/40 backdrop-blur-sm p-8 rounded-xl">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <input
            type="text"
            placeholder="Username"
            className="w-full bg-white/10 rounded-lg px-4 py-3 text-white"
            value={credentials.username}
            onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-white/10 rounded-lg px-4 py-3 text-white"
            value={credentials.password}
            onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
          />
          <button
            type="submit"
            className="w-full bg-[#F9B104] hover:bg-amber-500 px-8 py-3 rounded-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
