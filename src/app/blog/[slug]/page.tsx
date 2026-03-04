import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Share2, Facebook, Twitter } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} | SoloAnimator Blog`,
    description: 'Read more on SoloAnimator Network blog.',
  };
}

const blogPost = {
  id: '1',
  slug: 'how-to-hire-2d-animator',
  title: 'How to Hire the Right 2D Animator for Your Project',
  excerpt: 'A comprehensive guide to finding and hiring the perfect 2D animator for your creative project.',
  content: `
    <p>Finding the right 2D animator for your project can feel overwhelming, especially if you're new to the animation industry. This comprehensive guide will walk you through everything you need to know to make the right choice.</p>
    
    <h2>Understanding Your Project Needs</h2>
    <p>Before you start searching for an animator, it's crucial to have a clear understanding of your project requirements. Ask yourself:</p>
    <ul>
      <li>What type of animation do I need?</li>
      <li>What's my budget?</li>
      <li>What's my timeline?</li>
      <li>Who is my target audience?</li>
    </ul>
    
    <h2>Evaluating Portfolios</h2>
    <p>A portfolio is the best way to gauge an animator's skills and style. Look for:</p>
    <ul>
      <li>Consistency in quality</li>
      <li>Relevant experience</li>
      <li>Technical proficiency</li>
      <li>Creative storytelling ability</li>
    </ul>
    
    <h2>Questions to Ask</h2>
    <p>When interviewing potential animators, don't be afraid to ask these important questions:</p>
    <ul>
      <li>What's your experience with this type of project?</li>
      <li>Can you provide references?</li>
      <li>What's included in your rate?</li>
      <li>How do you handle revisions?</li>
    </ul>
    
    <h2>Making the Decision</h2>
    <p>Ultimately, the right animator for your project is one who understands your vision, communicates clearly, and delivers quality work within your budget and timeline.</p>
  `,
  cover_image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=675&fit=crop',
  published: true,
  created_at: '2026-01-20',
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPost;

  return (
    <div className="min-h-screen bg-[#0f0f0f] animate-fadeIn">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article>
          <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
            {post.title}
          </h1>

          <div className="prose prose-invert max-w-none">
            <div 
              className="text-gray-300 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          <div className="flex items-center gap-4 mt-12 pt-8 border-t border-white/10">
            <span className="text-gray-400">Share:</span>
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Facebook className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Twitter className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Share2 className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </article>

        <div className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/blog/cost-of-anime-animation"
              className="glass-card p-4 hover:neon-glow transition-all"
            >
              <h4 className="text-white font-medium">Understanding the Cost of Anime Animation</h4>
              <p className="text-gray-400 text-sm mt-1">Learn about animation pricing</p>
            </Link>
            <Link
              href="/blog/best-animation-tools"
              className="glass-card p-4 hover:neon-glow transition-all"
            >
              <h4 className="text-white font-medium">Best Animation Tools</h4>
              <p className="text-gray-400 text-sm mt-1">Top software for animators</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
