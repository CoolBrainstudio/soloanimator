import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Instagram, ExternalLink, Calendar, DollarSign, Star } from 'lucide-react';
import { Animator } from '@/types';
import { supabase } from '@/lib/supabase';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Animator Profile | SoloAnimator Network`,
    description: 'View animator profile on SoloAnimator Network',
  };
}

const sampleWorks = [
  { id: 1, title: 'Character Animation Reel', type: 'Video', url: '#' },
  { id: 2, title: 'Brand Campaign', type: 'Image', url: '#' },
  { id: 3, title: 'Music Video', type: 'Video', url: '#' },
  { id: 4, title: 'Explainer Video', type: 'Video', url: '#' },
];

export default async function AnimatorProfilePage({ params }: Props) {
  const { id } = await params;
  
  const { data: animator, error } = await supabase.client
    .from('animators')
    .select('*')
    .eq('id', id)
    .single();

  console.log('Fetching animator:', id);
  console.log('Animator data:', animator);
  console.log('Error:', error);

  if (!animator || error) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Animator Not Found</h1>
          <Link href="/animators" className="text-purple-400 hover:text-purple-300">
            Back to Animators
          </Link>
        </div>
      </div>
    );
  }

  const displayAnimator = animator as Animator;

  return (
    <div className="min-h-screen bg-[#0f0f0f] animate-fadeIn">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/animators"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Animators
        </Link>

        <div className="glass-card overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-purple-600 to-cyan-600" />
          
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 -mt-12 mb-6">
              <div className="flex items-end gap-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-cyan-500 border-4 border-[#1a1a1a] flex-shrink-0">
                  <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-white">
                    {displayAnimator.name?.charAt(0).toUpperCase() || 'A'}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-white">{displayAnimator.name}</h1>
                    {displayAnimator.featured && (
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    )}
                  </div>
                  <p className="text-gray-400">{displayAnimator.experience || 'N/A'} Experience</p>
                </div>
              </div>
              
              <Link
                href="/hire"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors text-center"
              >
                Hire This Animator
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {displayAnimator.skills?.map((skill: string) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-sm rounded-full bg-purple-500/20 text-purple-400"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5">
                <DollarSign className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-xs text-gray-500">Price Range</p>
                  <p className="text-white font-medium">{displayAnimator.price_range || 'Negotiable'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-xs text-gray-500">Member Since</p>
                  <p className="text-white font-medium">
                    {displayAnimator.created_at ? new Date(displayAnimator.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric'
                    }) : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5">
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <p className="text-white font-medium capitalize">{displayAnimator.status}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-3">About</h2>
              <p className="text-gray-300 leading-relaxed">{displayAnimator.bio}</p>
            </div>

            <div className="flex gap-4 mb-8">
              {displayAnimator.instagram && (
                <a
                  href={`https://instagram.com/${displayAnimator.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              )}
              {displayAnimator.portfolio && (
                <a
                  href={displayAnimator.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Portfolio
                </a>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Sample Works</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sampleWorks.map((work) => (
                  <a
                    key={work.id}
                    href={work.url}
                    className="aspect-video rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                  >
                    <span className="text-gray-400 text-sm">{work.type}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">Ready to work with {displayAnimator.name}?</p>
          <Link
            href="/hire"
            className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105"
          >
            Hire This Animator
          </Link>
        </div>
      </div>
    </div>
  );
}
