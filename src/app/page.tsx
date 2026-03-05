'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Users, Briefcase, Instagram, ExternalLink, Plus } from 'lucide-react';
import { Animator } from '@/types';
import { supabase } from '@/lib/supabase';

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

export default function Home() {
  const [animators, setAnimators] = useState<Animator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimators = async () => {
      try {
        const { data, error } = await supabase.client
          .from('animators')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false })
          .limit(6);

        console.log('Fetched featured animators:', data);
        console.log('Error:', error);

        if (data && !error) {
          setAnimators(data);
        }
      } catch (err) {
        console.error('Error fetching animators:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimators();
  }, []);

  return (
    <div className="animate-fadeIn">
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&h=1080&fit=crop"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/95 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              Curated Animator Network
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Discover and Hire Talented Animators
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              A curated network of independent animators ready to bring your ideas to life.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/animators"
                className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 animate-pulse-glow"
              >
                Browse Animators
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/hire"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all duration-300"
              >
                Hire an Animator
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Featured Animators</h2>
            <p className="text-gray-400 mt-2">Top talent from our curated network</p>
          </div>
          
          {loading ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto rounded-full border-4 border-purple-500 border-t-transparent animate-spin" />
            </div>
          ) : animators.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {animators.map((animator) => (
                <AnimatorCard key={animator.id} animator={animator} />
              ))}
            </div>
          )}
          
          {animators.length > 0 && (
            <div className="text-center mt-8">
              <Link
                href="/animators"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                View All Animators
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Discover Talent</h3>
              <p className="text-gray-400">
                Browse profiles of verified animators and find the perfect match for your project
              </p>
            </div>

            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Hire Easily</h3>
              <p className="text-gray-400">
                Submit your project requirements and get matched with skilled animators
              </p>
            </div>

            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-500/20 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Quality Guaranteed</h3>
              <p className="text-gray-400">
                Work with pre-vetted animators who deliver professional results
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#1a1a1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Bring Your Vision to Life?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Whether you need character animation, motion graphics, or explainer videos, 
            our network of talented animators is ready to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/hire"
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105"
            >
              Hire an Animator
            </Link>
            <Link
              href="/animators/register"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all duration-300"
            >
              Join as Animator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
