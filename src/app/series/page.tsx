import { Metadata } from 'next';
import EpisodeCard from '@/components/EpisodeCard';
import { Episode } from '@/types';

export const metadata: Metadata = {
  title: 'Series | SoloAnimator Network',
  description: 'Watch original animation series and short films from talented creators worldwide.',
  keywords: ['animation series', 'short films', 'animated content', 'watch animation'],
};

const allEpisodes: Episode[] = [
  {
    id: '1',
    title: 'The Beginning - Episode 1',
    description: 'Watch the first episode of our flagship series.',
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=450&fit=crop',
    video_url: 'https://www.youtube.com/watch?v=example',
    video_type: 'youtube',
    duration: '12:30',
    release_date: '2026-01-15',
    published: true,
    created_at: '2026-01-15',
  },
  {
    id: '2',
    title: 'New Horizons - Episode 2',
    description: 'The adventure continues.',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=450&fit=crop',
    video_url: 'https://www.youtube.com/watch?v=example2',
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
    video_url: 'https://www.youtube.com/watch?v=example3',
    video_type: 'youtube',
    duration: '8:45',
    release_date: '2026-02-15',
    published: true,
    created_at: '2026-02-15',
  },
  {
    id: '4',
    title: 'The Last Star',
    description: 'An emotional story about hope.',
    thumbnail: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&h=450&fit=crop',
    video_url: 'https://www.youtube.com/watch?v=example4',
    video_type: 'youtube',
    duration: '15:00',
    release_date: '2026-03-01',
    published: true,
    created_at: '2026-03-01',
  },
  {
    id: '5',
    title: 'Digital Dreams',
    description: 'Animation meets technology.',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=450&fit=crop',
    video_url: 'https://www.youtube.com/watch?v=example5',
    video_type: 'youtube',
    duration: '11:20',
    release_date: '2026-03-15',
    published: true,
    created_at: '2026-03-15',
  },
  {
    id: '6',
    title: 'Colors of Life',
    description: 'A vibrant journey through emotion.',
    thumbnail: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=450&fit=crop',
    video_url: 'https://www.youtube.com/watch?v=example6',
    video_type: 'youtube',
    duration: '9:30',
    release_date: '2026-04-01',
    published: true,
    created_at: '2026-04-01',
  },
];

export default function SeriesPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Animation Series</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Watch original animation series and short films from talented creators worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allEpisodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      </div>
    </div>
  );
}
