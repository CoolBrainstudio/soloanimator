import Link from 'next/link';
import Image from 'next/image';
import { Instagram, ExternalLink, Star } from 'lucide-react';
import { Animator } from '@/types';

interface AnimatorCardProps {
  animator: Animator;
}

export default function AnimatorCard({ animator }: AnimatorCardProps) {
  return (
    <div className="glass-card p-6 hover:neon-glow transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-cyan-500 flex-shrink-0">
          {animator.name ? (
            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white">
              {animator.name.charAt(0).toUpperCase()}
            </div>
          ) : (
            <Image
              src="/placeholder-avatar.jpg"
              alt={animator.name}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white truncate">{animator.name}</h3>
            {animator.featured && (
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {animator.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="text-gray-400 text-sm mt-4 line-clamp-2">
        {animator.bio}
      </p>

      <div className="flex items-center gap-3 mt-4">
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
