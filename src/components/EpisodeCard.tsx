import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar } from 'lucide-react';
import { Episode } from '@/types';

interface EpisodeCardProps {
  episode: Episode;
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <Link href={`/series/${episode.id}`} className="group">
      <div className="glass-card overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:neon-glow">
        <div className="relative aspect-video">
          <Image
            src={episode.thumbnail || '/placeholder-thumbnail.jpg'}
            alt={episode.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {episode.duration}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-1">
            {episode.title}
          </h3>
          <p className="text-gray-400 text-sm mt-1 line-clamp-2">
            {episode.description}
          </p>
          <div className="flex items-center gap-2 mt-3 text-gray-500 text-xs">
            <Calendar className="w-3 h-3" />
            {new Date(episode.release_date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
        </div>
      </div>
    </Link>
  );
}
