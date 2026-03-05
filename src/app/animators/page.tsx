'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Plus, Instagram, ExternalLink } from 'lucide-react';
import { Animator } from '@/types';

function AnimatorCard({ animator }: { animator: Animator }) {
  const avatarColors = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-yellow-500',
    'from-red-500 to-pink-500',
    'from-indigo-500 to-purple-500',
  ];
  
  const colorIndex = parseInt(animator.id?.slice(-1) || '0') % avatarColors.length;

  return (
    <div className="glass-card p-6 hover:neon-glow transition-all duration-300">
      {animator.portfolio_image && (
        <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
          <Image
            src={animator.portfolio_image}
            alt="Portfolio"
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="flex items-start gap-4">
        <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${avatarColors[colorIndex]} flex-shrink-0 flex items-center justify-center`}>
          <span className="text-xl font-bold text-white">
            {animator.name?.charAt(0) || 'A'}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{animator.name}</h3>
          <p className="text-purple-400 text-sm">{animator.skills?.[0] || 'Animator'}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {animator.skills?.slice(0, 2).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 text-xs rounded-full bg-purple-500/20 text-purple-400"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="text-gray-400 text-sm mt-3 line-clamp-2">
        {animator.bio}
      </p>

      <div className="flex items-center gap-3 mt-3">
        {animator.instagram && (
          <a
            href={`https://instagram.com/${animator.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Instagram className="w-4 h-4 text-pink-400" />
          </a>
        )}
        {animator.portfolio && (
          <a
            href={animator.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-cyan-400" />
          </a>
        )}
      </div>

      <Link
        href={`/animators/${animator.id}`}
        className="block mt-4 w-full py-2 text-center rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors"
      >
        View Profile
      </Link>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-purple-500/20 flex items-center justify-center">
        <Users className="w-10 h-10 text-purple-400" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">No Animators Yet</h3>
      <p className="text-gray-400 mb-6 max-w-md mx-auto">
        Be one of the first animators to join the SoloAnimator Network and showcase your skills.
      </p>
      <Link
        href="/animators/register"
        className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105"
      >
        <Plus className="w-5 h-5" />
        Join as an Animator
      </Link>
    </div>
  );
}

export default function AnimatorsPage() {
  const [animators, setAnimators] = useState<Animator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimators = async () => {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
        if (supabaseUrl && supabaseKey) {
          const { createClient } = await import('@supabase/supabase-js');
          const supabase = createClient(supabaseUrl, supabaseKey);
          
          const { data, error } = await supabase
            .from('animators')
            .select('*')
            .eq('status', 'approved')
            .order('created_at', { ascending: false });
          
          if (data && !error) {
            setAnimators(data);
          }
        }
      } catch (error) {
        console.log('Error fetching animators:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimators();
  }, []);

  const featuredAnimators = animators.filter(a => a.featured);
  const regularAnimators = animators.filter(a => !a.featured);

  return (
    <div className="min-h-screen bg-[#0f0f0f] animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 mb-4">
            <Users className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Animator Network</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover talented animators from around the world. Browse our curated network of 
            creative professionals ready to bring your vision to life.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto rounded-full border-4 border-purple-500 border-t-transparent animate-spin" />
          </div>
        ) : animators.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {featuredAnimators.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-400" />
                  Featured Animators
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredAnimators.map((animator) => (
                    <AnimatorCard key={animator.id} animator={animator} />
                  ))}
                </div>
              </div>
            )}

            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-white mb-6">All Animators</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularAnimators.map((animator) => (
                  <AnimatorCard key={animator.id} animator={animator} />
                ))}
              </div>
            </div>
          </>
        )}

        <div className="glass-card p-8 text-center">
          <h3 className="text-2xl font-semibold text-white mb-4">Are You an Animator?</h3>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Join our network of talented animators. Get discovered by clients looking 
            for your unique skills and grow your animation career.
          </p>
          <Link
            href="/animators/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Join as Animator
          </Link>
        </div>
      </div>
    </div>
  );
}
