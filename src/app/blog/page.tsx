import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | SoloAnimator Network',
  description: 'Learn about animation, hiring animators, and the latest trends in the animation industry.',
  keywords: ['animation blog', 'hire animator', '2D animation tips', 'animation industry'],
};

const blogPosts = [
  {
    id: '1',
    slug: 'how-to-hire-2d-animator',
    title: 'How to Hire the Right 2D Animator for Your Project',
    excerpt: 'A comprehensive guide to finding and hiring the perfect 2D animator for your creative project. Learn what to look for and questions to ask.',
    content: 'Hiring the right 2D animator can make or break your project. This guide covers everything from evaluating portfolios to negotiating rates.',
    cover_image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=450&fit=crop',
    published: true,
    created_at: '2026-01-20',
  },
  {
    id: '2',
    slug: 'cost-of-anime-animation',
    title: 'Understanding the Cost of Anime Animation in 2026',
    excerpt: 'Breakdown of animation costs, factors that affect pricing, and budget tips for your anime or animation project.',
    content: 'Animation costs vary widely depending on style, complexity, and quality. This article explores the factors that influence anime animation pricing.',
    cover_image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=450&fit=crop',
    published: true,
    created_at: '2026-02-10',
  },
  {
    id: '3',
    slug: 'best-animation-tools',
    title: 'Best Animation Tools Every Animator Should Know',
    excerpt: 'Explore the top animation software and tools used by professional animators worldwide.',
    content: 'From Adobe Animate to Toon Boom, discover the tools that professional animators use to create stunning animations.',
    cover_image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=450&fit=crop',
    published: true,
    created_at: '2026-03-01',
  },
  {
    id: '4',
    slug: 'indie-animation-growth',
    title: 'Growing Your Indie Animation Career in the Digital Age',
    excerpt: 'Tips and strategies for indie animators looking to build their audience and grow their career.',
    content: 'The digital age has opened new doors for indie animators. Learn how to build your personal brand and grow your audience.',
    cover_image: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&h=450&fit=crop',
    published: true,
    created_at: '2026-03-15',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Blog</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Insights, tips, and guides from the animation world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="glass-card overflow-hidden group hover:neon-glow transition-all duration-300"
            >
              <div className="relative aspect-video">
                <Image
                  src={post.cover_image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                <h2 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors mb-3">
                  {post.title}
                </h2>
                <p className="text-gray-400 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-purple-400 group-hover:text-purple-300 transition-colors">
                  Read More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
