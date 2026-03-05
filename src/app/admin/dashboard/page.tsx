'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Users, Film, BarChart3, LogOut, Check, X, Star, 
  Trash2, Plus, Search, DollarSign
} from 'lucide-react';
import { Animator } from '@/types';

type TabType = 'animators' | 'episodes' | 'analytics';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('animators');
  const [animators, setAnimators] = useState<Animator[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('pending');
  const [showAnimatorModal, setShowAnimatorModal] = useState(false);
  const [newAnimator, setNewAnimator] = useState({
    name: '', email: '', instagram: '', portfolio: '', skills: '', experience: '', price_range: '', bio: '', portfolio_image: ''
  });

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth !== 'true') {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
      fetchAnimators();
    }
  }, [router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAnimators();
    }
  }, [statusFilter]);

  const fetchAnimators = async () => {
    setLoading(true);
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      
      console.log('Fetching animators from Supabase...');
      console.log('Status filter:', statusFilter);
      
      if (supabaseUrl && serviceKey) {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, serviceKey);
        
        let query = supabase
          .from('animators')
          .select('*')
          .order('created_at', { ascending: false });
        
        // Filter by status if not "all"
        if (statusFilter !== 'all') {
          query = query.eq('status', statusFilter);
        }
        
        const { data, error } = await query;
        
        console.log('=== FETCH ANIMATORS ===');
        console.log('Total fetched:', data?.length || 0);
        console.log('Fetched animators:', JSON.stringify(data, null, 2));
        console.log('Error:', error);
        
        if (data && !error) {
          setAnimators(data);
        } else if (error) {
          console.error('Supabase fetch error:', error);
          setAnimators([]);
        }
      } else {
        console.log('Missing Supabase credentials');
        setAnimators([]);
      }
    } catch (error) {
      console.error('Error fetching animators:', error);
      setAnimators([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin');
  };

  const handleStatusChange = async (id: string, newStatus: 'approved' | 'rejected') => {
    console.log('=== STATUS CHANGE ===');
    console.log('Animator ID:', id);
    console.log('New Status:', newStatus);
    
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      
      if (supabaseUrl && serviceKey) {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, serviceKey);
        
        const { error } = await supabase
          .from('animators')
          .update({ status: newStatus })
          .eq('id', id);
        
        console.log('Update error:', error);
        
        if (!error) {
          setAnimators(animators.map(a => 
            a.id === id ? { ...a, status: newStatus } : a
          ));
          console.log('Status updated successfully to:', newStatus);
        } else {
          console.error('Failed to update status:', error);
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleFeaturedToggle = async (id: string) => {
    const animator = animators.find(a => a.id === id);
    if (!animator) return;
    
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      
      if (supabaseUrl && serviceKey) {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, serviceKey);
        
        const { error } = await supabase
          .from('animators')
          .update({ featured: !animator.featured })
          .eq('id', id);
        
        if (!error) {
          setAnimators(animators.map(a => 
            a.id === id ? { ...a, featured: !a.featured } : a
          ));
        }
      }
    } catch (error) {
      console.error('Error toggling featured:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this animator?')) return;
    
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      
      if (supabaseUrl && serviceKey) {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, serviceKey);
        
        const { error } = await supabase
          .from('animators')
          .delete()
          .eq('id', id);
        
        if (!error) {
          setAnimators(animators.filter(a => a.id !== id));
        }
      }
    } catch (error) {
      console.error('Error deleting animator:', error);
    }
  };

  const handleAddAnimator = async () => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      
      if (supabaseUrl && serviceKey) {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, serviceKey);
        
        const { data, error } = await supabase
          .from('animators')
          .insert([{
            name: newAnimator.name,
            email: newAnimator.email,
            instagram: newAnimator.instagram || '',
            portfolio: newAnimator.portfolio,
            skills: newAnimator.skills.split(',').map(s => s.trim()),
            experience: newAnimator.experience || '',
            price_range: newAnimator.price_range || '',
            bio: newAnimator.bio,
            status: 'approved',
            featured: false,
            portfolio_image: newAnimator.portfolio_image || ''
          }])
          .select();
        
        if (!error && data) {
          setAnimators([...data, ...animators]);
          setShowAnimatorModal(false);
          setNewAnimator({ name: '', email: '', instagram: '', portfolio: '', skills: '', experience: '', price_range: '', bio: '', portfolio_image: '' });
        }
      }
    } catch (error) {
      console.error('Error adding animator:', error);
    }
  };

  const filteredAnimators = animators.filter(a => {
    const matchesSearch = a.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         a.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = animators.filter(a => a.status === 'pending').length;
  const approvedCount = animators.filter(a => a.status === 'approved').length;
  const rejectedCount = animators.filter(a => a.status === 'rejected').length;

  const avatarColors = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-yellow-500',
    'from-red-500 to-pink-500',
    'from-indigo-500 to-purple-500',
  ];

  const tabs = [
    { id: 'animators' as TabType, label: 'Animators', icon: Users, count: animators.length, badge: pendingCount > 0 ? pendingCount : null },
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
                {tab.badge && (
                  <span className="ml-auto bg-yellow-500 text-black text-xs px-2 py-0.5 rounded-full">{tab.badge}</span>
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
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="pending" className="bg-gray-900">Pending</option>
                  <option value="all" className="bg-gray-900">All Status</option>
                  <option value="approved" className="bg-gray-900">Approved</option>
                  <option value="rejected" className="bg-gray-900">Rejected</option>
                </select>
              </div>

              {loading ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto rounded-full border-4 border-purple-500 border-t-transparent animate-spin" />
                </div>
              ) : filteredAnimators.length === 0 ? (
                <div className="glass-card p-8 text-center">
                  <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Animators Found</h3>
                  <p className="text-gray-400">No animators match your search criteria.</p>
                </div>
              ) : (
                <div className="glass-card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="text-left p-4 text-gray-400 font-medium">Animator</th>
                          <th className="text-left p-4 text-gray-400 font-medium">Role</th>
                          <th className="text-left p-4 text-gray-400 font-medium">Instagram</th>
                          <th className="text-left p-4 text-gray-400 font-medium">Price</th>
                          <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                          <th className="text-left p-4 text-gray-400 font-medium">Featured</th>
                          <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAnimators.map(animator => {
                          const colorIndex = parseInt(animator.id?.slice(-1) || '0') % avatarColors.length;
                          return (
                            <tr key={animator.id} className="border-t border-white/5 hover:bg-white/5">
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[colorIndex]} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                                    {animator.name?.charAt(0) || 'A'}
                                  </div>
                                  <div>
                                    <p className="text-white font-medium">{animator.name}</p>
                                    <p className="text-gray-500 text-sm">{animator.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <span className="text-gray-300">{animator.skills?.[0] || 'Animator'}</span>
                              </td>
                              <td className="p-4">
                                {animator.instagram ? (
                                  <a href={`https://instagram.com/${animator.instagram}`} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300">
                                    @{animator.instagram}
                                  </a>
                                ) : <span className="text-gray-500">-</span>}
                              </td>
                              <td className="p-4">
                                <span className="text-gray-300">{animator.price_range || 'N/A'}</span>
                              </td>
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
                                        title="Approve"
                                      >
                                        <Check className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => handleStatusChange(animator.id, 'rejected')}
                                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                        title="Reject"
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                    </>
                                  )}
                                  <button
                                    onClick={() => handleDelete(animator.id)}
                                    className="p-2 rounded-lg bg-white/10 text-gray-400 hover:text-red-400 hover:bg-red-500/20 transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="animate-fadeIn">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-white">Analytics</h1>
                <p className="text-gray-400 mt-1">Platform statistics and insights</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                  <X className="w-8 h-8 text-red-400 mb-4" />
                  <p className="text-3xl font-bold text-white">{rejectedCount}</p>
                  <p className="text-gray-400">Rejected</p>
                </div>
                <div className="glass-card p-6">
                  <DollarSign className="w-8 h-8 text-yellow-400 mb-4" />
                  <p className="text-3xl font-bold text-white">{pendingCount}</p>
                  <p className="text-gray-400">Pending Review</p>
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
              <input type="text" placeholder="Name *" value={newAnimator.name} onChange={e => setNewAnimator({...newAnimator, name: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500" />
              <input type="email" placeholder="Email *" value={newAnimator.email} onChange={e => setNewAnimator({...newAnimator, email: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500" />
              <input type="text" placeholder="Instagram" value={newAnimator.instagram} onChange={e => setNewAnimator({...newAnimator, instagram: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500" />
              <input type="url" placeholder="Portfolio Link *" value={newAnimator.portfolio} onChange={e => setNewAnimator({...newAnimator, portfolio: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500" />
              <input type="url" placeholder="Portfolio Image URL" value={newAnimator.portfolio_image} onChange={e => setNewAnimator({...newAnimator, portfolio_image: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500" />
              <input type="text" placeholder="Skills (comma separated) *" value={newAnimator.skills} onChange={e => setNewAnimator({...newAnimator, skills: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500" />
              <input type="text" placeholder="Experience (e.g., 5+ years)" value={newAnimator.experience} onChange={e => setNewAnimator({...newAnimator, experience: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500" />
              <input type="text" placeholder="Price Range (e.g., $500-$3000)" value={newAnimator.price_range} onChange={e => setNewAnimator({...newAnimator, price_range: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500" />
              <textarea placeholder="Bio *" value={newAnimator.bio} onChange={e => setNewAnimator({...newAnimator, bio: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500" rows={3} />
            </div>
            <div className="flex gap-4 mt-6">
              <button onClick={() => setShowAnimatorModal(false)} className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg">Cancel</button>
              <button onClick={handleAddAnimator} className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg">Add Animator</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
