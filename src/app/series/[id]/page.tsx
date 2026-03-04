import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Clock, Calendar, Share2, Facebook, Twitter, Link as LinkIcon } from 'lucide-react';
import EpisodeCard from '@/components/EpisodeCard';
import { Episode } from '@/types';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Episode ${id} | SoloAnimator Network`,
    description: 'Watch this episode on SoloAnimator Network',
  };
}

const getYouTubeEmbedUrl = (url: string): string => {
  const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

const sampleEpisode: Episode = {
  id: '1',
  title: 'The Beginning - Episode 1',
  description: 'Watch the first episode of our flagship series. Join our heroes as they embark on an epic journey that will change everything. In this episode, we meet the main characters and get introduced to the world they inhabit. The animation quality is top-notch and the story sets up an intriguing narrative that will keep you hooked.',
  thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&h=675&fit=crop',
  video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  video_type: 'youtube',
  duration: '12:30',
  release_date: '2026-01-15',
  published: true,
  created_at: '2026-01-15',
};

const relatedEpisodes: Episode[] = [
  {
    id: '2',
    title: 'New Horizons - Episode 2',
    description: 'The adventure continues.',
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
    description: 'A short animation.',
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
    description: 'An emotional story.',
    thumbnail: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&h=450&fit=crop',
    video_url: 'https://www.youtube.com/watch?v=example3',
    video_type: 'youtube',
    duration: '15:00',
    release_date: '2026-03-01',
    published: true,
    created_at: '2026-03-01',
  },
];

export default async function EpisodePage({ params }: Props) {
  const { id } = await params;
  const episode = id === '1' ? sampleEpisode : { ...sampleEpisode, id };

  const embedUrl = episode.video_type === 'youtube' 
    ? getYouTubeEmbedUrl(episode.video_url)
    : episode.video_url;

  return (
    <div className="min-h-screen bg-[#0f0f0f] animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="aspect-video rounded-xl overflow-hidden bg-black">
              <iframe
                src={embedUrl}
                title={episode.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="mt-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {episode.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {episode.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(episode.release_date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-400 text-sm">Share:</span>
                <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <Facebook className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <Twitter className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <LinkIcon className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold text-white mb-3">Description</h2>
                <p className="text-gray-300 leading-relaxed">
                  {episode.description}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Related Episodes</h3>
            <div className="space-y-4">
              {relatedEpisodes.map((ep) => (
                <EpisodeCard key={ep.id} episode={ep} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
