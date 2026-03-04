import Link from 'next/link';
import Image from 'next/image';
import { Play, ArrowRight, Sparkles, Users, Briefcase } from 'lucide-react';
import EpisodeCard from '@/components/EpisodeCard';
import { Episode } from '@/types';

const featuredEpisode: Episode = {
  id: '1',
  title: 'The Beginning - Episode 1',
  description: 'Watch the first episode of our flagship series. Join our heroes as they embark on an epic journey that will change everything.',
  thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&h=675&fit=crop',
  video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  video_type: 'youtube',
  duration: '12:30',
  release_date: '2026-01-15',
  published: true,
  created_at: '2026-01-15',
};

const sampleEpisodes: Episode[] = [
  {
    id: '2',
    title: 'New Horizons - Episode 2',
    description: 'The adventure continues as new challenges arise.',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=450&fit=crop',
    video_url: 'https://www.youtube.com/watch?v=example',
    video_type: 'youtube',
    duration: '10:15',
    release_date: '2026-02-01',
    published: true,
    created_at: '2026-02-01',
  },
  {
    id: '3',
    title: 'Echoes of Tomorrow',
    description: 'A short animation exploring futuristic themes.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
    video_url: 'https://www.youtube.com/watch?v=example2',
    video_type: 'youtube',
    duration: '8:45',
    release_date: '2026-02-15',
    published: true,
    created_at: '2026-02-15',
  },
  {
    id: '4',
    title: 'The Last Star',
    description: 'An emotional story about hope and perseverance.',
    thumbnail: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&h=450&fit=crop',
    video_url: 'https://www.youtube.com/watch?v=example3',
    video_type: 'youtube',
    duration: '15:00',
    release_date: '2026-03-01',
    published: true,
    created_at: '2026-03-01',
  },
  {
    id: '5',
    title: 'Digital Dreams',
    description: 'Animation meets technology in this visual masterpiece.',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=450&fit=crop',
    video_url: 'https://www.youtube.com/watch?v=example4',
    video_type: 'youtube',
    duration: '11:20',
    release_date: '2026-03-15',
    published: true,
    created_at: '2026-03-15',
  },
  {
    id: '6',
    title: 'Colors of Life',
    description: 'A vibrant journey through emotion and color.',
    thumbnail: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=450&fit=crop',
    video_url: 'https://www.youtube.com/watch?v=example5',
    video_type: 'youtube',
    duration: '9:30',
    release_date: '2026-04-01',
    published: true,
    created_at: '2026-04-01',
  },
];

export default function Home() {
  return (
    <div className="animate-fadeIn">
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={featuredEpisode.thumbnail}
            alt="Featured"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              Featured Series
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {featuredEpisode.title}
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {featuredEpisode.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/series/${featuredEpisode.id}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 animate-pulse-glow"
              >
                <Play className="w-5 h-5" fill="currentColor" />
                Watch Now
              </Link>
              <Link
                href="/animators"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all duration-300"
              >
                View Animators
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white">Latest Episodes</h2>
              <p className="text-gray-400 mt-2">Fresh content from our creative network</p>
            </div>
            <Link
              href="/series"
              className="hidden md:inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/series"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              View All Episodes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Stream Original Series</h3>
              <p className="text-gray-400">
                Watch exclusive short animation series from talented creators worldwide
              </p>
            </div>

            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Users className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Connect with Animators</h3>
              <p className="text-gray-400">
                Discover and network with verified talented animators in our community
              </p>
            </div>

            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-500/20 flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Hire Talent</h3>
              <p className="text-gray-400">
                Submit your animation project requirements and get matched with the perfect animator
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
            Whether you want to watch amazing animations or hire talented animators, 
            SoloAnimator Network has you covered.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/hire"
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105"
            >
              Hire an Animator
            </Link>
            <Link
              href="/animators"
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
