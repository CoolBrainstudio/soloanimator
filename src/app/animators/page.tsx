'use client';

import { useState, useEffect } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Users, ArrowRight, Plus } from 'lucide-react';
import AnimatorCard from '@/components/AnimatorCard';
import { Animator } from '@/types';

const sampleAnimators: Animator[] = [
  {
    id: '1',
    name: 'Alex Chen',
    email: 'alex@example.com',
    instagram: 'alexanimation',
    portfolio: 'https://dribbble.com',
    skills: ['2D Animation', 'Character Design', 'Motion Graphics'],
    experience: '5+ years',
    price_range: '$500-$5000',
    bio: 'Professional 2D animator specializing in character animation and motion graphics. Worked with major brands and creative studios.',
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
    skills: ['Anime Style', 'Storyboarding', 'Background Art'],
    experience: '3+ years',
    price_range: '$300-$3000',
    bio: 'Passionate anime-style animator with a unique artistic vision. Creating captivating stories through animation.',
    status: 'approved',
    featured: true,
    created_at: '2026-01-15',
  },
  {
    id: '3',
    name: 'Jordan Park',
    email: 'jordan@example.com',
    instagram: 'jordanframes',
    portfolio: 'https://artstation.com',
    skills: ['Explainer Videos', 'Whiteboard Animation', 'Infographics'],
    experience: '4+ years',
    price_range: '$200-$2000',
    bio: 'Specialized in explainer videos and educational content. Making complex ideas simple through animation.',
    status: 'approved',
    featured: false,
    created_at: '2026-02-01',
  },
  {
    id: '4',
    name: 'Sam Williams',
    email: 'sam@example.com',
    instagram: 'samcreates',
    portfolio: 'https://youtube.com',
    skills: ['3D Animation', 'VFX', 'Compositing'],
    experience: '6+ years',
    price_range: '$1000-$10000',
    bio: '3D animation specialist with expertise in VFX and compositing. Bringing imaginative worlds to life.',
    status: 'approved',
    featured: false,
    created_at: '2026-02-15',
  },
];

export default function AnimatorsPage() {
  const [animators, setAnimators] = useState<Animator[]>(sampleAnimators);

  useEffect(() => {
    const storedApplications = localStorage.getItem('animatorApplications');
    if (storedApplications) {
      const applications = JSON.parse(storedApplications);
      const approvedAnimators = applications.filter((a: Animator) => a.status === 'approved');
      setAnimators([...sampleAnimators, ...approvedAnimators]);
    }
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
          <h1 className="text-4xl font-bold text-white mb-4">Animator Talent Hub</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover talented animators from around the world. Browse our verified network of 
            creative professionals ready to bring your vision to life.
          </p>
        </div>

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
