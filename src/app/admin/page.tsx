'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, Loader2, AlertCircle, Check, X, Trash2, Users, Instagram, ExternalLink } from 'lucide-react';
import { Animator } from '@/types';
import { supabase } from '@/lib/supabase';

const ADMIN_EMAIL = 'skmdsohaib4@gmail.com';
const ADMIN_PASSWORD = 'Solo@142008';
const SECURITY_CODE = 'Solo14@2008';

export default function AdminPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [animators, setAnimators] = useState<Animator[]>([]);
  const [loadingAnimators, setLoadingAnimators] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchPendingAnimators();
    }
  }, []);

  const fetchPendingAnimators = async () => {
    setLoadingAnimators(true);
    try {
      console.log('Fetching pending animators...');
      
      const { data, error } = await supabase.client
        .from('animators')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });
      
      console.log('Fetched pending animators:', data);
      console.log('Supabase error:', error);
      
      if (!error && data) {
        setAnimators(data);
      }
    } catch (error) {
      console.error('Error fetching animators:', error);
    } finally {
      setLoadingAnimators(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase.client
        .from('animators')
        .update({ status: 'approved' })
        .eq('id', id);
      
      console.log('Approve error:', error);
      
      if (!error) {
        fetchPendingAnimators();
      }
    } catch (error) {
      console.error('Error approving animator:', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase.client
        .from('animators')
        .update({ status: 'rejected' })
        .eq('id', id);
      
      console.log('Reject error:', error);
      
      if (!error) {
        fetchPendingAnimators();
      }
    } catch (error) {
      console.error('Error rejecting animator:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this animator?')) return;
    
    try {
      const { error } = await supabase.client
        .from('animators')
        .delete()
        .eq('id', id);
      
      console.log('Delete error:', error);
      
      if (!error) {
        fetchPendingAnimators();
      }
    } catch (error) {
      console.error('Error deleting animator:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setAnimators([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (email !== ADMIN_EMAIL) {
      setError('Invalid email address');
      setIsLoading(false);
      return;
    }

    if (password !== ADMIN_PASSWORD) {
      setError('Invalid password');
      setIsLoading(false);
      return;
    }

    if (securityCode !== SECURITY_CODE) {
      setError('Invalid security code');
      setIsLoading(false);
      return;
    }

    localStorage.setItem('adminAuth', 'true');
    setIsAuthenticated(true);
    fetchPendingAnimators();
    setIsLoading(false);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Panel - Pending Animators</h1>
              <p className="text-gray-400 mt-1">Manage animator applications</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              Logout
            </button>
          </div>

          {loadingAnimators ? (
            <div className="text-center py-16">
              <Loader2 className="w-16 h-16 mx-auto text-purple-500 animate-spin" />
            </div>
          ) : animators.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Pending Animators</h3>
              <p className="text-gray-400">There are no animator applications waiting for approval.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {animators.map((animator) => (
                <div key={animator.id} className="glass-card p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                          {animator.name?.charAt(0) || 'A'}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{animator.name}</h3>
                          <p className="text-gray-400">{animator.email}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-gray-500 text-sm">Role</p>
                          <p className="text-white">{animator.skills?.[0] || 'Animator'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Experience</p>
                          <p className="text-white">{animator.experience || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Price Range</p>
                          <p className="text-white">{animator.price_range || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Instagram</p>
                          {animator.instagram ? (
                            <a href={`https://instagram.com/${animator.instagram}`} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300">
                              @{animator.instagram}
                            </a>
                          ) : <span className="text-gray-500">-</span>}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-gray-500 text-sm mb-1">Bio</p>
                        <p className="text-white">{animator.bio}</p>
                      </div>
                      
                      {animator.portfolio && (
                        <a href={animator.portfolio} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300">
                          <ExternalLink className="w-4 h-4" />
                          Portfolio Link
                        </a>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleApprove(animator.id)}
                        className="p-3 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                        title="Approve"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleReject(animator.id)}
                        className="p-3 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                        title="Reject"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(animator.id)}
                        className="p-3 rounded-lg bg-white/10 text-gray-400 hover:text-red-400 hover:bg-red-500/20 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 mb-4">
            <Lock className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-gray-400 mt-2">Access the admin control panel</p>
        </div>

        <div className="glass-card p-8">
          {error && (
            <div className="flex items-center gap-2 p-4 mb-6 rounded-lg bg-red-500/20 text-red-400">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <div>
              <label htmlFor="securityCode" className="block text-sm font-medium text-gray-300 mb-2">
                Security Code
              </label>
              <input
                type="password"
                id="securityCode"
                value={securityCode}
                onChange={(e) => setSecurityCode(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Enter security code"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
