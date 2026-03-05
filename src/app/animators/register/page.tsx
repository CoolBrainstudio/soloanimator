'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface FormData {
  name: string;
  email: string;
  instagram: string;
  portfolio: string;
  portfolio_image: string;
  skills: string;
  experience: string;
  price_range: string;
  bio: string;
}

const skillOptions = [
  '2D Animation', '3D Animation', 'Character Design', 'Storyboarding',
  'Motion Graphics', 'Anime Style', 'Whiteboard Animation', 'Explainer Videos',
  'VFX', 'Compositing', 'Background Art', 'Rigging'
];

const experienceOptions = [
  'Less than 1 year', '1-2 years', '2-3 years', '3-5 years', '5+ years'
];

export default function RegisterAnimatorPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    instagram: '',
    portfolio: '',
    portfolio_image: '',
    skills: '',
    experience: '',
    price_range: '',
    bio: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/animators/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          instagram: formData.instagram,
          portfolio: formData.portfolio,
          portfolio_image: formData.portfolio_image,
          skills: formData.skills,
          experience: formData.experience,
          price_range: formData.price_range,
          bio: formData.bio
        })
      });

      const result = await response.json();
      console.log('Response:', result);

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit');
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error('Submit error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
        <div className="glass-card p-8 max-w-md text-center animate-fadeIn">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Application Submitted!</h1>
          <p className="text-gray-400 mb-6">
            Thank you for applying to join our animator network. Your application is now 
            pending review. We'll notify you once it's been processed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] py-12 animate-fadeIn">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/animators"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Animators
        </Link>

        <div className="glass-card p-8">
          <h1 className="text-3xl font-bold text-white mb-2">Join as an Animator</h1>
          <p className="text-gray-400 mb-8">
            Fill out your details to join our network. Your profile will be reviewed by our team.
          </p>

          {error && (
            <div className="flex items-center gap-2 p-4 mb-6 rounded-lg bg-red-500/20 text-red-400">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="instagram" className="block text-sm font-medium text-gray-300 mb-2">
                  Instagram ID
                </label>
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="@username"
                />
              </div>

              <div>
                <label htmlFor="portfolio" className="block text-sm font-medium text-gray-300 mb-2">
                  Portfolio Link *
                </label>
                <input
                  type="url"
                  id="portfolio"
                  name="portfolio"
                  required
                  value={formData.portfolio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="https://dribbble.com/yourname"
                />
              </div>

              <div>
                <label htmlFor="portfolio_image" className="block text-sm font-medium text-gray-300 mb-2">
                  Portfolio Preview Image (Optional)
                </label>
                <input
                  type="url"
                  id="portfolio_image"
                  name="portfolio_image"
                  value={formData.portfolio_image}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="https://example.com/your-work.jpg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-300 mb-2">
                  Skills *
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  required
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="2D Animation, Character Design (comma separated)"
                />
                <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-2">
                  Experience *
                </label>
                <select
                  id="experience"
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="" className="bg-gray-900">Select experience</option>
                  {experienceOptions.map(exp => (
                    <option key={exp} value={exp} className="bg-gray-900">{exp}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="price_range" className="block text-sm font-medium text-gray-300 mb-2">
                Price Range
              </label>
              <input
                type="text"
                id="price_range"
                name="price_range"
                value={formData.price_range}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="e.g., $50 - $200 per animation or Negotiable"
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">
                Short Bio *
              </label>
              <textarea
                id="bio"
                name="bio"
                required
                rows={4}
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                placeholder="Tell clients about yourself, your style, and what makes your work unique..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
