'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Users, Film, BarChart3, LogOut, Check, X, Star, 
  Trash2, Plus, Search, Loader2, Settings
} from 'lucide-react';
import { Animator } from '@/types';

type TabType = 'animators' | 'episodes' | 'analytics';

const sampleAnimators: Animator[] = [
  {
    id: '1',
    name: 'Alex Chen',
    email: 'alex@example.com',
    instagram: 'alexanimation',
    portfolio: 'https://dribbble.com',
    skills: ['2D Animation', 'Character Design'],
    experience: '5+ years',
    price_range: '$500-$5000',
    bio: 'Professional animator',
    status: 'approved',
    featured: true,
    created_at: '2026-01-01',
  },
  {
    id: '2',
    name: 'Maya Rodriguez',
    email: 'maya@example.com',
    instagram: 'mayabear',
    portfolio: 'https://behance.net',
    skills: ['Anime Style', 'Storyboarding'],
    experience: '3+ years',
    price_range: '$300-$3000',
    bio: 'Anime specialist',
    status: 'pending',
    featured: false,
    created_at: '2026-01-15',
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('animators');
  const [animators, setAnimators] = useState<Animator[]>(sampleAnimators);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth !== 'true') {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
      const storedApplications = localStorage.getItem('animatorApplications');
      if (storedApplications) {
        const applications = JSON.parse(storedApplications);
        setAnimators([...sampleAnimators, ...applications]);
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin');
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAnimatorModal, setShowAnimatorModal] = useState(false);
  const [showEpisodeModal, setShowEpisodeModal] = useState(false);
  const [newAnimator, setNewAnimator] = useState({
    name: '', email: '', instagram: '', portfolio: '', skills: '', experience: '', price_range: '', bio: ''
  });
  const [newEpisode, setNewEpisode] = useState({
    title: '', description: '', thumbnail: '', video_url: '', duration: ''
  });

  const filteredAnimators = animators.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingCount = animators.filter(a => a.status === 'pending').length;
  const approvedCount = animators.filter(a => a.status === 'approved').length;

  const handleStatusChange = async (id: string, status: 'approved' | 'rejected') => {
    setIsLoading(true);
    const updatedAnimators = animators.map(a => 
      a.id === id ? { ...a, status } : a
    );
    setAnimators(updatedAnimators);
    
    const storedApplications = JSON.parse(localStorage.getItem('animatorApplications') || '[]');
    const updatedApplications = storedApplications.map((a: any) => 
      a.id === id ? { ...a, status } : a
    );
    localStorage.setItem('animatorApplications', JSON.stringify(updatedApplications));
    setIsLoading(false);
  };

  const handleFeaturedToggle = async (id: string) => {
    setIsLoading(true);
    setAnimators(animators.map(a => 
      a.id === id ? { ...a, featured: !a.featured } : a
    ));
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this animator?')) return;
    setIsLoading(true);
    
    // Remove from local state
    setAnimators(animators.filter(a => a.id !== id));
    
    // Remove from localStorage
    const storedApplications = JSON.parse(localStorage.getItem('animatorApplications') || '[]');
    const updatedApplications = storedApplications.filter((a: any) => a.id !== id);
    localStorage.setItem('animatorApplications', JSON.stringify(updatedApplications));
    
    // Try to delete from Supabase
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      
      if (supabaseUrl && serviceKey) {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, serviceKey);
        await supabase.from('animators').delete().eq('id', id);
      }
    } catch (e) {
      console.log('Delete from Supabase failed:', e);
    }
    
    setIsLoading(false);
  };

  const handleAddAnimator = () => {
    const animator = {
      id: Date.now().toString(),
      ...newAnimator,
      skills: newAnimator.skills.split(',').map(s => s.trim()),
      status: 'approved' as const,
      featured: false,
      created_at: new Date().toISOString()
    };
    setAnimators([...animators, animator]);
    setShowAnimatorModal(false);
    setNewAnimator({ name: '', email: '', instagram: '', portfolio: '', skills: '', experience: '', price_range: '', bio: '' });
  };

  const handleAddEpisode = () => {
    const episode = {
      id: Date.now().toString(),
      ...newEpisode,
      video_type: 'youtube' as const,
      release_date: new Date().toISOString(),
      published: true,
      created_at: new Date().toISOString()
    };
    const storedEpisodes = JSON.parse(localStorage.getItem('episodes') || '[]');
    storedEpisodes.push(episode);
    localStorage.setItem('episodes', JSON.stringify(storedEpisodes));
    setShowEpisodeModal(false);
    setNewEpisode({ title: '', description: '', thumbnail: '', video_url: '', duration: '' });
    alert('Episode added successfully!');
  };

  const tabs = [
    { id: 'animators' as TabType, label: 'Animators', icon: Users, count: animators.length },
    { id: 'episodes' as TabType, label: 'Episodes', icon: Film, count: 6 },
    { id: 'analytics' as TabType, label: 'Analytics', icon: BarChart3, count: null },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-[#1a1a1a] border-r border-[#2a2a2a] p-4">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white px-4">Admin Panel</h2>
          </div>

          <nav className="space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
                {tab.count !== null && (
                  <span className="ml-auto text-sm opacity-70">{tab.count}</span>
                )}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-4 left-4 right-4 space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              Back to Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 p-8">
          {activeTab === 'animators' && (
            <div className="animate-fadeIn">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-white">Animator Management</h1>
                  <p className="text-gray-400 mt-1">Manage animator applications and profiles</p>
                </div>
                <button onClick={() => setShowAnimatorModal(true)} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Animator
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search animators..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              <div className="glass-card overflow-hidden">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="text-left p-4 text-gray-400 font-medium">Name</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Email</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Featured</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAnimators.map(animator => (
                      <tr key={animator.id} className="border-t border-white/5 hover:bg-white/5">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                              {animator.name.charAt(0)}
                            </div>
                            <span className="text-white font-medium">{animator.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-400">{animator.email}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            animator.status === 'approved' 
                              ? 'bg-green-500/20 text-green-400' 
                              : animator.status === 'rejected'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {animator.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleFeaturedToggle(animator.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              animator.featured 
                                ? 'bg-yellow-500/20 text-yellow-400' 
                                : 'bg-white/10 text-gray-400 hover:text-white'
                            }`}
                          >
                            <Star className={`w-5 h-5 ${animator.featured ? 'fill-current' : ''}`} />
                          </button>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {animator.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleStatusChange(animator.id, 'approved')}
                                  className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleStatusChange(animator.id, 'rejected')}
                                  className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => handleDelete(animator.id)}
                              className="p-2 rounded-lg bg-white/10 text-gray-400 hover:text-red-400 hover:bg-red-500/20 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'episodes' && (
            <div className="animate-fadeIn">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-white">Episode Management</h1>
                  <p className="text-gray-400 mt-1">Manage video episodes and series</p>
                </div>
                <button onClick={() => setShowEpisodeModal(true)} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Episode
                </button>
              </div>

              <div className="glass-card p-8 text-center">
                <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Episode Management</h3>
                <p className="text-gray-400">Add, edit, and manage video episodes</p>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="animate-fadeIn">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-white">Analytics</h1>
                <p className="text-gray-400 mt-1">Platform statistics and insights</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card p-6">
                  <Users className="w-8 h-8 text-purple-400 mb-4" />
                  <p className="text-3xl font-bold text-white">{animators.length}</p>
                  <p className="text-gray-400">Total Animators</p>
                </div>
                <div className="glass-card p-6">
                  <Check className="w-8 h-8 text-green-400 mb-4" />
                  <p className="text-3xl font-bold text-white">{approvedCount}</p>
                  <p className="text-gray-400">Approved</p>
                </div>
                <div className="glass-card p-6">
                  <BarChart3 className="w-8 h-8 text-yellow-400 mb-4" />
                  <p className="text-3xl font-bold text-white">{pendingCount}</p>
                  <p className="text-gray-400">Pending</p>
                </div>
              </div>
            </div>
            )}
        </main>
      </div>

      {showAnimatorModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="glass-card p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Add New Animator</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Name *" value={newAnimator.name} onChange={e => setNewAnimator({...newAnimator, name: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white" />
              <input type="email" placeholder="Email *" value={newAnimator.email} onChange={e => setNewAnimator({...newAnimator, email: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white" />
              <input type="text" placeholder="Instagram" value={newAnimator.instagram} onChange={e => setNewAnimator({...newAnimator, instagram: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white" />
              <input type="url" placeholder="Portfolio Link *" value={newAnimator.portfolio} onChange={e => setNewAnimator({...newAnimator, portfolio: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white" />
              <input type="text" placeholder="Skills (comma separated)" value={newAnimator.skills} onChange={e => setNewAnimator({...newAnimator, skills: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white" />
              <input type="text" placeholder="Experience" value={newAnimator.experience} onChange={e => setNewAnimator({...newAnimator, experience: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white" />
              <input type="text" placeholder="Price Range" value={newAnimator.price_range} onChange={e => setNewAnimator({...newAnimator, price_range: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white" />
              <textarea placeholder="Bio *" value={newAnimator.bio} onChange={e => setNewAnimator({...newAnimator, bio: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white" rows={3} />
            </div>
            <div className="flex gap-4 mt-6">
              <button onClick={() => setShowAnimatorModal(false)} className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg">Cancel</button>
              <button onClick={handleAddAnimator} className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg">Add Animator</button>
            </div>
          </div>
        </div>
      )}

      {showEpisodeModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="glass-card p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Add New Episode</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Title *" value={newEpisode.title} onChange={e => setNewEpisode({...newEpisode, title: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white" />
              <textarea placeholder="Description" value={newEpisode.description} onChange={e => setNewEpisode({...newEpisode, description: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white" rows={3} />
              <input type="url" placeholder="Thumbnail URL *" value={newEpisode.thumbnail} onChange={e => setNewEpisode({...newEpisode, thumbnail: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white" />
              <input type="url" placeholder="Video URL (YouTube) *" value={newEpisode.video_url} onChange={e => setNewEpisode({...newEpisode, video_url: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white" />
              <input type="text" placeholder="Duration (e.g. 12:30)" value={newEpisode.duration} onChange={e => setNewEpisode({...newEpisode, duration: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white" />
            </div>
            <div className="flex gap-4 mt-6">
              <button onClick={() => setShowEpisodeModal(false)} className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg">Cancel</button>
              <button onClick={handleAddEpisode} className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg">Add Episode</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
